// Проверка буквы «ё» в текстах Доки.
//
// Работает поверх CLI `eyo`: он делит замены на бесспорные («остается» →
// «остаётся») и спорные («берет» → «берёт», оно же головной убор). Бесспорные
// валят проверку, спорные только показываются — решать человеку.
//
// Свой скрипт нужен потому, что eyo ничего не знает про Markdown. В рецепте про
// валидацию он правил символьный класс регулярки — `[а-яА-ЯЁё]` превращалось в
// `[а-яА-ЯЕё]`, и проверка русских имён переставала пропускать букву Ё. Поэтому
// блоки и вставки кода закрываются от него маской, а для остальных случаев есть
// служебные комментарии.
//
// Зависимостей у скрипта нет: eyo приезжает через npx, package.json не нужен.
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

// Слова, которые заведомо не бывают с «ё» в наших текстах. Без этого списка
// в спорных местах тонут настоящие находки: на 26 ошибок в разделе css
// приходится 527 подсказок, и половина из них — «маркеры» и «разметка».
const IGNORE_FILE = '.yo-ignore'

const DISABLE_BLOCK = /<!--\s*eyo-disable\s*-->[\s\S]*?(?:<!--\s*eyo-enable\s*-->|$)/g
const DISABLE_NEXT_LINE = /<!--\s*eyo-disable-next-line\s*-->[^\n]*\n[^\n]*/g

// Закрывает от eyo всё, что трогать нельзя. Длина текста сохраняется, поэтому
// номера строк и колонок в его выводе совпадают с исходным файлом.
export function mask(text) {
  const hidden = new Array(text.length).fill(false)

  for (const pattern of [...CODE_PATTERNS, DISABLE_BLOCK, DISABLE_NEXT_LINE]) {
    for (const match of text.matchAll(pattern)) {
      for (let i = match.index; i < match.index + match[0].length; i++) hidden[i] = true
    }
  }

  // Буквы заменяем на «x», всё остальное оставляем: переводы строк должны
  // остаться на своих местах, иначе разъедется нумерация.
  return text
    .split('')
    .map((char, i) => (hidden[i] && /[А-Яа-яЁё]/.test(char) ? 'x' : char))
    .join('')
}

// Разбирает вывод `eyo --lint`. Формат стабильный и простой:
//   ✗ файл
//   Safe replacements:
//   1. остается → остаётся (1:10)
export function parse(output, fileByPath) {
  const found = []
  let file = null
  let safe = true

  for (const raw of output.split('\n')) {
    const line = raw.trim()
    // Имя файла eyo помечает значком, и значок зависит от исхода: ✗ — есть
    // бесспорные замены, ⚠ — только спорные. Поэтому опознаём файл по самому
    // пути, а не по значку: так разбор переживёт и новые значки, и попавшие в
    // тот же поток предупреждения npm.
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
    // Отчёт eyo печатает в stderr, а код возврата зависит от исхода: 0, когда
    // замены только спорные, и ненулевой, когда есть бесспорные. Поэтому берём
    // spawnSync и читаем оба потока независимо от кода.
    const result = spawnSync('npx', ['--yes', 'eyo', '--lint', '--no-colors', ...masked], {
      encoding: 'utf8',
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

// Скрипт можно и импортировать (так его проверяют тесты), поэтому запускаемся
// только когда node позвали именно этим файлом.
const entry = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : ''
if (import.meta.url === entry) {
  main()
}
