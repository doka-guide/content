/*
Скрипт нужен для миграции с единого монорепозитория на выделенный репозиторий с контентом.
Он копирует статью из старого репозитория в новый, заменяет ссылки, копирует картинки и демки.

Запуск `node migrate.js` в папке проекта

По умолчанию скрипт думает, что папка со старым проектом называется `y-doka.site`
и она лежит на том же уровне, что и `content`. Если это не ок, пропиши путь в константе RELATIVE_DOKA_PATH
 */
const fs = require('fs')
const path = require('path')
const readline = require('readline')

RELATIVE_DOKA_PATH = path.join('../..','y-doka.site')

if (!fs.statSync(RELATIVE_DOKA_PATH).isDirectory()) {
  console.log(`Неверный относительный путь до старого репозитория. Указан ${RELATIVE_DOKA_PATH}`)
}

const rl = readline.createInterface(process.stdin, process.stdout)

rl.question('Вставь URL статьи:', (maybeUrl) => {
  let pathname
  try {
    const url = new URL(maybeUrl.trim())
    pathname = url.pathname.substring(1, url.pathname.endsWith('/') ? url.pathname.length - 1 : url.pathname.length)
  } catch (e) {
    console.error('Это не URL. Вставь полную ссылку с сайта. Например, http://y-doka.site/js/tools/bundlers')
  }

  const titleSlug = pathname.split('/').pop()
  const targetFolder = pathname
  console.log('\nКопирую контент...')
  const contentSrc = path.join(RELATIVE_DOKA_PATH,`src/posts/${pathname}.md`)
  if (!fs.existsSync(contentSrc)) console.error(`Файл со статьей не найден. ${contentSrc}`)
  fs.mkdirSync(targetFolder, { recursive: true })
  const content = fs.readFileSync(contentSrc, 'utf8')

  const captureImageRegexp = /!\[(.*?)\]\((\S+?)\)/ig
  let contentWithFixedImageLinks = content.replace(captureImageRegexp, (match, description, url) => {
    if (!path.isAbsolute(url)) {
      return match
    }

    const filename = url.split('/').pop()
    return `![${description}](images/${filename})`
  })
  contentWithFixedImageLinks = contentWithFixedImageLinks.replace(/desktop: '(\S+?)'/gi, (match, url) => {
    const filename = url.split('/').pop()
    return `desktop: 'images/${filename}'`
  })

  const [mainContent, practice] = contentWithFixedImageLinks.split('## В работе')
  if (practice.length > 0) {
    console.log('Есть раздел «В работе», выношу в отдельный файл...')
    fs.mkdirSync(path.join(targetFolder, 'practice'), {recursive: true})
    fs.writeFileSync(path.join(targetFolder, 'practice', 'author.md'), practice.trim() + '\n')
  }

  fs.writeFileSync(path.join(targetFolder, 'index.md'), mainContent.trim() + '\n')

  console.log('Готово\n')

  console.log('Копирую изображения')
  const imageDirs = [
    path.join(RELATIVE_DOKA_PATH,`src/assets/images/posts/${titleSlug}/`),
    path.join(RELATIVE_DOKA_PATH,`src/assets/images/posts/js/${titleSlug}/`)
  ]

  const imageSrc = imageDirs.find(path => fs.existsSync(path) && fs.statSync(path).isDirectory())
  if (imageSrc === undefined) {
    console.log('изображений не найдено')
  } else {
    const imageTarget = path.join(targetFolder, '/images/')
    const isCopied = copyRecursiveSync(imageSrc, imageTarget)
    console.log(isCopied ? 'Готово' : `"${imageSrc}" не существует, либо это не папка`)
  }
  console.log()

  console.log('Копирую демки')
  const demoSrc = path.join(RELATIVE_DOKA_PATH, `/src/demos/${titleSlug}/`)
  const demoTarget = path.join(targetFolder,'/demos/')
  const isCopied = copyRecursiveSync(demoSrc, demoTarget)
  console.log(isCopied ? 'Готово' : 'Демок нет')
  console.log()

  console.log('☝️ Скрипт только помогает переезжать. Он не умеет чинить демки и выносить разделы «в работе».\n' +
    'Проверь, что все ок по чеклисту: https://www.notion.so/praktikum/a96980fadbf44b028bd32d9ae49ef0e9')

  process.exit(0)
})

function copyRecursiveSync(srcFolder, targetFolder) {
  if (!fs.existsSync(srcFolder) || !fs.statSync(srcFolder).isDirectory()) {
    return false
  }

  fs.mkdirSync(targetFolder, { recursive: true })
  fs.readdirSync(srcFolder).forEach(file => {
    console.log(`${srcFolder}${file} → ${targetFolder}${file}`)
    fs.copyFileSync(`${srcFolder}${file}`, `${targetFolder}${file}`)
  })
  return true
}
