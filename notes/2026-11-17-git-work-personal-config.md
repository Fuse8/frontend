## Имя и email для коммитов

Для автоматического переключения рабочих и личных Git-настроек используется `includeIf`.

### Пример структуры папок

```text
~/web/
├── personal/          # Личные проекты
└── work/              # Рабочие проекты
    ├── .gitconfig
    ├── project-1/
    └── project-2/
```

**Нужно заменить:** пути к папкам, имя пользователя и email на свои.

### 1. Глобальный конфиг

Файл `~/.gitconfig`:

```ini
[user]
    name = Your Name
    email = personal@example.com
```

### 2. Рабочий конфиг

Создать файл `~/web/work/.gitconfig`:

```ini
[user]
    name = Your Name
    email = work@company.com
```

### 3. Подключение

Выполнить один раз:

```bash
git config --global 'includeIf.gitdir:/Users/username/web/work/.path' /Users/username/web/work/.gitconfig
```

### 4. Проверка

Внутри рабочего репозитория:

```bash
git config user.name
git config user.email
git config --show-origin --get user.email
```

Все репозитории внутри `~/web/work/` автоматически используют рабочий конфиг. Остальные — глобальный.

**Примечание:** локальные настройки репозитория имеют приоритет.
