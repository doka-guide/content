🛠 Старайтесь использовать для кнопок с иконками видимые текстовые лейблы. Это поможет зрячим пользователям, так как [смысл иконок не всегда понятен](https://www.tempertemper.net/blog/what-i-wish-was-in-wcag-prohibit-icon-only-buttons/). Особенно трудно разобраться с иконками пользователям голосового управления и людям с когнитивными особенностями.

🛠 Хорошая альтернатива `aria-label` — визуально скрытый контент с классом `.visually-hidden` или `.vh`. Так избежите проблем с автоматическим переводом, а ещё его точно прочтёт скринридер в любом режиме навигации.

```html
<button>
  <svg viewBox="0 0 35 42" width="35" height="42" xmlns="http://www.w3.org/2000/svg">
    <!-- Описание фигуры -->
  </svg>
  <span class="visually-hidden">Пауза</span>
</button>
```

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  overflow: hidden;
  white-space: nowrap;
}
```

Если поддерживаете только новые браузеры, можно не использовать уже устаревшее свойство [`clip`](/css/clip/).
