🛠 Используя `::selection` и [`text-shadow`](/css/text-shadow/), можно достичь интересного эффекта, задав тексту несколько теней.

```css
p::selection {
  --color-shadow: #000000;
  color: #ffffff;
  background-color: #2e9aff;
  text-shadow:
    1px 0 1px var(--color-shadow),
    0 1px 1px var(--color-shadow),
    2px 1px 1px var(--color-shadow),
    1px 2px 1px var(--color-shadow),
    3px 2px 1px var(--color-shadow),
    2px 3px 1px var(--color-shadow);
}
```

<iframe title="::selection в сочетании с text-shadow" src="../demos/selection-with-text-shadow/" height="250"></iframe>
