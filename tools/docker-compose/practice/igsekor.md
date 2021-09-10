🛠  Вы можете поискать подходящие образы на GitHub. Есть, например, целый каталог наиболее удачных: [Awesome Compose](https://github.com/docker/awesome-compose).

### Использование терминальных команд

На этапе сборки образа можно передать аргументы командной строки, а также выполнить произвольные команды по окончании сборки. Иногда это бывает крайне полезно. Например, вы хотите после сборки образа сделать паузу, в течение которой можно будет подождать какой-то процесс или посмотреть вывод в терминал результатов работы программы. В этом случае можно использовать элемент `command`:

```yaml
version: "3.9"
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

В примере также описываются аргументы командной строки, которые будут использоваться в Dockerfile и могут передаваться на этапе сборки образа командой:

```bash
docker-compose build --build-arg NAME="John Doe" --build-arg EMAIL=john@light.org
```

### Приложение на стеке MERN

MERN — это аббревиатура от MongoDB, Express, React, Node.js. С помощью Docker Compose можно легко реализовать фулстек-приложение. MERN является одним из популярных решений. Оно объединяет веб-сервер, базу данных и фреймворки для бэкенда и фронтенда.

Обычно структура папок MERN-проекта выглядит следующим образом:

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
      - 3000:3000
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
    image: mongo:4.2.0
    volumes:
      - ./data:/data/db
    networks:
      - express-mongo

networks:
  react-express:
  express-mongo:
```
