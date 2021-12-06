const fs = require('fs')
const algoliaClient = require('algoliasearch')
const markdownIt = require('markdown-it')
const { parseHTML } = require('linkedom')

const md = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

const rawSearch = fs.readFileSync('search.json')
const commonSearch = JSON.parse(rawSearch)
const algoliaIndex = []

const stopCategories = [
  'people',
  'pages'
]

const patternsForEntities = {
  // Заголовки второго уровня
  header2: (document) => Array.from(document.querySelectorAll('h2')),

  // Заголовки третьего уровня
  header3: (document) => Array.from(document.querySelectorAll('h3')),

  // Заголовки четвёртого уровня
  header4: (document) => Array.from(document.querySelectorAll('h4')),

  // Ссылки
  links: (document) => Array.from(document.querySelectorAll('a')),

  // Подписи к картинкам
  images: (document) => Array.from(document.querySelectorAll('img'))
    .map(img => img.getAttribute('alt')),

  // Элементы списка
  lists: (document) => Array.from(document.querySelectorAll('li')),

  // Выделение полужирным шрифтом
  bold: (document) => Array.from(document.querySelectorAll('b, strong')),

  // Выделение наклонным шрифтом
  italic: (document) => Array.from(document.querySelectorAll('i, em')),

  // Блоки callout
  callouts: (document) => Array.from(document.querySelectorAll('aside')),

  // Параграфы
  paragraphs: (document) => Array.from(document.querySelectorAll('p')),
}


const getEntitiesFromContent = (text, patterns) => {
  text = text.replace(/---(.|\n)*?---\n/g, '') // Вырезаем мету
  const html = md.render(text)
  const { document } = parseHTML(html)
  const output = {}
  for (const field in patterns) {
    output[field] = patterns[field](document)
      .map(element => {
        if (typeof element === 'string') {
          return element
        } else {
          element.innerHTML = element.innerHTML
            .replace('<code>', '`')
            .replace('</code>', '`')
          return element.textContent
        }
      })
  }
  return output
}

const getPractice = (path) => {
  const output = []
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path, { encoding: 'utf8' } )
    for (const practice of files) {
      const fileName = path + practice
      const content = fs.readFileSync(fileName, { encoding: 'utf8', flag: 'r' })
      output.push(getEntitiesFromContent(content, patternsForEntities))
    }
  }
  return output
}

for (const fileName in commonSearch) {
  const content = fs.readFileSync(fileName, { encoding: 'utf8', flag: 'r' })
  if (new RegExp(stopCategories.join('|')).test(fileName)) {
    console.log(`Файл ${fileName} не будет добавлен в индекс.`)
  } else {
    const object = {
      objectID: fileName.replace('index.md', ''),
      title: commonSearch[fileName].title,
      keywords: commonSearch[fileName].summary,
      tags: commonSearch[fileName].tags,
      category: fileName.replace(/\/.+/g, ''),
      cover: {},
      content: getEntitiesFromContent(content, patternsForEntities),
      practice: getPractice(fileName.replace('index.md', 'practice/'))
    }
    if (typeof commonSearch[fileName].cover !== 'undefined' && typeof commonSearch[fileName].cover === 'object') {
      object.cover = commonSearch[fileName].cover
      if (typeof object.cover.desktop !== 'undefined' && typeof object.cover.desktop === 'string') {
        object.cover.desktop = object.objectID + object.cover.desktop
      }
      if (typeof object.cover.mobile !== 'undefined' && typeof object.cover.mobile === 'string') {
        object.cover.mobile = object.objectID + object.cover.mobile
      }
    }
    algoliaIndex.push(object)
  }
}

const client = algoliaClient(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)
const index = client.initIndex(process.env.ALGOLIA_APP_INDEX)

index.saveObjects(algoliaIndex, { autoGenerateObjectIDIfNotExist: true })
