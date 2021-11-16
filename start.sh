#!/bin/bash

read -r -p "$(echo "Вы запускаете платформу Доки. Docker уже запущен? (y/n) ")" RESPONSE

case $RESPONSE in
  [yY][eE][sS]|[yY])

    read -r -p "$(echo "Запустить веб-сервер на http://localhost:8080? (y/n) ")" DEFAULT

    case $DEFAULT in
      [yY][eE][sS]|[yY])

        WS_IP=127.0.0.1
        WS_PORT=8080

        ;;
      *)

        read -r -p "$(echo "Укажите IP-адрес: ")" WS_IP
        read -r -p "$(echo "Укажите порт: ")" WS_PORT
        echo "Вы сможете открыть Доку в браузере по адресу: http://$WS_IP:$WS_PORT"

        ;;
    esac
    echo "Остановить веб-сервер можно с помощью клавиш: Ctrl + c$"

    docker pull dokaguide/platform && docker run --rm -p "$WS_IP":"$WS_PORT":8080/tcp -v "$(pwd)"/:/platform/content dokaguide/platform

    echo "Спасибо за ваш труд!"

    ;;
  *)

    echo "Пожалуйста, запустите Docker и обязательно возвращайтесь!"

    ;;
esac
