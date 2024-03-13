🛠 SEO-специалисты советуют соблюдать определенное максимальное количество заголовков, например, использовать:
- `<h2>` — не больше двух, максимум трёх раз;
- `<h3>` — 4-5 раз и так далее.

К сожалению, такой совет часто разбивается о скалы реальности, например, если у вас лендинг с большим количеством секций и секция с множеством карточек:

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Best Company</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="header">
      <h1 class="header__heading"></h1>
    </header>
    <main class="content">
      <section class="promo">
        <h2 class="promo__heading"></h2>
        ...
      </section>

      <section class="about-company">
        <h2 class="about-company__heading"></h2>
        ...
      </section>

      <section class="teams">
        <h2 class="teams__heading"></h2>
        ...
      </section>

      <section class="why-us">
        <h2 class="why-us__heading"></h2>

        <article class="card">
          <h3 class="card__title"></h3>
        </article>
        <article class="card">
          <h3 class="card__title"></h3>
        </article>
        <article class="card">
          <h3 class="card__title"></h3>
        </article>
        ...
      </section>

      <section class="faq">
        <h2 class="faq__heading"></h2>
        ...
      </section>

      ...
    </main>
  </body>
</html>
```

Секций и карточек может быть сколько угодно, в попытке ограничить количество заголовков вы навредите семантике и доступности. Поэтому при написании разметки в первую очередь думайте о пользователях, руководствуйтесь здравым смыслом и берите в расчёт контент сайта 😊
