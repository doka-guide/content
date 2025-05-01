#!/bin/bash
git diff --name-status HEAD~2...HEAD | grep '^A' | grep -E '(html|css|js|tools|a11y|recipes)\/.*\/index\.md' | sed 's/^A\t//g' > added-content.txt
git diff -S"placeholder" --name-status HEAD~2...HEAD | grep '^M' | grep -E '(html|css|js|tools|a11y|recipes)\/.*\/index\.md' | sed 's/^M\t//g' > updated-content.txt

if [ -s added-content.txt ]; then
    node .github/scripts/update-changelog.js

    rm -f added-content.txt
    rm -f updated-content.txt

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
