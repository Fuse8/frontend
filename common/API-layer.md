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
## Типы

Рекомендуется активно взаимодействовать с бекендом и настоятельно требовать использовать swagger или если вам
сильно повезет graphql
И уже оттуда гегерировать типы как пример [openapi-typescript](https://www.npmjs.com/package/openapi-typescript)
