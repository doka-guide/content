🛠 Свойство `content` со значением `counter()` активно применяется в случаях, когда нужно расставить автоматическую нумерацию элементов, не относящихся к спискам:

```html
<section>
  <h2>Внутренний механизм</h2>
  <p>Механизм счётчика состоит из:</p>
  <ul>
    <li>кнопки;</li>
    <li>пронумерованных кругов;</li>
    <li>колеса прокрутки;</li>
  </ul>
</section>

<section>
  <h2>Принцип действия</h2>
  <p>Принцип действия..</p>
</section>

<section>
  <h2>См. также</h2>
  <ul>
    <li>Механический счётчик</li>
    <li>Электронный счётчик импульсов</li>
  </ul>
</section>
```

```css
body {
  counter-reset: cnt;
}

section {
  counter-increment: cnt;
  position: relative;
}

section h2::before {
  content: counter(cnt);
  position: absolute;
  left: -45px;
  top: -2px;
}
```

<iframe title="Кастомный счётчик" src="../demos/counter/" height="550"></iframe>

🛠 ...или красиво оформить нумерованный перечень

```html
<h2>Наши преимущества:</h2>
<ul class="benefits">
  <li class="benefits-item">Низкие цены</li>
  <li class="benefits-item">Большая база поставщиков</li>
  <li class="benefits-item">Быстрая доставка</li>
</ul>
```

```css
.benefits {
  counter-reset: benefits;
}

.benefits-item {
  counter-increment: benefits;
}

.benefits-item::before {
  content: counter(benefits);
  position: absolute;
  font-size: 190px;
  font-weight: bold;
  left: 0;
  top: -0.35em;
  opacity: 0.5;
  color: #2E9AFF;
}
```

<iframe title="Нумерованный перечень" src="../demos/list/" height="566"></iframe>
