---
title: "Выразительный React: интерактивность на клиенте"
description: "Создаём интерактивные компоненты на React."
authors:
  - hellsquirrel
related:
  - tools/react-and-alternatives
  - tools/web-server
  - recipes/expressive-react-rectangle
tags:
  - article
---

В статье вы попробуете один из стандартных подходов к созданию проекта на React. Эта статья — продолжение [предыдущей](/recipes/expressive-react-rectangle), где вы можете попробовать технику SSR (Server-Side Rendering). В предыдущей статье содержится несколько определений, которые пригодятся вам в этой статье.

## Собираем требования

Даже очень маленький проект лучше всего начинать со сбора [функциональных требований](https://en.wikipedia.org/wiki/Functional_requirement). Часто эти требования изменяются со временем. Это нормально. Важно лишь то, что в любой момент времени всем кто занимается проектом были известны _текущие_ требования.

В предыдущей статье мы создали прямоугольник с собачкой. Кажется собачке скучно просто сидеть в прямоугольнике. Чтобы собачке стало веселее, давайте выдадим ей мячик и сложное задание :)

В результате получатся следующие требования:
1. В прямоугольнике находится собачки и мячик. Размер прямоугольник - 20 на 20 попугаев.
1. Собачка находится в левом верхнем углу прямоугольника, а мячик — в правом нижнем.
1. Пользователь может добавлять и убирать горизонтальные перегородки случайного размера, чтобы получился лабиринт. Размер перегородки — от 1 до 19 попугаев (это нужно для того чтобы игра была честной и собачка всегда могла добраться до мячика).
1. Собачка может двигаться только вниз, влево и вправо.
1. Когда лабиринт готов, собачка идёт за мячиком.
1. Можно сбросить состояние лабиринта и начать все заново.

Обратите внимание что эти требования достаточно расплывчаты. Нигде не описано что значит «собачка идёт за мячиком» или как определить что «лабиринт готов». Это типичный пример работы над проектом, требования это лишь ограничения вашей системы, а команде инженеров предстоит решить как их реализовать.

## Первоначатьный сетап

Если вы прочитали предыдущую статью у вас уже установлен Node и вы знаете что делать на Windows. Если нет, установите его.

> Здесь и далее я преполагаю что вы используете Mac, Linix или Windows с WSL.

