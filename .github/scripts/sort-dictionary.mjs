// Приводит словарь в порядок: раскладывает записи по спискам и сортирует.
//
// Запускается после вливания в main, потому что коммитить в ветку из форка
// бот не может. Правьте словарь как удобно — порядок наведётся сам.
//
// Проверить у себя:  node .github/scripts/sort-dictionary.mjs

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const DICTIONARY = '.yaspeller.json'
const CYRILLIC = /[Ѐ-ӿ]/

// Сортируем по слову, а не по служебным символам: «(А|а)даптив» должен стоять
// на «адаптив», а не в начале файла из-за скобки.
export function sortKey(entry) {
  return entry.replace(/[()|+*?[\]]/g, '').toLowerCase()
}

// Типовые русские окончания. Нужны, чтобы отдельно дописанное «фолбэков»
// сложилось с уже существующим «фолбэк(|а|и)», а не осталось второй записью.
const ENDINGS = new Set(
  ('а е и й о у ы ю я ам ах ая ев ем ей ие ий им их ов ое ой ом ому ую ые ый ым ых ям ях ' +
    'ами ями ного ному ными')
    .split(' '),
)

// Складывает записи с одной основой: «бандл(а)» и «бандл(ов|ы)» — одно слово,
// а не два. Записи так копятся сами: дописал форму, не заметив старой строки.
export function merge(entries) {
  const byStem = new Map()
  const bare = []

  for (const entry of entries) {
    const match = entry.match(/^([^()]+)(?:\((.*)\))?$/)
    if (!match) {
      bare.push(entry)
      continue
    }
    const [, stem, ends] = match
    if (!byStem.has(stem)) byStem.set(stem, new Set())
    for (const end of ends === undefined ? [''] : ends.split('|')) byStem.get(stem).add(end)
  }

  // Слово целиком может оказаться формой другой основы: «фолбэков» → «фолбэк».
  for (const stem of [...byStem.keys()]) {
    if (byStem.get(stem).size !== 1 || !byStem.get(stem).has('')) continue
    for (const other of byStem.keys()) {
      if (other === stem || !stem.startsWith(other)) continue
      const rest = stem.slice(other.length)
      if (!ENDINGS.has(rest)) continue
      byStem.get(other).add(rest)
      byStem.delete(stem)
      break
    }
  }

  const merged = [...byStem].map(([stem, ends]) => {
    if (ends.size === 1 && ends.has('')) return stem
    const ordered = [...ends].sort((a, b) => a.length - b.length || a.localeCompare(b, 'ru'))
    return stem + '(' + ordered.join('|') + ')'
  })

  return [...merged, ...bare]
}

export function sort(source) {
  const { dictionary = [], latin = [] } = JSON.parse(source)
  const all = merge([...new Set([...dictionary, ...latin])])
  const byKey = (a, b) => sortKey(a).localeCompare(sortKey(b), 'ru')

  return (
    JSON.stringify(
      {
        dictionary: all.filter((entry) => CYRILLIC.test(entry)).sort(byKey),
        latin: all.filter((entry) => !CYRILLIC.test(entry)).sort(byKey),
      },
      null,
      2,
    ) + '\n'
  )
}

function main() {
  const before = fs.readFileSync(DICTIONARY, 'utf8')
  const after = sort(before)

  if (before === after) {
    console.log('Словарь и так в порядке.')
    return
  }

  fs.writeFileSync(DICTIONARY, after)
  console.log('Словарь отсортирован.')
}

// Скрипт ещё и импортируется тестами, поэтому запускаемся только напрямую.
const entry = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : ''
if (import.meta.url === entry) {
  main()
}
