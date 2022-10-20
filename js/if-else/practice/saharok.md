🛠 Частый паттерн — установить значение по умолчанию, если в переменной нет значения. Можно сделать так:

```js
let value = 0 // значение по умолчанию

if (externalValue) {
  value = externalValue // установить значение, если в externalValue что-либо хранится
}
```

Код можно сократить, воспользовавшись операцией [логического ИЛИ `||`](/js/logic-operators/#ili).

Если `externalValue` не объявлен, то значение установится в `0`:

```js
const value = externalValue || 0
```

Неявное приведение `externalValue` к логическому типу также игнорирует _определённые ложные_ значения, возможно, вполне валидные: `''`, `NaN`, `0` , `-0`, `0n`, `false`. Чтобы их не терять, нужно вместо `||` использовать `??` — новый, уже [неплохо поддерживаемый](https://caniuse.com/?search=coalescing) логический оператор [nullish coalescing](https://learn.javascript.ru/nullish-coalescing-operator) из [ES2020](/js/language-versions/#es2020):

```js
const value = externalValue ?? 42
```

Что будет аналогично записи:

```js
const value = (externalValue !== null && externalValue !== undefined) ? externalValue : 42
```

Оператор `??` возвращает первый операнд (`externalValue`), если он не `null` и не `undefined`, иначе — второй (`42`). Теперь через `externalValue` можно передать `''`, `NaN`, `0` , `-0`, `0n`, `false`, в отличие от кейса с `||`.

Сравните результат операций с `||` и `??`:

| `externalValue` | `externalValue \|\| 42` | `externalValue ?? 42` |
| :-------: | :------:  | :-------: |
| `1`  |  `1` | `1` |
| `'hi'` | `'hi'` | `'hi'` |
| `null` | `42` | `42` |
| `undefined` | `42` | `42` |
| `0` | `42` | `0` |
| `''` | `42` | `''` |
| `false` | `42` | `false` |
