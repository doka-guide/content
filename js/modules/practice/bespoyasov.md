### Избегайте экспортов по умолчанию

Старайтесь использовать именованные экспорты везде, где это возможно. Это упростит рефакторинг кода и работу в целом.

(Некоторые фреймворки могут требовать экспортов по умолчанию, например, так делает Next.js. В таких случаях — не остаётся другого выхода.)

### Используйте реэкспорты

Чтобы пути импортов не были слишком длинными:

```javascript
import { user } from '../domain/models/user/user.js'
```

... можно использовать реэкспорты — когда мы внутри файла импортируем функциональность из одного модуля и сразу же экспортируем её из него.

```javascript
/**
Например у нас есть структура проекта:

domain/
  models/
    user/
      user.js

Чтобы сократить путь до модуля user.js,
мы можем использовать ре-экспорт на уровне user/

domain/
  models/
    user/
      user.js
      index.js
*/

// domain/models/user/index.js
import { user } from './user.js'
export { user }

// Или же сразу:
export { user } from './user.js'

// other-module.js
// Тогда при импорте user.js мы можем прописать такой путь:
import { user } from './domain/models/user'

// Так как index.js — [индексный файл](https://nodejs.org/api/modules.html#modules_folders_as_modules),
// он может быть опущен в пути до модуля.
// Таким образом мы можем оставить в импорте
// только путь до папки с этим модулем,
// дальше за нас всё сделает Node.js или сборщик.

/**
Так же мы можем и упростить всю структуру:

domain/
  index.js
  models/
    index.js
    user/
      user.js
      index.js
*/

// domain/models/index.js
export * from './user'

// Эта запись означает, что мы хотим
// ре-экспортировать из модуля user
// всё, что он экспортирует сам.

// domain/index.js
export * from './models'

// other-module.js
// Тогда наш первый пример превратится в:
import { user } from '../domain'
```
