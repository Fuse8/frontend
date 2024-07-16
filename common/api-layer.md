## Работа с API

## Клиент
Для работы с API рекомендуется использовать обертки вокруг используемых интерфейсов, (fetch, axios, XMLHttpRequest)

```javascript
export async function apiClient(params){
// код который должен выполниться до запроса (валидация и тд)
const result = await fetch()
// код который должен обработать результат
return result
}
```
## Функции вызова API точки

Рекомендовано API точки хранить в 1 месте в константах. И для каждой точки сделать функцию для вызова этой точки

```javascript
//хранить в файле, например - apiEndpoints.js
const GET_USERS = '/get-all-users'

export async function getUsers(params){
	const result = await apiClient({url: GET_USERS})
	return result
}
```
Базовое значение необходимо вынести в переменную окружения
```javascript
 const API_URL = process.env.NEXT_PUBLIC_API_URL;
```
## Типы

Рекомендуется активно взаимодействовать с бекендом и настоятельно требовать использовать swagger или, если вам
сильно повезет, graphql
И уже оттуда генерировать типы как пример [openapi-ts](https://github.com/hey-api/openapi-ts)

## Композиции (Vue) или хуки (React)

На уровне приложения, рекомендовано использовать композиции. Из готовых можно рассмотреть [TanStack Query](https://tanstack.com/query/latest)
