# Baseline

Когда вы пишете о новой возможности в JavaScript или CSS, можно показать, как она работает в основных браузерах. Так читатель поймёт, готова ли фича для использования в проектах.

Мы используем для этого [Baseline](https://web.dev/baseline).

Вот как отображается информация о Baseline в Доке:

![Пример отображения информации о Baseline](./images/baseline.png)

## Как подключить Baseline к статье

Что бы добавить Baseline к статье надо указать baseline-конфиг в заголовке статьи.

Для это используется служебное поле `baseline` в заголовке. Разбирём абстрактный пример конфигурации:

```markdown
...
description: "Описание для соцсетей, 160-200 символов
baseline:
  - group: <baseline-group>
    features:
      - <baseline-feature1>
      - <baseline-feature2>
authors:
  - Никнейм основного автора
...
```
Где:
`<baseline-group>`, — имя группы, обязательное поле;
`<baseline-feature1>`, `<baseline-feature2>` — имена одной или нескольких фич.

Все фичи, которые поддерживает Baseline можно найти в `.yml`-файлах проекта [web-features](https://github.com/web-platform-dx/web-features/tree/main/features) от W3C WebDX Community Group. А документация на английском [тут](https://github.com/web-platform-dx/web-features/tree/main/docs)

### Как найти необходимую конфигурацию

Поиск нужного конфига в репозитории не так то прост.
К счастью, проект обладает удобным web-поиском: [web-features-explorer](https://web-platform-dx.github.io/web-features-explorer/)

Попробуем, для примера, найти Baseline-конфигурацию для доки о[ CSS свойстве `display`](https://doka.guide/css/display/).
Новейшие значения этого свойства: `flex` и `grid`. Их и будем использовать:

1. С помощью поиска находим [страницу свойства](https://web-platform-dx.github.io/web-features-explorer/features/flexbox/);
2. Переходим по ссылке [feature source file](https://github.com/web-platform-dx/web-features/blob/main/features/flexbox.yml) внизу страницы;
3. Копируем значения свойства `group` и нужные `compat_features` и вставляем в заголовок статьи:
```markdown
baseline:
  - group: flexbox
    features:
      - css.properties.display.flex
      - css.properties.display.inline-flex
```

4. Добавим также нужные свойства из конфиг файла [`grid`](https://github.com/web-platform-dx/web-features/blob/main/features/grid.yml):
```markdown
baseline:
  - group: flexbox
    features:
      - css.properties.display.flex
      - css.properties.display.inline-flex
      - css.properties.display.grid
      - css.properties.display.inline-grid
```

Готово!
