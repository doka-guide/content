// node --test .github/scripts/preview-links.test.js
const test = require('node:test')
const assert = require('node:assert/strict')

const { parseRelated, collectPages, renderBlock, LIMIT } = require('./preview-links.js')

const D = 'https://content-1.dev.doka.guide'
const modified = (filename) => ({ filename, status: 'modified' })
const removed = (filename) => ({ filename, status: 'removed' })
const renamed = (from, to) => ({ filename: to, previous_filename: from, status: 'renamed' })

const related = { 'css-display': ['css/display'], 'css-grid': ['css/grid', 'css/display'], lonely: [] }
const readRelated = (question) => related[question] ?? null

// В чекауте нет папки `css/filter/demos/images/index.html`: это общие картинки демок.
const hasDemo = (dir) => !dir.endsWith('/images/')
const render = (files) => renderBlock(collectPages(files, readRelated, hasDemo), D)
const items = (files) => [...render(files).matchAll(/<li>(.*?)<\/li>/g)].map((match) => match[1])

test('статья ведёт на свою страницу', () => {
  assert.deepEqual(items([modified('css/display/index.md')]), [`<a href="${D}/css/display/">/css/display/</a>`])
})

test('совет и демки без статьи — как в #6194', () => {
  assert.deepEqual(
    items([
      modified('css/display/demos/fade/index.html'),
      modified('css/display/demos/inline-block-gap/index.html'),
      modified('css/display/practice/solarrust.md'),
    ]),
    [
      `<a href="${D}/css/display/">/css/display/</a>: ` +
        `<a href="${D}/css/display/#practices-solarrust">совет solarrust</a>, ` +
        `<a href="${D}/css/display/demos/fade/">демка fade</a>, ` +
        `<a href="${D}/css/display/demos/inline-block-gap/">демка inline-block-gap</a>`,
    ],
  )
})

test('статья вместе с советом получает пометку «статья»', () => {
  assert.deepEqual(items([modified('css/display/index.md'), modified('css/display/practice/solarrust.md')]), [
    `<a href="${D}/css/display/">/css/display/</a>: статья, <a href="${D}/css/display/#practices-solarrust">совет solarrust</a>`,
  ])
})

test('файлы внутри демки сливаются в одну демку', () => {
  const [line] = items([modified('css/display/demos/fade/style.css'), modified('css/display/demos/fade/index.html')])
  assert.equal(line.match(/демка fade/g).length, 1)
})

test('картинки и видео — пометкой без ссылки', () => {
  assert.deepEqual(items([modified('css/display/images/a.png'), modified('css/display/images/b.png'), modified('js/fetch/video/x.mp4')]), [
    `<a href="${D}/css/display/">/css/display/</a>: картинки`,
    `<a href="${D}/js/fetch/">/js/fetch/</a>: видео`,
  ])
})

test('страница раздела, люди, страницы и спецпроекты', () => {
  assert.deepEqual(
    items([modified('css/index.md'), modified('people/solarrust/index.md'), modified('pages/about/index.md'), modified('specials/holyjs/index.md')]),
    [
      `<a href="${D}/about/">/about/</a>`,
      `<a href="${D}/css/">/css/</a>`,
      `<a href="${D}/holyjs/">/holyjs/</a>`,
      `<a href="${D}/people/solarrust/">/people/solarrust/</a>`,
    ],
  )
})

test('фото автора ведёт на страницу автора', () => {
  assert.deepEqual(items([modified('people/solarrust/avatar.jpg')]), [`<a href="${D}/people/solarrust/">/people/solarrust/</a>: картинки`])
})

test('вопрос с собеседования ведёт во все статьи из related', () => {
  assert.deepEqual(items([modified('interviews/css-grid/index.md')]), [
    `<a href="${D}/css/display/">/css/display/</a>: <a href="${D}/css/display/#questions">вопрос css-grid</a>`,
    `<a href="${D}/css/grid/">/css/grid/</a>: <a href="${D}/css/grid/#questions">вопрос css-grid</a>`,
  ])
})

test('ответ ведёт на свой якорь, картинка ответа — туда же', () => {
  assert.deepEqual(
    items([modified('interviews/css-display/answers/solarrust/index.md'), modified('interviews/css-display/answers/solarrust/pic.png')]),
    [`<a href="${D}/css/display/">/css/display/</a>: <a href="${D}/css/display/#css-display-answers-solarrust">ответ solarrust (css-display)</a>`],
  )
})

