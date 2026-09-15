---
title: "Отладка Canvas"
description: "Обходные пути отладки в отсутствии удобных инструментов."
authors:
  - solarrust
keywords:
  - canvas
  - канвас
  - debugging
  - debugg
related:
  - html/canvas
  - css/animation
  - tools/how-to-simplify-tests
tags:
  - article
---

## Кратко

Для некоторых типов задач отлично подходит рисование на [`<canvas>`](/html/canvas/). Это мощный инструмент, который позволяет рисовать сложные анимации при помощи JavaScript. Это очень щадящий для браузера пользователя способ отображения большого количества элементов.

Но есть одна загвоздка — сложность отладки того, что нарисовано на холсте. Особенно это становится актуально при создании сложных интерактивных анимаций, где требуется подбирать тайминги и подкручивать значения.

Если вы откроете инструменты разработчика для демо ниже, то увидите только один элемент `<canvas>` в HTML-разметке и больше ничего.

// Демо с большим количеством элементов

В этой статье перечислены некоторые альтернативные способы отладки.

## Рисовать отладочную информацию на холсте

Рисуйте текстовую или графическую отладочную информацию прямо на `canvas`.

Например, отображайте текущий кадр, координаты объектов или их скорость:

```javascript
ctx.font = '16px Arial'
ctx.fillStyle = 'red'
ctx.fillText(`Frame: ${frameCount}`, 10, 20)
ctx.fillText(`Position: (${x.toFixed(2)}, ${y.toFixed(2)})`, 10, 40)
```

## Временные метки

Логируйте время начала и окончания выполнения каждой анимационной операции.

```javascript
const start = performance.now()
// Рендеринг кадра
draw()
const end = performance.now()
console.log(`Frame render time: ${end - start} ms`)
```

## Ограничение кадров

Ограничьте анимацию определённым количеством кадров, чтобы замедлить процесс и анализировать конкретные моменты.

Например:

```javascript
let frameLimit = 100 // Ограничить до 100 кадров
let frameCount = 0

function animate() {
  if (frameCount < frameLimit) {
    frameCount++
    draw()
    requestAnimationFrame(animate)
  }
}
animate()
```

## Временная шкала

Привяжите события к временной шкале, чтобы понимать, когда объект меняет своё состояние:

```javascript
const timeline = [
  { time: 0, event: 'Start animation' },
  { time: 500, event: 'Change color' },
  { time: 1000, event: 'Stop animation' }
]

const currentTime = performance.now()
timeline.forEach(item => {
  if (currentTime >= item.time) console.log(item.event)
})
```

## Точки останова в DevTools

Вставьте в код временные точки:

```javascript
if (x > canvas.width / 2) debugger // Останавливаем выполнение, если объект пересёк середину экрана
```

Запустите код в режиме отладки браузера (обычно это вкладка Sources или Debugger в DevTools).

## Вспомогательная сетка

Нарисуйте сетку на `canvas`, чтобы легче было отслеживать положение объектов.

```javascript
function drawGrid() {
  ctx.strokeStyle = '#ccc'
  for (let x = 0; x < canvas.width; x += 50) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
  }
  for (let y = 0; y < canvas.height; y += 50) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke()
  }
}
```

## Библиотеки

Stats.js: Отображает FPS и время на отрисовку.

```javascript
const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
  stats.begin()
  draw()
  stats.end()
  requestAnimationFrame(animate)
}
animate()
```

Dat.GUI: Позволяет изменять параметры анимации в реальном времени (например, скорость, размер объектов).

```javascript
const gui = new dat.GUI()
const params = { speed: 1 }
gui.add(params, 'speed', 0.1, 5)

function animate() {
  x += params.speed
  draw()
  requestAnimationFrame(animate)
}
animate()
```

## Анализ производительности
Используйте вкладку Performance в DevTools, чтобы увидеть, сколько времени занимает каждый кадр.
Откройте вкладку Performance.
Нажмите «Record» и начните анимацию.
Остановите запись и проанализируйте, какие операции занимают больше всего времени.

## Использование слоёв
Разделите элементы на разные Canvas (или слои внутри одного Canvas), чтобы изолировать проблемные участки анимации.
