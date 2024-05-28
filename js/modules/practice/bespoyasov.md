🛠 **Избегайте экспортов по умолчанию**. Старайтесь использовать именованные экспорты везде, где это возможно. Это упростит рефакторинг кода и работу в целом.

Некоторые фреймворки могут требовать экспортов по умолчанию, например, так делает Next.js. В таких случаях — не остаётся другого выхода.

🛠 **Используйте реэкспорты**. Чтобы пути импортов не были слишком длинными…

```javascript
import { user } from '../domain/models/user/user.js'
```

…можно использовать реэкспорты — когда мы внутри файла импортируем функциональность из одного модуля и сразу же экспортируем её из него. Например, у нас есть такая структура проекта:

```plaintext
domain/
  models/
    user/
      user.js
```

Чтобы сократить путь до модуля _user.js_, можем использовать реэкспорт на уровне _user/_:

```plaintext
domain/
  models/
    user/
      user.js
      index.js
```

```javascript
/* domain/models/user/index.js */

// Первый способ
import { user } from './user.js'
export { user }

// Второй способ: экспорт сразу же
export { user } from './user.js'

/* other-module.js */

// Путь при импорте user.js
import { user } from './domain/models/user'
```

Так как _index.js_ — [индексный файл](https://nodejs.org/api/modules.html#modules_folders_as_modules), он может быть опущен в пути до модуля. Таким образом мы можем оставить в импорте только путь до папки с этим модулем, дальше за нас всё сделает Node.js или сборщик.

Так же можем и упростить всю структуру:

```plaintext
domain/
  index.js
  models/
    index.js
    user/
      user.js
      index.js
```

Запись в примере означает, что мы хотим реэкспортировать из модуля _user_ всё, что он экспортирует сам.

```javascript
/* domain/models/index.js */
export * from './user'

/* domain/index.js */
export * from './models'

/* other-module.js */

// Изменившаяся строчка с импортом из предыдущего примера
import { user } from '../domain'
```
