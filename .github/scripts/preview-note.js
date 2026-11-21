// Заметка превью в описании пулреквеста.
// Тесты: node --test .github/scripts/preview-note.test.js

// Заметка живёт в описании пулреквеста, а не отдельным комментарием: GitHub
// шлёт письмо на создание комментария, а правку описания не рассылает вовсе.
// Пишут её несколько джоб подряд, поэтому логика вынесена сюда — иначе она
// расползается по воркфлоу копиями, которые расходятся по мелочам.

// Границы блока помечены номером пулреквеста: в описание может попасть блок
// другого пулреквеста (например, при копировании описания), и трогать его
// нельзя.
const startMarker = (pullNumber) => `<!-- doka-preview-${pullNumber} -->`
const endMarker = (pullNumber) => `<!-- /doka-preview-${pullNumber} -->`

// Заметка оформлена плашкой GitHub (`> [!NOTE]` и соседи). Обычной строкой она
// сливалась с текстом автора, а цветная рамка отбивает её и сразу говорит об
// итоге: синяя — сборка идёт или ждёт, зелёная — превью готово, жёлтая —
// превью не собиралось, красная — сломалась сама сборка.
const TONES = { note: 'NOTE', tip: 'TIP', warning: 'WARNING', caution: 'CAUTION' }

// Каждая строка сообщения уходит в цитату: без `>` вторая строка, например
// раскрывашка со ссылками, выпала бы из плашки.
const formatNote = (message, tone = 'note') => {
  const kind = TONES[tone] || TONES.note
  const lines = String(message)
    .split('\n')
    .map((line) => (line ? `> ${line}` : '>'))
  return [`> [!${kind}]`, ...lines].join('\n')
}

// Ставит блок в описание: заменяет прежний, если он есть, и дописывает в конец,
// если его ещё нет. Второй вызов не должен добавить второй блок, а текст автора
// вокруг блока должен остаться нетронутым. Закрывающий маркер — HTML-комментарий,
// он сам обрывает цитату, и текст автора после блока в плашку не попадает.
const applyNote = (body, pullNumber, message, tone) => {
  const start = startMarker(pullNumber)
  const end = endMarker(pullNumber)
  const block = `${start}\n${formatNote(message, tone)}\n${end}`

  const current = body || ''
  const from = current.indexOf(start)
  const to = current.indexOf(end)

  // `to > from` отсекает описание с поломанными границами — например, когда
  // закрывающий маркер остался, а открывающий автор стёр руками. Дописать блок
  // в конец безопаснее, чем вырезать кусок описания по случайным индексам.
  if (from !== -1 && to !== -1 && to > from) {
    return current.slice(0, from) + block + current.slice(to + end.length)
  }

  return current.trimEnd() ? `${current.trimEnd()}\n\n${block}` : block
}

// Описание перечитывается прямо перед записью: автор мог поправить его, пока
// шли проверки и сборка.
//
// `headSha` — коммит, к которому относится заметка. Пока шла сборка, автор мог
// запушить ещё раз: заметка от прогона на устаревшем коммите затёрла бы свежую,
// и в описании навсегда осталось бы «не опубликовано» от позапрошлой попытки.
// Возвращает `null`, если писать нечего.
const writeNote = async ({ github, owner, repo, pullNumber, message, headSha, tone }) => {
  const { data: pull } = await github.rest.pulls.get({ owner, repo, pull_number: pullNumber })
  if (headSha && pull.head && pull.head.sha !== headSha) return null

  const body = applyNote(pull.body, pullNumber, message, tone)
  if (body === (pull.body || '')) return body

  await github.rest.pulls.update({ owner, repo, pull_number: pullNumber, body })
  return body
}

module.exports = { startMarker, endMarker, formatNote, applyNote, writeNote }
