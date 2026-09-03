// Проверка орфографии поверх CLI `cspell`. Слова из .yaspeller.json проверка
// пропускает: записи там — регулярки на слово целиком, `админ(ка|ке|ку)`.
//
// Проверить:  node .github/scripts/check-spelling.mjs css/grid/index.md
// Показать неизвестные слова списком:  ... --words

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'

const DICTIONARY = '.yaspeller.json'
const CONFIG = 'cspell.json'

// Словарь разделён на два списка, чтобы русские слова и латиница не мешались:
// dictionary — кириллица, latin — термины, имена и аббревиатуры.
export function loadDictionary(source) {
  const { dictionary = [], latin = [] } = JSON.parse(source)
  return [...dictionary, ...latin].map((entry) => new RegExp('^(?:' + entry + ')$', 'iu'))
}

export function isKnown(word, patterns) {
  return patterns.some((pattern) => pattern.test(word))
}

// Разбирает вывод cspell: `файл:строка:колонка - Unknown word (слово) Suggestions: [...]`
export function parse(output) {
  const found = []
  for (const line of output.split('\n')) {
    const match = line.match(/^(.+?):(\d+):(\d+)\s+-\s+Unknown word \((.+?)\)(?:\s+Suggestions:\s+\[(.*)\])?/)
    if (!match) continue
    found.push({
      file: match[1],
      line: Number(match[2]),
      column: Number(match[3]),
      word: match[4],
      suggestions: match[5] ? match[5].split(',').map((item) => item.trim()) : [],
    })
  }
  return found
}

function runCspell(files) {
  const result = spawnSync(
    'npx',
    [
      '--yes',
      '--package=cspell',
      '--package=@cspell/dict-ru_ru',
      'cspell',
      '--config',
      CONFIG,
      '--no-progress',
      '--no-summary',
      '--no-color',
      '--show-suggestions',
      ...files,
    ],
    { encoding: 'utf8' },
  )
  if (result.error) throw result.error
  return parse((result.stdout || '') + '\n' + (result.stderr || ''))
}

function main() {
  const args = process.argv.slice(2)
  const wordsOnly = args.includes('--words')
  const files = args.filter((arg) => !arg.startsWith('--') && arg.endsWith('.md') && fs.existsSync(arg))

  if (!files.length) {
    console.log('Нечего проверять.')
    return
  }

  const patterns = loadDictionary(fs.readFileSync(DICTIONARY, 'utf8'))
  const unknown = runCspell(files).filter((item) => !isKnown(item.word, patterns))

  if (!unknown.length) {
    console.log('Орфография в порядке.')
    return
  }

  if (wordsOnly) {
    console.log([...new Set(unknown.map((item) => item.word))].sort().join('\n'))
    return
  }

  console.log('Незнакомые слова:')
  for (const item of unknown) {
    const hint = item.suggestions.length ? `  похоже на: ${item.suggestions.slice(0, 3).join(', ')}` : ''
    console.log(`  ${item.file}:${item.line}:${item.column}  ${item.word}${hint}`)
  }
  console.log('')
  console.log(`Всего: ${unknown.length}. Почините опечатки, а термины добавьте в ${DICTIONARY}.`)
  process.exitCode = 1
}

// Скрипт ещё и импортируется тестами, поэтому запускаемся только напрямую.
const entry = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : ''
if (import.meta.url === entry) {
  main()
}
