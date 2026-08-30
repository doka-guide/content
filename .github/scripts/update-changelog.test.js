// node --test .github/scripts/update-changelog.test.js
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const {
  split,
  readValue,
  readList,
  isPlaceholder,
  sanitize,
  sanitizePerson,
  entryFields,
  collect,
  RENAME_LIMIT,
  personName,
  parseChanges,
  reasonFor,
  buildEntry,
  insertEntries,
  alreadyListed,
  moscowDate,
} = require('./update-changelog.js')

const article = ({ title = '`clamp()`', tags = ['doka'], body = 'Текст статьи.', baseline = false } = {}) =>
  [
    '---',
    `title: "${title}"`,
    ...(baseline ? ['baseline:', '  - group: min-max-clamp', '    features:', '      - css.types.clamp'] : []),
    'authors:',
    '  - gartonot',
    'tags:',
    ...tags.map((tag) => `  - ${tag}`),
    '---',
    '',
    body,
    '',
  ].join('\n')

const paragraph = (length) => 'a'.repeat(length)

test('тело статьи отделяется от фронтматтера', () => {
  const { front, body } = split(article({ body: 'Кратко.' }))

  assert.match(front, /^title: /)
  assert.equal(body.trim(), 'Кратко.')
})

test('заголовок читается без кавычек', () => {
  assert.equal(readValue(split(article()).front, 'title'), '`clamp()`')
})

test('список авторов не цепляет соседние поля', () => {
  assert.deepEqual(readList(split(article({ tags: ['doka', 'placeholder'] })).front, 'authors'), ['gartonot'])
  assert.deepEqual(readList(split(article({ tags: ['doka', 'placeholder'] })).front, 'tags'), ['doka', 'placeholder'])
})

test('список обрывается на более глубоком отступе', () => {
  // Во фронтматтере есть вложенные списки: `baseline` держит `features`
  // с отступом в шесть пробелов, и они не должны утечь в верхний список.
  const front = split(article({ baseline: true })).front

  assert.deepEqual(readList(front, 'baseline'), ['group: min-max-clamp'])
})

test('заготовка узнаётся по ярлыку в тегах', () => {
  assert.equal(isPlaceholder(article({ tags: ['doka', 'placeholder'] })), true)
  assert.equal(isPlaceholder(article()), false)
})

test('новая статья попадает в ченджлог, новая заготовка — нет', () => {
  assert.equal(reasonFor({ status: 'A', after: article() }), 'new')
  assert.equal(reasonFor({ status: 'A', after: article({ tags: ['doka', 'placeholder'] }) }), null)
})

test('дописанная заготовка попадает в ченджлог', () => {
  const before = article({ tags: ['doka', 'placeholder'], body: 'Заготовка.' })
  const after = article({ tags: ['doka'], body: 'Заготовка.' })

  assert.equal(reasonFor({ status: 'M', before, after }), 'placeholder')
})

test('правка внутри заготовки в ченджлог не идёт', () => {
  const before = article({ tags: ['doka', 'placeholder'], body: 'Коротко.' })
  const after = article({ tags: ['doka', 'placeholder'], body: `Коротко. ${paragraph(1000)}` })

  assert.equal(reasonFor({ status: 'M', before, after }), null)
})

test('правка готовой статьи в ченджлог не идёт, какой бы крупной ни была', () => {
  const before = article({ body: 'Кратко.' })
  const smallEdit = article({ body: 'Кратко и точно.' })
  const bigEdit = article({ body: `Кратко.\n\n${paragraph(4000)}` })

  assert.equal(reasonFor({ status: 'M', before, after: smallEdit }), null)
  assert.equal(reasonFor({ status: 'M', before, after: bigEdit }), null)
})

test('удаление в ченджлог не идёт, даже если это была заготовка', () => {
  const placeholder = article({ tags: ['doka', 'placeholder'] })

  assert.equal(reasonFor({ status: 'D', before: placeholder, after: article() }), null)
  assert.equal(reasonFor({ status: 'C', before: placeholder, after: article() }), null)
})

test('чистый переезд статьи новым материалом не считается', () => {
  assert.equal(reasonFor({ status: 'R', before: article(), after: article() }), null)
})

test('заготовку, дописанную вместе с переездом, ченджлог не теряет', () => {
  const before = article({ tags: ['doka', 'placeholder'], body: 'Заготовка.' })
  const after = article({ tags: ['doka'], body: `Заготовка. ${paragraph(400)}` })

  assert.equal(reasonFor({ status: 'R', before, after }), 'placeholder')
})

