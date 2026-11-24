🛠 `AbortController` упрощает отмену запросов в React-компоненте. Если пользователь быстро меняет запрос, ответ на старый может прийти позже нового и перезаписать результат. Отмена в очистке эффекта убирает такую гонку. Она также не даёт обработать ответ после размонтирования.

```js
function SearchComponent() {
  const [search, setSearch] = useState('');
  const API_URL = 'https://jsonplaceholder.typicode.com';

  useEffect(() => {
    if (!search) return;

    const controller = new AbortController();
    const params = new URLSearchParams({ userId: search });

    // Запрос отменится при новом поиске или размонтировании
    const { signal } = controller;
    fetch(`${API_URL}/posts?${params}`, { signal })
      .then((response) => response.json())
      .then((data) => console.log('Результаты:', data))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.error(error);
      });

    // Очистка перед новым запуском эффекта и при размонтировании
    return () => controller.abort();
  }, [search]);

  return (/* ... */);
}
```

Не пугайтесь отменённого запроса во вкладке Network. В режиме разработки компонент `<StrictMode>` при монтировании запускает эффект, сразу очищает и запускает снова. Если запрос уходит уже при монтировании, первый из двух может дойти до сервера, но браузер отбросит его ответ.

Пример отписки от событий:

```js
function EventComponent() {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const onResize = () => console.log(window.innerWidth);
    const onKeyDown = (event) => console.log(event.key);

    // Один сигнал для всех обработчиков
    window.addEventListener('resize', onResize, { signal });
    window.addEventListener('keydown', onKeyDown, { signal });

    // Очистка при размонтировании
    return () => controller.abort();
  }, []);
}
```
