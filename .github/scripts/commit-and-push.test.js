// node --test .github/scripts/commit-and-push.test.js
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const SCRIPT = path.join(__dirname, 'commit-and-push.sh')
const MAINTENANCE = path.join(__dirname, 'main-maintenance.sh')

// Боевой список путей — тот самый, с которым бот ходит в main. Проверять цикл
// на одном `CHANGELOG.md` бессмысленно: главный капкан именно в pathspec'ах.
// В pathspec у git нет альтернации, и строка `(a11y|css)/**/index.md` уронила
// бы `git add` с кодом 128, а на одном файле это не всплывает.
const productionPaths = () =>
  execFileSync('bash', [MAINTENANCE, '--paths'], { cwd: path.join(__dirname, '..', '..'), encoding: 'utf8' })
    .split('\n')
    .filter(Boolean)

function git(dir, args) {
  return execFileSync('git', args, { cwd: dir, encoding: 'utf8' })
}

function writeFiles(dir, files) {
  for (const [relPath, content] of Object.entries(files)) {
    const absolutePath = path.join(dir, relPath)
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true })
    fs.writeFileSync(absolutePath, content)
  }
}

// Голый репозиторий в роли origin и рабочий клон рядом с ним.
function makeRepo(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'commit-and-push-'))
  const origin = path.join(root, 'origin.git')
  const work = path.join(root, 'work')

  execFileSync('git', ['init', '-q', '--bare', '-b', 'main', origin])
  execFileSync('git', ['clone', '-q', origin, work])
  git(work, ['config', 'user.email', 'test@test.com'])
  git(work, ['config', 'user.name', 'Test'])

  writeFiles(work, files)
  git(work, ['add', '-A'])
  git(work, ['commit', '-q', '-m', 'Заводит репозиторий'])
  git(work, ['push', '-q', 'origin', 'main'])

  return { root, origin, work }
}

// Клон соседнего бота: он пишет в ту же main.
function makeNeighbour(repo) {
  const dir = path.join(repo.root, `neighbour-${Math.random().toString(36).slice(2)}`)
  execFileSync('git', ['clone', '-q', repo.origin, dir])
  git(dir, ['config', 'user.email', 'neighbour@test.com'])
  git(dir, ['config', 'user.name', 'Neighbour'])
  return dir
}

// Команда для цикла: shell-скрипт в файле, чтобы её можно было передать строкой.
function makeCommand(repo, name, body) {
  const file = path.join(repo.root, name)
  fs.writeFileSync(file, `#!/usr/bin/env bash\nset -u\n${body}\n`, { mode: 0o755 })
  return file
}

function run(repo, { message = 'Обновляет служебные файлы', command, specs, attempts = 5 } = {}) {
  try {
    const stdout = execFileSync('bash', [SCRIPT, message, command, ...specs], {
      cwd: repo.work,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      env: {
        ...process.env,
        COMMIT_AND_PUSH_ATTEMPTS: String(attempts),
        COMMIT_AND_PUSH_BRANCH: 'main',
        COMMIT_AND_PUSH_DELAY: '0',
        COMMIT_AND_PUSH_REMOTE: 'origin',
      },
    })
    return { code: 0, stdout }
  } catch (error) {
    return { code: error.status, stdout: `${error.stdout || ''}${error.stderr || ''}` }
  }
}

// Что в итоге лежит в origin.
const originFile = (repo, file) => git(repo.work, ['show', `origin/main:${file}`])
const originHas = (repo, file) => {
  try {
    originFile(repo, file)
    return true
  } catch {
    return false
  }
}
const originLog = (repo) => git(repo.work, ['log', '--format=%s', 'origin/main']).split('\n').filter(Boolean)

const REPO = {
  'CHANGELOG.md': '# Ченджлог\n',
  '.yaspeller.json': '{}\n',
  'css/color/index.md': '---\ntitle: color\n---\n',
  'css/color/index.11tydata.json': '{}\n',
  'html/input/index.md': '---\ntitle: input\n---\n',
  'pages/about/index.md': '---\ntitle: О проекте\n---\n',
}

