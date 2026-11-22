🛠 Свойство `overflow` пригодится, чтобы обрезать текст с многоточием. Для одной строки `overflow: hidden` сочетают со свойством [`text-overflow: ellipsis`](/css/text-overflow/), а для нескольких строк — с `-webkit-line-clamp`:

```css
.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
```

<iframe title="Многоточие в одной и нескольких строках" src="../demos/ellipsis/" height="250"></iframe>

Несмотря на префикс, `-webkit-line-clamp` описан в спецификации CSS Overflow 4 и работает во всех браузерах. Но только в связке с устаревшими `display: -webkit-box` и `-webkit-box-orient: vertical`. Стандартное свойство `line-clamp` без префикса и без этой связки пока есть только в Safari Technology Preview и за флагом в тестовых сборках Chrome и Firefox.

Обрезанный текст зрячий пользователь целиком не прочитает. Обрезайте только то, что дублируется в другом месте, например, превью статьи со ссылкой на полный текст. Атрибут `title` с полным текстом не спасёт: подсказку не увидеть ни с клавиатуры, ни на тач-экране.
