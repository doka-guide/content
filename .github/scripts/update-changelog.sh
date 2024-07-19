#!/bin/bash
git diff --name-status HEAD^ HEAD | grep '^A' | grep -E '(html|css|js|tools|a11y|recipes)\/.*\/index\.md' | sed 's/^A\t//g' > added-content.txt

if [ -s added-content.txt ]; then
    MONTH_TO_RUS() {
    case "$1" in
        01) echo "января" ;;
        02) echo "февраля" ;;
        03) echo "марта" ;;
        04) echo "апреля" ;;
        05) echo "мая" ;;
        06) echo "июня" ;;
        07) echo "июля" ;;
        08) echo "августа" ;;
        09) echo "сентября" ;;
        10) echo "октября" ;;
        11) echo "ноября" ;;
        12) echo "декабря" ;;
    esac
    }

    MERGE_DATE=$(date -u +"%d %m")
    DAY=$(echo $MERGE_DATE | cut -d ' ' -f 1)
    MONTH=$(echo $MERGE_DATE | cut -d ' ' -f 2)
    RUS_MONTH=$(MONTH_TO_RUS $MONTH)
    FORMATTED_DATE="$DAY $RUS_MONTH"

    node .github/scripts/update-changelog.js "$FORMATTED_DATE"

    rm -f added-content.txt

    if [[ -z $(git status -s) ]]
    then
      echo $(git status)
    else
      git config --global user.name "Doka Dog"
      git config --global user.email "<hi@doka.guide>"

      git add CHANGELOG.md
      git commit -m "Обновляет CHANGELOG" --author "Doka Dog <hi@doka.guide>"

      git pull --rebase
      git push origin main

      exit
    fi
else
    echo "Новых материалов не было в предыдущем коммите"
fi