test('строка ченджлога собирается из даты, заголовка, адреса и авторов', () => {
  const entry = { date: '29 августа', title: '`background`', url: 'https://doka.guide/css/background/', people: ['Алёна Батицкая'] }

  assert.equal(buildEntry(entry), '- 29 августа, [`background`](https://doka.guide/css/background/), Алёна Батицкая')
  assert.equal(
    buildEntry({ ...entry, people: ['Алёна Батицкая', 'Лира'] }),
    '- 29 августа, [`background`](https://doka.guide/css/background/), Алёна Батицкая, Лира',
  )
})

const changelog = [
  '# Новые материалы',
  '',
  '<!-- yaspeller ignore:start -->',
  '',
  '## Июль 2026',
  '',
  '- 18 июля, [`WebSocket`](https://doka.guide/js/websocket/), Игорь Теплостанский',
  '',
].join('\n')

test('запись встаёт в начало списка своего месяца', () => {
  const result = insertEntries(changelog, '## Июль 2026', ['- 20 июля, [`gap`](https://doka.guide/css/gap/), Лира'])

  assert.equal(result.split('\n')[6], '- 20 июля, [`gap`](https://doka.guide/css/gap/), Лира')
  assert.equal(result.split('\n')[7], '- 18 июля, [`WebSocket`](https://doka.guide/js/websocket/), Игорь Теплостанский')
})

test('новый месяц открывается над предыдущим', () => {
  const result = insertEntries(changelog, '## Август 2026', ['- 1 августа, [`gap`](https://doka.guide/css/gap/), Лира']).split('\n')

  assert.deepEqual(result.slice(0, 9), [
    '# Новые материалы',
    '',
    '<!-- yaspeller ignore:start -->',
    '',
    '## Август 2026',
    '',
    '- 1 августа, [`gap`](https://doka.guide/css/gap/), Лира',
    '',
    '## Июль 2026',
  ])
})

test('материал второй раз в ченджлог не попадает', () => {
  assert.equal(alreadyListed(changelog, 'https://doka.guide/js/websocket/'), true)
  assert.equal(alreadyListed(changelog, 'https://doka.guide/css/gap/'), false)
})

test('похожий адрес за уже записанный не принимается', () => {
  const listed = insertEntries(changelog, '## Июль 2026', ['- 20 июля, [`gap`](https://doka.guide/css/gap/), Лира'])

  assert.equal(alreadyListed(listed, 'https://doka.guide/css/gap/'), true)
  assert.equal(alreadyListed(listed, 'https://doka.guide/css/gap-column/'), false)
  assert.equal(alreadyListed(listed, 'https://doka.guide/js/gap/'), false)
})

test('строка не из списка за запись не принимается', () => {
  const prose = ['# Новые материалы', '', 'Смотрите [`gap`](https://doka.guide/css/gap/) в июльском выпуске.', ''].join('\n')

  assert.equal(alreadyListed(prose, 'https://doka.guide/css/gap/'), false)
})

test('материал не попадает второй раз и в новом месяце', () => {
  const next = insertEntries(changelog, '## Август 2026', ['- 1 августа, [`gap`](https://doka.guide/css/gap/), Лира'])

  assert.equal(alreadyListed(next, 'https://doka.guide/js/websocket/'), true)
})

test('ночной мёрдж остаётся в своём московском дне', () => {
  const merged = moscowDate('2026-08-29T23:30:00Z')

  assert.equal(merged.getUTCDate(), 30)
  assert.equal(merged.getUTCMonth(), 7)
})

test('заголовок не может разорвать ссылку или подменить адрес', () => {
  // Скобки вырезаются, а не экранируются: ленту на сайте собирает
  // `platform/.eleventy.js`, разбирая строку через `split('](')`, и `\\[` ломает
  // уже её.
  assert.equal(sanitize('Плохой [заголовок](https://evil.example/)'), 'Плохой заголовок(https://evil.example/)')
  assert.equal(sanitize('Хитрый \\](https://evil.example/)'), 'Хитрый (https://evil.example/)')
  assert.equal(sanitize('`clamp()`'), '`clamp()`')
})

test('подпись автора тоже не может стать ссылкой', () => {
  // Имя приходит из `people/{slug}/index.md`, то есть из репозитория, но
  // санитайзинг тут тоже нужен: файл автора могли завести тем же пулреквестом.
  assert.equal(sanitizePerson('[клик](https://evil.example/)'), 'клик(https:evil.example)')
})

test('обычные заголовки санитайзер не трогает', () => {
  for (const title of ['`clamp()`', 'bind(), call() и apply()', '`:user-valid`, `:user-invalid`', 'CLS (Cumulative Layout Shift)']) {
    assert.equal(sanitize(title), title)
  }
})

test('неразрывный пробел в заголовке остаётся неразрывным', () => {
  assert.equal(sanitize('Дока\u00a0Дог'), 'Дока\u00a0Дог')
  // Два подряд — иначе схлопывание повторов пробела не отличить от `\\s{2,}`,
  // которое неразрывный пробел бы съело.
  assert.equal(sanitize('Дока\u00a0\u00a0Дог'), 'Дока\u00a0\u00a0Дог')
})

