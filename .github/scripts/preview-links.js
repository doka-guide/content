// Блок «Затронутые материалы» в заметке превью.
// Тесты: node --test .github/scripts/preview-links.test.js

// Раньше адреса собирал awk в самом воркфлоу, и брал он только
// `раздел/слаг/index.md`. Пулреквест, который правил совет «На практике» или
// демку, получал заметку без единой ссылки — так вышло с #6194. Здесь у каждого
// вида файлов своя ссылка: совет ведёт на свой якорь в статье, демка — на свою
// страницу, вопрос с собеседования — в статьи, к которым он привязан.
//
// Скрипт берётся из ветки по умолчанию, а файлы пулреквеста только читает как
// данные: чужой код здесь не выполняется.

const fs = require('node:fs')
const path = require('node:path')

// Разделы, где у материала своя страница `/раздел/слаг/`.
const DOC_SECTIONS = new Set(['html', 'css', 'js', 'a11y', 'tools', 'recipes'])
// Разделы, где папка раздела в адрес не попадает: `pages/about/` → `/about/`.
const FLAT_SECTIONS = new Set(['pages', 'specials'])

// Описание пулреквеста ограничено 65 536 символами. Пулреквест, который правит
// сотню статей разом, без лимита съел бы его целиком.
const LIMIT = 50

const IMAGE_RE = /\.(png|jpe?g|gif|webp|avif|svg)$/i
const VIDEO_RE = /\.(mp4|webm|mov)$/i

// Порядок пометок внутри строки статьи.
const KIND_ORDER = ['practice', 'demo', 'question', 'answer', 'images', 'video', 'other']

// Имя папки задаёт автор пулреквеста. Перевод строки тоже вычищается: блок
// уходит в $GITHUB_OUTPUT одной строкой, и лишний перевод открыл бы запись
// чужого выхода.
const escapeHtml = (value) =>
  String(value)
    .replace(/[\r\n]+/g, ' ')
    .replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])

const assetKind = (name) => {
  if (IMAGE_RE.test(name)) return { kind: 'images', label: 'картинки' }
  if (VIDEO_RE.test(name)) return { kind: 'video', label: 'видео' }
  return { kind: 'other', label: 'другие файлы' }
}

