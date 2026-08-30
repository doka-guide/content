// node --test .github/scripts/check-spelling.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { loadDictionary, isKnown, parse } from './check-spelling.mjs'

const SCRIPT = fileURLToPath(new URL('./check-spelling.mjs', import.meta.url))
const ROOT = fileURLToPath(new URL('../..', import.meta.url))

// Запускает скрипт целиком, из корня репозитория: он читает cspell.json и словарь.
function runScript(text) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'spell-test-'))
  const file = path.join(ROOT, 'test-' + path.basename(dir) + '.md')
  fs.writeFileSync(file, text)
  try {
    const result = spawnSync(process.execPath, [SCRIPT, path.relative(ROOT, file)], {
      encoding: 'utf8',
      cwd: ROOT,
    })
    return { code: result.status, stdout: result.stdout || '' }
  } finally {
    fs.rmSync(file, { force: true })
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

test('запись словаря покрывает все свои формы', () => {
  const patterns = loadDictionary('{"dictionary":["админ(ка|ке|ку)"]}')

  assert.ok(isKnown('админка', patterns))
  assert.ok(isKnown('админке', patterns))
  assert.ok(isKnown('админку', patterns))
})

test('запись словаря не покрывает лишнего', () => {
  const patterns = loadDictionary('{"dictionary":["админ(ка|ке|ку)"]}')

  assert.ok(!isKnown('админ', patterns), 'запись описывает слово целиком')
  assert.ok(!isKnown('админкам', patterns))
})

test('нулевое окончание записывается одиночным разделителем', () => {
  const patterns = loadDictionary('{"dictionary":["ховер(у|)"]}')

  assert.ok(isKnown('ховер', patterns))
  assert.ok(isKnown('ховеру', patterns))
})

test('регистр не важен', () => {
  const patterns = loadDictionary('{"dictionary":["адаптив"]}')

  assert.ok(isKnown('Адаптив', patterns))
  assert.ok(isKnown('АДАПТИВ', patterns))
})

test('латиница берётся из отдельного списка', () => {
  const patterns = loadDictionary('{"dictionary":["ховер"],"latin":["OKLCH"]}')

  assert.ok(isKnown('ховер', patterns))
  assert.ok(isKnown('OKLCH', patterns))
})

test('разбор вывода cspell достаёт слово и координаты', () => {
  const found = parse('css/grid/index.md:12:5 - Unknown word (шорткат)')

  assert.equal(found.length, 1)
  assert.deepEqual(
    [found[0].file, found[0].line, found[0].column, found[0].word],
    ['css/grid/index.md', 12, 5, 'шорткат'],
  )
})

test('разбор достаёт подсказки, когда они есть', () => {
  const found = parse('a.md:1:1 - Unknown word (ашипка) Suggestions: [шапка, шайка]')

  assert.deepEqual(found[0].suggestions, ['шапка', 'шайка'])
})

test('разбор не спотыкается о посторонние строки', () => {
  assert.deepEqual(parse('npm warn что-то\nПроверено 3 файла'), [])
})

test('слово из словаря проверку не валит', () => {
  const result = runScript('Этот шорткат работает во всех браузерах.\n')

  assert.equal(result.code, 0, result.stdout)
  assert.match(result.stdout, /Орфография в порядке/)
})

test('опечатка валит проверку и показывает подсказку', () => {
  const result = runScript('Браузер сам расчитывает размеры.\n')

  assert.equal(result.code, 1)
  assert.match(result.stdout, /расчитывает/)
  assert.match(result.stdout, /рассчитывает/)
})

test('код не проверяется', () => {
  const result = runScript('Пример:\n\n```js\nconst ashipka = 1 // ашипка тут\n```\n')

  assert.equal(result.code, 0, result.stdout)
})

test('фронтматтер не проверяется на служебные поля', () => {
  const result = runScript('---\ntags:\n  - doka\n---\n\nОбычный текст статьи.\n')

  assert.equal(result.code, 0, result.stdout)
})
