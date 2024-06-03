В [Safari до 17 версии](https://bugs.webkit.org/show_bug.cgi?id=242685) был баг, из-за которого у всех элементов `<header>` со страницы вычислялась роль `banner`.

```html
<header>
  <!-- Элементы хедера сайта -->
</header>
<main>
  <article>
    <header>
      <!-- Содержимое хедера article -->
    </header>
    <!-- Какой-то текст -->
  </article>
</main>
```

Из-за этого в списке ориентиров накапливалось приличное количество `banner`.
