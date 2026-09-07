#!/usr/bin/env bash
#
# Обслуживание main одной джобой: мета, даты, словарь, ченджлог — и один коммит.
#
# Раньше это были четыре отдельных воркфлоу, и каждый пушил в main сам. Пуши
# сталкивались друг с другом, а ещё будили цепочку выкатки по нескольку раз: на
# коммитах cdd51348 и af32aa64 «Product Deploy» стартовал трижды за сорок
# секунд, и три `rsync --archive --delete` шли параллельно в живой продакшен.
#
# Использование:
#   main-maintenance.sh          работа и коммит с повторами
#   main-maintenance.sh --run    только работа, без коммита — так её зовёт цикл
#   main-maintenance.sh --paths  что боту разрешено коммитить
#
# Тесты: node --test .github/scripts/commit-and-push.test.js

# `set -e` здесь намеренно нет, см. комментарий у `step`.
set -uo pipefail

SCRIPT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"
cd "$(git rev-parse --show-toplevel)" || exit 1

# Сообщение коммита фиксированное: по нему `main-maintenance.yml` отсекает
# собственный коммит бота и не будит воркфлоу заново. Меняешь здесь — меняй и
# условие `if:` в воркфлоу.
MESSAGE="Обновляет мету, даты, словарь и ченджлог"

SECTIONS=(a11y css html js recipes tools)

# Что боту разрешено коммитить.
#
# В pathspec у git НЕТ альтернации: строка `(a11y|css)/**/index.md` ищется как
# каталог с буквальными скобками, не находится, и `git add` падает с кодом 128 —
# а через `conclusion == 'success'` это уносит ещё и публикацию сайта. Префикс
# `:(glob)` альтернацию не добавляет, фигурные скобки `{a11y,css}` тоже. Поэтому
# разделы перечисляются явно.
#
# И наоборот: без `:(glob)` звёздочка перескакивает через слеши, так что
# `**/index.11tydata.json` подмело бы ещё `pages/` и `people/`, которых
# обслуживание не касается.
paths() {
  local specs=()
  local section
  for section in "${SECTIONS[@]}"; do
    specs+=( ":(glob)$section/**/index.md" ":(glob)$section/**/index.11tydata.json" )
  done
  specs+=( .yaspeller.json CHANGELOG.md )
  printf '%s\n' "${specs[@]}"
}

# Шаги намеренно не объединены под общим `set -e`. `frontmatter.js` делает
# `process.exit(1)` на любой кривой мете, и в одной цепочке одна опечатка
# остановила бы даты, словарь, ченджлог и публикацию сайта. Раньше это были
# отдельные воркфлоу, и падение одного не мешало остальным. Мету и так сторожит
# проверка «Мета» в пулреквесте, так что упавший шаг помечаем предупреждением
# и идём дальше.
step() {
  local title="$1"
  shift
  echo "::group::$title"
  if "$@"; then
    echo "::endgroup::"
  else
    echo "::endgroup::"
    echo "::warning::$title — шаг упал, продолжаем без него"
  fi
}

# Мета: сначала выгрузка фронтматтера, потом проверка. Если выгрузка не удалась,
# проверять нечего — `frontmatter.js` читает как раз `result.json`. Сам
# `result.json` служебный и в коммит не идёт: его нет среди `paths`.
#
# Ключ `--fix` убран: он включал пересборку шапки, которая ломала `baseline` —
# массив объектов уходил в файл как `- [object Object]`, — а рвала файл жадная
# регулярка `---(.|\n)*---\n`, хватавшая всё до последнего `---` в тексте. Шаг
# теперь только проверяет наличие полей, авторов и ссылок в `related`.
meta() {
  # Ровно один уровень: статьи лежат в `раздел/слаг/index.md`, а `**` забрал бы
  # ещё оглавления разделов вроде `recipes/index.md`, у которых меты нет и не
  # должно быть.
  local patterns=()
  local section
  for section in "${SECTIONS[@]}"; do
    patterns+=( "$section/*/index.md" )
  done
  npx --yes yaml-cat --format json --output result.json "${patterns[@]}" || return 1
  node .github/scripts/frontmatter.js
}

# Даты проставляются коммиту, ради которого затеяно обслуживание, а не вершине
# ветки: на повторной попытке вершина уже принадлежит чужому пушу.
dates() {
  TARGET_SHA="${TARGET_SHA:-}" node .github/scripts/update-dates.js
}

dictionary() {
  node .github/scripts/sort-dictionary.mjs
}

changelog() {
  local sha="${TARGET_SHA:-HEAD}"
  local merged_at
  # Дата коммиттера, а не автора: при «Rebase and merge» дата автора осталась бы
  # исходной, и запись уехала бы на дни назад, возможно в чужой месяц.
  merged_at="$(git show -s --format=%cI "$sha")" || return 1
  MERGE_SHA="$sha" MERGED_AT="$merged_at" node .github/scripts/update-changelog.js
}

run_all() {
  step "Мета" meta
  step "Даты" dates
  step "Словарь" dictionary
  step "Ченджлог" changelog
  # Из скрипта всегда выходим с нулём: упавший шаг не должен уносить остальные,
  # коммит и публикацию сайта.
  return 0
}

case "${1:-}" in
  --paths)
    paths
    ;;
  --run)
    run_all
    ;;
  '')
    # Без `mapfile`: на macOS у разработчиков bash 3.2, а скрипт должен
    # запускаться и руками.
    specs=()
    while IFS= read -r spec; do
      specs+=( "$spec" )
    done < <(paths)
    exec bash .github/scripts/commit-and-push.sh "$MESSAGE" "bash '$SCRIPT' --run" "${specs[@]}"
    ;;
  *)
    echo "Неизвестный ключ: $1" >&2
    exit 2
    ;;
esac
