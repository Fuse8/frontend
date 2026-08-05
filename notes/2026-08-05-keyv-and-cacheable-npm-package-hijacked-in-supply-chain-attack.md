# Keyv/Cacheable npm Package Hijacked in Supply Chain Attack

## Содержание

- [Проблема](#проблема)
- [Важность lockfile в проекте](#важность-lockfile-в-проекте)
- [Промпт для проверки Keyv/Cacheable](#промпт-для-проверки-keyvcacheable)
- [Промпт проверки npm-уязвимостей в проекте](#промпт-проверки-npm-уязвимостей-в-проекте)

## Проблема

[статья](https://www.wiz.io/blog/keyv-and-cacheable-npm-supply-chain-attack)

**Важно:** На данный момент список скомпрометированных пакетов может быть неполным, поэтому обновление зависимостей сейчас стоит делать осторожно: не пересобирать lockfile с нуля и не делать массовый npm update, а обновлять только конкретные нужные пакеты, проверять diff lockfile и запускать проверку по advisory/IOC.

4 августа 2026 был npm supply-chain инцидент: злоумышленники скомпрометировали публикацию ряда пакетов из экосистемы keyv/cacheable и связанных пакетов. Опасны не все пакеты с именем keyv или cacheable, а конкретные вредоносные версии из advisory, например keyv@6.0.0, cache-manager@7.2.10, cacheable-request@13.0.20, @cacheable/utils@2.5.1.

Риск в том, что вредоносный код мог выполниться при установке зависимостей и попытаться украсть .env, GitHub/npm tokens, SSH-ключи, cloud credentials, CI/CD secrets и конфиги dev-инструментов.

Если lockfile был обновлён до публикации вредоносных версий (примерно 4 августа) и не менялся после, пакетный менеджер не должен внезапно подтянуть плохую версию.

## Важность lockfile в проекте

Что важно:
- Хранить package-lock.json, pnpm-lock.yaml, yarn.lock или bun.lock в git.
- Не удалять lockfile “для обновления зависимостей”.
- В CI использовать строгую установку:
	- npm ci
	- pnpm install --frozen-lockfile
	- yarn install --immutable
	- bun install --frozen-lockfile

Не использовать в CI обычный install, который может незаметно изменить lockfile.

## Промпт для проверки Keyv/Cacheable

```text
Проверь проект на npm supply-chain incident keyv/cacheable от 4 августа 2026 по Wiz:
https://www.wiz.io/blog/keyv-and-cacheable-npm-supply-chain-attack

Важно:
- Ничего не менять в проекте.
- Сначала открой актуальный Wiz advisory и linked full list affected packages, потому что список мог обновиться.
- Проверять нужно конкретные пары package + malicious version, а не просто наличие имени пакета.

Нужно сделать:

1. Определить package manager и lockfile:
   package-lock.json
   pnpm-lock.yaml
   yarn.lock
   bun.lock / bun.lockb

2. Проверить все package.json и lockfile на все package/version пары из Wiz advisory/full list.
   Минимально проверить эти известные версии:
   @cacheable/utils@2.5.1
   @hubsync/web-sdk-react@6.3.7
   @nebula.js/nucleus@0.5.1
   @ornikar/babel-preset-base@6.0.3
   @ornikar/babel-preset-kitt-universal@8.0.3
   @ornikar/babel-preset-react@6.1.4
   @ornikar/browserslist-config@8.0.3
   @ornikar/commitlint-config@8.3.2
   @ornikar/eslint-config-babel@24.0.1
   @ornikar/eslint-config-react@24.0.1
   @ornikar/eslint-config-typescript@24.0.1
   @ornikar/eslint-config-typescript-react@24.0.1
   @ornikar/eslint-plugin-neverthrow@1.3.1
   @ornikar/eslint-plugin-ornikar@24.0.1
   @ornikar/graphql-config@1.1.1
   @ornikar/intl-config@10.0.2
   @ornikar/kitt2@1.0.1
   @ornikar/monorepo-config@14.3.2
   @ornikar/postcss-config@9.1.2
   @ornikar/prettier-config@9.0.3
   @ornikar/prismic-components@0.0.2
   @ornikar/react-modern-calendar-datepicker@3.2.1
   @ornikar/react-native-svg-transformer@1.0.6
   @ornikar/renovate-config@9.0.2
   @ornikar/repo-config-react@13.0.8
   @ornikar/repo-config-react-legacy-css@15.1.2
   @ornikar/rollup-plugin-postcss@2.0.5
   @ornikar/stylelint-config@14.0.3
   @ornikar/typed-css-modules-loader@0.8.2
   @qlik/embed-react@2.5.3
   @qlik/embed-runtime@1.6.4
   @qlik/embed-web-components@1.7.3
   @qlik/runtime-module-loader@1.5.1
   @thiennq/docs-viewer@1.6.2
   babel-plugin-linaria-css-to-undefined@0.3.1
   cache-manager@7.2.10
   cacheable-request@13.0.20
   http-metrics-middleware@2.2.2
   keyv@6.0.0
   picasso-plugin-hammer@2.11.6
   picasso-plugin-q@2.11.6
   pob-test-package-in-monorepo@5.2.1

3. Проверить IOC в репозитории и установленном node_modules:
   /tmp/bun-dl-*
   node_modules/keyv/Math_Symbol.js
   Math_Symbol.js
   math_init.js
   .claude/setup.mjs
   .vscode/setup.mjs
   .vscode/tasks.json
   строку IfYouBlockThisAPIKeyItWillCrashTheLiveProductionServersOfAllThirdPartyClients
   домены npm-cache.com, eth-mainnet.nodereal.io, go.getblock.io, eth.llamarpc.com, pypi-get.com, js-mirror.com
   user-agent Bun/1.3.13

4. Если найдены подозрительные файлы, посчитать SHA1 и сравнить с IOC:
   Math_Symbol.js / math_init.js = 35a672cf34b996b91f3e1c28cbf3a05a37e036e4
   .claude/setup.mjs = 686aa40d0fc22c8d569494543a0f891f359f2f99
   .vscode/setup.mjs = f525d52ceb966516686b482d3dc0137028cc6a63

5. Для найденных пакетов объяснить:
   - найдена ли именно вредоносная версия;
   - зависимость прямая или транзитивная;
   - через какую цепочку она пришла;
   - был ли lockfile обновлён после 4 августа 2026 09:00 UTC.

6. Вывод должен быть короткий:
   - affected / not affected / inconclusive;
   - какие команды были выполнены;
   - что именно найдено;
   - нужны ли действия: удалить зависимость, обновить lockfile, очистить node_modules/cache, проверить CI logs, ротировать секреты.
```

## Промпт проверки npm-уязвимостей в проекте

```text
Проверь проект на npm security issues и supply-chain риски.

Правила:
- Ничего не менять в проекте без отдельного разрешения.
- Не удалять lockfile.
- Проверять фактические версии из lockfile, а не только package.json.
- Объяснять кратко и по делу.

Нужно сделать:

1. Определи package manager:
   npm / pnpm / yarn / bun.
   Найди lockfile:
   package-lock.json / pnpm-lock.yaml / yarn.lock / bun.lock / bun.lockb.

2. Проверь зависимости:
   - package.json во всех workspace/package folders;
   - lockfile;
   - node_modules, если установлен.

3. Запусти подходящие команды аудита:
   - npm: npm audit
   - pnpm: pnpm audit
   - yarn: yarn npm audit или yarn audit, в зависимости от версии
   - bun: bun audit, если доступно

4. Проверь known supply-chain incidents, особенно:
   - keyv/cacheable npm incident от 4 августа 2026:
     https://www.wiz.io/blog/keyv-and-cacheable-npm-supply-chain-attack
   - проверить актуальный affected packages/full list из advisory;
   - искать конкретные пары package + malicious version, а не только имена пакетов.

5. Проверить IOC для keyv/cacheable incident:
   - /tmp/bun-dl-*
   - node_modules/keyv/Math_Symbol.js
   - Math_Symbol.js
   - math_init.js
   - .claude/setup.mjs
   - .vscode/setup.mjs
   - .vscode/tasks.json
   - строка IfYouBlockThisAPIKeyItWillCrashTheLiveProductionServersOfAllThirdPartyClients
   - домены npm-cache.com, eth-mainnet.nodereal.io, go.getblock.io, eth.llamarpc.com, pypi-get.com, js-mirror.com
   - user-agent Bun/1.3.13

6. Для каждой найденной проблемы укажи:
   - пакет и установленную версию;
   - прямая или транзитивная зависимость;
   - через какую цепочку пришла;
   - severity;
   - есть ли fixed version;
   - влияет ли на runtime, dev-only или CI/install-time;
   - реальный риск для проекта.

7. Предложи решение:
   - точечное обновление пакета;
   - override/resolution, если проблема транзитивная;
   - обновление родительского пакета;
   - удаление неиспользуемой зависимости;
   - очистка node_modules/cache и переустановка;
   - проверка CI logs;
   - ротация секретов, если есть признаки supply-chain compromise.

8. Отдельно проверь практики установки:
   - lockfile закоммичен;
   - CI использует npm ci / pnpm install --frozen-lockfile / yarn install --immutable / bun install --frozen-lockfile;
   - нет команд, которые обновляют lockfile в CI без review.

9. Итог выдай в формате:
   - Status: affected / not affected / inconclusive
   - Critical findings
   - Other vulnerabilities
   - Recommended fixes
   - Commands run
   - Что можно безопасно сделать сейчас
   - Что требует отдельного решения
```