React-приложение нуждается в сборке. Сборщиков очень много, тут мы будем использовать [Vite](https://vitejs.dev/) с React и TypeScript.

<aside>
Vite читается как «вит».
</aside>

Создайте проект одной командой:

```bash
npm create vite@latest expressive-react-maze -- --template react-ts -y
cd expressive-react-maze
npm install
npm run dev
```

У Vite есть несколько шаблонов. Флаг `-template react-ts` выбирает шаблон с React и TypeScript, а флаг `-y` говорит что вы согласны на всë, что предлагает Vite.

После установки зависимостей Vite запустит dev-сервер и напечатает в консоли адрес приложения. Откройте его в браузере и полюбуйтесь на логотип Vite и React.

## Копипастим

Перенесем наработчки из предыдущей статьи в наш новый проект. Создадим файл `src/components/Rectangle.tsx` и добавим в него следующий код:

```tsx
export const Rectangle = () => <div style={{border: "1px solid brown" }}>🐶</div>;
```

Отобразим компонент, для этого отредактируем файл `src/App.tsx`:

```tsx
import { Rectangle } from "./Rectangle";

const App = () => (
  <div>
    <h1>Собачка и мячик</h1>
    <Rectangle />
  </div>
);

export default App;
```

Также удалим все содержимое файла `src/App.css` и `src/index.css`. У нас будет свой стиль!

## Создаем нужные компоненты
Сейчас прямоугольник это один большой компонент. Выполним рефакторинг и выделим из компонента `Rectangle` три новых компонента:
- Dog — собачка
- Ball — мячик
- Maze — лабиринт

Создадим файлы `src/Dog.tsx`, `src/Ball.tsx` и `src/Maze.tsx` и добавим в них следующий код:

```tsx
// Dog.tsx
export const Dog = () => <div>🐶</div>;
```


```tsx
// Ball.tsx
export const Ball = () => <div>🎾</div>;
```

```tsx
// Maze.tsx
export const Maze = () => <div style={{border: "1px solid brown" }}>Тут будет лабиринт</div>;
```

## Добавляем компоненты в прямоугольник

Компонент прямоугольник будет служить _контейнером_ для мячика и собачки и лабиринта. Чтобы этого добиться, добавить в файл `src/Rectangle.tsx` свойство [`children`](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children). Это встроенное свойство любого React-компонента, при помощи него вы можете определить как будут отображаться вложенные компоненты.

```tsx
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export const Rectangle = ({ children }: Props) =>
  <div style={{border: "1px solid brown" }}>
    {children}
  </div>;
```

* `ReactNode` — это тип, означающий «Все, что может отрендерить React»
Типизировать React-компоненты очень просто. Просто опишите аргументы функции-коомпонента.

<details>
Вы можете передать компонент в качестве любого другого свойства. Например вот так
```tsx
<Rectangle dog={<Dog/>} maze={Maze} />
```

При этой код компонента `Rectangle` может выглядеть так:
```tsx
type Props = {
    dog: ReactNode;
    maze: ReactNode;
}

export const Rectangle = ({ dog, maze }: Props) =>
  <div style={{border: "1px solid brown" }}>
    {dog}
    {maze}
  </div>;
```
</details>

Теперь обновим `src/App.tsx`, чтобы собрать все компоненты вместе:

```tsx
import { Ball } from "./Ball";
import { Dog } from "./Dog";
import { Maze } from "./Maze";
import { Rectangle } from "./Rectangle";

const App = () => (
  <div>
    <h1>Собачка и мячик</h1>
    <Rectangle>
      <Dog />
      <Ball />
      <Maze />
    </Rectangle>
  </div>
);

export default App;
```

### Строим лабиринт

Лабиринт самый сложный компонент из всех. Чтобы разобраться в лабиринте потребуется решить вопрос с 🦜. Попугаи используются для задания размера перегородок лабиринта. Кроме этого они используются для задания размера поля.
Когда вы сталкиваетесь с тем что несколько компонентов используют одну и ту же функциональность – подумайте о том как вынести эту функциональность так чтобы она была доступна всем компонентам.

Мы создадим простую функцию - конвертер попугаев в пиксели и обратно.

```ts
// src/units.ts
const pixelsInParrot = 20;
export const parrotsToPixels = (parrots: number) => parrots * pixelsInParrot;
```

Кроме этого полезно завести файлик с константами. В больших проектах этот файлик быстро разрастется и превратится в папку.

```ts
// src/constants.ts
export const fieldSize = 20;
export const maxWallLength = 20;
export const minWallLength = 5;
```

Код для отображения лабиринта будет выглядеть так, к коду прилагаются замечательные стили. Не торопитесь читать дальше, попробуйте разобраться что тут происходит.

```tsx
import { fieldSize, maxWallLength } from './contstatns'
import { parrotsToPixels } from './units'
import styles from './Maze.module.css'

export const Maze = () => {
    const size = parrotsToPixels(fieldSize)

    return (
        <div
            style={{
                width: size,
                height: size,
            }}
            className={styles.maze}
        >
            {Array.from({ length: fieldSize }, (_, i) => (
                <button key={i} style={{ height: parrotsToPixels(1) }} className={styles.button}>
                    { /* Тут может быть стенка */}
                </button>
            ))}
        </div>
    )
}
```

```css
/* src/Maze.module.css */
.maze {
    border: '1px solid brown';
    display: flex;
    flex-direction: column;
}

.button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 100%;

    &:hover {
        background-color: #f0f0f0;
    }
}
```

Обратите внимание на то как добавляются стили. Мы описываем стили с файле `Maze.module.css` и импортируем их в компонент. Файл стилей можно называть как угодно, важно чтобы он заканчивался на `.module.css`. Когда vite видит такое окончание файла, он будет добавлять к каждому классу уникальных префикс, так что стили не будут пересекаться.

<aside>
Префикc генерируется из хеша содержимого файла. Вы можете добавить специальные правила в файл настройки `vite.config.js`, чтобы изменить способ генерации префикса.
</aside>