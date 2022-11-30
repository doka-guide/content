---
related:
  - js/symbol
  - js/string
author: kyzinatra
---

Напишите свой класс, который бы являлся [стратегией](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%B0%D1%82%D0%B5%D0%B3%D0%B8%D1%8F_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)) к функции split, используя Symbol. Пример:

```js
console.log('urlsomePath'.split(new Split1('url'))); // "url/somePath"
console.log('somePathurlAnother'.split(new Split1('url'))); // "url/somePath/url/Another"
```
