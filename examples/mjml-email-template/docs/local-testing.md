## Локальная тестирование

`send-test-email`: команда для отправки письма по smtp

В файле `./send-test-email.js` находится nodejs скрипт, который отправляет письмо через smtp.

Переменные, которые необходимы для работы скрипта. Можно создать .env файл в корне и задать нужные значения.

```
TEMPLATE_NAME=email-confirmation
SEND_TO_EMAIL=recipient@fuse8.online

SMTP_HOST=smtp.mail.ru
SMTP_PORT=465
SEND_FROM_EMAIL=sender@mail.ru
SEND_FROM_EMAIL_PASSWORD=bar
```

Чтобы отправить конкретный шаблон нужно указать его имя в `TEMPLATE_NAME` без расширения, шаблон будет выбран из папки templates.

`SEND_TO_EMAIL` куда будут приходить письма

Пример подключению к mail smtp. host: smpt.mail.ru, port: 465, email свой, а пароль нужно сгенерировать для приложений, а не стандартный по которому происходит авторизация в mail.
