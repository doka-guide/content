Удобно анализировать производительность при помощи вкладки «Производительность» (Performance) в инструментах разработчика. Вызовы `performance.mark()` и `performance.measure()` будут отображаться в разделе `Timings` после записи профиля.

![Панель отладки производительности с performance.mark](images/perfomance-panel.png)

<iframe title="Измерение времени работы иерархий медленных функций" src="../demos/functions-measure-devtools/" height="360"></iframe>

Может появиться желание написать декоратор или функцию-обёртку для `performance.mark()` и `performance.measure()` и обернуть в неё всё приложение. Этого не стоит делать, потому что затраты на `performance.mark()` минимальны, но не нулевые. Например, раньше в React все компоненты были обёрнуты в подобный декоратор в dev-режиме, но в React версии 17 его убрали из-за проблем с производительностью.

![Панель Performance Timings для React 17](images/perfomance-timings-r17.png)
