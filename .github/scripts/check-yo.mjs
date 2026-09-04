// Проверка буквы «ё» поверх CLI `eyo`. Бесспорные замены валят проверку,
// спорные только показываются. Код закрыт от eyo маской: он не знает про
// Markdown и правит текст внутри блоков кода, включая регулярки.
//
// Проверить:  node .github/scripts/check-yo.mjs css/grid/index.md
// Починить:   node .github/scripts/check-yo.mjs --fix css/grid/index.md

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'

// Куски, которые eyo видеть не должен.
const CODE_PATTERNS = [
  /```[\s\S]*?(?:```|$)/g, // блоки кода, в том числе незакрытые
  /`[^`\n]*`/g, // вставки кода в строке
]

// Слова, которые в наших текстах не бывают с «ё». Без списка настоящие
// находки тонут среди подсказок.
const IGNORE_FILE = '.yo-ignore'

const DISABLE_BLOCK = /<!--\s*eyo-disable\s*-->[\s\S]*?(?:<!--\s*eyo-enable\s*-->|$)/g
const DISABLE_NEXT_LINE = /<!--\s*eyo-disable-next-line\s*-->[^\n]*\n[^\n]*/g

// То же, что в check-spelling.mjs: аудит npm упирается в выводимый из
// эксплуатации эндпоинт и держит шаг минутами вместо секунд.
const NPM_ENV = { ...process.env, npm_config_audit: 'false', npm_config_fund: 'false' }

// Длина текста сохраняется, поэтому строки и колонки в выводе eyo совпадают
// с исходным файлом.
export function mask(text) {
  const hidden = new Array(text.length).fill(false)

  for (const pattern of [...CODE_PATTERNS, DISABLE_BLOCK, DISABLE_NEXT_LINE]) {
    for (const match of text.matchAll(pattern)) {
      for (let i = match.index; i < match.index + match[0].length; i++) hidden[i] = true
    }
  }

  // Меняем только буквы: переводы строк должны остаться на местах.
  return text
    .split('')
    .map((char, i) => (hidden[i] && /[А-Яа-яЁё]/.test(char) ? 'x' : char))
    .join('')
}

// Разбирает вывод `eyo --lint`:
//   ✗ файл
//   Safe replacements:
//   1. остается → остаётся (1:10)
export function parse(output, fileByPath) {
  const found = []
  let file = null
  let safe = true

  for (const raw of output.split('\n')) {
    const line = raw.trim()
    // Опознаём файл по пути, а не по значку: он зависит от исхода (✗ или ⚠),
    // и в тот же поток попадают предупреждения npm.
    const candidate = line.replace(/^\S+\s+/, '')
    if (fileByPath.has(candidate)) {
      file = fileByPath.get(candidate)
      continue
    }
    if (line.startsWith('Safe replacements')) {
      safe = true
      continue
    }
    if (line.startsWith('Not safe replacements')) {
      safe = false
      continue
    }
    const match = line.match(/^\d+\.\s+(\S+)\s+→\s+(\S+)\s+\((\d+):(\d+)\)$/)
    if (match && file) {
      found.push({
        file,
        safe,
        before: match[1],
        after: match[2],
        line: Number(match[3]),
        column: Number(match[4]),
      })
    }
  }
  return found
}

// Заменяет слово в конкретной строке и колонке.
export function replaceAt(text, line, column, before, after) {
  const lines = text.split('\n')
  const index = line - 1
  if (index >= lines.length) return text
  const start = column - 1
  if (lines[index].slice(start, start + before.length) !== before) return text
  lines[index] = lines[index].slice(0, start) + after + lines[index].slice(start + before.length)
  return lines.join('\n')
}

function runEyo(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'doka-yo-'))
  const fileByPath = new Map()
  const masked = []

  files.forEach((file, i) => {
    const target = path.join(dir, `${i}-${path.basename(file)}`)
    fs.writeFileSync(target, mask(fs.readFileSync(file, 'utf8')))
    fileByPath.set(target, file)
    masked.push(target)
  })

  try {
    // eyo печатает отчёт в stderr, а код возврата зависит от исхода. Читаем
    // оба потока независимо от кода.
    const result = spawnSync('npx', ['--yes', 'eyo', '--lint', '--no-colors', ...masked], {
      encoding: 'utf8',
      env: NPM_ENV,
    })
    if (result.error) throw result.error

    return parse((result.stdout || '') + '\n' + (result.stderr || ''), fileByPath)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

function readIgnored() {
  if (!fs.existsSync(IGNORE_FILE)) return new Set()
  return new Set(
    fs
      .readFileSync(IGNORE_FILE, 'utf8')
      .split('\n')
      .map((line) => line.trim().toLowerCase())
      .filter((line) => line && !line.startsWith('#')),
  )
}

function main() {
  const args = process.argv.slice(2)
  const fix = args.includes('--fix')
  const files = args.filter((arg) => !arg.startsWith('--') && arg.endsWith('.md') && fs.existsSync(arg))

  if (!files.length) {
    console.log('Нечего проверять.')
    return
  }

  const found = runEyo(files)
  const ignored = readIgnored()
  const errors = found.filter((item) => item.safe)
  const doubts = found.filter((item) => !item.safe && !ignored.has(item.before.toLowerCase()))

  if (errors.length) {
    console.log(fix ? 'Исправлено:' : 'Не хватает «ё»:')
    for (const item of errors) {
      console.log(`  ${item.file}:${item.line}:${item.column}  ${item.before} → ${item.after}`)
    }
  }

  if (fix) {
    // Правим с конца строки, чтобы ранние замены не сдвигали поздние.
    for (const file of new Set(errors.map((item) => item.file))) {
      let text = fs.readFileSync(file, 'utf8')
      const forFile = errors.filter((item) => item.file === file).sort((a, b) => b.column - a.column)
      for (const item of forFile) {
        text = replaceAt(text, item.line, item.column, item.before, item.after)
      }
      fs.writeFileSync(file, text)
    }
  }

  if (doubts.length) {
    console.log('')
    console.log('Спорные места — проверку не валят, но посмотрите глазами:')
    for (const item of doubts) {
      console.log(`  ${item.file}:${item.line}:${item.column}  ${item.before} → ${item.after}?`)
    }
    console.log('')
    console.log('Если замена не нужна, оставьте как есть или закройте место комментарием:')
    console.log('  <!-- eyo-disable-next-line -->')
  }

  if (!errors.length && !doubts.length) {
    console.log('Буква «ё» на месте.')
    return
  }
  if (errors.length && !fix) {
    console.log('')
    console.log(`Бесспорных пропусков: ${errors.length}. Почините или запустите с --fix.`)
    process.exitCode = 1
  }
}

// Скрипт ещё и импортируется тестами, поэтому запускаемся только напрямую.
const entry = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : ''
if (import.meta.url === entry) {
  main()
}
