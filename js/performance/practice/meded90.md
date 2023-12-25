🛠 Удобно анализировать производительность при помощи вкладки «Производительность» (Performance) в инструментах разработчика. Вызовы `performance.mark()` и `performance.measure()` будут отображаться в разделе `Timings` после записи профиля.

![Панель отладки производительности с performance.mark](images/perfomance-panel.png)

<iframe title="Анализ производительности приложения" src="../demos/functions-measure-devtools/" height="360"></iframe>

🛠 Может появиться желание написать декоратор или функцию-обёртку для `performance.mark()` и `performance.measure()` и обернуть в неё всё приложение. Например, так:

```js
const withPerformanceMeasure = (markName, functionToAudit) => {
  performance.mark(`${markName}-before`)
  functionToAudit()
  performance.mark(`${markName}-after`)
  performance.measure(`${markName}-before`,`${markName}-after`)
}

// Тело скрипта

withPerformanceMeasure(myApp)
```

Этого не стоит делать. Затраты на выполнение функции `performance.mark()` минимальные, но не нулевые.

![Панель Performance Timings для React 17](images/perfomance-timings-r17.png)
