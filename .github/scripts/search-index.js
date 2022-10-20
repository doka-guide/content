const fs = require('fs')
const markdownIt = require('markdown-it')
const { parseHTML } = require('linkedom')
const { escape } = require('html-escaper')
const natural = require('natural')

const md = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

const rawSearch = fs.readFileSync('search-meta.json')
const commonSearch = JSON.parse(rawSearch)

const TERM_FREQ_PREFIX_LIMIT = 10
const stopCategories = [
  '^people',
  '^pages'
]

const exportObject = (json, fileName) => {
  fs.writeFileSync(`${fileName}`, JSON.stringify(json), 'utf8')
}

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

const buildContentObject = (commonSearch) => {
  const contentObject = []
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
      contentObject.push(object)
    }
  }
  return contentObject
}

const contentObject = buildContentObject(commonSearch)

exportObject(contentObject, 'search-content.json')
