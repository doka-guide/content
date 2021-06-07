---
tags:
  - practice
permalink: false
---

## Управление и мониторинг

С помощью сигналов в Unix-подобных операционных системах веб-сервером можно управлять, как это описано в статье «[Веб-сервер Nginx](/tools/articles/webserver-nginx)». Управление веб-сервером Apache осуществляется так:

- `sudo systemctl status httpd` - получить информацию о запущенном Apache;
- `sudo systemctl stop httpd` - остановить веб-сервер Apache;
- `sudo systemctl start httpd` - запустить веб-сервер Apache;
- `sudo systemctl reload httpd` - перезапустить веб-сервер Apache, предварительно дождавшись завершения обработки всех текущих запросов;
- `sudo systemctl restart httpd` - перезапустить веб-сервер Apache, не дожидаясь окончания обработки текущих запросов.

В Windows управление веб-сервером зависит от того, как он был запущен. Apache может использоваться как консольное приложение. В этом случае запуск, установка и перезапуск Apache можно осуществить с помощью команд:

```bash
httpd.exe
httpd.exe -k shutdown
httpd.exe -k restart
```

Больше настроек можно посмотреть в [официальной документации](https://httpd.apache.org/docs/current/platform/windows.html#winsvc).
