---
title: "Основы работы с Elasticsearch"
description: "Разбираемся, для чего нужен Elasticsearch и как с ним работать."
authors:
  - khlebovsky
keywords:
  - elasticsearch
  - эластиксерч
  - nosql
  - поиск
  - база данных
tags:
  - article
---

## Кратко

_[Elasticsearch](https://www.elastic.co/elasticsearch/) (далее - ES)_ - масштабируемая поисковая система, которую также можно отнести к нереляционным (noSQL) базам данных. В основном используется для полнотекстового поиска с фильтрами и анализаторами.

ES написан на Java, использует JSON REST API для работы с данными и [Lucene](https://lucene.apache.org/) для полнотекстового поиска. Подобные движки используются для сложного поиска по документам (релевантность, морфология, даты, диапазоны и т.д.). Документ в данном случае - просто набор полей, с которым мы будем работать.

## Как понять

ES позволяет производить поиск по документам в режиме реального времени, он горизонтально масштабируется и поддерживает многопоточность. У других noSQL-систем выигрывает качеством и скоростью обработки текста и гибким полнотекстовым поиском по всей базе документов.

В основе работы с текстом лежит анализатор, который представляет из себя цепочку обработчиков. Сначала отданный в ES текст проходит **символьные фильтры**, которые обрабатывают отдельные символы. Например, можно привести текст к нижнему регистру или удалить HTML-теги.

Далее текст обрабатывается токенизатором, который очищает текст от специальных символов, знаков препинания и разбивает по указанным правилам на отдельные слова, которые называются **токенами**.

После токенизатора текст передаётся в один или несколько **фильтров токенов**, которые могут изменять слова в наборе. Например, можно добавить фильтр стоп-токенов, который будет удалять так называемые стоп-слова. На выходе из анализатора получается набор токенов, который добавляется в поисковый индекс.

Если говорить коротко про архитектуру ES, то она такая: есть поисковые индексы, их можно делить на части - шарды. На каждом запущенном процессе (узле) ES может быть несколько шардов. Каждый узел делегирует операции нужному шарду, перебалансировка выполняется автоматически. Отказоустойчивость достигается тем, что индекс автоматически распределяется по узлам кластера. Кластеры продолжают работать, даже если возникают аппаратные ошибки.

![Упрощенная архитектура ES](images/scheme1.png)

На схеме: данные через координаторы поступают в кластер, далее распределяются по узлам в поисковые индексы и шарды.

## Как начать

Для использования ES нужно установить [Java 8+ версии](https://www.java.com/ru/download/manual.jsp). Инструкция установки самого ES
[есть на сайте разработчика](https://www.elastic.co/downloads/elasticsearch).

После установки можно проверить, что ES работает:

```bash
curl -X GET localhost:9200
```

В результате увидим подобный ответ:

```json
{
  "name" : "YOUR_PC_NAME",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "lzEwg8XDSUqDm15eIej4Zg",
  "version" : {
    "number" : "8.1.1",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "unknown",
    "build_date" : "2022-04-07T18:55:12.682985671Z",
    "build_snapshot" : false,
    "lucene_version" : "9.0.0",
    "minimum_wire_compatibility_version" : "7.17.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

Альтернативный способ - запустить ES в докер-контейнере. Про [docker](https://doka.guide/tools/docker/) можно почитать на платформе в разделе инструментов. Официальный образ можно найти на [Docker Hub](https://hub.docker.com/_/elasticsearch), а инструкция по запуску и настройке контейнера есть в [документации по ES](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html). Стянули контейнер - настроили по инструкции - двигаемся дальше.

## Как использовать

Рассмотрим на практике создание индекса, его настройку, индексацию и поиск записей. Для работы используется фреймворк Express JS.

Для работы нам нужно инициализировать проект и поставить библиотеку для работы с ES. Чтобы развернуть проект используем [express-generator](https://expressjs.com/ru/starter/generator.html) - генератор приложений для Express.js:

```bash
npm install -g express-generator

express ./elastic-js && cd elastic-js

npm install && npm install elasticsearch --save
```

Создаём любой файл для работы и начинаем писать код.

### Подключение к ES

Для начала нам нужно подключиться к нашему ES:

```javascript
const {Client} = require('@elastic/elasticsearch')
const Client = new Client({
  node: 'https://localhost:9200',
  auth: {
      username: 'elastic',
      password: 'changeme'
  }
})
```

Здесь **node** - хост для подключения к ES, а **auth** - логин и пароль, увидеть их вы можете после запуска ES в логах. Вместо логина и пароля можно использовать ApiKey, подробности в [документации](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-connecting.html).\

### Создание и настройка индекса

Далее нам нужно создать поисковый индекс - в нем будут храниться наши документы. Напишем для этого функцию:

```javascript
async function createIndex() {
    return await client.indices.create({
        index: 'search_index'
    })
}
```

Заодно напишем функцию для удаления индекса:

```javascript
async function deleteIndex() {
  return await client.indices.delete({
    index: 'search_index'
  })
}
```

Здесь `'search_index'` — название нашего индекса, не более того.

Теперь давайте добавим в наш индекс **mapping** - список полей документа. Но для начала немного теории. Маппинг позволяет указать поля и их типы внутри поискового индекса. Это нужно для того, чтобы можно было эффективно работать с разными типами данных и ES понимал какие данные как индексировать. Подробное описание типов данных можно найти в [документации](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html). А мы же перейдём к практике. Не будем усложнять - возьмём простой пример и будем хранить товары: id и title и description.

```javascript
async function addMapping() {
    return await client.indices.putMapping({
        index: 'search_index',
        body: {
            properties: {
                id: {type: 'keyword'},
                name: {type: 'text'},
                description: {type: 'text'}
            }
        }
    })
}
```

Это самый простой пример маппинга - название и типы полей. Но давайте добавим анализатор и фильтр, чтобы нормализация текста была лучше. Это нужно для того, чтобы сделать наш поиск точнее - ES предлагает нам огромные возможности для работы с разными данными, не только с текстом. Чем тщательнее мы анализируем наши документы, тем качественнее можем сделать их поиск. Для этого нужно добавить в наш индекс новые настройки:

```javascript
async function addSettings() {
    return await client.indices.putSettings({
        index: 'search_index',
        body: {
            index: {
                analysis: {
                    char_filter: {
                        text_char_filter: {
                            type: 'mapping',
                            mappings: [
                                'Ё => ё',
                                'ё => е',
                                ', => .'
                            ]
                        }
                    },
                    analyzer: {
                        search_analyzer: {
                            type: 'custom',
                            tokenizer: 'standard',
                            filter: [
                                'lowercase',
                                'shingle',
                                'russian_stop',
                                'russian_stemmer'
                            ],
                            char_filter: 'text_char_filter'
                        }
                    },
                    filter: {
                        shingle: {
                            type: 'shingle',
                            min_shingle_size: 2,
                            max_shingle_size: 4,
                        },
                        russian_stop: {
                            type: 'stop'
                        },
                        russian_stemmer: {
                            type: 'stemmer',
                            language: 'russian'
                        }
                    }
                }
            }
        }
    })
}

```

Давайте разберём. В блоке **analysis** мы описываем настройки анализатора. **char_filter** - символьный фильтр, его задача заменить указанные символы. **analyzer** - анализатор текста, который использует фильтры из блока **filter**. Фильтр `"shingle"` отвечает за расстояние между двумя словами для поиска искомой фразы, в нашем случае от 2 до 4. Дальше описываем фильтр для стоп-слов и стемминга. Стемминг - удаление окончаний и суффиксов из слова, получение основы.

Дальше нам нужно дополнить наш метод для создания маппинга, чтобы ES начал использовать наши настройки, созданные выше:

```javascript
async function addMapping() {
    return await client.indices.putMapping({
        index: 'search_index',
        body: {
            properties: {
                id: {type: 'keyword'},
                name: {
                    type: 'text',
                    analyzer: 'search_analyzer'
                },
                description: {
                    type: 'text',
                    analyzer: 'search_analyzer'
                }
            }
        }
    })
}
```

Теперь при добавлении документов в ES текстовые данные будут обработаны нашим кастомным анализатором.

### Индексация записей

Индексация документов - это сохранение наших документов в базу данных, чтобы мы могли иметь к ним доступ. В случае с ES перед сохранением данные прогоняются через изученный ранее нами анализатор и только затем сохраняются.

Значительная часть работы уже сделана - мы описали наш поисковый индекс и можем с ним работать. Давайте добавим парочку товаров в наш индекс:

```javascript
async function indexElement(data) {
    return await client.index({
        index: 'search_index',
        type: 'products',
        body: data
    })
}

indexElement({
    id: 1,
    name: 'Apple iPhone 12 256GB (PRODUCT)RED',
    description: 'iPhone 12. Во-первых, это быстро. iPhone 12 поражает возможностями.'
})

indexElement({
    id: 1,
    name: 'Lenovo Legion 5',
    description: 'Мощный игровой ноутбук'
})
```

Множественная вставка записей поддерживается при помощи **Bulk**, но его мы пропустим.

### Поиск записей

Теперь давайте попробуем найти наши документы:

```javascript
async function search(query) {
    return await client.search({
        index: 'search_index',
        query: query
    })
}

const query = {
    match: {
        name: 'Iphone'
    }
}

const result = search(query);
const products = result.hits.hits;
```

Это самый простой пример поиска - мы ищем товары, у которых в названии будет слово "Iphone". Сами элементы находятся в поле **result.hits.hits** - такая уж структура ответа в ES.

Теперь рассмотрим запрос посложнее:

```javascript
const query = {
    function_score: {
        query: {
            bool: {
                should: [
                    {
                        match_phrase: {
                            name: {
                                query: 'Iphone Pro',
                                slop: 3,
                                boost: 1000
                            }
                        }
                    },
                    {
                        match_phrase: {
                            name: {
                                description: 'Iphone Pro',
                                slop: 3,
                                boost: 10
                            }
                        }
                    }
                ]
            }
        }
    }
}
```

В ES можно описывать функции для расчёта релевантности документов - за это отвечает **function_score**. В данном запросе нас устроит первое условие ИЛИ второе условие - логическая функция **bool** с **should**. Конструкция **match_phrase** позволяет искать соответствие по поисковой фразе, **slop** отвечает за то, сколько слов может быть между нашей поисковой фразой, а **boost**, как можно догадаться, отвечает за веса полей.

Вложенность и структура запроса в ES могут быть любыми - фантазия вам в помощь.
