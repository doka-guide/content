# Контент Доки

[![Статус EditorConfig](https://github.com/doka-guide/content/workflows/EditorConfig/badge.svg)](https://github.com/doka-guide/content/actions?query=workflow%3AEditorConfig)
[![Статус спеллера](https://github.com/doka-guide/content/workflows/YaSpeller%20All/badge.svg)](https://github.com/doka-guide/content/actions?query=workflow%3AYaSpeller%20All)
[![Статус словаря](https://github.com/doka-guide/content/workflows/Sort%20Dictionary/badge.svg)](https://github.com/doka-guide/content/actions?query=workflow%3ASort%20Dictionary)
[![Статус деплоя](https://github.com/doka-guide/content/workflows/Product%20Deploy/badge.svg)](https://github.com/doka-guide/content/actions?query=workflow%3AProduct%20Deploy)
[![Дискорд](https://img.shields.io/discord/1006904139969724436)](https://discord.gg/Ncpvbun2mr)

[⚠️ Если сайт Доки медленно загружается или не работает совсем](docs/load-fix.md)

Дока — это добрая энциклопедия для веб-разработчиков. Наша цель — сделать документацию по веб-разработке практичной, понятной и не унылой.

## Как устроена Дока

Дока состоит из двух репозиториев: [платформа](https://github.com/doka-guide/platform) на базе [Eleventy](https://www.11ty.dev) собирает статьи из репозитория с контентом (мы сейчас в нём), и на выходе получается наш красивый [сайт](https://doka.guide/).

📘 Этот репозиторий содержит только тексты статей и материалов проекта «[Дока](https://doka.guide/)»!

## Внесите свой вклад

Дока постоянно развивается. Вы можете писать статьи, помогать с разработкой или редактированием. Вы можете всё! Прекрасный мир опенсорса 🧚‍♀️

Почитайте, [чем можно помочь Доке](docs/contributing.md).

Присоединяйтесь к [нашему сообществу в Дискорде](https://discord.gg/Ncpvbun2mr), чтобы быть в курсе последних новостей.

## Станьте автором

Хотите писать для Доки? Вам поможет [руководство по стилю](docs/styleguide.md).

Прочитали и готовы?

1. Форкните [репозиторий с контентом](https://github.com/doka-guide/content) и склонируйте его к себе.
1. Определитесь с форматом материала (дока или статья) и,
    - если такой статьи ещё нет, откройте форк в терминале и введите `./new.sh`. Когда вы ответите на несколько вопросов, останется открыть созданный файл `index.md` и начать писать. Также можно создать статью вручную [по инструкции](docs/contributing.md).
    - если статья уже есть, откройте её, и можете работать с текстом: вносить изменения, добавлять что-то полезное.
1. Напишите статью (не забывайте сверяться с [руководством по стилю](docs/styleguide.md)). Всё, что хорошо выглядит в маркдауне, будет хорошо выглядеть на сайте. Если вы хотите предпросматривать статью локально, почитайте [инструкцию по предпросмотру](docs/preview.md).
1. Дополнительные материалы: картинки, [демки](docs/demos/index.md), блок «[На практике](docs/practice.md)» сохраняйте в ту же папку, в подпапки _images_, _demos_, _practice_ и так далее.
1. Запустите автоматическую проверку орфографии командой `npx yaspeller --only-errors --file-extensions ".md,.html" *` (вы можете отредактировать это выражение, чтобы протестировать только те файлы, которые вы меняли).
1. Закончили? Создайте пул-реквест. Вот и всё! После небольшой проверки ваш материал появится на сайте Доки!

---

Распространяется под лицензиями [CC BY-NC-SA 4.0](LICENSE-SA.md) и [CC BY-NC-ND 4.0](LICENSE-ND.md), подробнее читайте [в документации](docs/license.md).