test('боевой список путей не роняет git add и коммитит изменённое', () => {
  const repo = makeRepo(REPO)
  const command = makeCommand(
    repo,
    'work.sh',
    ['echo "- 3 сентября" >> CHANGELOG.md', 'echo "изменено" >> css/color/index.md'].join('\n'),
  )

  const result = run(repo, { command, specs: productionPaths() })

  assert.equal(result.code, 0, result.stdout)
  git(repo.work, ['fetch', '-q', 'origin', 'main'])
  assert.match(originFile(repo, 'CHANGELOG.md'), /3 сентября/)
  assert.match(originFile(repo, 'css/color/index.md'), /изменено/)
})

test('раздела, которого нет в репозитории, хватает для падения — но не должно', () => {
  // `git add` падает с кодом 128 на pathspec, под который ничего не попало.
  // Раздел `recipes` в фикстуре отсутствует, и на нём цикл обязан устоять.
  const repo = makeRepo({ 'CHANGELOG.md': '# Ченджлог\n' })
  const command = makeCommand(repo, 'work.sh', 'echo "- 3 сентября" >> CHANGELOG.md')

  const result = run(repo, { command, specs: productionPaths() })

  assert.equal(result.code, 0, result.stdout)
  git(repo.work, ['fetch', '-q', 'origin', 'main'])
  assert.match(originFile(repo, 'CHANGELOG.md'), /3 сентября/)
})

test('в коммит идут только перечисленные пути', () => {
  const repo = makeRepo(REPO)
  const command = makeCommand(
    repo,
    'work.sh',
    [
      'echo "изменено" >> css/color/index.md',
      // Служебный файл выгрузки меты и материал из раздела, который
      // обслуживание не трогает.
      'echo "{}" > result.json',
      'echo "изменено" >> pages/about/index.md',
    ].join('\n'),
  )

  const result = run(repo, { command, specs: productionPaths() })

  assert.equal(result.code, 0, result.stdout)
  git(repo.work, ['fetch', '-q', 'origin', 'main'])
  assert.match(originFile(repo, 'css/color/index.md'), /изменено/)
  assert.equal(originHas(repo, 'result.json'), false)
  assert.doesNotMatch(originFile(repo, 'pages/about/index.md'), /изменено/)
})

test('index.11tydata.json из pages не подметается звёздочкой', () => {
  // Без префикса `:(glob)` звёздочка перескакивает через слеши, и
  // `**/index.11tydata.json` забрал бы ещё `pages/` и `people/`.
  const repo = makeRepo({ ...REPO, 'pages/about/index.11tydata.json': '{}\n' })
  const command = makeCommand(
    repo,
    'work.sh',
    ['echo "{\\"updatedAt\\":1}" > css/color/index.11tydata.json', 'echo "{\\"updatedAt\\":2}" > pages/about/index.11tydata.json'].join('\n'),
  )

  const result = run(repo, { command, specs: productionPaths() })

  assert.equal(result.code, 0, result.stdout)
  git(repo.work, ['fetch', '-q', 'origin', 'main'])
  assert.match(originFile(repo, 'css/color/index.11tydata.json'), /updatedAt/)
  assert.equal(originFile(repo, 'pages/about/index.11tydata.json'), '{}\n')
})

test('без изменений коммита не появляется', () => {
  const repo = makeRepo(REPO)
  const command = makeCommand(repo, 'work.sh', 'echo "ничего не меняем"')

  const result = run(repo, { command, specs: productionPaths() })

  assert.equal(result.code, 0, result.stdout)
  assert.match(result.stdout, /Менять нечего/)
  git(repo.work, ['fetch', '-q', 'origin', 'main'])
  assert.deepEqual(originLog(repo), ['Заводит репозиторий'])
})

