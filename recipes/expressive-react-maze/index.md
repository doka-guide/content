---
title: "Выразительный React: интерактивность на клиенте"
description: "Создаём интерактивные компоненты на React."
authors:
  - hellsquirrel
contributors:
  - vitya-ne
related:
  - tools/react-and-alternatives
  - tools/web-server
  - recipes/expressive-react-rectangle
tags:
  - article
---

В статье описан один из стандартных подходов к созданию React-приложения.

> Эта статья — продолжение серии «Выразительный React». В предыдущей статье «[Выразительный React: простые компоненты на сервере](/recipes/expressive-react-rectangle/)» была показана техника SSR (Server-Side Rendering). В ней разбирались определения, которые пригодятся при чтении этой статьи.

## Собираем требования

Даже очень маленький проект лучше всего начинать со сбора [функциональных требований](https://en.wikipedia.org/wiki/Functional_requirement). Часто требования изменяются со временем. Главное, чтобы всем, кто занимается проектом, были известны _текущие_ требования.

В предыдущей статье мы создали прямоугольник с собачкой. Кажется собачке скучно просто сидеть в прямоугольнике. Чтобы собачке стало веселее, давайте выдадим ей мячик и сложное задание 🙂

В результате получатся следующие требования:

1. В прямоугольнике находятся собачка и мячик. Размер прямоугольника — 20 на 20 попугаев.
1. Собачка находится в левом верхнем углу прямоугольника, а мячик — в левом нижнем.
1. Пользователь может добавлять и убирать горизонтальные стенки случайного размера, чтобы получился лабиринт. Размер стенки — от 1 до 19 попугаев. Это нужно для того, чтобы игра была честной, и собачка всегда могла добраться до мячика.
1. Собачка может двигаться только вниз, влево и вправо.
1. Когда лабиринт готов, собачка бежит за мячиком.
1. Можно сбросить состояние лабиринта и начать всё заново.

Обратите внимание, что эти требования достаточно расплывчаты. Нигде не описано, что значит «собачка бежит за мячиком», или как определить, что «лабиринт готов». Это типичный пример работы над проектом. Требования — это лишь ограничения вашей системы, а команде инженеров предстоит решить как их реализовать.

## Первоначальная настройка

Если вы прочитали предыдущую статью, у вас уже установлен Node.js и вы знаете, что делать на Windows. Если нет, установите его.

> Здесь и далее предполагаем, что вы используете macOS, Linux или Windows с WSL.

React-приложение нуждается в сборке. Сборщиков очень много, будем использовать [Vite](https://vitejs.dev/) с React и TypeScript.

<aside>

✌️ Vite читается как «вит».

</aside>

Создайте проект несколькими командами:

```bash
npm create vite@latest expressive-react-maze -- --template react-ts -y
cd expressive-react-maze
npm install
npm run dev
```

У Vite есть несколько шаблонов. Флаг `-template react-ts` выбирает шаблон с React и TypeScript, а флаг `-y` говорит, что вы согласны на всё, что предлагает Vite.

После установки зависимостей Vite запустит dev-сервер и напечатает в консоли адрес приложения. Откройте его в браузере и полюбуйтесь на логотип Vite и React.

## Копируем

Перенесём наработки из предыдущей статьи в новый проект. Создадим файл _src/Rectangle.tsx_ и добавим в него следующий код:

```tsx
export const Rectangle = () => <div style={{ border: '1px solid brown' }}>🐶</div>;
```

Отобразим компонент, для этого отредактируем файл _src/App.tsx_:

```tsx
import { Rectangle } from './Rectangle';

const App = () => (
  <div>
    <h1>Собачка и мячик</h1>
    <Rectangle />
  </div>
);

export default App;
```

Также удалим всё содержимое файлов _src/App.css_ и _src/index.css_. У нас будет свой стиль!

## Создаём нужные компоненты

Сейчас прямоугольник — это один большой компонент. Выполним рефакторинг и выделим из компонента `Rectangle` три новых компонента:

- `Dog` — собачка;
- `Ball` — мячик;
- `Maze` — лабиринт.

Создадим файлы _src/Dog.tsx_, _src/Ball.tsx_ и _src/Maze.tsx_ и добавим в них следующий код:

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
export const Maze = () => <div>Тут будет лабиринт</div>;
```

## Добавляем компоненты в прямоугольник

Компонент `Rectangle` будет служить _контейнером_ для мячика, собачки и лабиринта. Чтобы этого добиться, нужно добавить в файл _src/Rectangle.tsx_ свойство [`children`](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children). Это встроенное свойство любого React-компонента, с его помощью можно определить как будут отображаться вложенные компоненты.

```tsx
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Rectangle = ({ children }: Props) => (
  <div style={{ border: '1px solid brown' }}>{children}</div>
)
```

**`ReactNode`** — это тип, означающий «всё, что может отрендерить React».

Типизировать React-компоненты очень просто. Достаточно описать аргументы функции-компонента.

<details>
  <summary>Особенности передачи компонента</summary>

  Вы можете передать компонент в качестве любого другого свойства. Например, вот так:

  ```tsx
  <Rectangle dog={<Dog/>} maze={Maze} />
  ```

  При этом код компонента `Rectangle` может выглядеть так:

  ```tsx
  type Props = {
    dog: ReactNode
    maze: ReactNode
  }

  export const Rectangle = ({ dog, maze }: Props) => (
    <div style={{ border: '1px solid brown' }}>
      {dog}
      {maze}
    </div>
  )
  ```

</details>

Теперь обновим _src/App.tsx_, чтобы собрать все компоненты вместе:

```tsx
import { Ball } from './Ball';
import { Dog } from './Dog';
import { Maze } from './Maze';
import { Rectangle } from './Rectangle';

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

Лабиринт — самый сложный компонент из всех. Чтобы разобраться в лабиринте, потребуется решить вопрос с «🦜». Попугаи используются для задания размера перегородок лабиринта и для задания размера поля.

Когда вы сталкиваетесь с тем, что несколько компонентов используют одну и ту же функциональность, подумайте о том, куда поместить эту функциональность и как сделать так, чтобы она была доступна всем компонентам.

Мы создадим простую функцию-конвертер попугаев в пиксели и обратно.

```ts
// src/units.ts
const pixelsInParrot = 20;
export const parrotsToPixels = (parrots: number) => parrots * pixelsInParrot;
```

Кроме этого, полезно завести файлик с константами. В больших проектах этот файлик быстро разрастётся и превратится в папку.

```ts
// src/constants.ts
export const fieldSize = 20;
export const maxWallLength = 20;
export const minWallLength = 5;
```

Код для отображения лабиринта будет выглядеть так. К коду прилагаются замечательные стили. Не торопитесь читать дальше, попробуйте разобраться, что тут происходит.

```tsx
import { fieldSize } from './constants'
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
        <button
          key={i}
          style={{ height: parrotsToPixels(1) }}
          className={styles.button}
        >
          {/* Тут может быть стенка */}
        </button>
      ))}
    </div>
  )
}
```

```css
/* src/Maze.module.css */
.maze {
  border: 1px solid brown;
  display: flex;
  flex-direction: column;
}

.button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0;
  padding: 0;

  &:hover {
    background-color: #f0f0f0;
  }
}

.wall {
  background-color: black;
  height: 2px;
  position: relative;
}
```

Обратите внимание, как добавляются стили. Мы описываем стили в файле _Maze.module.css_ и импортируем их в компонент. Файл стилей можно называть как угодно. Важно, чтобы он заканчивался на _.module.css_. Когда Vite видит такое окончание файла, он будет добавлять к каждому классу уникальный префикс. Префикс поможет избежать пересечения стилей. Можно использовать одинаковые названия классов в разных файлах стилей. Стили для каждого из классов не будут смешиваться.

<aside>

☝️ Префикс генерируется из хеша содержимого файла. Вы можете добавить специальные правила в файл настройки _vite.config.js_, чтобы изменить способ генерации префикса.

</aside>

Чтобы зафиксировать размер кнопок и лабиринта, мы передаём размер поля в специальный атрибут `style`. В React можно передавать стили в виде объекта, где ключи — это CSS-свойства, а значения — их значения 🤷‍♀️. В данном случае мы устанавливаем ширину и высоту лабиринта равными 20 попугаям. У такой передачи есть несколько особенностей:

1. Можно передавать значения размеров числом, в пикселях. Стиль автоматически преобразуется в строку.
1. Названия стилей соответствуют JavaScript-названиям стилей. Как если бы вы устанавливали стили через свойство `style`.

Генерируем массив кнопок, используя функцию `Array.from`. В JSX можно использовать массив вместо единственного элемента в качестве параметра `children`, если вы не переопределили это поведение у вашего компонента. Обратите внимание на свойство `key`. Это очень важное свойство. Оно должно быть уникальным для каждого элемента.

<aside>

Уникальность свойства `key` должна соблюдаться для всех соседних элементов. Это значит, что элементы _внутри_ одного списка должны иметь уникальные ключи, но элементы в разных списках могут иметь одинаковые ключи.

Есть несколько важных правил при создании ключей:

1. Не пытайтесь генерировать уникальные ключи на каждом рендере (например, используя `Math.random()`). Можно представить ситуацию с ключами так: React привязывает ключи к элементам. Если у элемента изменился ключ, React считает его новым элементом.
1. Используйте индексы в качестве ключей только если вы уверены, что в вашем списке не будет изменений.

Подробнее про свойство `key` можно прочитать в [документации React](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key).

</aside>

Стенки лабиринта будут добавляться при клике на соответствующую часть лабиринта (не просто так мы сделали её кнопкой). Чтобы добиться этого результата, нужно познакомиться с ещё с одним концептом – хуком `useState`.

## Состояние компонента

Хук [`useState`](https://react.dev/reference/react/useState) позволяет определить переменную-состояние и даёт функцию для изменения этого состояния. React гарантирует, что после изменения состояния компонент перерендерится, но не гарантирует, что это произойдёт мгновенно.

<aside>

👆 Иногда эта идея объясняется так: «При вызове функции-установщика состояния React перерисовывает компонент». Это не верно.

</aside>

Будем хранить в переменной состояния все стены лабиринта. При клике на соответствующую часть лабиринта будем добавлять случайную стенку, такую, чтобы собачка могла добраться до мячика.

Попробуйте разобраться что происходит в примере кода ниже. Если чуть-чуть получится – отлично, если нет – это нормально. К React надо привыкнуть 🙂 Чуть ниже будет подробное объяснение.

```tsx
import { fieldSize, maxWallLength, minWallLength } from './constants'
import { parrotsToPixels } from './units'
import { useCallback, useState } from 'react'
import styles from './Maze.module.css'

type Wall = {
  left: number
  width: number
}

const randomInt = (minVal: number, maxVal: number) =>
  Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal

const generateNewWall = (): Wall => {
  const width = randomInt(minWallLength, maxWallLength)
  const alignLeft = Math.random() > 0.5

  return {
    left: alignLeft ? 0 : fieldSize - width,
    width,
  }
}

export const Maze = () => {
  const size = parrotsToPixels(fieldSize)
  const [walls, setWalls] = useState<Wall[]>(
    () => Array.from({ length: fieldSize }, () => ({
      left: 0,
      width: 0,
    })),
  )

  const toggleWall = useCallback((mazeRow: number) => {
    setWalls((walls) =>
      walls.map((wall, i) => {
        if (i === mazeRow) {
          if (wall.width === 0) {
            return generateNewWall()
          } else {
            return {
              left: 0,
              width: 0,
            }
          }
        }
        return wall
      }),
    )
  }, [])

  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={styles.maze}
    >
      {Array.from({ length: fieldSize }, (_, i) => (
        <button
          key={i}
          style={{ height: parrotsToPixels(1) }}
          className={styles.button}
          onClick={() => toggleWall(i)}
        >
          <span
            key={`${i}`}
            className={styles.wall}
            style={{
              width: parrotsToPixels(walls[i].width),
              left: parrotsToPixels(walls[i].left),
            }}
          />
        </button>
      ))}
    </div>
  )
}
```

Часто бывает полезно сначала представить решение задачи и только потом его реализовывать. TypeScript отлично помогает зафиксировать подобное представление. Если вы заранее опишите примитивы с которыми будете работать, вам будет легче разработать реализацию.

В этом примере создаётся тип `Wall` для хранения структуры стенки. Она будет задаваться двумя параметрами – отступом от левого края лабиринта и его длинной.

Далее создаём несколько вспомогательных функций для генерации случайной стенки таким образом, чтобы собачка всегда могла пройти. Принимаем решение выравнивать стенку всегда либо по левому краю, либо по правому. Если стенка выравнивается по левому краю, то отступ от левого края будет равен нулю.

Далее используем сочетание хуков `useState` и `useCallback`. [`useCallback`](https://react.dev/reference/react/useCallback) позволяет зафиксировать функцию-обработчик, привязанную к переменной `toggleWall`. Значение этой переменной не будет меняться при перерисовке компонента. За это отвечает второй аргумент функции. Вторым аргументом является массив зависимостей. Если зависимостей нет (передан пустой массив), то значение переменной не будет меняться при перерисовке компонента.

Теперь подробнее взглянем на установщик состояния `setWalls`. Есть два способа использовать эту функцию: передавать в качестве аргумента новое состояние (так делать не будем) или передавать функцию, принимающую текущее состояние и возвращающую новое, которое будет установлено в качестве текущего.

```ts
setWalls((walls) =>
  walls.map((wall, i) => {
    if (i === mazeRow) {
      if (wall.width === 0) {
        return generateNewWall()
      } else {
        return {
          left: 0,
          width: 0,
        }
      }
    }
    return wall
  }),
)
```

Здесь изменяем только ту часть лабиринта, на которую кликнул пользователь. Если в области клика стенки нет, то добавляем новую стенку. Если стенка есть, то удаляем её.

Лабиринт готов! Пора запустить собачку.

## Запускаем собачку?

Чтобы собачка переместилась к мячику, нужно рассчитать путь перемещения. Для этого необходимо знать состояние лабиринта. К сожалению, собачка и мячик находятся в разных компонентах. Состояние лабиринта скрыто в компоненте `Maze`. Чтобы поделиться им с собачкой, можно сделать несколько вещей:

1. Переместить собачку внутрь лабиринта.
1. Вытащить состояние из лабиринта в родительский компонент и передавать это состояние как свойство собачке и лабиринту.
1. Использовать контекст, чтобы сделать состояние доступным для всех компонентов.

Первый способ не самый изящный, но позволит добиться результата быстро. В следующих статьях рассмотрим другие варианты.

Убираем собачку из `Rectangle`, для этого изменяем файл _src/App.tsx_:

```tsx
// App.tsx
import { Ball } from './Ball';
import { Maze } from './Maze';
import { Rectangle } from './Rectangle';

const App = () => (
  <div>
    <h1>Собачка и мячик</h1>
    <Rectangle>
      {/* Тут была собачка, но она ушла в лабиринт */}
      <Maze />
      <Ball />
    </Rectangle>
  </div>
);

export default App;
```

И добавляем собачку в `Maze`:

```tsx
// Maze.tsx
import { Dog } from './Dog';
//...
<>
  <Dog /> {/* 🐶 */}
  <div
    style={{
      width: size,
      height: size,
    }}
    className={styles.maze}
  >
    {/* Реализация лабиринта */}
  </div>
</>
```

Мы добавили собачку и завернули все элементы во фрагмент. Фрагмент не генерирует DOM-элемент, это удобный способ объединить несколько элементов в один.

## Ссылаемся на собачку

Добавим кнопку запуска собачки. Вы уже знаете как добавлять новые компоненты. Добавим кнопку и обработчик клика в компонент `Maze`.

```tsx
// Maze.tsx

const getBall = useCallback(() => {
  console.log('Гав!')
}, [])

// Все остальные функции
<>
  <button onClick={getBall}>Апорт!</button>
  <Dog />  {/* 🐶 */}
  {/* Остальной код */}
</>
```

Кажется, что собака пока не готова бежать за мячиком. Исправим ситуацию, немного изменив обработчик `getBall`. Для этого воспользуемся JavaScript-анимацией. Это DOM API, чтобы им воспользоваться, нам нужно получить доступ к DOM-элементу собачки. Тут нам пригодится хук [`useRef`](https://react.dev/reference/react/useRef). Этот хук можно использовать для множества вещей: хранить _глобальное состояние_ или ссылаться на DOM-элементы. **Глобальное состояние** нужно, когда мы хотим отвязать состояние какого-то объекта от цикла перерисовки.

Сначала научим собачку работать со ссылками. Это можно сделать при помощи функции-обёртки [`forwardRef`](https://react.dev/reference/react/forwardRef), которая позволяет передать внешнюю ссылку внутрь компонента.

```tsx
// Dog.tsx
import { forwardRef } from 'react';

export const Dog =forwardRef<HTMLDivElement>((_, ref) => <div ref={ref}>🐶</div>);
```

Внутри компонента воспользуемся хуком `useRef`, чтобы получить доступ к DOM-элементу собачки в обработчике `getBall`.

```tsx
// Maze.tsx
import { useCallback, useState, useRef } from 'react'

// Все остальные функции

export const Maze = () => {
  const dogRef = useRef<HTMLDivElement>(null)

  // Все остальные функции
  <>
    <button onClick={getBall}>Апорт!</button>
    <Dog ref={dogRef} />
    {/* Остальной код */}
  </>
}
```

## Пишем вспомогательные функции

Самое трудное позади. Осталось написать несколько функций-утилит для запуска собачки. Как и прежде мы будем использовать TypeScript, чтобы спроектировать наши функции.

```tsx
type Point = {
  x: number
  y: number
}

const generatePathAroundWalls = (
  walls: Wall[],
  start: Point,
  end: Point,
): Point[] => {
  const path = [start]
  const reversedWalls = walls.slice().reverse()
  let currentY = start.y
  path.push({ ...start })

  while (reversedWalls.length) {
    const wall = reversedWalls.pop() as Wall
    currentY++

    if (wall.width === 0) {
      continue
    }

    if (wall.left === 0) {
      path.push({ x: wall.width + 0.5, y: currentY })
    } else {
      path.push({ x: 0, y: currentY })
    }
  }

  path.push(end)
  return path
}

// Для анимации
const generateKeyframes = (path: Point[]) =>
  path.map(({ x, y }) => ({
    transform: `translate(${parrotsToPixels(x)}px, ${parrotsToPixels(y)}px)`,
  })
)
```

Был создан новый тип `Point` для хранения координат. Функция `generatePathAroundWalls` сгенерирует путь, чтобы собачка облетала стенки, а не врезалась в них.

Функция `generateKeyframes` преобразует путь в массив объектов, которые можно передать в CSS-анимацию. `transform: …` это CSS-строка, которая задаёт текущие стили элемента. Мы используем трансформацию `translate`, чтобы переместить собачку в нужное место.

## Запускаем собачку

Для запуска собачки нам нужно обновить колбэк `getBall`:

```tsx
// Maze.tsx
const getBall = useCallback(() => {
  const start = { x: 0, y: 0 } // 🐶

  const end = { x: 0, y: fieldSize + 1 } // 🎾

  const path = generatePathAroundWalls(walls, start, end)
  dogRef.current?.animate(generateKeyframes(path), {
    duration: 3000,
    easing: 'linear',
    fill: 'forwards',
  })
}, [walls])
```

Два момента, на которые стоит обратить внимание:

1. Зависимость `walls` в массиве зависимостей хука `useCallback`. Нужно обновлять функцию-колбэк при добавлении или удалении стенок.
1. Метод `animate`. Передаём в него `keyframes` и объект с настройками анимации. В настройках указываем продолжительность анимации, функцию сглаживания и что делать с элементом после анимации.

Ключевое слово `forwards` означает, что элемент останется в последнем состоянии анимации, собачка от мячика не убежит.

Попробуйте сами.

<iframe title="Демо игры с собачкой и мячиком" src="https://maze-demo.hellsquirrel.dev" height="650"></iframe>

## Посмотрите на лабиринт

Посмотрите на код компонента `Maze`, подумайте что с ним не так.

```tsx
import { fieldSize, maxWallLength, minWallLength } from './constants'
import { parrotsToPixels } from './units'
import { useCallback, useState, useRef } from 'react'
import styles from './Maze.module.css'
import { Dog } from './Dog'

type Wall = {
  left: number
  width: number
}

const randomInt = (minVal: number, maxVal: number) =>
  Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal

const generateNewWall = (): Wall => {
  const width = randomInt(minWallLength, maxWallLength)
  const alignLeft = Math.random() > 0.5

  return {
    left: alignLeft ? 0 : fieldSize - width,
    width,
  }
}

type Point = {
  x: number
  y: number
}
const generatePathAroundWalls = (
  walls: Wall[],
  start: Point,
  end: Point,
): Point[] => {
  const path = [start]
  const reversedWalls = walls.toReversed()
  let currentY = start.y
  path.push({ ...start })

  while (reversedWalls.length) {
    const wall = reversedWalls.pop() as Wall
    currentY++

    if (wall.width === 0) {
      continue
    }

    if (wall.left === 0) {
      path.push({ x: wall.width + 0.5, y: currentY })
    } else {
      path.push({ x: 0, y: currentY })
    }
  }

  path.push(end)
  return path
}

const generateKeyframes = (path: Point[]) =>
  path.map(({ x, y }) => ({
    transform: `translate(${parrotsToPixels(x)}px, ${parrotsToPixels(y)}px)`,
  })
)

export const Maze = () => {
  const size = parrotsToPixels(fieldSize)
  const [walls, setWalls] = useState<Wall[]>(() =>
    Array.from({ length: fieldSize }, () => ({
      left: 0,
      width: 0,
    })),
  )

  const dogRef = useRef<HTMLDivElement | null>(null)

  const toggleWall = useCallback((mazeRow: number) => {
    setWalls((walls) =>
      walls.map((wall, i) => {
        if (i === mazeRow) {
          if (wall.width === 0) {
            return generateNewWall()
          } else {
            return {
              left: 0,
              width: 0,
            }
          }
        }
        return wall
      }),
    )
  }, [])

  const getBall = useCallback(() => {
    const start = { x: 0, y: 0 } // 🐶

    const end = { x: 0, y: fieldSize + 1 } // 🎾

    const path = generatePathAroundWalls(walls, start, end)
    dogRef.current?.animate(generateKeyframes(path), {
      duration: 3000,
      easing: 'linear',
      fill: 'forwards',
    })
  }, [walls])

  return (
    <>
      <button onClick={getBall}>Апорт!</button>
      <Dog ref={dogRef} />
      {/* 🐶 */}
      <div
        style={{
          width: size,
          height: size,
        }}
        className={styles.maze}
      >
        {Array.from({ length: fieldSize }, (_, i) => (
          <button
            key={i}
            style={{ height: parrotsToPixels(1) }}
            className={styles.button}
            onClick={() => toggleWall(i)}
          >
            <span
              className={styles.wall}
              style={{
                width: parrotsToPixels(walls[i].width),
                left: parrotsToPixels(walls[i].left),
              }}
            />
          </button>
        ))}
      </div>
    </>
  )
}
```

Несмотря на то, что всё работает правильно, код компонента далёк от совершенства. Слишком много логики содержится в одном файле компонента. Создание подобных компонентов — это типичная ошибка при знакомстве с React. Проблема в том, что мы не нашли удобного способа разделить состояние между всеми компонентами и просто сложили всё в одну кучу (точнее, в один лабиринт).

Даже когда кажется, что всё работает стабильно, стоит потратить немного времени на тестирование UX (user experience, пользовательское взаимодействие). Текущее решение содержит один неучтённый нюанс: после нажатия на кнопку «Апорт!» пользователь может добавить несколько стенок в лабиринте до того, как начнётся анимация. При этом у собачки появляются суперспособности проходить сквозь стены. Для устранения этой недокументированной возможности потребуется запретить обработку нажатий на кнопки добавления стен лабиринта как только была нажата кнопка «Апорт!» и до момента окончания анимации. Для этого можно добавить ещё одну переменную-состояние, чтобы знать, когда можно, а когда нельзя строить стены.

Другое возможное решение – переделать анимацию так, чтобы собачка учитывала актуальное состояние стен. Для этого, например, можно рассчитывать анимацию не сразу после нажатия кнопки, а постепенно, учитывая только следующую стенку.

Попробуйте реализовать это исправление самостоятельно.

В следующей статье разберёмся как разделить состояние между компонентами.
