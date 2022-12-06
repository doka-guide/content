#!/bin/bash
options=("CSS" "HTML" "JavaScript" "Инструменты" "Рецепты" "Доступность" "Вопрос на собеседовании" "Ответ на собеседовании")
tags=("Дока" "Статья")

CATEGORY=""
TYPE=""
AUTHOR=""

function jsonValue() {
  KEY=$1
  num=$2
  awk -F"[,:}]" '{for(i=1;i<=NF;i++){if($i~/'$KEY'\042/){print $(i+1)}}}' | tr -d '"' | sed -n ${num}p
}
LOGIN=$(echo $(curl -s https://api.github.com/search/users\?q\=$(echo $(git config --get user.email)) | jsonValue login))

if [[ $LOGIN == "" ]]; then
  read -r -p "$(echo "Введите ник на GitHub: ")" AUTHOR
else
  read -r -p "$(echo "Введите ник на GitHub (нажмите Enter, и будет использован $LOGIN): ")" AUTHORss
fi

if [[ $AUTHOR == "" ]]; then
  AUTHOR=$LOGIN
fi

echo -e "\nДоступные разделы для публикации в Доке:"

PS3='Выберите раздел: '

select opt in "${options[@]}"
do
  case $opt in
    "CSS")
      CATEGORY=css
      break
      ;;
    "HTML")
      CATEGORY=html
      break
      ;;
    "JavaScript")
      CATEGORY=js
      break
      ;;
    "Инструменты")
      CATEGORY=tools
      break
      ;;
    "Рецепты")
      CATEGORY=recipes
      break
      ;;
    "Доступность")
      CATEGORY=a11y
      break
      ;;
    "Вопрос на собеседовании")
      CATEGORY=interviews
      break
      ;;
    "Ответ на собеседовании")
      CATEGORY=answers
      break
      ;;
    *) echo "Такого раздела ещё нет... Введите корректный номер";;
  esac
done

if [ "$CATEGORY" = "interviews" ]; then

  read -r -p "$(echo "Введите вопрос: ")" TITLE
  read -r -p "$(echo "Введите название папки (используется для формирования ссылки): ")" FOLDER

elif [ "$CATEGORY" = "answers" ]; then

  read -r -p "$(echo "Введите ответ: ")" TITLE
  read -r -p "$(echo "Введите название папки из папки interviews c вопросом, на который вы хотите ответить: ")" FOLDER

else

  echo -e "\nДоступные типы публикации в Доке:\nСтатья — расширенный материал, посвящённый определённому вопросу, с авторским мнением, примерами и рассуждениями\nДока — справочный материал, кратко и формально описывающий какое-то понятие"

  PS3='Выберите тип материала: '

  select tag in "${tags[@]}"
  do
    case $tag in
      "Статья")
        TYPE=article
        break
        ;;
      "Дока")
        TYPE=doka
        break
        ;;
      *) echo "Такого типа ещё нет... Введите корректный номер";;
    esac
  done

  read -r -p "$(echo "Введите название статьи: ")" TITLE
  read -r -p "$(echo "Введите название папки (используется для формирования ссылки): ")" FOLDER

fi

git checkout main
git pull

if [ "$CATEGORY" = "answers" ]; then

  while [ -d $(echo "interviews/$FOLDER") -a -h $(echo "interviews/$FOLDER") ]; do
    echo "К сожалению, $FOLDER не существует..."
    read -r -p "$(echo "Введите другое название папки: ")" FOLDER
  done

else

  while [ -d $(echo "$CATEGORY/$FOLDER") -a ! -h $(echo "$CATEGORY/$FOLDER") ]; do
    echo "К сожалению, $FOLDER уже существует..."
    read -r -p "$(echo "Введите другое название папки: ")" FOLDER
  done

fi

if [ "$CATEGORY" = "interviews" ]; then

git branch $(echo "question/$FOLDER")
git checkout $(echo "question/$FOLDER")

mkdir -p $(echo "$CATEGORY/$FOLDER")
touch $(echo "$CATEGORY/$FOLDER/index.md")

elif [ "$CATEGORY" = "answers" ]; then

git branch $(echo "answer/$AUTHOR@$FOLDER")
git checkout $(echo "answer/$AUTHOR@$FOLDER")

mkdir -p $(echo "interviews/$FOLDER/answers/$AUTHOR")
touch $(echo "interviews/$FOLDER/answers/$AUTHOR/index.md")

else

git branch $(echo "$TYPE/$FOLDER")
git checkout $(echo "$TYPE/$FOLDER")

mkdir $(echo "$CATEGORY/$FOLDER")
touch $(echo "$CATEGORY/$FOLDER/index.md")

fi

if [ "$CATEGORY" = "interviews" ]; then

cat <<EOF > $(echo "$CATEGORY/$FOLDER/index.md")
---
related:
  -
---

<!--
В related указываются ссылки на материалы Доки, в которых будет появляться вопрос в рубрике «На собеседовании»
-->

"$TITLE"

EOF

elif [ "$CATEGORY" = "answers" ]; then

cat <<EOF > $(echo "interviews/$FOLDER/answers/$AUTHOR/index.md")
---
included:
  -
excluded:
  -
---

<!--
1. Можно вообще удалить мету, тогда ответ будет на соответствующий вопрос во всех материалах, где вопрос появляется
2. В included можно указать пути только к тем материалам из поля related вопроса, в которых нужно показывать ответ
3. В excluded можно указать пути только к тем материалам из поля related вопроса, в которых не нужно показывать ответ
-->

**Что проверяют:**

**Ответ:**

EOF

else

cat <<EOF > $(echo "$CATEGORY/$FOLDER/index.md")
---
title: "$TITLE"
description: ""
authors:
  - $AUTHOR
related:
  - ""
tags:
  - $TYPE
---

<!--
1. В description есть описание для соцсетей и поисковиков, не больше 200 символов
2. В authors есть ники авторов основного текста
3. В contributors перечислены ники всех соавторов и тех, кто работал над текстом (дописали «На практике»? Переписали блок? Вам сюда)
4. В keywords записаны ключевые слова для SEO: пишем сюда слова или фразы, которых нет в тексте статьи, но по ним могут искать этот материал
5. Удалены все пустые теги в шапке
6. Подпапка автора есть в папке _people/_
7. Демки лежат в подпапке _demos/_
8. В related добавлено три ссылки на материалы Доки, которые будут предлагаться в конце. Не добавляем следующий или предыдущий материал в разделе
-->

## Кратко

## Пример

## Как пишется

## Как понять

EOF

fi

echo "Новый материал создан и находится в папке: $CATEGORY/$FOLDER"
