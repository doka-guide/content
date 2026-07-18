const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const { slugify } = require('transliteration')

const ROOT = process.cwd()

const SECTION_ROOTS = new Set([
  'a11y',
  'css',
  'html',
  'js',
  'tools',
  'recipes',
  'interviews',
  'people',
  'docs',
])

const errors = new Set()

const args = process.argv.slice(2).filter((arg) => !arg.startsWith('--'))
const baseSha = process.env.BASE_SHA || ''

const changedFiles = args.length > 0
  ? args
  : (process.env.CHANGED_FILES || '')
    .split(/[,\s]+/)
    .map((file) => file.trim())
    .filter(Boolean)

function fail(message) {
  if (errors.has(message)) {
    return
  }
  errors.add(message)
  console.error(`✖ ${message}`)
}

function readFile(filePath) {
  const absolutePath = path.join(ROOT, filePath)
  if (!fs.existsSync(absolutePath)) {
    return null
  }
  return fs.readFileSync(absolutePath, 'utf8')
}

function readFileAtBase(filePath) {
  if (!baseSha) {
    return null
  }

  return runGit(['show', `${baseSha}:${filePath}`], { onError: () => null })
}

// затираем регион пробелами, сохраняя переносы строк, чтобы не съехали
// смещения символов и номера строк оставались корректными
function maskRegion(match) {
  return match.replace(/[^\n]/g, ' ')
}

