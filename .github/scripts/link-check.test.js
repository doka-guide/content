// node --test .github/scripts/link-check.test.js
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const os = require('node:os')
const { execFileSync } = require('node:child_process')

const SCRIPT = path.join(__dirname, 'link-check.js')

// создаёт временный репозиторий-фикстуру: { 'css/color/index.md': '...' } → файлы на диске
function makeRepo(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'link-check-'))
  writeFiles(dir, files)
  return dir
}

function writeFiles(dir, files) {
  for (const [relPath, content] of Object.entries(files)) {
    const absolutePath = path.join(dir, relPath)
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true })
    fs.writeFileSync(absolutePath, content)
  }
}

function removeFile(dir, relPath) {
  fs.rmSync(path.join(dir, relPath))
}

function git(dir, args) {
  return execFileSync('git', args, { cwd: dir, encoding: 'utf8' })
}

function gitInit(dir) {
  git(dir, ['init', '-q'])
  git(dir, ['config', 'user.email', 'test@test.com'])
  git(dir, ['config', 'user.name', 'Test'])
}

function gitCommitAll(dir, message) {
  git(dir, ['add', '-A'])
  git(dir, ['commit', '-q', '-m', message])
  return git(dir, ['rev-parse', 'HEAD']).trim()
}

// прогоняет link-check.js как реальный CLI-процесс — так же, как его вызывает workflow
function runCheck(dir, changedFiles, env = {}) {
  try {
    const output = execFileSync('node', [SCRIPT, ...changedFiles], {
      cwd: dir,
      encoding: 'utf8',
      env: { ...process.env, ...env },
    })
    return { code: 0, output }
  } catch (error) {
    return {
      code: typeof error.status === 'number' ? error.status : 1,
      output: `${error.stdout || ''}${error.stderr || ''}`,
    }
  }
}

const FRONTMATTER = 'title: test\n'

function article(body) {
  return `---\n${FRONTMATTER}---\n\n${body}\n`
}

test('валидная ссылка на существующую статью проходит', () => {
  const dir = makeRepo({
    'css/color/index.md': article('## Кратко\n\nПро цвет.'),
    'css/border/index.md': article('Смотри [цвет](/css/color/).'),
  })

  const { code, output } = runCheck(dir, ['css/border/index.md'])

  assert.equal(code, 0, output)
  assert.match(output, /Битых внутренних ссылок не найдено/)
})

test('ссылка на несуществующую статью падает', () => {
  const dir = makeRepo({
    'css/border/index.md': article('Смотри [битую ссылку](/css/no-such-thing/).'),
  })

  const { code, output } = runCheck(dir, ['css/border/index.md'])

  assert.equal(code, 1)
  assert.match(output, /нет материала по пути «\/css\/no-such-thing\/»/)
})

test('регрессия: опечатка в названии раздела и выдуманный раздел всё ещё считаются битыми', () => {
  // PLATFORM_ROUTE изначально задумывался только для конкретных платформенных
  // роутов (/, /people/, /subscribe/), но фикс сначала случайно применил его
  // как fallback для ЛЮБОГО нераспознанного первого сегмента пути — это
  // тихо гасило все ссылки с опечаткой в разделе
  const dir = makeRepo({
    'css/border/index.md': article(
      'Ссылки: [опечатка](/hmtl/div/) и [выдумка](/totally-made-up-section/here/).'
    ),
  })

  const { code, output } = runCheck(dir, ['css/border/index.md'])

  assert.equal(code, 1)
  assert.match(output, /нет материала по пути «\/hmtl\/div\/»/)
  assert.match(output, /нет материала по пути «\/totally-made-up-section\/here\/»/)
})

test('платформенные роуты (/, /people/, /subscribe/) не считаются битыми', () => {
  const dir = makeRepo({
    'pages/newsletters/index.md': article(
      '[Рассылка](/subscribe/), [сообщество](/people/) и [главная](https://doka.guide/).'
    ),
  })

  const { code, output } = runCheck(dir, ['pages/newsletters/index.md'])

  assert.equal(code, 0, output)
})

test('демка с query-строкой ?embed=1 резолвится с учётом реального файла', () => {
  const dir = makeRepo({
    'css/color/index.md': article(
      '```css\n.a { color: red; }\n```\n\n<iframe src="demos/example/?embed=1"></iframe>'
    ),
    'css/color/demos/example/index.html': '<html></html>',
  })

  const okRun = runCheck(dir, ['css/color/index.md'])
  assert.equal(okRun.code, 0, okRun.output)

  // без реальной директории ошибка должна остаться — фикс не должен отключать проверку целиком
  // (fs.existsSync истинен и для директории, поэтому удаляем её целиком, а не файл внутри)
  fs.rmSync(path.join(dir, 'css/color/demos/example'), { recursive: true })
  const failRun = runCheck(dir, ['css/color/index.md'])
  assert.equal(failRun.code, 1)
  assert.match(failRun.output, /не найден файл/)
})

