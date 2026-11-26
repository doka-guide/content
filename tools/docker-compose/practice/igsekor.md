🛠 Готовые файлы конфигурации можно поискать на GitHub. Есть, например, целый каталог примеров от команды Docker: [Awesome Compose](https://github.com/docker/awesome-compose).

### Использование терминальных команд

Элемент `command` заменяет команду, с которой запускается контейнер. Например, бесконечный цикл с `sleep` держит контейнер запущенным. Тогда в него можно зайти через `docker compose exec` и что-то проверить.

Ещё в `build.args` можно передать аргументы для сборки образа:

```yaml
services:
  phys-website:
    env_file: ./.env
    command: /bin/sh -c "while sleep 1000; do :; done"
    build:
      context: ./
      args:
        USER_NAME: ${NAME}
        USER_EMAIL: ${EMAIL}
```

Значения `${NAME}` и `${EMAIL}` Compose берёт из переменных окружения или файла _.env_. Их можно задать прямо перед командой сборки:

```bash
NAME="John Doe" EMAIL=john@example.com docker compose build
```

### Приложение на стеке MERN

MERN — один из популярных стеков для фулстек-приложения (с фронтендом и бэкендом). Название складывается из MongoDB, Express, React и Node.js. Стек объединяет веб-сервер, базу данных и фреймворки для бэкенда и фронтенда. С Docker Compose такое приложение легко собрать.

Обычно структура папок MERN-проекта выглядит так:

```
.
├── backend
│   ├── Dockerfile
│   ...
├── compose.yaml
├── frontend
│   ├── ...
│   └── Dockerfile
└── README.md
```

Файл конфигурации _compose.yaml_ можно сделать так:

```yaml
services:
  frontend:
    build: frontend
    ports:
      - "3000:3000"
    stdin_open: true
    volumes:
      - ./frontend:/usr/src/app
      - /usr/src/app/node_modules
    container_name: frontend
    restart: always
    networks:
      - react-express
    depends_on:
      - backend

  backend:
    container_name: backend
    restart: always
    build: backend
    volumes:
      - ./backend:/usr/src/app
      - /usr/src/app/node_modules
    depends_on:
      - mongo
    networks:
      - express-mongo
      - react-express

  mongo:
    container_name: mongo
    restart: always
    image: mongo:8.0
    volumes:
      - ./data:/data/db
    networks:
      - express-mongo

networks:
  react-express:
  express-mongo:
```

Если в папке _./data_ уже лежат данные MongoDB 6.0 или более ранней версии, `mongo:8.0` их не прочитает. Как и MySQL, MongoDB обновляют по шагам, через каждую мажорную версию. Например, с 6.0 так: 6.0 → 7.0 → 8.0. После каждого шага поднимите настройку совместимости данных `featureCompatibilityVersion` до новой версии, иначе следующий шаг не сработает.
