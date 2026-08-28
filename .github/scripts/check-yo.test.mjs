// node --test .github/scripts/check-yo.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { mask, parse, replaceAt } from './check-yo.mjs'

const SCRIPT = fileURLToPath(new URL('./check-yo.mjs', import.meta.url))

function withFile(text, run) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yo-test-'))
  const file = path.join(dir, 'index.md')
  fs.writeFileSync(file, text)
  try {
    return run(file)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

// Запускает скрипт целиком: с сетью, через npx, как в жизни.
function runScript(file, args = []) {
  try {
    const stdout = execFileSync(process.execPath, [SCRIPT, ...args, file], { encoding: 'utf8' })
    return { code: 0, stdout }
  } catch (error) {
    return { code: error.status, stdout: error.stdout || '' }
  }
}

test('маска сохраняет длину и количество строк', () => {
  const text = 'Первая строка\n```js\nconst a = 1\n```\nПоследняя'
  const masked = mask(text)
  assert.equal(masked.length, text.length)
  assert.equal(masked.split('\n').length, text.split('\n').length)
})

test('маска прячет блоки кода', () => {
  // Регрессия: eyo правил символьный класс регулярки — `[а-яА-ЯЁё]`
  // превращалось в `[а-яА-ЯЕё]`, и валидация имён теряла букву Ё.
  const masked = mask('```html\n<input pattern="^[а-яА-ЯЁё]+$">\n```')
  assert.ok(!masked.includes('ЯЁё'), 'кириллица внутри кода должна быть закрыта')
})

test('маска прячет вставки кода в строке', () => {
  assert.ok(!mask('Свойство `остается` тут').includes('остается'))
})

test('маска прячет блок между eyo-disable и eyo-enable', () => {
  const text = 'Виден остается\n<!-- eyo-disable -->\nСкрыт остается\n<!-- eyo-enable -->\nСнова остается'
  const masked = mask(text)
  assert.equal(masked.split('\n')[0], 'Виден остается')
  assert.ok(!masked.split('\n')[2].includes('остается'))
  assert.equal(masked.split('\n')[4], 'Снова остается')
})

test('маска прячет строку после eyo-disable-next-line', () => {
  const masked = mask('<!-- eyo-disable-next-line -->\nСкрыт остается\nВиден остается')
  assert.ok(!masked.split('\n')[1].includes('остается'))
  assert.equal(masked.split('\n')[2], 'Виден остается')
})

test('маска переживает незакрытый блок кода', () => {
  assert.doesNotThrow(() => mask('Текст\n```js\nconst a = 1\n'))
})

test('разбор делит замены на бесспорные и спорные', () => {
  const output = [
    '✗ /tmp/0-index.md',
    'Safe replacements:',
    '1. остается → остаётся (1:10)',
    '---',
    'Not safe replacements:',
    '1. берет → берёт (2:4)',
    '---',
  ].join('\n')
  const found = parse(output, new Map([['/tmp/0-index.md', 'css/grid/index.md']]))

  assert.equal(found.length, 2)
  assert.deepEqual(
    found.map((item) => [item.file, item.before, item.after, item.line, item.column, item.safe]),
    [
      ['css/grid/index.md', 'остается', 'остаётся', 1, 10, true],
      ['css/grid/index.md', 'берет', 'берёт', 2, 4, false],
    ],
  )
})

test('разбор опознаёт файл и когда замены только спорные', () => {
  // В этом случае eyo помечает файл значком ⚠, а не ✗.
  const output = ['⚠ /tmp/0-index.md', 'Not safe replacements:', '1. берет → берёт (2:4)', '---'].join('\n')
  const found = parse(output, new Map([['/tmp/0-index.md', 'css/grid/index.md']]))

  assert.equal(found.length, 1)
  assert.equal(found[0].file, 'css/grid/index.md')
  assert.equal(found[0].safe, false)
})

test('разбор не спотыкается о предупреждения npm в том же потоке', () => {
  const output = ['npm warn EBADDEVENGINES что-то', '⚠ /tmp/0-index.md', 'Not safe replacements:', '1. берет → берёт (2:4)'].join('\n')
  const found = parse(output, new Map([['/tmp/0-index.md', 'css/grid/index.md']]))

  assert.equal(found.length, 1)
  assert.equal(found[0].file, 'css/grid/index.md')
})

test('замена по координатам ставит слово на место', () => {
  assert.equal(replaceAt('Значение остается тут', 1, 10, 'остается', 'остаётся'), 'Значение остаётся тут')
})

test('замена не трогает текст, если слово не совпало', () => {
  const text = 'Значение остается тут'
  assert.equal(replaceAt(text, 1, 3, 'остается', 'остаётся'), text)
})

test('бесспорный пропуск валит проверку', () => {
  const result = withFile('Значение остается пустым.\n', (file) => runScript(file))
  assert.equal(result.code, 1)
  assert.match(result.stdout, /остается → остаётся/)
})

test('спорные места показываются, но проверку не валят', () => {
  // «берет» — это ещё и головной убор, решать человеку.
  const result = withFile('Он берет шляпу и уходит.\n', (file) => runScript(file))
  assert.equal(result.code, 0)
  assert.match(result.stdout, /Спорные места/)
  assert.match(result.stdout, /берет → берёт\?/)
})

test('чистый текст проходит проверку', () => {
  const result = withFile('Значение остаётся пустым.\n', (file) => runScript(file))
  assert.equal(result.code, 0)
  assert.match(result.stdout, /Буква «ё» на месте/)
})

test('код не правится даже в режиме --fix', () => {
  const text = '```html\n<input pattern="^[а-яА-ЯЁё]+$">\n```\n'
  withFile(text, (file) => {
    runScript(file, ['--fix'])
    assert.equal(fs.readFileSync(file, 'utf8'), text)
  })
})

test('--fix чинит бесспорное и не трогает спорное', () => {
  withFile('Значение остается. Он берет шляпу.\n', (file) => {
    runScript(file, ['--fix'])
    const fixed = fs.readFileSync(file, 'utf8')
    assert.match(fixed, /остаётся/)
    assert.match(fixed, /берет/, 'спорное слово должно остаться нетронутым')
  })
})

test('--fix уважает eyo-disable-next-line', () => {
  const text = '<!-- eyo-disable-next-line -->\nЗначение остается тут.\n'
  withFile(text, (file) => {
    runScript(file, ['--fix'])
    assert.equal(fs.readFileSync(file, 'utf8'), text)
  })
})

test('слово из .yo-ignore не показывается среди спорных', () => {
  // «маркеры» в наших текстах не бывают «маркёрами», слово в списке.
  const result = withFile('Список маркеры тут.\n', (file) => runScript(file))
  assert.equal(result.code, 0)
  assert.doesNotMatch(result.stdout, /маркеры/)
})

test('.yo-ignore не прячет бесспорные ошибки', () => {
  const result = withFile('Значение остается пустым.\n', (file) => runScript(file))
  assert.equal(result.code, 1)
  assert.match(result.stdout, /остается → остаётся/)
})
