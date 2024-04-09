## Плагины и настройки для редактора кода

Пример плагинов для vs code, для web storm плагины, возможно, уже включены в редактор или можно найти по похожим названиям

* [Linked Cursors for JSX Tags](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-1.html#linked-cursors-for-jsx-tags) настройка позволяющая при редактировании открывающего/закрывающего JSX тега одновременно редактировать закрывающий/открывающий тег

* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) проверка кода на опечатки, также подсвечивает, если в слове буква из другого языка, например, сanceled (первая бука "с" кириллица), такие ошибки сложно заметить

* [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) вместо ключей переводов подставляет сами переводов. Также удобно добавлять/изменять переводы, так как при клике на ключ перевода сразу предлагает, где его добавить/изменить
Пример конфига

    ```
    .vscode/settings.json

    {
        "i18n-ally.enabledFrameworks": ["react", "i18next", "general"],
        "i18n-ally.localesPaths": ["locales"],
        "i18n-ally.keystyle": "nested",
        "i18n-ally.namespace": true,
        "i18n-ally.pathMatcher": "{locale}/{namespaces}.json",
        "i18n-ally.displayLanguage": "en-US"
    }
    ```

* [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors) вывод тайпскрипт ошибок в более дружелюбном формате

* [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) удобная работа с гитом. Например, показывает git blame при клике на строку кода
