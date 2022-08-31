🛠 Свойство `border-block` можно сочетать с обычным `border-inline`, тогда каждая граница рисуется отдельно друг от друга и соединяется под углом, образуя интересные фигуры:

```css
div {
  background-color: #F498AD;
  border-inline: 70px solid #2E9AFF;
  border-block: 70px solid white;
}
```

<iframe title="Пирамида из рамок" src="../demos/border-pyramid/" height="250"></iframe>

🛠 Для `border-block` можно сделать скругление с помощью `border-radius`:

```css
div {
  border-block: 20px solid white;
  border-radius: 10%;
}
```

<iframe title="Скругление рамок" src="../demos/border-block-rounding/" height="250"></iframe>

🎨 А если поэкспериментировать со стилями `border-block`, то несложно ощутить творческий порыв и изобразить фотоплёнку, флаг Австрии и ещё что в голову придёт:

```css
.film {
  background-color: #7b3f00;
  border-block: 30px dotted white;
}

.flag {
  background-color: white;
  border-block: 60px solid red;
}
```

<iframe title="Изображение фотоплёнки и флага с помощью рамок" src="../demos/border-block-film-and-flag/" height="250"></iframe>
