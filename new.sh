#!/bin/bash
options=("CSS" "HTML" "JavaScript" "Инструменты" "Рецепты")
tags=("Дока" "Статья")

CATEGORY=""
TYPE=""
AUTHOR=""

read -r -p "$(echo "Введите название статьи: ")" TITLE
read -r -p "$(echo "Введите название папки (используется для формирования ссылки): ")" FOLDER

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
    *) echo "Такого раздела ещё нет... Введите корректный номер";;
  esac
done

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

git checkout main
git pull

while [ -d $(echo "$CATEGORY/$FOLDER") -a ! -h $(echo "$CATEGORY/$FOLDER") ]; do
  echo "К сожалению, $FOLDER уже существует..."
  read -r -p "$(echo "Введите другое название папки: ")" FOLDER
done

git branch $(echo "article/$FOLDER")
git checkout $(echo "article/$FOLDER")


mkdir $(echo "$CATEGORY/$FOLDER")
touch $(echo "$CATEGORY/$FOLDER/index.md")
cat <<EOF > $(echo "$CATEGORY/$FOLDER/index.md")
---
title: "$TITLE"
description: ""
authors:
  - $AUTHOR
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
-->

## Кратко

## Пример

## Как пишется

## Как понять

EOF

echo "Новый материал создан и находится в папке: $CATEGORY/$FOLDER"
