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

const pathToFeaturedSettingsFile = path.join(process.cwd(), 'settings', 'featured.md')

const fileContent = fs.readFileSync(pathToFeaturedSettingsFile, {
  encoding: 'utf-8'
})

const frontMatterInfo = frontMatter(fileContent)

const { pinned, suggested } = frontMatterInfo.data

if (!(pinned?.length && suggested?.length)) {
  throw new Error('Необходимо указать статьи файле `featured.md`')
}

const newSuggested = shuffle(suggested)

frontMatterInfo.data.result = [
  ...new Set([
    ...pinned,
    ...newSuggested
  ])
]

fs.writeFileSync(pathToFeaturedSettingsFile, frontMatterInfo.stringify(), {
  encoding: 'utf-8'
})
