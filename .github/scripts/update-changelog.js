// Дополняет CHANGELOG.md по слитому пулреквесту.
// Тесты: node --test .github/scripts/update-changelog.test.js

const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

// Пути считаются от корня репозитория, а не от текущей директории: так скрипт
// работает и когда его зовут не из корня.
const ROOT = path.resolve(__dirname, '..', '..')
const CHANGELOG_FILE = path.join(ROOT, 'CHANGELOG.md')
// Ченджлог начинается с заголовка, пустой строки, маркера yaspeller и ещё одной
// пустой строки. Новый месяц встаёт сразу за ними, старые месяцы уезжают ниже.
const FIRST_MONTH_LINE = 4

const ARTICLE_PATH = /^(html|css|js|tools|a11y|recipes)\/[^/]+\/index\.md$/

// Правки существующих статей в ченджлог не попадают: объём правки плохо
// говорит о её важности, и решать это удобнее руками.

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const MONTHS_OF = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

const git = (...args) => execFileSync('git', ['-c', 'core.quotePath=false', ...args], { encoding: 'utf8', maxBuffer: 1 << 28 })

// Фронтматтер и тело статьи. Тело — всё, что увидит читатель. BOM в начале
// файла сдвигает `---` и оставляет фронтматтер неразобранным: такой материал
// молча выпал бы из ченджлога (например, `js/array-tosorted/index.md`).
const split = (text) => {
  const clean = text.replace(/^\uFEFF/u, '')
  const match = clean.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  return match ? { front: match[1], body: clean.slice(match[0].length) } : { front: '', body: clean }
}

