#!/bin/sh#
# Определеяет цвета для консоли
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[38;5;11m"
RESET="\033[0m"
BOLD="\033[1m"

read -r -p "$(echo $YELLOW$BOLD"Вы запускаете платформу Доки. Docker уже запущен? (y/n) "$RESET)" RESPONSE

case $RESPONSE in
    [yY][eE][sS]|[yY])

        read -r -p "$(echo $YELLOW$BOLD"Запустить веб-сервер на http://localhost:8000? (y/n) "$RESET)" DEFAULT

        case $DEFAULT in
            [yY][eE][sS]|[yY])

                WS_IP=127.0.0.1
                WS_PORT=8000

                ;;
            *)

                read -r -p "$(echo $GREEN$BOLD"Укажите IP-адрес: "$RESET)" WS_IP
                read -r -p "$(echo $GREEN$BOLD"Укажите порт: "$RESET)" WS_PORT
                echo $YELLOW$BOLD"Вы сможете открыть Доку в браузере по адресу: http://$WS_IP:$WS_PORT$RESET"

                ;;
        esac
        echo $YELLOW$BOLD"Остановить веб-сервер можно с помощью клавиш: Ctrl + c$RESET"

        docker pull ydoka/platform && docker run --rm -p "$WS_IP":"$WS_PORT":8080/tcp -v "$(pwd)"/:/platform/content ydoka/platform

        echo $YELLOW$BOLD"Спасибо за ваш труд!$RESET"

        ;;
    *)

        echo $RED$BOLD"Пожалуйста, запустите Docker и обязательно возвращайтесь!"

        ;;
esac
