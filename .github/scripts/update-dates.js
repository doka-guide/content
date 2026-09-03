const path = require('path')
const os = require('os')
const fs = require('fs')
const { promisify } = require('util')
const { execFile } = require('child_process')

// Коммит, которому проставляются даты. По вершине ветки его брать нельзя:
// обслуживание main переделывает работу с новой вершины, когда пуш отклонён
// соседним ботом, и на повторной попытке HEAD принадлежит уже чужому пушу —
// даты уехали бы чужому коммиту, а своему не проставились вовсе.
// Откат на HEAD оставлен, чтобы скрипт запускался и руками.
// Значение уезжает в командную строку git, поэтому проверяется регуляркой.
const COMMIT = /^[0-9a-f]{7,40}$/

function targetCommit() {
  const sha = (process.env.TARGET_SHA || '').trim()
  if (!sha) {
    return 'HEAD'
  }
  if (!COMMIT.test(sha)) {
    throw new Error(`Не похоже на коммит: ${sha}`)
  }
  return sha
}

async function updateDates() {
  const commit = targetCommit()
  // отфильтрованные файлы нужного коммита
  const { stdout } = await promisify(execFile)('git', [
    'diff-tree',
    '--no-commit-id',
    '--name-only',
    '--diff-filter=AMCR',
    '-r',
    commit,
  ])

  const filePaths = stdout.split(os.EOL)
    .map(filePath => filePath.trim())
    .filter(Boolean)
    .filter(filePath => {
      const pathSegments = filePath.split(path.sep).filter(Boolean)
      const tag = pathSegments[0]

      return [
        // учитываем только файлы, находящиеся в папках статей
        ['html', 'css', 'js', 'tools', 'a11y', 'recipes'].includes(tag),
        // не учитывем файлы индексов статей, например, 'css/index.md'
        pathSegments.length >= 3,
        // исключаем файлы index.11tydata.json
        !filePath.includes('index.11tydata.json')
      ].every(Boolean)
    })
    // возвращаем путь до папки самой статьи
    .map(filePath => {
      const [tag, articleName] = filePath.split(path.sep).filter(Boolean)
      return [tag, articleName].join(path.sep)
    })

  // используем Set, так как могут быть дубли в путях
  const filePathsSet = new Set(filePaths);

  filePathsSet.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
      return
    }

    const dataFilePath =  path.join(process.cwd(), filePath, 'index.11tydata.json')
    const indexData = (() => {
      try {
        return require(dataFilePath)
      } catch {
        return {}
      }
    })()

    const date = new Date()
    indexData['createdAt'] = indexData['createdAt'] ?? date
    indexData['updatedAt'] = date

    fs.writeFileSync(dataFilePath, JSON.stringify(indexData, null, 2) + '\n')
  })
}

updateDates()