const readValue = (front, name) => {
  const match = front.match(new RegExp(`^${name}: *(.*)$`, 'm'))
  if (!match) return ''
  return match[1].trim().replace(/^(['"])([\s\S]*)\1$/, '$2')
}

const readList = (front, name) => {
  const lines = front.split('\n')
  const start = lines.indexOf(`${name}:`)
  if (start === -1) return []
  const items = []
  for (const line of lines.slice(start + 1)) {
    const item = line.match(/^ {2}- (.+)$/)
    if (!item) break
    items.push(item[1].trim())
  }
  return items
}

// Порог сходства для поиска переименований. По умолчанию git берёт 50 %, и
// переезд статьи, которую заодно слегка переписали, разъезжается на пару
// «удалили» + «добавили» — а «добавили» ушло бы в ченджлог как новый материал.
// Ниже 20 % опускать не стоит: git начинает спаривать несвязанные «удалили» и
// «добавили», и тогда по-настоящему новый материал пропадёт молча, что хуже
// лишней записи. Полностью переписанный при переезде текст git не отличит от
// новой статьи ни на каком пороге — такую запись убираем руками.
const RENAME_LIMIT = '--find-renames=20%'

// Строки `git diff --name-status`. У переезда в строке два пути: сравнивать
// надо со старым, а записывать по новому.
const parseChanges = (output) =>
  output
    .split('\n')
    .map((line) => {
      const [mark, first, second] = line.split('\t')
      if (!mark || !first) return null
      const status = mark[0]
      if (status === 'R') return second ? { status: 'R', file: second, from: first } : null
      if (status === 'A' || status === 'M') return { status, file: first, from: first }
      return null
    })
    .filter((change) => change && ARTICLE_PATH.test(change.file))

const isPlaceholder = (text) => readList(split(text).front, 'tags').includes('placeholder')

// Заголовок и подпись приходят из фронтматтера слитого пулреквеста, в том числе
// из форка, и попадают в markdown-строку: `[`, `]` и `\` меняют её разбор вплоть
// до подмены адреса ссылки, перевод строки рвёт запись надвое. Экранировать
// нельзя — ленту на сайте собирает `platform/.eleventy.js`, разбирая строку
// через `split(', [')` и `split('](')`, и `\[` ломает уже её. Поэтому вырезаем.
const sanitize = (text) => text.replace(/[\r\n]+/gu, ' ').replace(/[\\[\]]/gu, '').replace(/ {2,}/gu, ' ').trim()

// В подписи вдобавок режется косая черта: адрес в ленте отыскивается по
// последнему `/` в строке, и слеш после ссылки уводит его в хвост.
const sanitizePerson = (text) => sanitize(text.replace(/\//gu, ''))

const articleUrl = (file) => `https://doka.guide/${file.replace('index.md', '')}`

// Слаг приходит из фронтматтера статьи, в том числе из форка: без проверки
// «../» увёл бы чтение за пределы `people/`.
const isPersonSlug = (slug) => /^[A-Za-z0-9._-]+$/u.test(slug) && slug !== '.' && slug !== '..'

const personName = (slug) => {
  if (!isPersonSlug(slug)) return ''
  const file = path.join(ROOT, 'people', slug, 'index.md')
  if (!fs.existsSync(file)) return ''
  return sanitize(readValue(split(fs.readFileSync(file, 'utf8')).front, 'name'))
}

// Что подставляется в запись. Пусто — значит, записывать нечего: без заголовка
// вышло бы `[](адрес)`, а без подписи запись некому подписать. Дока Дог
// подписывается под каждым автоматическим коммитом, ему в ченджлоге не место;
// слаг, не прошедший проверку, в подпись не идёт вовсе — иначе в ченджлог уехал
// бы мусор из фронтматтера форка.
const entryFields = (front) => ({
  title: sanitize(readValue(front, 'title')),
  people: readList(front, 'authors')
    .filter((slug) => slug !== 'doka-dog')
    .map((slug) => personName(slug) || (isPersonSlug(slug) ? slug : ''))
    .map(sanitizePerson)
    .filter(Boolean),
})

// Строка ченджлога. Заголовок и подпись сюда приходят уже очищенными:
// единственная точка очистки — `entryFields`, здесь только склейка.
const buildEntry = ({ date, title, url, people }) => `- ${date}, [${title}](${url}), ${people.join(', ')}`

// Дата слияния по Москве: редакция живёт в этом часовом поясе, и ночной мёрдж
// не должен уезжать в предыдущий день.
const moscowDate = (isoString) => {
  const date = new Date(Date.parse(isoString) + 3 * 60 * 60 * 1000)
  // Без этой проверки битая дата не роняет скрипт, а пишет в ченджлог строку
  // с `NaN` и `undefined` — и воркфлоу спокойно её коммитит.
  if (Number.isNaN(date.getTime())) throw new Error(`Не разобрали дату слияния: ${isoString}`)
  return date
}

const insertEntries = (changelog, header, entries) => {
  const lines = changelog.split('\n')
  const position = lines.indexOf(header)
  if (position === -1) {
    lines.splice(FIRST_MONTH_LINE, 0, header, '', ...entries, '')
  } else {
    lines.splice(position + 2, 0, ...entries)
  }
  return lines.join('\n')
}

// Материал уже в ченджлоге, если его адрес встречается хоть где-то: каждый
// попадает туда ровно один раз.
const alreadyListed = (changelog, url) =>
  changelog.split('\n').some((line) => line.startsWith('- ') && line.includes(`](${url})`))

// Что случилось со статьёй в этом пулреквесте: 'new' — появилась,
// 'placeholder' — дописана заготовка, null — ничего, о чём стоит писать
// в ченджлог. Переезд (`R`) разбирается наравне с правкой: сам по себе он в
// ченджлог не идёт, но заготовку часто дописывают и переименовывают разом.
const reasonFor = ({ status, before, after }) => {
  if (status === 'A') return isPlaceholder(after) ? null : 'new'
  if (status !== 'M' && status !== 'R') return null
  return isPlaceholder(before) && !isPlaceholder(after) ? 'placeholder' : null
}

const collect = ({ sha, mergedAt }) => {
  const changes = parseChanges(git('diff', '--name-status', RENAME_LIMIT, `${sha}^`, sha))

  const merged = moscowDate(mergedAt)
  const date = `${merged.getUTCDate()} ${MONTHS_OF[merged.getUTCMonth()]}`

  const entries = []
  for (const { status, file, from } of changes) {
    const after = git('show', `${sha}:${file}`)
    const before = status === 'A' ? '' : git('show', `${sha}^:${from}`)
    const reason = reasonFor({ status, before, after })
    if (!reason) continue

    const { title, people } = entryFields(split(after).front)
    if (!title) {
      console.log(`У материала ${file} нет заголовка, пропускаем`)
      continue
    }
    if (people.length === 0) {
      console.log(`У материала ${file} некого указать в ченджлоге, пропускаем`)
      continue
    }

    entries.push({
      url: articleUrl(file),
      line: buildEntry({ date, title, url: articleUrl(file), people }),
    })
    console.log(`${file}: ${reason}`)
  }
  return entries
}

const main = () => {
  const sha = process.env.MERGE_SHA
  const mergedAt = process.env.MERGED_AT
  if (!sha || !mergedAt) throw new Error('Не переданы MERGE_SHA и MERGED_AT')

  const entries = collect({ sha, mergedAt })
  if (entries.length === 0) {
    console.log('В пулреквесте нет материалов для ченджлога')
    return
  }

  const merged = moscowDate(mergedAt)
  const header = `## ${MONTHS[merged.getUTCMonth()]} ${merged.getUTCFullYear()}`

  let changelog = fs.readFileSync(CHANGELOG_FILE, 'utf8')
  const fresh = entries.filter((entry) => !alreadyListed(changelog, entry.url))
  if (fresh.length === 0) {
    console.log('Все материалы уже есть в ченджлоге')
    return
  }

  fs.writeFileSync(CHANGELOG_FILE, insertEntries(changelog, header, fresh.map((entry) => entry.line)))
  console.log(`Добавлено в ченджлог записей: ${fresh.length}`)
}

module.exports = { split, readValue, readList, isPlaceholder, sanitize, sanitizePerson, entryFields, collect, RENAME_LIMIT, personName, parseChanges, reasonFor, buildEntry, insertEntries, alreadyListed, moscowDate }

if (require.main === module) main()