test('чужой пуш в окно между работой и записью не теряется', () => {
  const repo = makeRepo(REPO)
  const neighbour = makeNeighbour(repo)
  const flag = path.join(repo.root, 'сосед-уже-запушил')

  // Сосед пушит ровно в окно: работа сделана, коммит ещё не ушёл. На первой
  // попытке наш пуш отклонится с «fetch first».
  const command = makeCommand(
    repo,
    'work.sh',
    [
      'echo "- 3 сентября, наша запись" >> CHANGELOG.md',
      `if [[ ! -f "${flag}" ]]; then`,
      `  touch "${flag}"`,
      `  cd "${neighbour}"`,
      '  echo "изменено соседом" >> css/color/index.md',
      '  git add -A',
      '  git commit -q -m "Правит поля updatedAt и createdAt"',
      '  git push -q origin main',
      'fi',
    ].join('\n'),
  )

  const result = run(repo, { command, specs: productionPaths() })

  assert.equal(result.code, 0, result.stdout)
  assert.match(result.stdout, /Пуш отклонён, попытка 1 из 5/)
  assert.match(result.stdout, /Записано в main с попытки 2/)

  git(repo.work, ['fetch', '-q', 'origin', 'main'])
  // Чужая работа на месте, наша легла поверх.
  assert.match(originFile(repo, 'css/color/index.md'), /изменено соседом/)
  assert.match(originFile(repo, 'CHANGELOG.md'), /наша запись/)
  assert.deepEqual(originLog(repo), [
    'Обновляет служебные файлы',
    'Правит поля updatedAt и createdAt',
    'Заводит репозиторий',
  ])
})

test('работа переделывается с новой вершины, а не накатывается поверх старой', () => {
  // Чужая правка того же файла не должна откатиться: команда выполняется
  // заново уже поверх свежей вершины.
  const repo = makeRepo(REPO)
  const neighbour = makeNeighbour(repo)
  const flag = path.join(repo.root, 'сосед-уже-запушил')

  const command = makeCommand(
    repo,
    'work.sh',
    [
      'echo "- наша запись" >> CHANGELOG.md',
      `if [[ ! -f "${flag}" ]]; then`,
      `  touch "${flag}"`,
      `  cd "${neighbour}"`,
      '  echo "- чужая запись" >> CHANGELOG.md',
      '  git add -A',
      '  git commit -q -m "Обновляет ченджлог"',
      '  git push -q origin main',
      'fi',
    ].join('\n'),
  )

  const result = run(repo, { command, specs: productionPaths() })

  assert.equal(result.code, 0, result.stdout)
  git(repo.work, ['fetch', '-q', 'origin', 'main'])
  const changelog = originFile(repo, 'CHANGELOG.md')
  assert.match(changelog, /чужая запись/)
  assert.match(changelog, /наша запись/)
  // Наша запись ровно одна: с первой попытки она не уехала в origin.
  assert.equal(changelog.split('наша запись').length - 1, 1)
})

test('упавшая команда не даёт коммита', () => {
  const repo = makeRepo(REPO)
  const command = makeCommand(repo, 'work.sh', 'echo "изменено" >> CHANGELOG.md\nexit 1')

  const result = run(repo, { command, specs: productionPaths() })

  assert.equal(result.code, 1)
  assert.match(result.stdout, /Команда упала/)
  git(repo.work, ['fetch', '-q', 'origin', 'main'])
  assert.deepEqual(originLog(repo), ['Заводит репозиторий'])
})

test('попытки не бесконечные', () => {
  const repo = makeRepo(REPO)
  const neighbour = makeNeighbour(repo)

  // Сосед пушит на каждой попытке — наш пуш не пройдёт никогда.
  const command = makeCommand(
    repo,
    'work.sh',
    [
      'echo "- наша запись" >> CHANGELOG.md',
      `cd "${neighbour}"`,
      'git fetch -q origin main',
      'git reset -q --hard origin/main',
      'echo "- чужая запись" >> CHANGELOG.md',
      'git add -A',
      'git commit -q -m "Обновляет ченджлог"',
      'git push -q origin main',
    ].join('\n'),
  )

  const result = run(repo, { command, specs: productionPaths(), attempts: 3 })

  assert.equal(result.code, 1)
  assert.match(result.stdout, /Пуш отклонён, попытка 3 из 3/)
  assert.match(result.stdout, /Не удалось записать изменения за 3 попыток/)
})

test('без аргументов скрипт объясняет, чего от него ждут', () => {
  const repo = makeRepo(REPO)
  const result = run(repo, { command: '', specs: [] })

  assert.equal(result.code, 2)
  assert.match(result.stdout, /commit-and-push\.sh/)
})
