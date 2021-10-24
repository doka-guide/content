---
title: "Portainer - web ui для управления Docker"
description: ""
authors:
  - tst32
tags:
  - article
keywords:
  - portainer.io  
  - докер
  - контейнер
  - том
  - volume
---

:::callout !

В этой статье мы говорим как упростить управление данными Docker с помощью Portainer :1st_place_medal:  — знакомтесь, это удобный инструмент для управления контейнерами из браузера. Он включает (но этим не ограничивается) все возможности официального клиента под Windows, Portainer  умеет:
  -  работать как с локально установленным докером, так и с удалёнными серверами. 
позволяет управлять: 
  -  Шаблонами приложений - эту возможность стоит назвать киллер-фичей. 
  -  Самими контейнерами.
  -  Образами контейнеров.
  -  Сетями на хосте.
  -  Томами и дисками.

Разработка Веба это работа в браузере и вкладка c [Портейнером](http://localhost:9000) по адресу http://localhost:9000 поможет быстрее выполнить рутинные операции, которые в консоли bash занимают место и время, с Портейнером можно не углубляться в детали cli-инструментов, хотя с ними конечно надо быть знакомым - посмотрите материалы Доки про docker статья «[Что такое Docker](/tools/docker/)» и docker-compose в статье «[Мультиконтейнерное приложение и Docker Compose](tools/docker-compose/)» они работают под "капотом" Портейнера. Еще нужно обозначить, что везде по тексту Portainer/Портейнер == это Portainer Community Edition. Мы поговорим только о части возможностей Portainer наиболее востребованных с точки зрения веб-разработчика фрилансера.  
:::

![Логотип Portainer](images/portainer-logo1.png)

## Как установить Portainer
   Вот иноформация о том, как установить Portainer Standalone [Офиц.дока на eng](https://docs.portainer.io/v/ce-2.9/start/install/server/docker) 
   и официальная github страница для скачивания  [Releases](https://github.com/portainer/portainer/releases)  
###  установка Portainer в Линуксе (ubuntu, debian) как сервиса с помощью докер-контейнера 
   Инструкции с веб-сайта Portainer.io не пригодится, как и релиз сервера, потому что мы установим portainer как образ докера, а не как отдельный сервер. Используем преимущества докеризации!   
<details>
    <summary>Вот эту часть можно пропустить, если вы уже знакомы с Docker и docker-compose и эти инструменты установлены у вас. Иначе раскрывайте спойлер.  
    </summary>  

   след.шаги повторяют как установить docker и docker-compose, если их у вас еще нет. также для работы portainera нужно, чтобы пользователь был в группе docker  

   в современных дистрах этот шаг не нужен, но пригодится если ubuntu bionic

```bash 
   sudo apt-get install     apt-transport-https     ca-certificates   software-properties-common  curl     gnupg     lsb-release
```
   
```bash   
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
```bash 
  sudo echo   "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \ 
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
```bash
  sudo apt update && apt-get install docker-ce docker-ce-cli containerd.io
```
```bash
   sudo usermod -aG docker $(whoami)
```   
   В этот каталог в домашней папки  

```bash
   mkdir -p $HOME/.docker/cli-plugins/
``` 
   скачиваем   [docker-compose](https://github.com/docker/compose/releases) и делаем его исполянемым    
```bash
   sudo chmod +x ~/.docker/cli-plugins/docker-compose 
```    
после всего перегузим компьютер, чтобы стартовали сервисы 
</details>

Убедимся, что у нас работает docker-compose 
```bash
   docker-compose --version   
```  
 а в результатах команды ```groups``` есть группа docker     

создадим для портейнера постоянный том фиксированного размера на котором будут сохраняться данные  Portainer Community Edition  

```bash
docker volume create -d local  --name portainer_data \
    --opt device="/mnt/device_guid/portainer_volume" \
    --opt type="none" \
    --opt o="bind" \
    --opt o=size=10000m,gid=1000 \
```
  Укажем докеру скачать образ portainer/portainer одной из предыдущих версий (1.24.2) из общедоступного регистри, неинтерактивно запустим портейнер с опцией постоянного рестарта и подключением  созданного portainer_data тома:

```bash
  docker run -d -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer:1.24.2
```

  :1.24.2 можно не добавлять, тогда полученная версия будет latest.

браузер открываем по http://localhost:9000 (не https!) 

если понадобится остановить/стартануть портейнер выполяем соответственно ``` docker stop portainer ```  или  ``` docker start portainer ```

## Как выглядит portainer 

![Авторизация](images/07screen.png)

![Дашборд](images/02screen.png)

![Шаблоны приложений](images/03screen.png)

![Управление контейнерами](images/04screen.png)


## Пример использования 

### Cоздадим шаблон приложения  dokaguide-platform

На сайте Доки есть инструкция о том как развернуть локальную среду разработки для редактирования материалов Доки. В инструкции предлагается выполнить  bash script, который скачает и запустит образ dokaguide/platform в несколько нажатий кнопок. Создадим шаблон которым, кстати, можно поделится, чтобы портейнер заботился от том что у наc работал бы локальный сайт Доки!
Предположим, что папка нашего проекта находится по пути /home/y/proj/doka (туда был склонирован форк Доки) 
открываем  http://localhost:9000 и выбираем в меню APP Templates Add Template

![Список шаблон, кнопка добавить шаблон](images/08screen.png)

Создаем шаблон как на скрине, и нажимаем кнопку Create Template 

![Создание шаблона](images/09screen.png)

Осталось теперь выбрать в меню список всех шаблонов app templates и найти на последнем месте созданный шаблон, выбираем его, открываем и нажимаем кнопку deploy :tada:

![Открываем шаблон](images/05screen.png)

Контейнер запускается, первый запуск связан с этапом скачивания образа из общедоступного регистри, последующие запуски будут быстрыми. открываем домашнюю страницу Доки локально http://localhost:8080 

![Локальный сайт Доки](images/10screen.png)