test('вопрос без related и удалённый вопрос попадают в список без ссылки', () => {
  assert.deepEqual(items([modified('interviews/lonely/index.md'), removed('interviews/gone/index.md')]), [
    'вопрос gone — удалили',
    'вопрос lonely — не привязан к статьям, проверь <code>related</code>',
  ])
})

test('удалённая статья — без ссылки, чтобы не вести на 404', () => {
  assert.deepEqual(items([removed('css/old/index.md'), removed('css/old/practice/solarrust.md')]), ['/css/old/ — удалили'])
})

test('удалённый совет и демка помечаются, живые — со ссылкой', () => {
  assert.deepEqual(
    items([removed('css/display/practice/solarrust.md'), removed('css/display/demos/fade/index.html'), removed('css/display/demos/fade/style.css')]),
    [`<a href="${D}/css/display/">/css/display/</a>: совет solarrust — удалили, демка fade — удалили`],
  )
})

test('удалённые стили при живой демке не делают её удалённой', () => {
  assert.deepEqual(items([removed('css/display/demos/fade/style.css')]), [
    `<a href="${D}/css/display/">/css/display/</a>: <a href="${D}/css/display/demos/fade/">демка fade</a>`,
  ])
})

test('переименованная статья: старый адрес удалён, новый со ссылкой', () => {
  assert.deepEqual(items([renamed('css/old/index.md', 'css/new/index.md')]), [`<a href="${D}/css/new/">/css/new/</a>`, '/css/old/ — удалили'])
})

test('переименование внутри статьи не делает её удалённой', () => {
  assert.deepEqual(items([removed('css/display/index.md'), modified('css/display/index.md')]), [`<a href="${D}/css/display/">/css/display/</a>`])
})

test('служебные файлы блока не дают', () => {
  assert.equal(render([modified('.github/workflows/pr-preview.yml'), modified('dictionary.txt'), modified('docs/how-to.md')]), '')
})

test('длинный список обрезается', () => {
  const files = Array.from({ length: LIMIT + 7 }, (_, index) => modified(`css/p${String(index).padStart(3, '0')}/index.md`))
  const lines = items(files)
  assert.equal(lines.length, LIMIT + 1)
  assert.equal(lines.at(-1), 'и ещё 7 — полный список во вкладке Files changed')
  assert.match(render(files), new RegExp(`<summary>Затронутые материалы: ${LIMIT + 7}</summary>`))
})

test('имена папок экранируются и не ломают ни HTML, ни $GITHUB_OUTPUT', () => {
  const block = render([modified('css/a"><script>x</script>/practice/b\nlist=evil.md')])
  assert.doesNotMatch(block, /<script>/)
  assert.doesNotMatch(block, /\n/)
  assert.match(block, /&quot;&gt;&lt;script&gt;/)
})

test('related читается столбиком и в скобках', () => {
  assert.deepEqual(parseRelated('---\nrelated:\n  - css/grid\n  - "/css/display/"\ntags:\n  - x\n---\nТекст'), ['css/grid', 'css/display'])
  assert.deepEqual(parseRelated('---\nrelated: [css/grid, js/fetch]\n---\n'), ['css/grid', 'js/fetch'])
  assert.deepEqual(parseRelated('Без фронтматтера'), [])
  assert.deepEqual(parseRelated('---\ntitle: x\n---\n'), [])
})

test('одна демка прямо в demos/ ведёт на demos/, а не на demos/index.html/', () => {
  assert.deepEqual(items([modified('a11y/aria-disabled/demos/index.html')]), [
    `<a href="${D}/a11y/aria-disabled/">/a11y/aria-disabled/</a>: <a href="${D}/a11y/aria-disabled/demos/">демка</a>`,
  ])
  assert.deepEqual(items([removed('js/settimeout/demos/index.html')]), [`<a href="${D}/js/settimeout/">/js/settimeout/</a>: демка — удалили`])
})

test('папка демок без index.html — пометка без ссылки', () => {
  assert.deepEqual(items([modified('css/filter/demos/images/like.png')]), [`<a href="${D}/css/filter/">/css/filter/</a>: демка images`])
})

test('файл прямо в interviews/ страницы не даёт', () => {
  assert.equal(render([modified('interviews/index.md')]), '')
})

test('related с BOM и без отступа у пунктов', () => {
  assert.deepEqual(parseRelated('\uFEFF---\nrelated:\n  - js/promise-allsettled\n---\n'), ['js/promise-allsettled'])
  assert.deepEqual(parseRelated('---\nrelated:\n- css/flex\n- css/grid\n---\n'), ['css/flex', 'css/grid'])
})
