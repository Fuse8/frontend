

Code style
==========




Отступы
-------

1 таб или 4 пробела

применимость: везде, HTML, CSS, JS, C#

**плохо:**
```
<div>
  <a>
    <img/>
  </a>
</div>
```

```
.block {
  &__elem {
    display: block;
  }
}
```

```
const testFunction = () => {
  const myVar = 'test';
  const superText = 'my' + myVar;
  return superText;
}
```

**хорошо:**

```
<div>
    <a>
        <img/>
    </a>
</div>

```
```
.block {
    &__elem {
        display: block;
    }
}
```

```
const testFunction = () => {
    const myVar = 'test';
    const superText = 'my' + myVar;
    return superText;
}
```

Кавычки
-------

Одинарные кавычки предпочтительнее, но атрибуты ХТМЛ тегов и текстовые пропсы JSX в двойных кавычках

```
@import '~style settings';

.element {
    backround: url('some-img.jpg');
}
```
```
const myVar = 'text';
<div data-dc-avatar='{"name": "Ivan", "endpoint": "/some-api/v1/"}'>
    <img src="avatar.jpg" />
</div>
import React from 'react';

export const MyElement = (props) => ({
    <div>
        <img alt="some alt text" src={props.src} />
    </div>
})
```

Naming
------

### Имена файлов и БЭМ классов

Используй комбинацию **kebab** и **point** case для **файлов**

Используй только **kebab** case для БЭМ **классов**

**плохо**

```
--myBlock /
----myBlock.scss

--my_block /
----my_block.scss


```

```
$someSuper_Gap: 10px;

.myBlock {
    &_Element {
      ...
    }
}

.my_block {
    &-element {
        ...
    }
}
```

**хорошо**

```
----my-block /
----|----my-block.scss
----|----my-block.component.js
```
```
$some-super-gap: 10px;

.my-block {
    &__element {
        ...
    }
}
```

### Имена для JS переменных

ИСпользуй camel case

```const mySuperVariable = null;```

JS
--

Используй говорящие имена, это значит что:

*   Переменная должна своим именем гвоорить что она содержит
    
*   Имя метода должно говорить что он делает
    
*   Если переменная содержит массив/коллекцию, добавляй `s` постфикс
    

```
const team = {
    name: 'Crystal palace',
    id: 't712',
    logoImg: '/media/cp-logo-400-400.jpg',
}

....

const mapOptaTeamsToProjectTeams = (optaTeams) => optaTeams.map((optaTeam) => ({
    name: optaTeam.clubName,
    id: optaTeam.id,
    logoImg: optaTeam.clubCrest
}))

const fetchTeams = () => axios.get('api/teams/')
    .then((result) => mapOptaTeamsToProjectTeams(result.data))
    
const teams = await fetchTeams();

```

### CSS

