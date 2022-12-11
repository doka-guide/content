🛠 В данный момент список стилизуемых при помощи `accent-color` элементов довольно небольшой. В ближайшее время планируется, что список будет пополняться. Но как сделать красивыми все контролы форм прямо сейчас?

Адам Аргайл и Джо Архар предложили в статье «[CSS accent-color](https://web.dev/accent-color/)» классный сниппет. Добавьте его в свой код, поменяйте цвета на нужные и наслаждайтесь красивыми формами!

```css
html {
  --brand: hotpink;
  scrollbar-color: hotpink Canvas;
}

:root { accent-color: var(--brand); }
:focus-visible { outline-color: var(--brand); }
::selection { background-color: var(--brand); }
::marker { color: var(--brand); }

:is(
  ::-webkit-calendar-picker-indicator,
  ::-webkit-clear-button,
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button
) {
  color: var(--brand);
}
```
