const path = require('path')
const os = require('os')
const fs = require('fs')
const { promisify } = require('util')
const { exec } = require('child_process')

// получение id последнего коммита
const lastCommitId = 'git log --diff-filter=AMCR --format="%H" -n 1'

// получение изменённых и добавленных файлов последнего коммита
const gitCommand = `git diff-tree --no-commit-id --name-only -r $(echo $(${lastCommitId}))`

const tags = ['html', 'css', 'js', 'tools']

async function main() {
  const { stdout } = await promisify(exec)(gitCommand)

  const filePaths = stdout.split(os.EOL)
    .map(filePath => filePath.trim())
    .filter(Boolean)
    // учитываем только файлы, находящиеся в папках статей
    .filter(filePath => {
      const tag = filePath.split(path.sep).filter(Boolean)[0]
      return tags.includes(tag)
    })
    // возвращаем путь до папки самой статьи
    .map(filePath => {
      const [tag, articleName] = filePath.split(path.sep).filter(Boolean)
      return [tag, articleName].join(path.sep)
    });

  // используем Set, так как могут быть дубли в путях
  const filePathsSet = new Set(filePaths)
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

    indexData['updatedAt'] = new Date()
    fs.writeFileSync(dataFilePath, JSON.stringify(indexData, null, 2))
  })
}

main()