Используй  [БЭМ](https://ru.bem.info/methodology/key-concepts/ "https://ru.bem.info/methodology/key-concepts/") (в случае если на проекте нету CSS modules или css-in-js)

```
.block {
    $this: &;

    position: relative;
    width: 100vw;

    &__element-bg {
        position: absolute;
        top: 0;
        left: 0
        width: 100px;
        height: 100px;
        background-color: $color-red;
        
        &--right {
            left: auto;
            right: 0;
        }
        
        #{$this}--big & {
            width: 200px;
            height: 200px;
        }
    }
    
    &__element-border {
      border: 1px solid $color-black;
      
      #{$this}--big & {
          border-width: 4px;
      }
    }
}
```

### Не перегружай элементы БЭМ'а.

Если елемент начинает содержать больше два или больше смысловых вложений, то это значит, что тебе скорее всего надо выносить такой элемент в отдельный блок.

**Не забывайте, что каждый блок должен жить в своем отдельном файле.**

**плохо:**

navigation.scss

```.navigation {
       &__list {
           ...
       }
       
       &__item {
           ....
       }
       
       &__link {
           ...
       }
       
       &__item-list {
           ...
       }
       
       &__item-list-link {
           ...
       }
       
       &__item-list-icon {
           ...
       }
   }
```

**хорошо:**

navigation.scss

```
.navigation {
    &__list {
        ...
    }
    
    &__item {
        ....
    }
    
    &__link {
        ...
    }
}
```


navigation-list.scss

```
.navigation-list {
    ...
    
    &__link {
        ...
    }
    
    &__icon {
        ...
    }
}
```

Селекторы в CSS
---------------

*   Не используй тяжелые селекторы без реальной обходимости.
    
*   Не используй чистые теги как часть селектора, без реальной обходимости
    
*   Если для разрешения какой то проблемы надо использовать селектор с весом больше чем 20 попугаев, то это хороший повод задуматься над необходимостью что то упростить.
    

**плохо**

```
.block {
    $this: &;
    
    &__element {
        color: $color-white;
        
        .section .section--dark & {
            color: $color-black;
        }
    }
}

```

**хорошо**

```
.block {
    $this: &;
    
    &__element {
        color: $color-white;
    }
    
    #{$this}--dark & {
        color: $color-black;
    }
}

```

Правило порядка стилей в CSS
----------------------------

Для консистентности мы договорились писать стили в едином порядке, он описан в файле настроек

`.stlelintrc`

Files structure
---------------

Стандартная структура папок для стека Microsoft (C# + js/ts + scss)

```
project-folder /
----package.json
----webpack.config.js
----.eslintrc
----.stylelintrc
----.prettierrc
----...etc project root files...
----assets /
----|----index.js
----|----init.js
----|----compoentns/
----|----|----my-component/
----|----|----|----index.js
----|----|----|----js/
----|----|----|-------my-component.component.js
----|----|----|----|----my-support-component.component.js
----|----|----|----|----helpers.js
----|----|----|----|----enums.js
----|----|----|----scss/
----|----|----|----|----index.scss
----|----|----|----|----my-component.scss
----|----|----|----|----my-support-component.scss
----|----general/
----|----|----images/
----|----|----|----...some images..
----|----|----svg/
----|----|----|----...some svg icons for importing in svg sprite...
----|----|----fonts/
----|----|----|----...some fonts for project...
----|----|----favicons/
----|----|----|----...some favicons...
----|----|----js/
----|----|----|----app.js
----|----|----|----device.js
----|----|----|----helpers/
----|----|----|----|----object-helper.js
----|----|----|----|----date-helper.js
----|----|----scss/
----|----|----|----index.scss
----|----|----|----buttons.scss
----|----|----|----font-face.scss
----|----|----|----grid.scss
----|----|----|----helpers.scss
----|----|----|----layout.scss
----|----|----|----spaces.scss
----|----|----|----icons.scss
----|----|----|----typography.scss
----|----|----|----settings/
----|----|----|----|----index.scss
----|----|----|----|----variables.scss
----|----|----|----|----breakpoints.scss
----|----|----|----|----mixins.scss
----|----|----|----|----fonts.scss
----webpack/
----|----webpack.base.js
----|----webpack.dev.js
----|----webpack.prod.js
----|----webpack.server.js
----|----webpack.static.js
----|----webpack.entry.js
----dist/
----|----...here will be results off assets build...
----nodemodules/
----|----...some plugins...

```

Какой ES синтаксис мы используем?
---------------------------------

На проектах находящихся в активной разработке используется последняя стабильная версия EcmaScript, и на момент написания статье это ES2020. Для поддержки нового синтаксиса на старых браузерах мы используем babel.

На старых проектах версия ES остается не изменной с момента создания проекта.

Let или Const
-------------

По умолчанию `const` , но при необходимости можно и `let`

Способы автоматического соблюдения
----------------------------------

Файлы .stylelintrc, .eslintrs, .prettierrc лежат в этом репозитории.
