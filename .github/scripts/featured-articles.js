const path = require('node:path')
const fs = require('node:fs')
const frontMatter = require('gray-matter')

// случайное перемешивание массива по алгоритму "Тасование Фишера — Йетса"
function shuffle(originalArray) {
  const array = originalArray.slice()
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

// путь до файла с настройками
const pathToFeaturedSettingsFile = path.join(process.cwd(), 'settings', 'featured.md')

// названия полей
const FIELD_NAMES = {
  PINNED: 'pinned',
  READY: 'ready',
  ACTIVE: 'active'
}

const fileContent = fs.readFileSync(pathToFeaturedSettingsFile, {
  encoding: 'utf-8'
})

const frontMatterInfo = frontMatter(fileContent)

const {
  [FIELD_NAMES.PINNED]: pinned,
  [FIELD_NAMES.READY]: ready
} = frontMatterInfo.data

if (!(pinned?.length && ready?.length)) {
  throw new Error('Необходимо указать статьи файле `featured.md`')
}

frontMatterInfo.data[FIELD_NAMES.ACTIVE] = [
  ...new Set([
    ...pinned,
    ...shuffle(ready)
  ])
]

fs.writeFileSync(pathToFeaturedSettingsFile, frontMatterInfo.stringify(), {
  encoding: 'utf-8'
})
