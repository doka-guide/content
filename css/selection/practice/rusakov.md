🛠 Есть интересный подход с использованием `::selection` и `text-shadow`, а точнее можно достичь одного интересного эффекта, используя несколько теней текста.

```css
p::selection {
  --color-shadow: #000;
  color: #fff;
  background-color: #2e9aff;
  text-shadow: 1px 0 1px var(--color-shadow),
              0 1px 1px var(--color-shadow),
              2px 1px 1px var(--color-shadow),
              1px 2px 1px var(--color-shadow),
              3px 2px 1px var(--color-shadow),
              2px 3px 1px var(--color-shadow);
}
```

<iframe title="Пример c text-shadow" src="demos/selection-with-text-shadow/" height="250"></iframe>
