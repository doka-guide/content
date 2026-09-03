#!/usr/bin/env bash
#
# Делает работу и записывает её в main, переживая соседних ботов.
#
# В main пишет не один воркфлоу, и между чтением файлов и пушем успевает влезть
# соседний бот — пуш отклоняется с «fetch first». Реальное падение случилось на
# окне в 0.7 секунды. Очередь через `concurrency` тут не годится: GitHub держит
# ровно один ожидающий прогон, и третий мёрж вытеснит второй вместе с его
# работой. Поэтому на отказ в пуше работа переделывается с новой вершины: она
# идемпотентная, скрипты видят уже сделанное соседом и не дублируют его.
#
# Использование:
#   commit-and-push.sh <сообщение коммита> <команда> <pathspec>...
#
# Команда выполняется заново на каждой попытке, уже поверх свежей вершины.
# Коммитятся только перечисленные pathspec'и — всё остальное, что команда
# насорила в рабочем дереве, остаётся за бортом.
#
# Тесты: node --test .github/scripts/commit-and-push.test.js

# `set -e` здесь намеренно нет: отказ пуша — штатный исход, его разбирает цикл.
set -uo pipefail

MESSAGE="${1:-}"
COMMAND="${2:-}"
if [[ -z $MESSAGE || -z $COMMAND || $# -lt 3 ]]; then
  echo "::error::commit-and-push.sh <сообщение коммита> <команда> <pathspec>..." >&2
  exit 2
fi
shift 2
SPECS=("$@")

# Настройки вынесены в переменные окружения ради тестов: там нужны нулевые паузы
# и своя ветка.
ATTEMPTS="${COMMIT_AND_PUSH_ATTEMPTS:-5}"
BRANCH="${COMMIT_AND_PUSH_BRANCH:-main}"
REMOTE="${COMMIT_AND_PUSH_REMOTE:-origin}"
DELAY="${COMMIT_AND_PUSH_DELAY:-5}"

cd "$(git rev-parse --show-toplevel)" || exit 1

git config user.name "Doka Dog"
git config user.email "hi@doka.guide"

for attempt in $(seq 1 "$ATTEMPTS"); do
  if ! git fetch --quiet "$REMOTE" "$BRANCH"; then
    echo "::warning::Не удалось получить $REMOTE/$BRANCH, попытка $attempt из $ATTEMPTS"
    continue
  fi
  git reset --quiet --hard "$REMOTE/$BRANCH" || exit 1

  if ! bash -c "$COMMAND"; then
    echo "::error::Команда упала, коммитить нечего"
    exit 1
  fi

  staged=0
  for spec in "${SPECS[@]}"; do
    # `git add` падает с кодом 128 на pathspec, под который ничего не попало,
    # а `git status` в той же ситуации молчит. Поэтому добавляем по одному пути
    # и только когда по нему есть что добавлять — иначе удалённый когда-нибудь
    # раздел снова уронил бы весь прогон.
    if [[ -n "$(git status --porcelain -- "$spec")" ]]; then
      if ! git add -- "$spec"; then
        echo "::error::Не удалось добавить $spec"
        exit 1
      fi
      staged=1
    fi
  done

  if [[ $staged -eq 0 ]] || git diff --cached --quiet; then
    echo "Менять нечего"
    exit 0
  fi

  git commit --quiet -m "$MESSAGE" --author "Doka Dog <hi@doka.guide>" || exit 1

  if git push --quiet "$REMOTE" "HEAD:$BRANCH"; then
    echo "Записано в $BRANCH с попытки $attempt"
    exit 0
  fi

  echo "Пуш отклонён, попытка $attempt из $ATTEMPTS"
  # Ждём только между попытками. `[[ ]] && sleep` здесь нельзя: на последней
  # итерации он вернёт ненулевой код, и `pipefail` оборвёт вывод о том, чем
  # всё кончилось.
  if [[ $attempt -lt $ATTEMPTS ]]; then
    sleep $((attempt * DELAY))
  fi
done

echo "::error::Не удалось записать изменения за $ATTEMPTS попыток"
exit 1
