const path = require('path')
const fs = require('fs/promises')
const os = require('os')
const { promisify } = require('util')
const child_process = require('child_process')

const exec = promisify(child_process.exec)

const contentDirectories = ['css', 'js', 'tools']

const createdAtField = 'createdAt'
const updatedAtField = 'updatedAt'

const indexFileName = 'index.11tydata.json'

async function getSubDirectoryPaths (parentPath) {
  const dirs = await fs.readdir(parentPath, { withFileTypes: true })
  return dirs
    .filter(dir => dir.isDirectory())
    .map(dir => path.join(parentPath, dir.name))
}

async function getArticleDirs () {
  const readDirPromises = contentDirectories.map((parentName) =>
    getSubDirectoryPaths(parentName)
  )
  const dirNames = await Promise.all(readDirPromises)
  return dirNames.flat()
}

async function getUpdatedTime (path) {
  // Команда возвращает дату последнего коммита для указанного объекта (файла или папки) или пустоту, при отсутствии файла
  const command = `git log -1 --pretty=\"format:%ci\" -- ${path}`
  const { stdout } = await exec(command)
  const updatedTime = stdout ? new Date(stdout) : null
  return {
    path,
    updatedTime
  }
}

async function getDirectoryInfo (dirPath) {
  const indexFilePath = path.join(dirPath, indexFileName)
  const [dirInfo, indexFileInfo] = await Promise.all([
    getUpdatedTime(dirPath),
    getUpdatedTime(indexFilePath)
  ])
  return {
    dir: dirInfo,
    indexFile: {
      ...indexFileInfo,
      exists: indexFileInfo.updatedTime !== null
    }
  }
}

function getIndexContent (content) {
  return JSON.stringify(content, null, 2) + '\n'
}

async function createInfoFile (file, date) {
  await fs.writeFile(file, getIndexContent({ [createdAtField]: date, [updatedAtField]: date }))
  return `Создан индекс ${file}`
}

async function updateInfoFile (file, date) {
  const content = await fs.readFile(file)
  const existsFileContent = JSON.parse(content.toString()) || {}
  if (!(createdAtField in existsFileContent)) {
    existsFileContent[createdAtField] = date
  }
  await fs.writeFile(file, getIndexContent({ ...existsFileContent, [updatedAtField]: date }))
  return `Обновлен индекс ${file}`
}

async function updateDates () {
  const dirs = await getArticleDirs()
  const dirDatesPromises = dirs.map((path) => getDirectoryInfo(path))
  const dirDates = await Promise.all(dirDatesPromises)
  const updatePromises = dirDates
    .filter(({ dir, indexFile }) => !indexFile.exists || indexFile.updatedTime < dir.updatedTime)
    .map(({ indexFile, dir }) => {
      if (indexFile.exists) {
        return updateInfoFile(indexFile.path, dir.updatedTime)
      } else {
        return createInfoFile(indexFile.path, dir.updatedTime)
      }
    })

  const log = await Promise.all(updatePromises)

  console.log(log.join(os.EOL))
}

updateDates()
