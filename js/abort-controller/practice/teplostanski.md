🛠 `AbortController` может сделать код React-компонентов более элегантным, особенно при работе с эффектами. Вот пример отписки от событий:

```js
function EventComponent() {
  useEffect(() => {
    const controller = new AbortController()
    // Один сигнал для всех обработчиков
    window.addEventListener('resize', onResize, { signal: controller.signal })
    window.addEventListener('keydown', onKeyDown, { signal: controller.signal })

    // Отчистка при размонтировании и ререндере
    return () => controller.abort()
  }, [])
}
```

🛠 Отмена асинхронных запросов в React-компонентах:

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

    // Отчистка при размонтировании и ререндере
    return () => controller.abort()
  }, [search])

  return (/* ... */)
}
```

Особенно полезно в React.StrictMode, где происходит двойной рендер в development режиме, что позволяет избежать лишних запросов к серверу.
