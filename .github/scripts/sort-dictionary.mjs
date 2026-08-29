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

export function sort(source) {
  const { dictionary = [], latin = [] } = JSON.parse(source)
  const all = [...new Set([...dictionary, ...latin])]
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
