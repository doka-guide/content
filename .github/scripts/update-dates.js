const path = require('path')
const os = require('os')
const fs = require('fs')
const { promisify } = require('util')
const { exec } = require('child_process')

async function updateDates() {
  // получение id последнего коммита
  const lastCommitId = `git log --diff-filter=AMCR --format="%H" -n 1`
  // получение отфильтрованных файлов последнего коммита
  const gitCommand = `git diff-tree --no-commit-id --name-only -r $(echo $(${lastCommitId}))`

  const { stdout } = await promisify(exec)(gitCommand)

  const filePaths = stdout.split(os.EOL)
    .map(filePath => filePath.trim())
    .filter(Boolean)
    .filter(filePath => {
      const pathSegments = filePath.split(path.sep).filter(Boolean)
      const tag = pathSegments[0]

      return [
        // учитываем только файлы, находящиеся в папках статей
        ['html', 'css', 'js', 'tools'].includes(tag),
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