function maskNonLinkRegions(content) {
  return content
    .replace(/^---\n[\s\S]*?\n---/, maskRegion)
    .replace(/^```[^\n]*\n[\s\S]*?^```/gm, maskRegion)
    .replace(/^~~~[^\n]*\n[\s\S]*?^~~~/gm, maskRegion)
    .replace(/`[^`\n]+`/g, maskRegion)
}

function cleanHeadingText(text) {
  // прячем код в бэктиках от чистки HTML-тегов ниже, иначе `<td>` в заголовке станет пустой строкой
  const codeSpans = []
  const withPlaceholders = text.replace(/`([^`]+)`/g, (_, code) => {
    codeSpans.push(code)
    return `\u0000${codeSpans.length - 1}\u0000`
  })

  const cleaned = withPlaceholders
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/\{#[^}]+\}/g, '')

  return cleaned
    .replace(/\u0000(\d+)\u0000/g, (_, i) => codeSpans[Number(i)])
    .trim()
}

function addAnchorWithDedupe(anchors, headingHashMap, headingText) {
  if (!headingText) {
    return
  }

  const id = slugify(headingText)
  if (headingHashMap[id] >= 0) {
    headingHashMap[id] += 1
  } else {
    headingHashMap[id] = 0
  }

  const postfix = headingHashMap[id] > 0 ? `-${headingHashMap[id]}` : ''
  anchors.add(id + postfix)
}

function extractHeadingAnchors(content) {
  const anchors = new Set()
  const headingHashMap = {}
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n?/)
  const frontmatter = frontmatterMatch ? frontmatterMatch[1] : ''
  const body = frontmatterMatch ? content.slice(frontmatterMatch[0].length) : content
  const headingRegex = /^(#{2,6})\s+(.+)$/gm
  let match

  while ((match = headingRegex.exec(body)) !== null) {
    addAnchorWithDedupe(anchors, headingHashMap, cleanHeadingText(match[2]))
  }

  // хабы разделов (html/index.md и т. п.) без ## заголовков — структура задаётся YAML groups[].name
  const groupNameRegex = /^\s*-\s*name:\s*['"]?(.+?)['"]?\s*$/gm
  while ((match = groupNameRegex.exec(frontmatter)) !== null) {
    addAnchorWithDedupe(anchors, headingHashMap, match[1].trim())
  }

  const legacyAnchorRegex = /<a\s+name=["']([^"']+)["']/gi
  while ((match = legacyAnchorRegex.exec(body)) !== null) {
    anchors.add(match[1])
  }

  return anchors
}

// вопрос интервью через related: привязывается к статье и рендерит на ней
// блок «На собеседовании» с якорем #na-sobesedovanii (см. doc.11tydata.js)
function buildQuestionsByArticle() {
  const articlesWithQuestions = new Set()
  const interviewsRoot = path.join(ROOT, 'interviews')

  if (!fs.existsSync(interviewsRoot)) {
    return articlesWithQuestions
  }

  for (const entry of fs.readdirSync(interviewsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue
    }

    const content = readFile(path.join('interviews', entry.name, 'index.md'))
    if (!content) {
      continue
    }

    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    const relatedBlock = frontmatterMatch
      && frontmatterMatch[1].match(/^related:\n((?:[ \t]*-[ \t]*.+\n?)*)/m)
    if (!relatedBlock) {
      continue
    }

    const relatedLines = relatedBlock[1].match(/^[ \t]*-[ \t]*(.+)$/gm) || []
    for (const line of relatedLines) {
      const relatedPath = line.replace(/^[ \t]*-[ \t]*/, '').trim().replace(/^\/+|\/+$/g, '')
      if (relatedPath) {
        articlesWithQuestions.add(relatedPath)
      }
    }
  }

  return articlesWithQuestions
}

const articlesWithQuestions = buildQuestionsByArticle()

function getPersonName(nick, readFn = readFile) {
  const personFile = `people/${nick}/index.md`
  const content = readFn(personFile)
  if (!content) {
    return nick
  }

  const nameMatch = content.match(/^name:\s*['"]?(.+?)['"]?\s*$/m)
  return nameMatch ? nameMatch[1].trim() : nick
}

function listPracticeNicks(articleDir, readFn = readFile) {
  const practiceDir = path.join(articleDir, 'practice')
  const absoluteDir = path.join(ROOT, practiceDir)

  if (readFn === readFile) {
    if (!fs.existsSync(absoluteDir)) {
      return []
    }
    return fs.readdirSync(absoluteDir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''))
  }

  const output = runGit(['ls-tree', '--name-only', `${baseSha}:${practiceDir}`], {
    onError: () => null,
  })
  if (output === null) {
    return []
  }

  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

function extractArticleAnchors(articleIndexPath, readFn = readFile) {
  const anchors = new Set()
  const content = readFn(articleIndexPath)

  if (content) {
    for (const anchor of extractHeadingAnchors(content)) {
      anchors.add(anchor)
    }
  }

  const articleDir = path.dirname(articleIndexPath)
  const nicks = listPracticeNicks(articleDir, readFn)

  if (nicks.length > 0) {
    anchors.add('na-praktike')
    anchors.add('practices')

    for (const nick of nicks) {
      anchors.add(`practices-${nick}`)
      const personName = getPersonName(nick, readFn)
      anchors.add(slugify(`${personName} советует`))
    }
  }

  if (articlesWithQuestions.has(articleDir)) {
    anchors.add('na-sobesedovanii')
  }

  return anchors
}

function buildPagesLocationMap() {
  const map = new Map()
  const pagesRoot = path.join(ROOT, 'pages')

  if (!fs.existsSync(pagesRoot)) {
    return map
  }

  for (const entry of fs.readdirSync(pagesRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue
    }

    const indexPath = path.join('pages', entry.name, 'index.md')
    const content = readFile(indexPath)
    if (!content) {
      continue
    }

    const locationMatch = content.match(/^location:\s*['"]?([^'"\n]+)['"]?\s*$/m)
    const location = locationMatch
      ? locationMatch[1].trim().replace(/\/?$/, '/')
      : `/${entry.name}/`

    map.set(location, indexPath)
  }

  return map
}

const pagesByLocation = buildPagesLocationMap()

function normalizeDokaUrl(url) {
  if (url.startsWith('https://doka.guide')) {
    return url.replace(/^https:\/\/doka\.guide/, '') || '/'
  }
  return url
}

function splitUrl(url) {
  const [pathname, hash = ''] = url.split('#')
  return {
    pathname: pathname || '',
    hash: hash || '',
  }
}

// платформенные роуты без index.md в контент-репо (корень сайта, /people/, /subscribe/ и т. п.)
const PLATFORM_ROUTE = Symbol('platform-route')
const PLATFORM_ROUTES = new Set(['/', '/people/', '/subscribe/'])

function resolveArticleFile(pathname) {
  let cleanPath = pathname.split('?')[0]
  if (!cleanPath.startsWith('/')) {
    return null
  }

  cleanPath = cleanPath.replace(/\/+/g, '/')
  if (!cleanPath.endsWith('/')) {
    cleanPath += '/'
  }

  if (PLATFORM_ROUTES.has(cleanPath)) {
    return PLATFORM_ROUTE
  }

  if (pagesByLocation.has(cleanPath)) {
    return pagesByLocation.get(cleanPath)
  }

  const parts = cleanPath.slice(1, -1).split('/').filter(Boolean)
  if (parts.length === 0) {
    return null
  }

  const [section] = parts
  if (!SECTION_ROOTS.has(section)) {
    return PLATFORM_ROUTE
  }

  if (parts.length === 1) {
    const indexPath = path.join(section, 'index.md')
    return readFile(indexPath) !== null ? indexPath : null
  }

  const indexPath = path.join(...parts, 'index.md')
  if (readFile(indexPath) !== null) {
    return indexPath
  }

  return null
}

function extractLinks(content) {
  const links = []
  // маскируем фронтматтер и код-блоки, но длина строки сохраняется,
  // поэтому match.index указывает на позицию в исходном content
  const body = maskNonLinkRegions(content)

  // текст ссылки для сообщений берём из content, а не body: в body он мог быть замаскирован
  const rawAt = (index, length) => content.slice(index, index + length)

  // вторая ветка — URL в угловых скобках, может содержать «)»: [текст](<url_с_(скобками)>)
  const markdownLinkRegex = /!?\[([^\]]*)\]\(\s*<([^>]+)>\s*\)|!?\[([^\]]*)\]\(([^)\s]+)\)/g
  let match
  while ((match = markdownLinkRegex.exec(body)) !== null) {
    const url = match[2] !== undefined ? match[2] : match[4]
    links.push({
      url: url.trim(),
      raw: rawAt(match.index, match[0].length),
      index: match.index,
    })
  }

  const attrRegex = /\b(?:href|src)=["']([^"']+)["']/gi
  while ((match = attrRegex.exec(body)) !== null) {
    links.push({
      url: match[1].trim(),
      raw: rawAt(match.index, match[0].length),
      index: match.index,
    })
  }

  return links
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split('\n').length
}

function shouldSkipUrl(url) {
  if (!url || url === '#') {
    return true
  }
  if (url.startsWith('mailto:') || url.startsWith('tel:')) {
    return true
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return !url.startsWith('https://doka.guide')
  }
  return false
}

function resolveRelativeAsset(fromFile, url) {
  const { pathname } = splitUrl(url)
  const cleanPathname = pathname.split('?')[0]
  if (!cleanPathname || cleanPathname.startsWith('/')) {
    return null
  }

  const baseDir = path.dirname(fromFile)
  return path.normalize(path.join(baseDir, cleanPathname))
}

function checkAssetExists(relativePath) {
  const absolutePath = path.join(ROOT, relativePath)
  return fs.existsSync(absolutePath)
}

function articlePathnameFromFile(filePath) {
  if (filePath.startsWith('pages/')) {
    const content = readFile(filePath) || readFileAtBase(filePath)
    const locationMatch = content && content.match(/^location:\s*['"]?([^'"\n]+)['"]?\s*$/m)
    if (locationMatch) {
      return locationMatch[1].trim().replace(/\/?$/, '/')
    }
    const slug = path.basename(path.dirname(filePath))
    return `/${slug}/`
  }

  const dir = path.dirname(filePath).replace(/\\/g, '/')
  return `/${dir}/`
}

// на страницах интервью id заголовков генерятся из <p> вопроса, а ответы
// рендерятся внутри страницы вопроса и своего URL не имеют — модель якорей
// у этого раздела другая, поэтому его материалы обрабатываем отдельно
function isInterviewPath(filePath) {
  return filePath.startsWith('interviews/')
}

function isArticleIndex(filePath) {
  return (
    /(^|\/)index\.md$/.test(filePath) &&
    !filePath.startsWith('docs/') &&
    !isInterviewPath(filePath)
  )
}

function isPracticeFile(filePath) {
  return /\/practice\/[^/]+\.md$/.test(filePath)
}

function articleIndexFromPractice(filePath) {
  // css/color/practice/foo.md → css/color/index.md
  return path.join(path.dirname(path.dirname(filePath)), 'index.md')
}

function checkForwardLinks(filePath) {
  const content = readFile(filePath)
  if (!content) {
    return
  }

  const links = extractLinks(content)

  for (const link of links) {
    const url = normalizeDokaUrl(link.url)
    if (shouldSkipUrl(url)) {
      continue
    }

    const line = lineNumberAt(content, link.index)

    if (!url.startsWith('/') && !url.startsWith('#')) {
      const assetPath = resolveRelativeAsset(filePath, url)
      if (!assetPath) {
        continue
      }

      if (!checkAssetExists(assetPath)) {
        fail(`${filePath}:${line} → не найден файл «${assetPath}» (ссылка ${link.raw})`)
      }
      continue
    }

    if (url.startsWith('#')) {
      if (isInterviewPath(filePath)) {
        continue
      }
      const anchors = extractArticleAnchors(
        isPracticeFile(filePath) ? articleIndexFromPractice(filePath) : filePath
      )
      const hash = url.slice(1)
      if (hash && !anchors.has(hash)) {
        fail(`${filePath}:${line} → якорь #${hash} не найден в текущем материале`)
      }
      continue
    }

    const { pathname, hash } = splitUrl(url)
    const targetFile = resolveArticleFile(pathname)

    if (targetFile === PLATFORM_ROUTE) {
      continue
    }

    if (!targetFile) {
      fail(`${filePath}:${line} → нет материала по пути «${pathname}» (ссылка ${link.raw})`)
      continue
    }

    // до раздела интервью добрались только по существованию файла:
    // якоря там формируются не из ## заголовков, проверять их нечем
    if (!hash || isInterviewPath(targetFile)) {
      continue
    }

    const anchors = extractArticleAnchors(targetFile)
    if (!anchors.has(hash)) {
      fail(
        `${filePath}:${line} → в «${targetFile}» нет якоря #${hash} (ссылка ${link.raw})`
      )
    }
  }
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`
}

// общий раннер для git-подкоманд: аргументы всегда экранируются через
// shellQuote, а обработка «ожидаемых» ошибок (нет объекта, нет совпадений)
// отдаётся вызывающей стороне через onError
function runGit(gitArgs, { onError } = {}) {
  const command = `git ${gitArgs.map(shellQuote).join(' ')}`
  try {
    return execSync(command, {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
      stdio: ['pipe', 'pipe', 'pipe'],
    })
  } catch (error) {
    if (onError) {
      return onError(error)
    }
    throw error
  }
}

function gitGrepFixed(pattern) {
  const output = runGit(['grep', '-n', '-F', '-e', pattern, '--', '*.md'], {
    onError: (error) => {
      if (error.status === 1) {
        return ''
      }
      throw error
    },
  })
  return output.trim().split('\n').filter(Boolean)
}

function parseGitGrepLine(line) {
  const match = line.match(/^([^:]+):(\d+):(.*)$/)
  if (!match) {
    return null
  }
  return {
    filePath: match[1],
    line: Number(match[2]),
    text: match[3],
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// git grep -F ищет подстроку, поэтому «/js/closures» матчит «/js/closures-guide»,
// а «#zamykanie» — «#zamykanie-2». Проверяем, что за паттерном нет символа,
// который продолжал бы slug (буква, цифра или дефис)
function hasBoundaryMatch(text, pattern) {
  const regex = new RegExp(`${escapeRegExp(pattern)}(?![a-z0-9-])`)
  return regex.test(text)
}

function checkReverseAnchors(articleIndexPath, removedAnchors) {
  if (removedAnchors.size === 0) {
    return
  }

  const pathname = articlePathnameFromFile(articleIndexPath)
  const pathnameNoSlash = pathname.replace(/\/$/, '')

  for (const anchor of removedAnchors) {
    const patterns = [
      `${pathname}#${anchor}`,
      `${pathnameNoSlash}#${anchor}`,
      `https://doka.guide${pathname}#${anchor}`,
      `https://doka.guide${pathnameNoSlash}#${anchor}`,
    ]

    for (const pattern of patterns) {
      for (const line of gitGrepFixed(pattern)) {
        const hit = parseGitGrepLine(line)
        if (!hit || !hasBoundaryMatch(hit.text, pattern)) {
          continue
        }
        fail(
          `${hit.filePath}:${hit.line} → ссылка на удалённый якорь ${pattern} (якорь пропал из ${articleIndexPath})`
        )
      }
    }
  }
}

