🛠 Многие дизайнеры любят рисовать нестандартные выпадающие списки в угоду красоте, и разработчики собирали их из `<div>` на JavaScript. Так делать не советую: самодельный список легко сломать для клавиатуры и скринридеров. Сейчас в Chrome, Edge и Safari можно включить настраиваемый режим `appearance: base-select` и стилизовать родной `<select>` целиком. Как это работает, рассказано в статье выше.

🛠 Если вид списка нужно поменять и в Firefox, где `base-select` пока включается только в экспериментальных настройках, можно заменить хотя бы стрелку. Вот как:

```html
<form>
  <label for="city-select">Нестандартная стрелочка</label>
  <div class="select-wrapper">
    <select name="city" id="city-select">
      <option value="">-- Выберите город --</option>
      <option value="petersburg">Санкт-Петербург</option>
      <option value="samara">Самара</option>
      <option value="perm">Пермь</option>
      <option value="novosibirsk">Новосибирск</option>
    </select>
  </div>
</form>
```

Здесь мы оборачиваем `<select>` дополнительным блоком, чтобы использовать псевдоэлемент [`::after`](/css/after/) этого блока. У обычного `<select>` нет своих псевдоэлементов [`::before`](/css/before/) и `::after`.

```css
.select-wrapper {
  position: relative;
  display: inline-block;
}

.select-wrapper::after {
  content: "🔽" / "";
  position: absolute;
  top: 50%;
  right: 8px;
  translate: 0 -50%;
  pointer-events: none;
}

select {
  appearance: none;
  width: 200px;
  padding: 4px 32px 4px 4px;
  border-color: #aaa;
  border-radius: 3px;
}
```

Что делает этот CSS:

- `appearance: none` отключает браузерную стрелку справа.
- `::after` родительского блока рисует новую стрелку. Для [позиционирования](/css/position/) блоку задаём `position: relative`, псевдоэлементу — `position: absolute`.
- Свойство [`pointer-events`](/css/pointer-events/) со значением `none` отключает у стрелки взаимодействие с мышкой. Иначе клик по ней не раскроет список.
- Пустая строка после косой черты в `content` — альтернативный текст. Скринридер не прочитает эмодзи как «кнопку вниз».

<iframe title="Стилизация" src="../demos/custom/" height="250"></iframe>