// Список `related` из фронтматтера вопроса: и столбиком, и в квадратных скобках.
const parseRelated = (text) => {
  // BOM в начале файла Eleventy срезает сам, а регулярка без этого не видит
  // фронтматтер: так «терялся» related у polyfill-promise-allsettled.
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec((text || '').replace(/^\uFEFF/, ''))
  if (!frontmatter) return []
  const lines = frontmatter[1].split(/\r?\n/)
  const clean = (item) => item.trim().replace(/^['"]|['"]$/g, '').replace(/^\/+|\/+$/g, '')

  const start = lines.findIndex((line) => /^related:/.test(line))
  if (start === -1) return []

  const inline = /^related:\s*\[(.*)\]\s*$/.exec(lines[start])
  if (inline) return inline[1].split(',').map(clean).filter(Boolean)

  const items = []
  for (const line of lines.slice(start + 1)) {
    const item = /^\s*-\s+(.+)$/.exec(line)
    if (!item) break
    items.push(clean(item[1]))
  }
  return items.filter(Boolean)
}

// Раскладывает файлы пулреквеста по страницам сайта.
//
// `files` — ответ `pulls/N/files`: `filename`, `status`, `previous_filename`.
// `readRelated(question)` возвращает `related` вопроса или null, если вопроса
// в ветке нет.
const collectPages = (files, readRelated, hasDemo = () => true) => {
  const pages = new Map()
  const orphans = new Map()

  const page = (url) => {
    if (!pages.has(url)) pages.set(url, { url, touched: false, gone: false, kept: false, parts: new Map() })
    return pages.get(url)
  }

  // Два флага вместо одного: удаление и появление одного и того же файла — это
  // переименование, и итог «удалили» только тогда, когда файл ушёл и ни одно
  // событие его не вернуло. `removed === null` — событие, которое на итог не
  // влияет: например, удалённые стили демки при живом `index.html`.
  const mark = (target, removed) => {
    if (removed === true) target.gone = true
    if (removed === false) target.kept = true
  }

  const touch = (url, removed) => {
    const item = page(url)
    item.touched = true
    mark(item, removed)
  }

  const addPart = (url, part, removed) => {
    const item = page(url)
    const key = `${part.kind}:${part.name || ''}`
    if (!item.parts.has(key)) item.parts.set(key, { ...part, gone: false, kept: false })
    mark(item.parts.get(key), removed)
  }

  const isRemoved = (target) => target.gone && !target.kept

  const addOrphan = (question, removed) => {
    const existing = orphans.get(question)
    orphans.set(question, existing === undefined ? removed : existing && removed)
  }

  const handleInterview = (segments, removed) => {
    // `interviews/index.md` и прочие файлы вне папки вопроса страниц не дают.
    if (segments.length < 3) return
    const question = segments[1]
    if (question === '..' || question === '.') return
    const isAnswer = segments[2] === 'answers' && segments[3]
    const related = readRelated(question)
    if (!related || related.length === 0) {
      addOrphan(question, removed || related === null)
      return
    }
    for (const doc of related) {
      const url = `/${doc}/`
      if (isAnswer) {
        const author = segments[3]
        addPart(
          url,
          { kind: 'answer', name: `${question}/${author}`, label: `ответ ${author} (${question})`, anchor: `#${question}-answers-${author}` },
          removed,
        )
      } else {
        addPart(url, { kind: 'question', name: question, label: `вопрос ${question}`, anchor: '#questions' }, removed)
      }
    }
  }

  const handle = (filename, removed) => {
    const segments = filename.split('/')
    const [section] = segments
    const last = segments[segments.length - 1]

    if (section === 'interviews') return handleInterview(segments, removed)

    // Страница раздела: `css/index.md` → `/css/`.
    if (DOC_SECTIONS.has(section) && segments.length === 2 && last === 'index.md') return touch(`/${section}/`, removed)

    if (DOC_SECTIONS.has(section) && segments.length >= 3) {
      const url = `/${section}/${segments[1]}/`
      const [, , sub] = segments

      if (segments.length === 3 && sub === 'index.md') return touch(url, removed)

      if (sub === 'practice' && segments.length === 4 && last.endsWith('.md')) {
        const author = last.replace(/\.md$/, '')
        return addPart(url, { kind: 'practice', name: author, label: `совет ${author}`, anchor: `#practices-${author}` }, removed)
      }

      // Демка — своя страница, файлы внутри неё (стили, картинки) ведут туда же.
      // Удалённой демка считается, только когда ушёл её `index.html`. У части
      // статей демка одна и лежит прямо в `demos/index.html`.
      if (sub === 'demos' && segments.length >= 4) {
        const single = segments.length === 4
        const name = single ? '' : segments[3]
        const dir = single ? 'demos/' : `demos/${name}/`
        const isEntry = single ? last === 'index.html' : segments.length === 5 && last === 'index.html'
        // Папка без своего `index.html` — общие картинки или шрифты демок,
        // а не страница: ссылка туда вела бы на 404.
        const part = { kind: 'demo', name, label: name ? `демка ${name}` : 'демка' }
        if (hasDemo(`${section}/${segments[1]}/${dir}`)) part.path = dir
        return addPart(url, part, removed && !isEntry ? null : removed)
      }

      return addPart(url, assetKind(last), removed)
    }

    if (section === 'people' && segments.length >= 3) {
      const url = `/people/${segments[1]}/`
      if (segments.length === 3 && last === 'index.md') return touch(url, removed)
      return addPart(url, assetKind(last), removed)
    }

    if (FLAT_SECTIONS.has(section) && segments.length >= 3) {
      const url = `/${segments[1]}/`
      if (segments.length === 3 && last === 'index.md') return touch(url, removed)
      return addPart(url, assetKind(last), removed)
    }
  }

  for (const file of files) {
    if (file.status === 'renamed' && file.previous_filename) handle(file.previous_filename, true)
    handle(file.filename, file.status === 'removed')
  }

  const finish = (item) => ({
    url: item.url,
    touched: item.touched,
    removed: isRemoved(item),
    parts: [...item.parts.values()].map(({ gone, kept, ...part }) => ({ ...part, removed: isRemoved({ gone, kept }) })),
  })

  return {
    pages: [...pages.values()].map(finish).sort((a, b) => a.url.localeCompare(b.url)),
    orphans: [...orphans.entries()].sort(([a], [b]) => a.localeCompare(b)),
  }
}

const link = (href, text) => `<a href="${escapeHtml(href)}">${escapeHtml(text)}</a>`

const renderPage = (item, domain) => {
  if (item.removed) return `<li>${escapeHtml(item.url)} — удалили</li>`

  const parts = [...item.parts]
    .sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind) || (a.name || '').localeCompare(b.name || ''))
    .map((part) => {
      if (part.removed) return `${escapeHtml(part.label)} — удалили`
      if (part.anchor) return link(`${domain}${item.url}${part.anchor}`, part.label)
      if (part.path) return link(`${domain}${item.url}${part.path}`, part.label)
      return escapeHtml(part.label)
    })
  if (item.touched && parts.length) parts.unshift('статья')

  const head = link(`${domain}${item.url}`, item.url)
  return parts.length ? `<li>${head}: ${parts.join(', ')}</li>` : `<li>${head}</li>`
}

const renderOrphan = ([question, removed]) =>
  removed
    ? `<li>вопрос ${escapeHtml(question)} — удалили</li>`
    : `<li>вопрос ${escapeHtml(question)} — не привязан к статьям, проверь <code>related</code></li>`

// Пустая строка, если показать нечего: у пулреквестов, которые правят только
// воркфлоу или словарь, раскрывашка была бы пустой.
const renderBlock = ({ pages, orphans }, domain) => {
  const items = [...pages.map((item) => renderPage(item, domain)), ...orphans.map(renderOrphan)]
  if (!items.length) return ''
  const shown = items.slice(0, LIMIT)
  if (items.length > LIMIT) shown.push(`<li>и ещё ${items.length - LIMIT} — полный список во вкладке Files changed</li>`)
  return `<details><summary>Затронутые материалы: ${items.length}</summary><ul>${shown.join('')}</ul></details>`
}

module.exports = { parseRelated, collectPages, renderBlock, LIMIT }

// Запуск из воркфлоу: FILES — JSON Lines из `pulls/N/files`, PATH_TO_CONTENT —
// чекаут ветки пулреквеста, DEPLOY_DOMAIN — адрес превью.
if (require.main === module) {
  const files = fs
    .readFileSync(process.env.FILES, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))
  const readRelated = (question) => {
    try {
      return parseRelated(fs.readFileSync(path.join(process.env.PATH_TO_CONTENT, 'interviews', question, 'index.md'), 'utf8'))
    } catch {
      return null
    }
  }
  const hasDemo = (dir) => fs.existsSync(path.join(process.env.PATH_TO_CONTENT, dir, 'index.html'))
  const collected = collectPages(files, readRelated, hasDemo)
  const block = renderBlock(collected, process.env.DEPLOY_DOMAIN)
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `list=${block}\n`)
  console.log(`Файлов: ${files.length}, страниц: ${collected.pages.length}, вопросов без статьи: ${collected.orphans.length}`)
}
