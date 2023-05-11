LAYOUT
==========

## Box-sizing

для упрощения расчетов размеров елементов на ввсех уровнях.


```
*,
*::before,
*::after {
    box-sizing: border-box;
}
```

## Modal and PageScroll
  
```
.html {
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 100%;
    font-size: 100%;
    -webkit-overflow-scrolling: touch;

    &.is-blocked {
        overflow: hidden;
        
        .compensate-scroll {
            padding-right: var(--scrollbar);
        }
    }

    &.is-blocked-touch {
        position: fixed;
        overflow-y: scroll;
        width: 100%;
        height: auto;
    }
}
```

## Container

Для центрирования контента по горизонтали

```
.container {
    max-width: $container-max-width;
    margin-right: auto;
    margin-left: auto;
    
    &--small {
        max-width: $container-max-width-small;
    }
    
    &--middle {
        max-width: $container-max-width-middle;
    }    
}
```

