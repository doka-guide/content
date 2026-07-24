---
title: "Core Web Vitals"
description: "Разбираем метрики веба от Google: LCP, INP, CLS, FCP и TTFB. Что они измеряют, как влияют на SEO и пользователя и какими конкретными приёмами можно их улучшить"
cover:
  author: shmakovdima
  desktop: "images/covers/desktop.svg"
  mobile: "images/covers/mobile.svg"
  alt: "Шкала Core Web Vitals с зонами «хорошо», «нужно улучшить» и «плохо»"
authors:
  - shmakovdima
keywords:
  - core web vitals
  - web vitals
  - метрики производительности
  - INP
  - LCP
  - CLS
  - FCP
  - TTFB
  - PageSpeed Insights
  - Lighthouse
  - оптимизация сайта
  - производительность Next.js
related:
  - js/performance
  - tools/how-the-browser-creates-pages
tags:
  - article
---


Попробуйте отрыть любой веб-сайт. Между кликом по ссылке и моментом, когда сайтом можно будет пользоваться, происходит много всего. Сервер получает запрос и думает над ответом. Браузер скачивает HTML-фаил, загружает картинки, скрипты, стили, шрифты, выполняет Javascript и делает промежуточные рендеры страницы. На каждом из этих этапов и после окончательной загрузки могут произойти проблемы: нужные фаилы из-за своих размеров загрузятся только через десять секунд, текст прыгает во время первоночального рендера, кнопка не реагирует на нажатие долгое время. Все это производительность и очень долгое время не существовало понятных метрик, как можно сравнить сайты между собой и что нужно улучшать разработчикам.

В 2020 году компания Google предложила набор метрик, которые описывают визуальный опыт человека конкретными цифрами и назвала их **Web Vitals**. Самые важные из них получили статус **Core Web Vitals**, или основные метрики. C 2021 года улучшение этих покозателей уже не только совет - Core Web Vitals официально влияют на ранжирование страницы в поиске. Если две страницы одинакого подходят под запрос, то выше в списке окажется та, что быстрее и стабильнее.

Далее пойдем по порядку - зачем гугл ввел эти метрики, разберем каждую из этих метрик, какие у них пороги, из-за чего их значения могут ухудшится и разберем основные советы под их улучшения.


## Зачем Google ввёл эти метрики

У производительности сайтов существуют две стороны, и обе важны бизнесу:

**Пользовательский опыт.** Вспомните себя. Если вебсайт очень медленно грузится, текст прыгает при наведении на него, нажатие на кнопку не приводит ни к каким действиям, то очень часто вы закроете вкладку и начнете искать альтернативу. Ровно так же будут себя вести посетители вашего сайта - чем медленнее сайт и чем он менее стабилен, тем больше людей уйдет, не дойдя до самого важного. Медленный сайт приносит меньше просмотров, меньше заказов, а следственно, и меньше денег. Core Web Vitals и придумали, чтобы поймать три главных раздражителя пользователя - долгая загрузка, медленное реагирование на действие и прыжки элементов на сайте в понятные показатели.

