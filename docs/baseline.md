# Baseline

Когда вы пишете о новой возможности веб платформы, можно показать, как она работает в основных браузерах. Так читатель поймёт, готова ли фича для использования в проектах.

Мы используем для этого [Baseline](https://web.dev/baseline).

Вот как отображается информация о Baseline в Доке:

![Пример отображения информации о Baseline](./images/baseline.png)

## Как подключить Baseline к статье

Чтобы добавить Baseline к статье, надо указать baseline-конфиг в заголовке. Например:

```markdown
baseline:
  <!-- имя группы, обязательное поле -->
  - group: <baseline-group>
    features:
      <!-- список названий фич -->
      - <baseline-feature1>
      - <baseline-feature2>
```
С полным перечнем полей в заголовке можно ознакомиться в [документации](examples/doka.md).

Все фичи, которые поддерживает Baseline, можно найти в YML-файлах проекта [web-features](https://github.com/web-platform-dx/web-features/tree/main/features). [Документация на английском](https://github.com/web-platform-dx/web-features/tree/main/docs)

## Как найти нужную конфигурацию

Проект обладает удобным поиском [web-features-explorer](https://web-platform-dx.github.io/web-features-explorer/), с помощью которого легко найти нужный конфиг.

Для примера, найдём конфигурацию для доки о [CSS свойстве `display`](https://doka.guide/css/display/).
Новейшие значения этого свойства: `flex` и `grid`. Их и будем использовать:

1. С помощью поиска находим [страницу свойства](https://web-platform-dx.github.io/web-features-explorer/features/flexbox/).
1. Переходим по ссылке «[View the feature source file](https://github.com/web-platform-dx/web-features/blob/main/features/flexbox.yml)» внизу страницы.
1. Копируем имя файла конфигурации (без расширения) и вставляем в заголовок статьи как значение поля `group`.
1. Копируем значения свойств в списке `compat_features` и вставляем в заголовок статьи как значение поля `features`.

```markdown
baseline:
  - group: flexbox
    features:
      - css.properties.display.flex
      - css.properties.display.inline-flex
```

5. Добавляем также нужные свойства из конфига файла [`grid`](https://github.com/web-platform-dx/web-features/blob/main/features/grid.yml):

```markdown
baseline:
  - group: grid
    features:
      - css.properties.display.grid
      - css.properties.display.inline-grid
```

Итоговая конфигурация:

```markdown
baseline:
  - group: flexbox
    features:
      - css.properties.display.flex
      - css.properties.display.inline-flex
  - group: grid
    features:
      - css.properties.display.grid
      - css.properties.display.inline-grid
```

Готово!

## Как проверить конфигурацию

Убедиться в том, что конфигурация Baseline указана верно, поможет локальный запуск сайта. О том, как запустить Доку локально, читайте [в инструкции](https://github.com/doka-guide/platform/blob/main/docs/how-to-run.md). Если в конфигурации нет ошибок, baseline-плашка будет отображаться в конце статьи.

Дополнительный способ проверки — поиск с помощью npm-пакета `web-features`:

1. Установите пакет:
```sh
npm install web-features
```
2. Перейдите в каталог `node_modules/web-features`
3. Выполните поиск по полю `group` в файле `data.json`
4. Если группа указана верно, она будет соответствовать объекту c полями:
```js
{
  "compat_features": ..,
  "description": ..,
  "group": ..,
  "name": ..,
  "spec": ..,
  "status": ..
}
```