test('повторные обычные пробелы схлопываются', () => {
  assert.equal(sanitize('Два    пробела'), 'Два пробела')
  assert.equal(sanitize('  Хвосты  '), 'Хвосты')
})

test('косая черта режется только в подписи', () => {
  // В ленте адрес отыскивается по последнему `/` в строке: слеш после ссылки
  // уводит его в хвост. В заголовке слеш стоит до ссылки и безвреден.
  assert.equal(sanitizePerson('a/b'), 'ab')
  assert.equal(sanitize('и/или'), 'и/или')
})

test('перевод строки в заголовке не разрывает запись надвое', () => {
  // Через `readValue` перенос не пройдёт — регулярка не пересекает строки, —
  // так что это оборона на случай другого источника заголовка.
  assert.equal(sanitize('Две\nстроки'), 'Две строки')
  assert.equal(sanitize('Три\r\nстроки'), 'Три строки')
})

test('битая дата слияния роняет скрипт, а не пишет NaN в ченджлог', () => {
  assert.throws(() => moscowDate('не дата'), /Не разобрали дату слияния/u)
  assert.throws(() => moscowDate(''), /Не разобрали дату слияния/u)
})

test('слаг автора не уводит чтение за пределы people', () => {
  assert.equal(personName('../../../etc/passwd'), '')
  assert.equal(personName('..'), '')
  // Без проверки слага этот путь схлопнулся бы обратно в people/solarrust
  // и вернул бы имя — то есть обход каталогов сработал бы.
  assert.equal(personName('../people/solarrust'), '')
  assert.equal(personName('solarrust'), 'Алёна Батицкая')
})

test('BOM в начале файла не прячет фронтматтер', () => {
  const text = `\uFEFF${article({ title: 'Статья' })}`

  assert.equal(readValue(split(text).front, 'title'), 'Статья')
  assert.deepEqual(readList(split(text).front, 'authors'), ['gartonot'])
  assert.equal(isPlaceholder(`\uFEFF${article({ tags: ['doka', 'placeholder'] })}`), true)
})

test('строки diff разбираются по статусам', () => {
  const output = [
    'A\tcss/gap/index.md',
    'M\tjs/websocket/index.md',
    'R096\tcss/ph/index.md\tcss/ph-new/index.md',
    'D\tcss/gone/index.md',
    'A\tcss/gap/demos/basic/index.md',
    'A\tdocs/changelog.md',
    '',
  ].join('\n')

  assert.deepEqual(parseChanges(output), [
    { status: 'A', file: 'css/gap/index.md', from: 'css/gap/index.md' },
    { status: 'M', file: 'js/websocket/index.md', from: 'js/websocket/index.md' },
    { status: 'R', file: 'css/ph-new/index.md', from: 'css/ph/index.md' },
  ])
})

test('у переезда старый путь берётся из первой колонки', () => {
  const [change] = parseChanges('R100\tcss/skew/index.md\tcss/skew-function/index.md')

  assert.equal(change.file, 'css/skew-function/index.md')
  assert.equal(change.from, 'css/skew/index.md')
})

test('битая строка переезда без второго пути отбрасывается', () => {
  assert.deepEqual(parseChanges('R096\tcss/ph/index.md'), [])
})

const frontOf = (authors) => split(['---', 'title: "Статья"', 'authors:', ...authors.map((a) => `  - ${a}`), 'tags:', '  - doka', '---', ''].join('\n')).front

test('Дока Дог из подписи выпадает, а один он запись не удержит', () => {
  assert.deepEqual(entryFields(frontOf(['solarrust', 'doka-dog'])).people, ['Алёна Батицкая'])
  assert.deepEqual(entryFields(frontOf(['doka-dog'])).people, [])
})

test('мусорный слаг в подпись не идёт и не оставляет висячей запятой', () => {
  assert.deepEqual(entryFields(frontOf(['[клик](https://evil.example/)'])).people, [])
  assert.deepEqual(entryFields(frontOf(['solarrust', '[]'])).people, ['Алёна Батицкая'])
  assert.deepEqual(entryFields(frontOf(['../../../etc/passwd'])).people, [])
  assert.deepEqual(entryFields(frontOf(['..'])).people, [])
})

test('материал без заголовка записывать нечем', () => {
  const noTitle = ['---', 'authors:', '  - solarrust', 'tags:', '  - doka', '---', ''].join('\n')

  assert.equal(entryFields(split(noTitle).front).title, '')
  assert.equal(entryFields(split(article({ title: 'Статья' })).front).title, 'Статья')
})