**SEO.** Google встроил Core Web Vitals в сигнал ранжирования Page Experience. При этом Google оценивает метрики не по лабораторным тестам, а по данным реальных пользователей Chrome из отчета [CrUX(Chrome User Experience Report)](https://cruxvis.withgoogle.com/). То есть, поисковик смотрит, как себе ведет сайт на самом деле на живых гайджетах у пользователей.

И сразу нужно запомнить главное: **все Core Web Vitals считаются по 75-му перцентилю**. Метрика считается хорошей только в том случае, если в порог отсчета укладываются 75 процентов посещений. То есть фокусироваться на быстрый сегмент аудитории и не обращать внимания на пользователей с медленными устройствами или со слабым интернетом не получится - Google смотрит именно на «хвост» распределения, отдельно для мобильных устройств и десктопных компьютеров.

<aside>

📊 **Core Web Vitals** (основные метрики), это всего три метрики: **LCP** (Largest Contentful Paint), **INP** (Interaction to Next Paint) и **CLS** (Cumulative Layout Shift). Остальные: **FCP** (First Contentful Paint), **TTFB** (Time to First Byte), называются диагностическими: они не входят в сигнал ранжирования напрямую, но помогают понять, почему основные метрики проседают.

</aside>

<aside>

🕰 **Набор Core Web Vitals изменялся.** Изначально в 2020 году в тройку основных входил **FID** (First Input Delay) вместо **INP** (Interaction to Next Paint) — он измерял время отклика страницы исключительно на самый первый клик пользователя. Но в 2023 году Google официально [заявил](https://developers.google.com/search/blog/2023/05/introducing-inp) о замене FID на INP, чтобы измерять время отклика страницы на любые действия пользователя (клики, тапы, нажатия) на протяжении всего времени пользования вебсайта. Официальная замена произошла 12 марта 2024 года.

</aside>

![Три основные метрики Core Web Vitals: LCP отвечает за загрузку, INP — за отзывчивость, CLS — за визуальную стабильность](images/cwv-overview.svg)

Если коротко, три основные метрики отвечают на три простых вопроса:

- **LCP** (Largest Contentful Paint) — «когда я наконец увидел то, ради чего пришёл в полном составе?»
- **INP** (Interaction to Next Paint) — «я нажал - оно отреагировало быстро или подвисло?»
- **CLS** (Cumulative Layout Shift) — «почему элементы прыгают при загрузке и я промахиваюсь мимо кнопок?»

А на что отвечают дополнительные:

- **FCP** (First Contentful Paint) - «как быстро я увижу что-то на своем экране?»
- **TTFB** (Time to First Byte) — «как быстро сервер ответил на запрос браузера?»

## Пороговые значения: шпаргалка

Для каждой метрики есть три зоны: «хорошо» (зелёная), «нужно улучшить» (жёлтая) и «плохо» (красная). Так же метрики различаются для десктопа и для мобильных устройств. Запомните эту таблицу, дальше мы будем к ней возвращаться.

| Метрика  | Что измеряет                | 🟢 Хорошо | 🟡 Нужно улучшить | 🔴 Плохо |
| -------- | --------------------------- | --------- | ----------------- | -------- |
| **LCP**  | загрузку основного контента | ≤ 2,5 с   | 2,5–4,0 с         | > 4,0 с  |
| **INP**  | отзывчивость на действия    | ≤ 200 мс  | 200–500 мс        | > 500 мс |
| **CLS**  | визуальную стабильность     | ≤ 0,1     | 0,1–0,25          | > 0,25   |
| **FCP**  | первую отрисовку            | ≤ 1,8 с   | 1,8–3,0 с         | > 3,0 с  |
| **TTFB** | ответ сервера               | ≤ 0,8 с   | 0,8–1,8 с         | > 1,8 с  |

Все пороги считаются для 75-го перцентиля, как мы уже упомянули ранее. CLS измеряется в безразмерных единицах от нуля до единицы, остальные метрики — в секундах или миллисекундах.

**Пороги в таблице одинаковые для мобильных и десктопа.** CrUX и [PageSpeed Insights](https://pagespeed.web.dev/) собирают и показывают метрики **раздельно по типам устройств**: у одного и того же сайта может быть зелёный LCP на десктопе и жёлтый на мобильных, потому что мобильные сети работают медленнее, а мобильные процессоры слабее (это сильнее всего бьёт по INP, где считается время обработки действий на устройстве). Search Console в отчёте Core Web Vitals тоже группирует URL отдельно «Mobile» и «Desktop». Поэтому проверяйте оба среза одновременно, чтобы не допустить одну ошибку: подтянуть десктопный отчёт в зелёную зону и не глянуть что происходит с мобильными устройствами. Это самая частая причина, по которой сайт всё равно проваливает Page Experience.

Дальше разберём каждую мертрику по очереди и посмотрим на рецепты улучшения их показателей.

## LCP — Largest Contentful Paint

### Что это

LCP измеряет время от начала загрузки страницы до момента, когда в области просмотра (viewport) был отрисован самый большой видимый элемент. Обычно это главное изображение (hero image), обложка статьи, баннер или крупный текстовый блок.

По сути, LCP отвечает на вопрос: «Когда пользователь увидел основной контент страницы?». В отличие от простого показателя «страница загрузилась», LCP показывает, насколько быстро появился главный элемент, ради которого пользователь открыл страницу.

### Из чего складывается LCP

Оптимизировать LCP вслепую бесполезно — сначала нужно понять, какая часть процесса занимает больше всего времени. При анализе LCP можно выделить четыре основных этапа:

![LCP делится на четыре части: TTFB, задержка загрузки ресурса, длительность загрузки и задержка отрисовки](images/lcp-breakdown.svg)

1. **TTFB** (~40% времени) - время от отправки запроса до получения первого байта ответа от сервера. Пока браузер не получил HTML, он не может начать полноценно анализировать документ и обнаруживать ресурсы, необходимые для отображения LCP-элемента.
2. **Задержка загрузки ресурса** (<10%) - время между получением первого байта HTML и началом загрузки ресурса, необходимого для отображения LCP-элемента. Например, браузер может поздно обнаружить главное изображение или другой критический ресурс.
3. **Длительность загрузки ресурса** (~40%) - время, которое требуется для загрузки ресурса LCP-элемента. На этот этап влияют размер файла, скорость сети, формат ресурса и эффективность доставки.
4. **Задержка отрисовки** (<10%) - время между моментом, когда ресурс уже доступен, и фактическим появлением элемента на экране. Чаще всего здесь мешают блокирующие CSS и JavaScript, длинные задачи (Long Tasks), ожидание шрифтов или другие операции, которые откладывают отрисовку.

### Как чинить — по каждой части

**TTFB** (подробно, в разделе про TTFB ниже):

- Уберите лишние редиректы в цепочке до страницы;
- Настройте кеш на CDN, чтобы контент отдавался с ближайшего к пользователю узла;
- Не добавляйте уникальные query-параметры (например, аналитические метки), которые ломают кеш.

**Задержка загрузки ресурса**, чтобы браузер узнал про LCP-картинку как можно раньше:

- **Держите LCP-картинку в HTML** обычным `<img src>`, а не подставляйте её JavaScript'ом и не прячьте в `data-src`. Тогда её найдёт preload-сканер ещё до выполнения скриптов.
- **Не используйте `loading="lazy"` на LCP-картинке** — ленивая загрузка откладывает именно то, что должно появиться первым.
- Поставьте **`fetchpriority="high"`** на главную картинку — браузер скачает её раньше остального. Не вешайте `high` больше чем на 1–2 ресурса, иначе приоритет теряет смысл.
- Если LCP-картинка задаётся через CSS `background-image`, браузер не увидит её заранее — **используйте `<img>`** или хотя бы `<link rel="preload" as="image" fetchpriority="high">`.
- Если ресурс на другом домене — добавьте `<link rel="preconnect">`, а лучше держите его на своём origin.

```html
<!-- LCP-картинка: в HTML, с высоким приоритетом, без lazy -->
<img
  src="hero.avif"
  alt="Обложка"
  width="1200"
  height="630"
  fetchpriority="high"
/>

<!-- если картинка ссылается только из CSS — предзагрузим её -->
<link rel="preload" as="image" href="hero.avif" fetchpriority="high" />

<!-- для адаптивной предзагрузки — imagesrcset/imagesizes -->
<link
  rel="preload"
  as="image"
  imagesrcset="hero-800.avif 800w, hero-1600.avif 1600w"
  imagesizes="100vw"
  fetchpriority="high"
/>
```

<aside>

⚡ `fetchpriority="high"`, самый дешёвый выигрыш по LCP, который существует. По умолчанию картинки в области экрана стартуют с приоритетом Low и повышаются до High только после того, как браузер скачает и разберёт CSS и поймёт, что картинка видима. Атрибут пропускает этот круг. В тесте инженеров Google один этот атрибут улучшил LCP с **2,6 до 1,9 с** (−27%). При этом, по данным Web Almanac 2025, **LCP-картинку предзагружают всего ~2,1% сайтов**, то есть это массово недоиспользованный приём.

</aside>

**Длительность загрузки**, чтобы файл скачался быстрее:

- **Сжимайте и переводите картинки в современные форматы.** Порядок предпочтения: **AVIF** (на ~50% легче JPEG, поддержка ~95%) → **WebP** (на 25–35% легче, поддержка ~96%) → JPEG как фолбэк. Раздавайте через `<picture>` с несколькими `<source>`, чтобы браузер сам выбрал, что умеет.
- **Отдавайте адаптивные размеры** через `srcset`/`sizes` — не грузите 4К-картинку на телефон.
- Используйте **CDN** и **image CDN**, которые на лету подбирают формат и размер.
- Настройте **долгое кеширование** (`Cache-Control` с большим `max-age`) для статики.
- Уберите конкуренцию за полосу: понизьте `fetchpriority` второстепенным ресурсам, отложите сторонние скрипты через `defer`/`async`.

**Задержка отрисовки**, чтобы скачанное сразу показалось:

- **Сократите блокирующий CSS**: вынесите критические стили инлайном, остальное грузите отложенно; удалите неиспользуемые правила (Coverage в DevTools).
- **Уберите блокирующий JS из `<head>`**: переносите вниз `<body>` или вешайте `defer`/`async`.
- **Рендерите на сервере (SSR) или статически (SSG)**, чтобы LCP-контент приехал прямо в HTML, а не дорисовывался скриптом на клиенте.
- Следите, чтобы тяжёлые задачи на главном потоке не блокировали отрисовку сразу после загрузки картинки (см. длинные задачи в разделе про INP).




## Что еще почитать?

**Официальная документация, пороги, метрики и API:**

- web.dev: [Web Vitals](https://web.dev/articles/vitals), [Introducing Web Vitals](https://web.dev/blog/vitals), [Optimize LCP](https://web.dev/articles/optimize-lcp), [Optimize INP](https://web.dev/articles/optimize-inp), [Optimize CLS](https://web.dev/articles/optimize-cls), [Optimize TTFB](https://web.dev/articles/optimize-ttfb), [Optimize long tasks](https://web.dev/articles/optimize-long-tasks), [Preload responsive images](https://web.dev/articles/preload-responsive-images), [Back/forward cache](https://web.dev/articles/bfcache), [Lab and field data differences](https://web.dev/articles/lab-and-field-data-differences).
- Chrome for Developers: [Use `scheduler.yield()`](https://developer.chrome.com/blog/use-scheduler-yield), [Test back/forward cache](https://developer.chrome.com/docs/devtools/application/back-forward-cache), [Enabling bfcache for `Cache-Control: no-store`](https://developer.chrome.com/docs/web-platform/bfcache-ccns), [INP in frameworks](https://developer.chrome.com/docs/aurora/inp-in-frameworks).
- MDN: [Fix your website's LCP by optimizing image loading](https://developer.mozilla.org/en-US/blog/fix-image-lcp/), [`Scheduler.yield()`](https://developer.mozilla.org/en-US/docs/Web/API/Scheduler/yield).
- Google: [Understanding Core Web Vitals and search results](https://developers.google.com/search/docs/appearance/core-web-vitals), [Core Web Vitals report (Search Console)](https://support.google.com/webmasters/answer/9205520), [About PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about).
- Addy Osmani: [Use `fetchpriority=high` to load your LCP hero image sooner](https://addyosmani.com/blog/fetch-priority/).
- [Web Almanac 2025 — CDN](https://almanac.httparchive.org/en/2025/cdn), HTTP Archive.

**Библиотека и фреймворк:**

- [Библиотека `web-vitals`](https://github.com/GoogleChrome/web-vitals), GoogleChrome.
- Next.js: [Image Optimization](https://nextjs.org/docs/app/getting-started/images), [Font Optimization](https://nextjs.org/docs/app/getting-started/fonts), [`useReportWebVitals`](https://nextjs.org/docs/app/api-reference/functions/use-report-web-vitals).
- [React 19.2 Further Advances INP Optimization](https://calendar.perfplanet.com/2025/react-19-2-further-advances-inp-optimization/), Web Performance Calendar.
- [Guides: Package Bundling](https://nextjs.org/docs/app/guides/package-bundling) и [How we optimized package imports in Next.js](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js), Next.js / Vercel.

**Размер бандла:**

- [8 Ways to Optimize Your JavaScript Bundle Size](https://about.codecov.io/blog/8-ways-to-optimize-your-javascript-bundle-size/), Codecov.
- [webpack-bundle-analyzer](https://github.com/webpack/webpack-bundle-analyzer), GitHub.
- [Why you should avoid Barrel Files in JavaScript Modules](https://laniewski.me/blog/pitfalls-of-barrel-files-in-javascript-modules/).
- [Progressive Hydration](https://www.patterns.dev/react/progressive-hydration/), patterns.dev.

**Инструменты, мониторинг и измерение:**

- DebugBear: [9 Core Web Vitals monitoring tools](https://www.debugbear.com/software/core-web-vitals-monitoring-tools), [CrUX vs RUM](https://www.debugbear.com/blog/crux-vs-rum), [Fixing layout shifts caused by web fonts](https://www.debugbear.com/blog/web-font-layout-shift), [`scheduler.yield`: a beginner's guide](https://www.debugbear.com/blog/scheduler-yield), [Partytown + web workers](https://www.debugbear.com/blog/partytown-web-workers).
- corewebvitals.io: [Yield to the main thread to improve INP](https://www.corewebvitals.io/pagespeed/yield-to-main-thread), [Fix slow hero images](https://www.corewebvitals.io/pagespeed/fix-slow-hero-images-core-web-vitals).

**Разборы и кейсы из практики:**

- [Core Web Vitals Optimization: INP, LCP, CLS Guide 2025](https://www.digitalapplied.com/blog/core-web-vitals-optimization-guide-2025), digitalapplied.
- [Case Study: Optimizing Core Web Vitals in a Next.js Content Blog](https://www.wellally.tech/blog/nextjs-core-web-vitals-case-study), wellally.tech.
- [How to Optimize Core Web Vitals in Next.js App Router for 2025](https://makersden.io/blog/optimize-web-vitals-in-nextjs-2025), Makers' Den.
- [Third-Party Scripts Are Killing Your Core Web Vitals](https://www.pagespeedfix.com/blog/third-party-scripts-core-web-vitals/), PageSpeedFix.
- [Image Optimization for Website Speed: The 2026 Playbook](https://logoswebdesigns.com/blog/image-optimization-website-speed-2026/), Logos Web Designs.
- [How to Fix Cumulative Layout Shift (CLS) in 2025](https://natclark.com/how-to-fix-cumulative-layout-shift-cls-in-2025/), Natclark.