## Полезные ресурсы
- [Основы Typescript от Яндекс](https://www.youtube.com/watch?v=_KweR3LUGRA)

## Typescript правила

Рекомендуется использовать единый подход. В проектах fuse8 используем в основном только типы, а не интерфейсы.

Типы используем как Type без префиксов, если есть конфликт типа и компонента, то делаем ComponentType
```tsx
import { Article as ArticleType } from "@shared/types";

type ArticleProps = ArticleType & {
	className?: string;
};

const Article = (props: ArticleProps) => <div>Article</div>;
```
