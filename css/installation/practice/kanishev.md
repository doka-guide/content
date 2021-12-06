🛠 Одна из самых распространённых областей применения инлайн-стилей — почтовые рассылки.

По соображениям безопасности почтовые службы (например, Яндекс.Почта или Gmail) блокируют загрузку внешних ресурсов, в том числе и файлы стилей. Поэтому разработчикам ничего не остаётся, кроме как использовать инлайн-стили.

Вот так может выглядеть HTML-разметка при вёрстке письма:

```html
<table
  border="0"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  style="color:#000;font-family:Poppins,sans-serif;
  font-size:28px;font-weight:500;
  text-align:center;padding:0;margin:0"
>
  <tbody>
    <tr>
      <td
        style="padding-top:20px;padding-bottom:20px;"
        align="right"
        valign="middle"
      >
        <p
          style="color:#bbb;font-family:'Open Sans',sans-serif;
          font-size:12px;font-weight:400;
          line-height:20px;padding:0;margin:0"
        >
          Привет, это рассылка!
        </p>
      </td>
    </tr>
  </tbody>
</table>
```
