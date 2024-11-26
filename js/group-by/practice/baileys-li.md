`Object.groupBy()` можно использовать как замену [аналогичному методу](https://lodash.com/docs/4.17.15#groupBy) из популярной, но уже устаревшей библиотеки Lodash.


```diff
- _.groupBy([6.1, 4.2, 6.3], Math.floor)
+ Object.groupBy([6.1, 4.2, 6.3], Math.floor)

- _.groupBy(['one', 'two', 'three'], 'length');
+ Object.groupBy(['one', 'two', 'three'], word => word.length)
```

Как видно, функции не полностью идентичны. Однако, если в вашей кодовой базе активно используется метод из Lodash, стоит задуматься о замене. Особенно это важно для фронтенда, так как отказ от Lodash уменьшит размер бандла.

Метод `groupBy()` поддерживается всеми основными браузерами, начиная с марта 2024 года. Если требуется поддержка более старых браузеров, это не проблема — написать полифил довольно легко:

```js
if (!("groupBy" in Object)) {
  Object.groupBy = (items, getKey) =>
    Array.from(items).reduce((result, item, index) => {
      const key = getKey(item, index);
      result[key] ??= [];
      result[key].push(item);

      return result;
    }, {});
}

if (!("groupBy" in Map)) {
  Map.groupBy = (items, getKey) =>
    Array.from(items).reduce((result, item, index) => {
      const key = getKey(item, index);

      if (result.has(key)) result.get(key).push(item);
      else result.set(key, [item]);

      return result;
    }, new Map());
}
```

Если вы используете [Typescript](/tools/static-types/) в своём проекте, убедитесь, что у вас версия 5.4 или новее. Начиная с неё в стандартных библиотеках есть типизация `Object.groupBy()` и `Map.groupBy()`. Подключить типизацию можно добавлением в `tsconfig.json` библиотек `ESNext.Object` и `ESNext.Collection` (для `Object` и `Map` соответственно):

```diff
  "compilerOptions": {
-    "lib": ["DOM", "ES2020"],
+    "lib": ["DOM", "ES2020", "ESNext.Object", "ESNext.Collection"],
  }
```