test('заголовок-название тега в бэктиках (### `<td>`) даёт рабочий якорь', () => {
  const dir = makeRepo({
    'html/tables/index.md': article('## Структурные теги\n\n### `<td>`\n\nЯчейка таблицы.'),
    'a11y/foo/index.md': article('Смотри [`<td>`](/html/tables/#td).'),
  })

  const { code, output } = runCheck(dir, ['a11y/foo/index.md'])

  assert.equal(code, 0, output)
})

test('иллюстративный пример атрибута в инлайн-коде не принимается за ссылку', () => {
  const dir = makeRepo({
    'html/a/index.md': article(
      'Атрибут `href="URL"` обязателен. Пример: `<a href="#chapter1">Глава 1</a>`.'
    ),
  })

  const { code, output } = runCheck(dir, ['html/a/index.md'])

  assert.equal(code, 0, output)
})

test('якорь хаб-страницы раздела (YAML groups[].name) резолвится', () => {
  const dir = makeRepo({
    'html/index.md':
      "---\nname: 'HTML'\ngroups:\n  - name: 'Семантика'\n    items:\n      - div\n---\n",
    'a11y/foo/index.md': article('Смотри [семантические теги](/html/#semantika).'),
  })

  const { code, output } = runCheck(dir, ['a11y/foo/index.md'])

  assert.equal(code, 0, output)
})

test('legacy-якорь <a name="..."> резолвится', () => {
  const dir = makeRepo({
    'css/visited/index.md': article('<a name="limits"></a>\n\n## Ограничения\n\nТекст.'),
    'css/other/index.md': article('Смотри [ограничения](/css/visited/#limits).'),
  })

  const { code, output } = runCheck(dir, ['css/other/index.md'])

  assert.equal(code, 0, output)
})

test('markdown-ссылка в угловых скобках со скобками внутри URL не ломает проверку', () => {
  const dir = makeRepo({
    'js/foo/index.md': article(
      'Подробнее: [wiki](<https://ru.wikipedia.org/wiki/Test_(значение)>).'
    ),
  })

  const { code, output } = runCheck(dir, ['js/foo/index.md'])

  assert.equal(code, 0, output)
})

test('якорь, отсутствующий в целевой статье, считается битым', () => {
  const dir = makeRepo({
    'css/color/index.md': article('## Кратко\n\nПро цвет.'),
    'css/border/index.md': article('Смотри [цвет](/css/color/#no-such-anchor).'),
  })

  const { code, output } = runCheck(dir, ['css/border/index.md'])

  assert.equal(code, 1)
  assert.match(output, /нет якоря #no-such-anchor/)
})

test('авто-якоря блока «На практике» резолвятся', () => {
  const dir = makeRepo({
    'css/color/index.md': article('## Кратко\n\nПро цвет.'),
    'css/color/practice/solarrust.md': '🛠 Совет на практике.\n',
    'people/solarrust/index.md': "---\nname: 'Алёна Батицкая'\n---\n",
    'css/other/index.md': article(
      'Смотри [на практике](/css/color/#na-praktike) и [совет Алёны](/css/color/#practices-solarrust).'
    ),
  })

  const { code, output } = runCheck(dir, ['css/other/index.md'])

  assert.equal(code, 0, output)
})

test('якорь #na-sobesedovanii резолвится через related: в interviews', () => {
  const dir = makeRepo({
    'tools/fp/index.md': article('## Кратко\n\nПро ФП.'),
    'interviews/some-question/index.md': "---\nrelated:\n  - tools/fp\n---\n",
    'specials/pfc/index.md': article('Смотри [вопрос на собеседовании](/tools/fp/#na-sobesedovanii).'),
  })

  const { code, output } = runCheck(dir, ['specials/pfc/index.md'])

  assert.equal(code, 0, output)
})

test('reverse-check: ссылка на удалённый якорь в другом файле ловится через BASE_SHA', () => {
  const dir = makeRepo({
    'css/color/index.md': article('## Ограничения\n\nТекст.'),
    'css/other/index.md': article('Смотри [ограничения](/css/color/#ogranicheniya).'),
  })
  gitInit(dir)
  const baseSha = gitCommitAll(dir, 'init')

  // в рабочей копии заголовок переименован — якорь #ogranicheniya пропал,
  // но css/other/index.md на него всё ещё ссылается
  writeFiles(dir, {
    'css/color/index.md': article('## Что-то другое\n\nТекст.'),
  })

  const { code, output } = runCheck(dir, ['css/color/index.md'], { BASE_SHA: baseSha })

  assert.equal(code, 1)
  assert.match(output, /ссылка на удалённый якорь/)
  assert.match(output, /css\/other\/index\.md/)
})

test('reverse-check: ссылка на удалённую статью ловится через BASE_SHA', () => {
  const dir = makeRepo({
    'css/color/index.md': article('## Кратко\n\nПро цвет.'),
    'css/other/index.md': article('Смотри [цвет](/css/color/).'),
  })
  gitInit(dir)
  const baseSha = gitCommitAll(dir, 'init')

  removeFile(dir, 'css/color/index.md')

  const { code, output } = runCheck(dir, ['css/color/index.md'], { BASE_SHA: baseSha })

  assert.equal(code, 1)
  assert.match(output, /ссылка на удалённый материал/)
  assert.match(output, /css\/other\/index\.md/)
})
