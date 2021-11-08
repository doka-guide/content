`<del>` часто используется вместе с [`<ins>`](/html/ins) в кодовых базах для отображения изменений в коде или в базах знаний, таких как [Confluence](https://confluence.atlassian.com/doc/page-history-and-page-comparison-views-139379.html), для отображения изменений, внесённых кем-то в документ. Например, при просмотре изменений в пулреквесте в [GitHub](https://github.com/) мы видим список изменений примерно так:

```html
<pre>
  body {
    font-size: 16px;
    <del>color: black;</del>
    <ins>color: white;</ins>
  }
</pre>
```

<iframe title="Пример с кодом" src="../demos/code/" height="300"></iframe>
