const fs = require('fs')
const algoliaClient = require('algoliasearch')
const markdownIt = require('markdown-it')
const { parseHTML } = require('linkedom')
const { escape } = require('html-escaper')

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

const getEntitiesFromContent = (text) => {
  text = text.replace(/---(.|\n)*?---\n/g, '') // Вырезаем мету
  const html = md.render(text)
  const { document } = parseHTML(html)

  const output = Array.from(document.children)
    .map(element => {
      return escape(element.textContent)
    })
    .filter(Boolean)

  return output
}

const getPractice = (path) => {
  if (fs.existsSync(path)) {
    const practices = fs.readdirSync(path, { encoding: 'utf8' } )
    return practices
      .flatMap(practice => {
        const fileName = path + practice
        const content = fs.readFileSync(fileName, { encoding: 'utf8', flag: 'r' })
        return getEntitiesFromContent(content)
      })
  }

  return []
}

for (const fileName in commonSearch) {
  const content = fs.readFileSync(fileName, {
    encoding: 'utf8',
    flag: 'r'
  })

  if (new RegExp(stopCategories.join('|')).test(fileName)) {
    console.log(`Файл ${fileName} не будет добавлен в индекс.`)
  } else {
    const contentEntities = getEntitiesFromContent(content)
    const practicesEntities = getPractice(fileName.replace('index.md', 'practice/'))

    contentEntities.push(...practicesEntities)

    const description = commonSearch[fileName].description
    if (description) {
      const descriptionHTML = md.render(description)
      const { document } = parseHTML(descriptionHTML)
      const descriptionText = Array.from(document.children)
        .map(element => element.textContent)
        .join('')
      contentEntities.unshift(escape(descriptionText))
    }

    const object = {
      objectID: fileName.replace('index.md', ''),
      title: escape(commonSearch[fileName].title || ''),
      keywords: commonSearch[fileName].keywords,
      tags: commonSearch[fileName].tags,
      category: fileName.replace(/\/.+/g, ''),
      content: contentEntities,
    }
    algoliaIndex.push(object)
  }
}

const client = algoliaClient(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)
const index = client.initIndex(process.env.ALGOLIA_APP_INDEX)

index.replaceAllObjects(algoliaIndex)
