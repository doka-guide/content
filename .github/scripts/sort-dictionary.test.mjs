// node --test .github/scripts/sort-dictionary.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { sort, sortKey } from './sort-dictionary.mjs'

function sorted(input) {
  return JSON.parse(sort(JSON.stringify(input)))
}

test('ключ сортировки игнорирует служебные символы', () => {
  assert.equal(sortKey('(А|а)даптив'), 'аадаптив')
  assert.equal(sortKey('ховер(у|)'), 'ховеру')
})

test('запись со скобкой встаёт по слову, а не в начало', () => {
  const { dictionary } = sorted({ dictionary: ['яблоко', '(о+)чень', 'абажур'] })

  assert.deepEqual(dictionary, ['абажур', '(о+)чень', 'яблоко'])
})

test('раскладывает записи по спискам', () => {
  const result = sorted({ dictionary: ['ховер', 'WCAG'], latin: ['грид', 'OKLCH'] })

  assert.deepEqual(result.dictionary, ['грид', 'ховер'])
  assert.deepEqual(result.latin, ['OKLCH', 'WCAG'])
})

test('буква ё встаёт на своё место в алфавите', () => {
  const { dictionary } = sorted({ dictionary: ['мяч', 'мёрж', 'мама'] })

  assert.deepEqual(dictionary, ['мама', 'мёрж', 'мяч'])
})

test('убирает повторы', () => {
  const { dictionary } = sorted({ dictionary: ['ховер', 'ховер'], latin: ['ховер'] })

  assert.deepEqual(dictionary, ['ховер'])
})

test('повторный запуск ничего не меняет', () => {
  const once = sort(JSON.stringify({ dictionary: ['яблоко', 'абажур'], latin: ['WCAG'] }))

  assert.equal(sort(once), once)
})

test('файл заканчивается переводом строки', () => {
  assert.ok(sort('{"dictionary":["ховер"]}').endsWith('\n'))
})

test('переживает отсутствие списка латиницы', () => {
  const result = sorted({ dictionary: ['ховер'] })

  assert.deepEqual(result.latin, [])
})