test('порог поиска переименований задан явно', () => {
  // Настоящая проверка — прогон на переезде с переписанным текстом: при
  // умолчании git отдаёт его парой «удалили» + «добавили», и статья уходит в
  // ченджлог как новая. Здесь только страховка от молчаливого отката.
  assert.equal(RENAME_LIMIT, '--find-renames=20%')
})

// Сквозной прогон на настоящем репозитории. Юнит-тесты проверяют разбор и
// сборку строки по отдельности, но не проводку внутри `collect`: гарды по
// заголовку и подписи, склейку записей и то, как git отдаёт переезды. Скрипт
// копируется в песочницу, потому что пути он считает от своего каталога.
const sandbox = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'doka-changelog-'))
  const git = (...args) => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8' })
  const write = (file, text) => {
    fs.mkdirSync(path.join(root, path.dirname(file)), { recursive: true })
    fs.writeFileSync(path.join(root, file), text)
  }

  git('init', '--quiet', '--initial-branch=main')
  git('config', 'user.name', 'Тест')
  git('config', 'user.email', 'test@example.com')
  fs.mkdirSync(path.join(root, '.github', 'scripts'), { recursive: true })
  fs.copyFileSync(path.join(__dirname, 'update-changelog.js'), path.join(root, '.github', 'scripts', 'update-changelog.js'))
  write('CHANGELOG.md', ['# Новые материалы', '', '<!-- yaspeller ignore:start -->', '', '<!-- yaspeller ignore:end -->', ''].join('\n'))
  // Слеш в имени: единственный путь, где вырезание в подписи что-то значит —
  // файл автора мог приехать тем же пулреквестом. Слеш после ссылки уводит
  // поиск адреса в ленте на сайте в хвост строки.
  write('people/solarrust/index.md', ["---", "name: 'Алёна / Батицкая'", '---', ''].join('\n'))

  const run = (sha, mergedAt) => {
    execFileSync('node', ['.github/scripts/update-changelog.js'], {
      cwd: root,
      encoding: 'utf8',
      env: { ...process.env, MERGE_SHA: sha, MERGED_AT: mergedAt },
    })
    return fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8').split('\n').filter((line) => line.startsWith('- '))
  }

  return { root, git, write, run }
}

const LONG = 'Достаточно длинное тело статьи, чтобы git уверенно опознал переезд файла как переименование, а не как пару из удаления и добавления.'

test('сквозной прогон: в ченджлог попадает только то, что должно', () => {
  const { root, git, write, run } = sandbox()
  try {
    write('css/ph/index.md', ['---', 'title: "`ph`"', 'authors:', '  - solarrust', 'tags:', '  - doka', '  - placeholder', '---', '', LONG, ''].join('\n'))
    write('css/moved/index.md', ['---', 'title: "`moved`"', 'authors:', '  - solarrust', 'tags:', '  - doka', '---', '', LONG, ''].join('\n'))
    git('add', '-A')
    git('commit', '--quiet', '-m', 'Заводит заготовку и статью')

    write('css/gap/index.md', ['---', 'title: "`gap`"', 'authors:', '  - solarrust', 'tags:', '  - doka', '---', '', 'Текст.', ''].join('\n'))
    write('css/dogonly/index.md', ['---', 'title: "Только пёс"', 'authors:', '  - doka-dog', 'tags:', '  - doka', '---', '', 'Текст.', ''].join('\n'))
    write('css/notitle/index.md', ['---', 'authors:', '  - solarrust', 'tags:', '  - doka', '---', '', 'Текст.', ''].join('\n'))
    write('css/fresh-ph/index.md', ['---', 'title: "`fresh`"', 'authors:', '  - solarrust', 'tags:', '  - doka', '  - placeholder', '---', '', 'Текст.', ''].join('\n'))
    git('mv', 'css/ph', 'css/ph-done')
    write('css/ph-done/index.md', ['---', 'title: "`ph`"', 'authors:', '  - solarrust', 'tags:', '  - doka', '---', '', LONG, ''].join('\n'))
    git('mv', 'css/moved', 'css/moved-elsewhere')
    git('add', '-A')
    git('commit', '--quiet', '-m', 'Пулреквест со всеми случаями разом')

    const sha = git('rev-parse', 'HEAD').trim()
    const entries = run(sha, '2026-08-29T23:30:00Z')

    assert.deepEqual(entries, [
      '- 30 августа, [`gap`](https://doka.guide/css/gap/), Алёна Батицкая',
      '- 30 августа, [`ph`](https://doka.guide/css/ph-done/), Алёна Батицкая',
    ])

    // Повторный прогон того же пулреквеста ничего не дублирует.
    assert.deepEqual(run(sha, '2026-08-29T23:30:00Z'), entries)
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})
