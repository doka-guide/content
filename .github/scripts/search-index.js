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

const buildSearchOject = (contentObject) => {
  const tokenizer = new natural.WordTokenizer()
  const TfIdf = natural.TfIdf
  const tfidf = new TfIdf()
  const accumulator = []
  const stems = []
  const titles = []
  for (const page of contentObject) {
    const tokens = []
    if (page.title) {
      titles.push(page.title)
      tokens.push(...tokenizer.tokenize(page.title))
    }
    if (page.keywords) {
      tokens.push(...tokenizer.tokenize(page.keywords.join(' ')))
    }
    if (page.content) {
      const joinedContent = page.content.join('\n')
      tokens.push(...tokenizer.tokenize(joinedContent))
      tfidf.addDocument(joinedContent)
    }
    accumulator.push(...new Set(tokens))
    for (const t of tokens) {
      stems.push(natural.PorterStemmerRu.stem(t))
    }
  }

  return {
    length: contentObject.length,
    searchSet: [...new Set(accumulator)],
    stems: [...new Set(stems)],
    titles: titles,
    tfidf: tfidf
  }
}

const buildSearchIndex = (searchObject) => {
  const searchIndex = {}
  for (const term of searchObject.searchSet) {
    const raw = []
    for (let i = 0; i < searchObject.length; i++) {
      const freq = searchObject.tfidf.tfidf(term, i)
      if (freq > 0) {
        raw.push({ d: i, f: freq })
      }
    }
    searchIndex[term.toLowerCase()] = raw.sort((a, b) => b.f - a.f).slice(0, TERM_FREQ_PREFIX_LIMIT)
  }
  return searchIndex
}

const buildSearchTree = (searchObject, searchIndex) => {
  const searchTree = {}
  for (let stem of searchObject.stems) {
    const processedTree = {}
    for (const term of searchObject.searchSet) {
      if (typeof term === 'string') {
        const processedTerm = term.toLowerCase()
        if (processedTerm.includes(stem)) {
          processedTree[processedTerm] = searchIndex[processedTerm]
        }
      }
    }
    searchTree[stem] = processedTree
  }
  return searchTree
}

const contentObject = buildContentObject(commonSearch)
const searchObject = buildSearchOject(contentObject)
const searchIndex = buildSearchIndex(searchObject)
const searchTree = buildSearchTree(searchObject, searchIndex)

exportObject(contentObject, 'search-content.json')
exportObject(searchTree, 'search-tree.json')
