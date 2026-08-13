# Использование SSH-ключей для проектов

## Summary

- В практике выяснили, что для каждого проекта разработчики могут создавать SSH-ключи на каждый проект. Это выглядит лишним усложнением. Обычно достаточно двух ключей: рабочего и личного.
- Если проекты лежат на разных Git-серверах, SSH сам выберет нужный ключ по `Host` из `~/.ssh/config`.
- Если на одном сервисе несколько аккаунтов, например два аккаунта GitHub, тогда удобнее завести алиасы вроде `github-work` и `github-personal`.
- Важно настраивать `user.name` и `user.email` под тип проекта: для рабочих проектов указывать рабочую почту, для личных - личную.
- Fork тоже умеет переключать SSH-ключи через интерфейс, но настройка через `~/.ssh/config` работает везде: в терминале, IDE и других Git-клиентах.

## Описание

Обсуждали, как использовать SSH-ключи для репозиториев.

Один из сценариев: для каждого проекта создавать отдельный SSH-ключ и добавлять его в нужный аккаунт или сервис. В итоге такой подход показался избыточным: ключей становится много, их сложнее поддерживать, а практической пользы для обычной работы мало.

Более удобный вариант: держать два SSH-ключа:

- один для рабочих проектов;
- один для личных проектов.

Это покрывает сценарий, когда есть разные рабочие и личные аккаунты в GitHub или GitLab. Один и тот же ключ нельзя удобно использовать для разных аккаунтов в одном сервисе, поэтому полностью обойтись одним ключом не всегда получается. Но заводить отдельный ключ на каждый проект тоже не нужно.

## Пример настройки .ssh/config без алиасов

Если рабочие и личные проекты лежат на разных Git-серверах, можно использовать два ключа и указать реальные домены прямо в `Host`.

```sshconfig
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal
  AddKeysToAgent yes
  UseKeychain yes

Host gitlab.fuse8.ru
  HostName gitlab.fuse8.ru
  User git
  IdentityFile ~/.ssh/id_ed25519_work

Host bitbucket.fuse8.ru
  HostName bitbucket.fuse8.ru
  User git
  IdentityFile ~/.ssh/id_ed25519_work
```

В этом случае `remote` проекта можно оставить обычным:

```bash
git@github.com:username/project.git
git@gitlab.fuse8.ru:company/project.git
git@bitbucket.fuse8.ru:company/project.git
```

Когда выполняется `git push`, Git берет хост из `remote`, а SSH ищет такой же блок `Host` в `~/.ssh/config`.

Например:

- для `git@github.com:username/project.git` будет найден `Host github.com` и использован личный ключ `~/.ssh/id_ed25519_personal`;
- для `git@gitlab.fuse8.ru:company/project.git` будет найден `Host gitlab.fuse8.ru` и использован рабочий ключ `~/.ssh/id_ed25519_work`;
- для `git@bitbucket.fuse8.ru:company/project.git` будет найден `Host bitbucket.fuse8.ru` и тоже использован рабочий ключ `~/.ssh/id_ed25519_work`.

## Когда нужны алиасы

Алиасы нужны, когда один и тот же сервис или домен нужно использовать с разными ключами. Например, есть два аккаунта на `github.com`: рабочий и личный.

```sshconfig
Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_work
  IdentitiesOnly yes

Host github-personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal
  IdentitiesOnly yes
```

Тогда в `remote` проекта указывается не `github.com`, а нужный алиас:

```bash
git remote set-url origin git@github-work:company/project.git
git remote set-url origin git@github-personal:username/project.git
```

Так Git все равно будет ходить на `github.com`, потому что внутри алиаса указан `HostName github.com`, но SSH будет выбирать ключ по имени `Host`: `github-work` или `github-personal`.

## Имя и email для коммитов

Важно настроить `user.name` и `user.email`, чтобы в GitHub/GitLab отображалась правильная почта. Для рабочих проектов лучше указывать рабочую почту, для личных - личную.

Глобальная настройка:

```bash
git config --global user.name "Dmitry Berdnikov"
git config --global user.email "personal@example.com"
```

Локальная настройка для конкретного рабочего проекта:

```bash
git config user.name "Dmitry Berdnikov"
git config user.email "dmitry.berdnikov@fuse8.online"
```

Локальная настройка записывается в `.git/config` конкретного проекта и переопределяет глобальную. Это удобно, если личные проекты должны коммититься с личной почтой, а рабочие - с рабочей.

## Альтернатива через Fork

Еще можно использовать Git-клиент Fork: в нем можно переключать SSH-ключи для проектов через интерфейс.

Но вариант через `~/.ssh/config` выглядит удобнее и универсальнее, потому что работает не только в Fork, а в терминале, IDE, CI-скриптах и других Git-клиентах. Один раз настроил ключи и дальше Git сам выбирает их по `Host` из `remote`.
