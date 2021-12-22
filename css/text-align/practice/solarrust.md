🛠 Свойство `text-align` можно использовать не только для выравнивания текста в строчных элементах, но и для выравнивания строчно-блочных (`inline-block`) элементов внутри родителя.

_С появлением [флексбоксов](/css/flexbox-guide/) такое решение теряет свою популярность, но знать о нём стоит._

Простая разметка из родительского блока и трёх строчно-блочных вложенных элементов:

```html
<div class="parent">
  <div class="child">1</div>
  <div class="child">2</div>
  <div class="child">3</div>
</div>
```

```css
.parent {
  box-sizing: border-box;
  width: 80%;
  margin: 0 auto;
  padding: 25px;
}

.child {
  box-sizing: border-box;
  display: inline-block; /* Меняем отображение на строчно-блочное */
  width: 125px;
  height: 125px;
  padding: 25px;
  text-align: center; /* Выравниваем текст внутри блоков */
  font-size: 75px;
  line-height: 75px;
  font-weight: bold;
}
```

<iframe title="Выравнивание строчно-блочных элементов в контейнере" src="../demos/block-align/" height="175"></iframe>

Добавим элементу `.parent` свойство `text-align: center` и элементы `.child` выровняются по центру родителя:

<iframe title="Выравнивание по центру строчно-блочных элементов в контейнере" src="../demos/block-align-2/" height="175"></iframe>

А если попробовать распределить вложенные элементы равномерно по ширине родителя, задав `text-align: justify`?

<iframe title="Выравнивание по ширине строчно-блочных элементов в контейнере" src="../demos/block-align-3/" height="175"></iframe>

Ожидаемого поведения не получилось, и вот почему 👇

🛠 У значения `justify` хитрая логика. Чтобы можно было равномерно распределить элементы внутри родителя нужно задать этому самому родителю пустой строчно-блочный псевдоэлемент с шириной 100%.

```css
.parent::after {
  content: "";
  display: inline-block;
  width: 100%;
}
```

<iframe title="Выравнивание по ширине строчно-блочных элементов в контейнере" src="../demos/block-align-4/" height="175"></iframe>