function checkReverseArticlePath(articleIndexPath) {
  const pathname = articlePathnameFromFile(articleIndexPath)
  const pathnameNoSlash = pathname.replace(/\/$/, '')
  const patterns = [
    pathname,
    pathnameNoSlash,
    `https://doka.guide${pathname}`,
    `https://doka.guide${pathnameNoSlash}`,
  ]

  for (const pattern of patterns) {
    for (const line of gitGrepFixed(pattern)) {
      const hit = parseGitGrepLine(line)
      if (!hit || hit.filePath === articleIndexPath) {
        continue
      }

      if (!hasBoundaryMatch(hit.text, pattern)) {
        continue
      }

      if (!/\]\([^)]*\)|href=["'][^"']*|https:\/\/doka\.guide|related:/i.test(hit.text)) {
        continue
      }

      fail(
        `${hit.filePath}:${hit.line} → ссылка на удалённый материал ${pattern} (удалён ${articleIndexPath})`
      )
    }
  }
}

function unique(files) {
  return [...new Set(files.filter(Boolean))]
}

function main() {
  const markdownFiles = unique(
    changedFiles.filter((file) => file.endsWith('.md'))
  )

  if (markdownFiles.length === 0) {
    console.log('Нет изменённых Markdown-файлов для проверки ссылок')
    return
  }

  console.log(`Проверяю ссылки в ${markdownFiles.length} файлах…`)

  for (const filePath of markdownFiles) {
    if (readFile(filePath)) {
      checkForwardLinks(filePath)
    }
  }

  const articlePaths = new Set()

  for (const filePath of markdownFiles) {
    if (isArticleIndex(filePath)) {
      articlePaths.add(filePath)
    } else if (isPracticeFile(filePath)) {
      articlePaths.add(articleIndexFromPractice(filePath))
    }
  }

  for (const articleIndexPath of articlePaths) {
    const existsNow = readFile(articleIndexPath) !== null
    const existedBefore = baseSha ? readFileAtBase(articleIndexPath) !== null : false

    if (!existsNow && existedBefore) {
      checkReverseArticlePath(articleIndexPath)
      continue
    }

    if (!existsNow || !baseSha) {
      continue
    }

    const oldAnchors = extractArticleAnchors(articleIndexPath, readFileAtBase)
    const newAnchors = extractArticleAnchors(articleIndexPath, readFile)
    const removedAnchors = new Set(
      [...oldAnchors].filter((anchor) => !newAnchors.has(anchor))
    )

    if (removedAnchors.size > 0) {
      console.log(
        `В ${articleIndexPath} пропали якоря: ${[...removedAnchors].join(', ')}`
      )
      checkReverseAnchors(articleIndexPath, removedAnchors)
    }
  }

  if (errors.size > 0) {
    console.error(`\nНайдено ошибок: ${errors.size}`)
    process.exit(1)
  }

  console.log('Битых внутренних ссылок не найдено')
}

main()
