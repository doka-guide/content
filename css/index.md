---
name: 'CSS'
groups:
  - name: 'Основы'
    items:
      - box-model
      - specificity
      - cascade
      - inheritance
      - stacking-context
      - pixel-perfect
      - css-rule
      - comments
      - vendor-prefixes
      - adding-styles
      - display
      - all
  - name: 'Селекторы'
    items:
      - tag-selector
      - class-selector
      - id-selector
      - nesting-selector
      - universal-selector
      - attribute-selector
      - combined-selectors
      - selector-list
  - name: 'Псевдоклассы'
    items:
      - pseudoclasses
      - link
      - visited
      - hover
      - active
      - child
      - nth-of-type
      - focus
      - focus-visible
      - focus-within
      - not
      - checked
      - disabled-enabled
      - empty
      - has
      - is
      - where
      - in-range-out-of-range
      - required
      - invalid-valid
      - placeholder-shown
      - default
      - lang
      - root
  - name: 'Псевдоэлементы'
    items:
      - pseudoelements
      - before
      - after
      - content
      - placeholder
      - first-letter
      - first-line
      - selection
  - name: 'Функции'
    items:
      - attr
      - calc
      - min
      - max
      - linear-gradient
      - repeating-linear-gradient
      - radial-gradient
      - repeating-radial-gradient
      - conic-gradient
      - repeating-conic-gradient
      - image-set
      - var
      - filter-functions
      - transform-function
  - name: 'Директивы'
    items:
      - font-face
      - import
      - keyframes
      - media
      - supports
  - name: 'Глобальные ключевые слова'
    items:
      - global-keywords
  - name: 'Цвета в вебе'
    items:
      - web-colors
      - currentcolor
  - name: 'Единицы измерения'
    items:
      - numeric-types
      - vw-vh
      - rem-em
  - name: 'Анимации'
    items:
      - animation
      - keyframes
      - animation-delay
      - animation-direction
      - animation-duration
      - animation-fill-mode
      - animation-iteration-count
      - animation-name
      - animation-play-state
      - animation-timing-function
      - transition
      - transition-delay
      - transition-duration
      - transition-property
      - transition-timing-function
  - name: 'Трансформации'
    items:
      - transform
      - transform-function
      - transform-origin
      - transform-style
      - perspective
      - perspective-origin
      - backface-visibility
  - name: 'Фон'
    items:
      - background
      - background-color
      - background-image
      - background-position
      - background-repeat
      - background-size
      - background-attachment
      - background-clip
      - background-origin
      - background-blend-mode
      - linear-gradient
      - repeating-linear-gradient
      - radial-gradient
      - repeating-radial-gradient
      - conic-gradient
      - repeating-conic-gradient
      - image-set
      - backdrop-filter
      - filter-functions
  - name: 'Работа с текстом'
    items:
      - color
      - font-family
      - font-size
      - line-height
      - text-align
      - text-transform
      - vertical-align
      - font-face
      - font-style
      - font-weight
      - font-display
      - font
      - font-smooth
      - letter-spacing
      - text-decoration
      - text-decoration-color
      - text-decoration-line
      - text-decoration-style
      - text-decoration-thickness
      - text-decoration-skip-ink
      - text-rendering
      - text-shadow
      - white-space
      - quotes
      - overflow-wrap
      - hyphens
      - text-indent
      - text-justify
      - text-orientation
      - text-overflow
      - text-size-adjust
      - text-underline-offset
      - text-underline-position
      - word-break
      - word-spacing
      - word-wrap
      - writing-mode
      - tab-size
  - name: 'Вариативные шрифты'
    items:
      - font-feature-settings
      - font-kerning
      - font-language-override
      - font-optical-sizing
      - font-size-adjust
      - font-stretch
      - font-synthesis
      - font-variant
      - font-variant-alternates
      - font-variant-caps
      - font-variant-east-asian
      - font-variant-ligatures
      - font-variant-numeric
      - font-variant-position
      - font-variation-settings
  - name: 'Размеры и отступы'
    items:
      - width
      - height
      - padding
      - margin
      - box-sizing
      - min
      - max
  - name: 'Позиционирование'
    items:
      - position
      - position-sticky
      - stacking-context
      - z-index
      - inset
  - name: 'Списки'
    items:
      - list-style
      - list-style-image
      - list-style-position
      - list-style-type
  - name: 'Флексбоксы'
    items:
      - flexbox-guide
      - flex
      - flex-basis
      - flex-direction
      - flex-flow
      - flex-grow
      - flex-shrink
      - flex-wrap
      - order
  - name: 'Гриды'
    items:
      - grid-guide
      - grid
      - grid-area
      - grid-auto-columns-rows
      - grid-auto-flow
      - grid-column-row
      - grid-start-end
      - grid-template
      - grid-template-areas
      - grid-template-columns
      - grid-template-rows
  - name: 'Выравнивание блоков'
    items:
      - justify-content
      - justify-items
      - justify-self
      - align-content
      - align-items
      - align-self
      - place-items
      - place-self
      - gap
      - column-row-gap
  - name: 'Формы'
    items:
      - focus
      - checked
      - disabled-enabled
      - in-range-out-of-range
      - invalid-valid
      - required
      - appearance
      - resize
      - caret-color
      - accent-color
  - name: '!important'
    items:
      - important
  - name: 'Видимость'
    items:
      - opacity
      - visibility
      - clip
  - name: 'Переполнение'
    items:
      - overflow
  - name: 'Обтекаемость'
    items:
      - float
  - name: 'Работа с изображениями'
    items:
      - object-fit
      - object-position
      - aspect-ratio
      - filter
      - filter-functions
  - name: 'Рамки, обводки и тени'
    items:
      - border
      - border-image
      - border-style
      - border-radius
      - border-color
      - border-width
      - outline
      - outline-color
      - outline-offset
      - outline-style
      - outline-width
      - box-shadow
      - text-shadow
  - name: 'Интерфейс и взаимодействия'
    items:
      - cursor
      - user-select
      - touch-action
      - pointer-events
      - resize
      - scroll-behavior
      - scroll-padding
  - name: 'SVG'
    items:
      - fill
      - stroke
  - name: 'Кастомные свойства'
    items:
      - custom-properties
      - root
      - var
  - name: 'Стили для печати'
    items:
      - widows
  - name: 'Колонки и таблицы'
    items:
      - columns
      - column-count
      - column-width
      - column-fill
      - column-span
      - column-rule
      - column-rule-color
      - column-rule-style
      - column-rule-width
      - caption-side
  - name: 'Счётчики'
    items:
      - css-counters
      - counter-set
      - counter-reset
      - counter-increment
      - counter-counters
---

CSS — язык каскадных стилей, который задаёт визуальное оформления для [HTML](/html/), SVG и других языков разметки.
