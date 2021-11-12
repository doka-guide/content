🛠 Одна из самых распространённых областей применений инлайн-стилей — почтовые рассылки.

По соображениям безопасности почтовые службы (например, Яндекс.Почта или Gmail) блокируют загрузку внешних ресурсов, в том числе и файлы стилей. Поэтому разработчикам ничего не остаётся, кроме как использовать инлайн-стили.

Вот так может выглядеть HTML-разметка при вёрстке письма:

```html
<table
  border="0"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;"
>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;
          font-weight:500;font-style:normal;letter-spacing:normal;
          line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"
        >
          <tbody>
            <tr>
              <td
                style="padding-top: 20px; padding-bottom: 20px; padding-right: 0px;"
                align="right"
                valign="middle"
              >
                <p
                  style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;
                  font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;
                  line-height:20px;text-transform:none;text-align:right;
                  text-decoration:underline;padding:0;margin:0"
                >
                  Привет, это рассылка!
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
```
