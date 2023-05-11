## Плагины для редактора кода

Пример плагинов для vs code, для web storm плагины, возможно, уже включены в редаткор или можно найти по похожим названиям

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
