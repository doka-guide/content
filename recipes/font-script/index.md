---
title: "Скрипт для генерации набора шрифтов"
description: "Начните следующий проект с подготовки набора шрифтов"
authors:
  - igsekor
tags:
  - article
---

## Задача

Каждый разработчик сталкивается с большим количеством рутинных задач. Одной из них является подготовка шрифтов. В зависимости от дизайна, требованиям к скорости загрузки, возможной поддержки нескольких языков и прочих условий, эта работа может занимать довольно много времени.

Существует множество практических советов, как реализовать эту задачу максимально круто. Но все они сводятся к большому количеству рутинных действий. Причём ежедневно подготовкой шрифтов не занимается. Нужно время на то, чтобы вспомнить, как использовать инструменты, наверняка пару раз что-то пойдёт не так. Я предлагаю максимально сосредоточится на процессе разработки, а не на скучных и однообразных действиях. Если есть возможность что-то автоматизировать, то я удержаться не могу.

## Готовое решение

Вам понадобиться:

1. Терминал, который поддерживает команды Unix-подобных операционных систем: терминал на macOS или Linux, WSL под Windows.
2. Node.js — среда выполнения для языка JavaScript, о которой подробнее написано в статье «[Что такое Node.js](/tools/nodejs/)».
3. [Glyphanger](https://www.npmjs.com/package/glyphhanger) — популярный инструмент для работы со шрифтами, который модно установить командой: `npm install -g glyphhanger`.

Я использую заранее заготовленный скрипт для проектов. Например, если в проекте нужно, чтобы была широкая поддержка семейства шрифтов _Fira_ для поддержки латиницы и кириллицы, кода и математических выражений я использую вот такой скрипт _font.sh_:

```bash
# Основной скрипт для генерации файлов шрифтов
GENERATE_FONT() {
  for i in "${!SUBSETNAMES[@]}"; do
    for j in "${!FORMATS[@]}"; do
      for k in "${!FILENAMES[@]}"; do
        INPUT="$INPUTPATH/${FILENAMES[k]}-subset.${FORMATS[j]}"
        OUTPUT="$OUTPUTPATH/${FILENAMES[k]}-${SUBSETNAMES[i]}.${FORMATS[j]}"
        echo "----------------\n$INPUT -> $OUTPUT\n----------------\n"
        glyphhanger --whitelist="${SUBSETCODES[i]}" --formats="${FORMATS[j]}" --subset="$INPUTPATH/${FILENAMES[k]}.$EXTENSION" --css
        mv $(echo "$INPUT") $(echo "$OUTPUT")
      done
    done
  done
}

# Глобальные переменные
# Набор названий для сабсетов
SUBSETNAMES=("Latin" "LatinSupplement" "LatinExtendedA" "LatinExtendedB" "GreekCoptic" "Cyrilic" "CyrilicSupplement")

# Набор диапозонов кодов глифов для каждого из сабсетов
SUBSETCODES=("0000−007F" "0080−00FF" "0100−017F" "0180−024F" "0370−03FF" "0400−04FF" "0500−052F")
FORMATS=("woff" "woff2")

# Набор значений переменных для шрифта FiraSans
FILENAMES=("FiraSans-Black" "FiraSans-BlackItalic" "FiraSans-Bold" "FiraSans-BoldItalic" "FiraSans-ExtraBold" "FiraSans-ExtraBoldItalic" "FiraSans-ExtraLight" "FiraSans-LightItalic" "FiraSans-Italic" "FiraSans-Light" "FiraSans-LightItalic" "FiraSans-Medium" "FiraSans-MediumItalic" "FiraSans-Regular" "FiraSans-SemiBold" "FiraSans-SemiBoldItalic" "FiraSans-Thin" "FiraSans-ThinItalic")
EXTENSION="ttf"
INPUTPATH="./service/fonts/Fira-Sans"
OUTPUTPATH="./src/fonts/Fira-Sans"
GENERATE_FONT

# Набор значений переменных для шрифта FiraCode
FILENAMES=("FiraCode-Bold" "FiraCode-Light" "FiraCode-Medium" "FiraCode-Regular" "FiraCode-SemiBold")
EXTENSION="ttf"
INPUTPATH="./service/fonts/Fira-Code"
OUTPUTPATH="./src/fonts/Fira-Code"
GENERATE_FONT

# Набор значений переменных для шрифта FiraMath
FILENAMES=("FiraMath-Regular")
EXTENSION="otf"
INPUTPATH="./service/fonts/Fira-Math"
OUTPUTPATH="./src/fonts/Fira-Math"
GENERATE_FONT
```

Такой скрипт позволяет любому участнику проекта быстро сгенерировать или обновить набор шрифтов проекта. Исходники лежат в _ ./service/fonts/\<Название-Шрифта\>_, скрипт создаст нужные шрифты и положит в папку _ ./src/fonts/\<Название-Шрифта\>_.

Установите права на исполнение:

```bash
chmod 755 font.sh
```

Запустить скрипт можно так:

```bash
sh font.sh
```

## Разбор решения

### Основа скрипта

Основой для работы является функция, которая позволяет сгенерировать набор файлов с помощью утилиты Glyphhanger:

```bash
GENERATE_FONT() {
for i in "${!SUBSETNAMES[@]}"; do
    for j in "${!FORMATS[@]}"; do
      for k in "${!FILENAMES[@]}"; do
        INPUT="$INPUTPATH/${FILENAMES[k]}-subset.${FORMATS[j]}"
        OUTPUT="$OUTPUTPATH/${FILENAMES[k]}-${SUBSETNAMES[i]}.${FORMATS[j]}"
        echo "----------------\n$INPUT -> $OUTPUT\n----------------\n"
        glyphhanger --whitelist="${SUBSETCODES[i]}" --formats="${FORMATS[j]}" --subset="$INPUTPATH/${FILENAMES[k]}.$EXTENSION" --css
        mv $(echo "$INPUT") $(echo "$OUTPUT")
      done
    done
  done
}
```

Вы всегда сможете вместо этой утилиты использовать какую-то другую. По аналогии можно автоматизировано сжать картинки или подготовить картинки в разных форматах и размерах с помощью [Squoosh](https://squoosh.app).

### Подходы к реализации

Такую функцию можно использовать в интерактивных скриптах, которые взаимодействуют с командной строкой. Достаточно считать аргументы, в которых можно передать значения, например, имена директорий для исходных и конечных файлов. Обработать аргументы можно так:

```bash
POSITIONAL_ARGS=()

while [[ $# -gt 0 ]]; do
  case $1 in
    -i|--input-path)
      INPUT_PATH="$2"
      shift # ключ
      shift # значение
      ;;
    -o|--output-path)
      OUPUT_PATH="$2"
      shift # ключ
      shift # значение
      ;;
    -*|--*)
      echo "Неизвестный ключ $1"
      exit 1
      ;;
    *)
      POSITIONAL_ARGS+=("$1") # сохранить значения аргументов
      shift # последний аргумент
      ;;
  esac
done

set -- "${POSITIONAL_ARGS[@]}" # restore positional parameters

# Для примера просто выведем аргументы на экран
echo "INPUT_PATH = ${INPUT_PATH}"
echo "OUPUT_PATH = ${OUPUT_PATH}"

if [[ -n $1 ]]; then
    echo "Аргумент не известен:"
    tail -1 "$1"
fi
```

Теперь можно запустить командой:

```bash
sh script.sh -i digits -o alphabet
```
