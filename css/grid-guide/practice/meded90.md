Грид выручит, когда нужно сверстать сложную сетку, которая  меняется в зависимости от размеров экрана устройства. Возьмём пример с интерфейсом онлайн-магазина:

![пример сетки с использованием гридов для десктоп](images/practice-desktop.png)
Сетка десктопа

![пример сетки с использованием гридов для мобильной версии](images/practice-mobile.png)
Сетка мобильной версии

В мобильной версии нужно сильно поменять порядок отображения, а для SEO нужно сохранить определённый порядок.

В демо ниже используются именованные области для расположения элементов. При переключении на мобильную версию элементы перестраиваются в нужном порядке за счёт изменения расположения именованных областей

```css
.cart-product {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-template-areas:
    "image       image       image         title        title    title"
    "image       image       image         price        rating   rating"
    "features    features    features      price        payment  payment"
    "description description description   description  reviews  reviews  "
    "shipping    contact     availability  availability warranty sizes"
    "material    material    related       related      related  related";
}

@media (max-width: 720px) {
  .cart-product {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "image        image    price       rating"
      "image        image    description description"
      "title        title    title       title"
      "reviews      reviews  features    features"
      "availability payment  shipping    contact"
      "warranty     warranty sizes       sizes"
      "warranty     warranty sizes       sizes"
      "material     material material    related";
  }
}
```

<iframe title="Гибкая сетка на гридах" src="../demos/mobile-example/" height="680"></iframe>

<!-- yaspeller ignore:start -->

Балдин Кирилл — наставник на курсе «[Мидл фронтенд-разработчик](https://practicum.yandex.ru/middle-frontend/?utm_source=pr&utm_medium=content&utm_campaign=middle-frontend_doka_content)» в Яндекс Практикуме.

<!-- yaspeller ignore:end -->
