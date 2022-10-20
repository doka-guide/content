Раньше добавляли к `<footer>` явную роль `contentinfo`.

```html
<footer role="contentinfo">
  <p>© Киберпанк, 2077</p>
</footer>
```

Это делали из-за того, что не все старые браузеры и [Accessibility API](/html/screenreaders/#accessibility-api) правильно обрабатывали `<footer>`. Например, у тега не было встроенной роли `contentinfo` в [Safari до 13 версии](https://bugs.webkit.org/show_bug.cgi?id=190138) и в [Firefox до 70 версии](https://bugzilla.mozilla.org/show_bug.cgi?id=1501182). Поэтому пользователи этих браузеров не могли быстро переместиться к области футера.

Сейчас этот хак не нужен, если только не поддерживаете настолько старые версии Safari и Firefox.
