// node --test .github/scripts/preview-note.test.js
const test = require('node:test')
const assert = require('node:assert/strict')

const { startMarker, endMarker, formatNote, applyNote, writeNote } = require('./preview-note.js')

const NUMBER = 5888
// Ожидаемый блок собран руками, а не через formatNote: иначе тест сверял бы
// функцию саму с собой.
const note = (message, pullNumber = NUMBER, kind = 'NOTE') =>
  `${startMarker(pullNumber)}\n> [!${kind}]\n> ${message}\n${endMarker(pullNumber)}`

// Поддельный клиент Octokit: помнит описание и записи в него.
const fakeGithub = (body, headSha = 'abc1234') => {
  const state = { body, headSha, updates: [] }
  return {
    state,
    rest: {
      pulls: {
        get: async () => ({ data: { body: state.body, head: { sha: state.headSha } } }),
        update: async ({ body: next }) => {
          state.body = next
          state.updates.push(next)
        },
      },
    },
  }
}

test('в пустое описание блок встаёт целиком', () => {
  assert.equal(applyNote('', NUMBER, 'Идут проверки'), note('Идут проверки'))
  assert.equal(applyNote(null, NUMBER, 'Идут проверки'), note('Идут проверки'))
})

test('к описанию автора блок дописывается в конец через пустую строку', () => {
  const body = applyNote('Дописала статью про `clamp()`.', NUMBER, 'Идут проверки')

  assert.equal(body, `Дописала статью про \`clamp()\`.\n\n${note('Идут проверки')}`)
})

test('повторная запись не размножает блок', () => {
  let body = applyNote('Текст автора.', NUMBER, 'Идут проверки')
  body = applyNote(body, NUMBER, 'Превью собрано')
  body = applyNote(body, NUMBER, 'Превью опубликовано')

  assert.equal(body.split(startMarker(NUMBER)).length - 1, 1)
  assert.equal(body, `Текст автора.\n\n${note('Превью опубликовано')}`)
})

test('текст автора вокруг блока не затирается', () => {
  const body = `Начало описания.\n\n${note('Идут проверки')}\n\nХвост описания.`

  assert.equal(applyNote(body, NUMBER, 'Превью опубликовано'), `Начало описания.\n\n${note('Превью опубликовано')}\n\nХвост описания.`)
})

test('чужой блок с другим номером остаётся нетронутым', () => {
  const foreign = note('Превью соседнего пулреквеста', 1234)
  const body = applyNote(foreign, NUMBER, 'Идут проверки')

  assert.ok(body.includes(foreign))
  assert.equal(body, `${foreign}\n\n${note('Идут проверки')}`)
})

test('свой блок правится, даже когда рядом стоит чужой', () => {
  const foreign = note('Превью соседнего пулреквеста', 1234)
  const body = applyNote(`${foreign}\n\n${note('Идут проверки')}`, NUMBER, 'Превью опубликовано')

  assert.equal(body, `${foreign}\n\n${note('Превью опубликовано')}`)
})

test('многострочное сообщение не ломает границы блока', () => {
  const message = 'Превью опубликовано.\n\n<details><summary>Затронутые материалы</summary></details>'
  const body = applyNote(applyNote('', NUMBER, message), NUMBER, 'Превью опубликовано')

  assert.equal(body, note('Превью опубликовано'))
})

test('поломанные границы не режут описание, а получают новый блок', () => {
  // Открывающий маркер автор стёр руками — вырезать кусок описания по одному
  // закрывающему маркеру нельзя.
  const body = applyNote(`Текст автора.\n${endMarker(NUMBER)}`, NUMBER, 'Идут проверки')

  assert.ok(body.startsWith(`Текст автора.\n${endMarker(NUMBER)}`))
  assert.ok(body.endsWith(note('Идут проверки')))
})

test('описание перечитывается перед записью', async () => {
  const github = fakeGithub('Первая версия описания.')
  // Автор правит описание, пока идёт сборка.
  github.state.body = 'Вторая версия описания.'

  await writeNote({ github, owner: 'doka-guide', repo: 'content', pullNumber: NUMBER, message: 'Превью опубликовано' })

  assert.equal(github.state.body, `Вторая версия описания.\n\n${note('Превью опубликовано')}`)
})

test('без изменений описание не переписывается', async () => {
  const github = fakeGithub(note('Идут проверки'))

  await writeNote({ github, owner: 'doka-guide', repo: 'content', pullNumber: NUMBER, message: 'Идут проверки' })

  assert.deepEqual(github.state.updates, [])
})

test('на устаревшем коммите заметка не пишется', async () => {
  const github = fakeGithub('Текст автора.', 'новый-коммит')

  const result = await writeNote({
    github,
    owner: 'doka-guide',
    repo: 'content',
    pullNumber: NUMBER,
    message: 'Превью не опубликовано',
    headSha: 'старый-коммит',
  })

  assert.equal(result, null)
  assert.equal(github.state.body, 'Текст автора.')
  assert.deepEqual(github.state.updates, [])
})

test('на актуальном коммите заметка пишется', async () => {
  const github = fakeGithub('Текст автора.', 'свежий-коммит')

  await writeNote({
    github,
    owner: 'doka-guide',
    repo: 'content',
    pullNumber: NUMBER,
    message: 'Превью опубликовано',
    headSha: 'свежий-коммит',
  })

  assert.equal(github.state.body, `Текст автора.\n\n${note('Превью опубликовано')}`)
})

test('цвет плашки задаётся итогом, неизвестный — синий по умолчанию', () => {
  assert.equal(applyNote('', NUMBER, 'Превью опубликовано', 'tip'), note('Превью опубликовано', NUMBER, 'TIP'))
  assert.equal(applyNote('', NUMBER, 'Сборка упала', 'caution'), note('Сборка упала', NUMBER, 'CAUTION'))
  assert.equal(applyNote('', NUMBER, 'Идут проверки', 'что-то'), note('Идут проверки'))
})

test('все строки сообщения остаются внутри плашки', () => {
  assert.equal(formatNote('Опубликовано.\n<details>…</details>\n\nХвост', 'tip'), '> [!TIP]\n> Опубликовано.\n> <details>…</details>\n>\n> Хвост')
})

test('блок в старом формате, без плашки, заменяется новым', () => {
  const old = `${startMarker(NUMBER)}\nИдут проверки\n${endMarker(NUMBER)}`
  assert.equal(applyNote(`Текст автора.\n\n${old}`, NUMBER, 'Превью опубликовано', 'tip'), `Текст автора.\n\n${note('Превью опубликовано', NUMBER, 'TIP')}`)
})

test('writeNote передаёт цвет плашки', async () => {
  const github = fakeGithub('Текст автора.')
  await writeNote({ github, owner: 'o', repo: 'r', pullNumber: NUMBER, message: 'Сборка упала', headSha: 'abc1234', tone: 'caution' })
  assert.equal(github.state.body, `Текст автора.\n\n${note('Сборка упала', NUMBER, 'CAUTION')}`)
})
