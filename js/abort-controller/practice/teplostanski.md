🛠 `AbortController` упрощает отмену асинхронных запросов в React-компоненте. Это особенно полезно при использовании `React.StrictMode`, чтобы избежать лишних запросов к серверу, так как `StrictMode` в `development` режиме запускает дополнительный цикл установки и сброса `useEffect`.

```js
function SearchComponent() {
  const [search, setSearch] = useState('')
  const API_URL = 'https://jsonplaceholder.typicode.com'

  useEffect(() => {
    const controller = new AbortController()

    // Запрос отменится при новом поиске или размонтировании
    fetch(`${API_URL}/posts?userId=${search}`, { signal: controller.signal })
      .then(response => response.json())
      .then(data => console.log('Результаты:', data))
      .catch(error => {
        if (error.name === 'AbortError') return
        console.error(error)
      })

    // Очистка при размонтировании и ререндере
    return () => controller.abort()
  }, [search])

  return (/* ... */)
}
```

Пример отписки от событий:

```js
function EventComponent() {
  useEffect(() => {
    const controller = new AbortController()
    // Один сигнал для всех обработчиков
    window.addEventListener('resize', onResize, { signal: controller.signal })
    window.addEventListener('keydown', onKeyDown, { signal: controller.signal })

    // Очистка при размонтировании
    return () => controller.abort()
  }, [])
}
```
