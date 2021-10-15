const fs = require('fs')
const algoliaClient = require('algoliasearch')

const rawSearch = fs.readFileSync('search.json')
const commonSearch = JSON.parse(rawSearch)
const algoliaIndex = []

const stopCategories = [
  'people',
  'pages'
]

const patternsForEntities = {
  header2:    /## .+\n/g,                                 // Заголовки второго уровня
  header3:    /### .+\n/g,                                // Заголовки третьего уровня
  header4:    /#### .+\n/g,                               // Заголовки четвёртого уровня
  links:      /[ ]\[.+\]\(.\)/g,                          // Ссылки
  images:     /[!]\[.+\]\(.\)/g,                          // Подписи к картинкам
  lists:      /[1-9-] .+/g,                               // Элементы списка
  bold:       /\*\*(.|\n)*\*\*/g,                         // Выделение полужирным шрифтом
  italic:     /_((?![<>{}]).|\n)*_/g,                     // Выделение наклонным шрифтом
  callouts:   /:::(.|\n)+:::/g,                           // Блоки callout
  paragraphs: /^(?![#>\-*\d ])((?![#>\-*\d ]).+\n?)+/gm,  // Параграфы
}

const commonReplacement = /([#]+ |:::|callout |```|\*{2,2}|\n|_|\!\[|\[|\]|\([.:/a-z]+\))/g

const getEntitiesFromContent = (text, patterns) => {
  text = text.replace(/---(.|\n)*?---\n/g, '') // Вырезаем мету
  text = text.replace(/```(.|\n)*?```\n/g, '') // Вырезаем код
  const output = {}
  for (const field in patterns) {
    let array = text.match(patterns[field])
    if (array !== null && typeof array === 'object' && array.length > 0) {
      array = array.map(element => {
        return element.replace(commonReplacement, '')
      })
      output[field] = array
    } else {
      output[field] = []
    }
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
