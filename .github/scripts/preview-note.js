// Заметка превью в описании пулреквеста.
// Тесты: node --test .github/scripts/preview-note.test.js

// Заметка живёт в описании пулреквеста, а не отдельным комментарием: GitHub
// шлёт письмо на создание комментария, а правку описания не рассылает вовсе.
// Пишут её три джобы подряд, поэтому логика вынесена сюда — иначе она
// расползается по воркфлоу копиями, которые расходятся по мелочам.

// Границы блока помечены номером пулреквеста: в описание может попасть блок
// другого пулреквеста (например, при копировании описания), и трогать его
// нельзя.
const startMarker = (pullNumber) => `<!-- doka-preview-${pullNumber} -->`
const endMarker = (pullNumber) => `<!-- /doka-preview-${pullNumber} -->`

// Ставит блок в описание: заменяет прежний, если он есть, и дописывает в конец,
// если его ещё нет. Второй вызов не должен добавить второй блок, а текст автора
// вокруг блока должен остаться нетронутым.
const applyNote = (body, pullNumber, message) => {
  const start = startMarker(pullNumber)
  const end = endMarker(pullNumber)
  const block = `${start}\n${message}\n${end}`

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
const writeNote = async ({ github, owner, repo, pullNumber, message, headSha }) => {
  const { data: pull } = await github.rest.pulls.get({ owner, repo, pull_number: pullNumber })
  if (headSha && pull.head && pull.head.sha !== headSha) return null

  const body = applyNote(pull.body, pullNumber, message)
  if (body === (pull.body || '')) return body

  await github.rest.pulls.update({ owner, repo, pull_number: pullNumber, body })
  return body
}

module.exports = { startMarker, endMarker, applyNote, writeNote }
