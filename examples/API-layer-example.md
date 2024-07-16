### Работы с API на примере axios

```javascript
let refreshTokenRequest: null | Promise<ReturnType> = null;

// Переводим параметры массива в следующую структуру users=dima&users=oleg&users=petya

const parseParams = (params: Record<string, unknown>) => {
    const keys = Object.keys(params);

    const parsedParams = keys.reduce<string[]>((acc, key) => {
        const param = params[key];

        if (typeof param === 'string' || typeof param === 'number') {
        return [...acc, `${key}=${param}`];
        }

        if (Array.isArray(param)) {
        const normalizedParams = param.reduce<string[]>(
            (accInner, item) => [...accInner, `${key}=${item}`],
            []
        );

        return [...acc, ...normalizedParams];
        }

        return acc;
    }, []);

return parsedParams.join('&');
};

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    paramsSerializer: (params) => parseParams(params),
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = Bearer ${accessToken};

        return config;
    }

    return config;
});

axiosInstance.interceptors.response.use(
(response) => response,
async (error) => {
  if (error.response?.status === 401) {
      const { config } = error;

    if (config.isRetry) {
      throw error;
    }

    config.isRetry = true;

    if (!refreshTokenRequest) {
      refreshTokenRequest = authApi.refreshToken();
    }

    try {
      const data = await refreshTokenRequest;

      saveAccessToken({
        accessToken: data.token.token,
      });
    } catch (newError) {
      onLogout();
    }

    return axiosInstance(config);
  }

  if (isAxiosError(error)) {
    throw createRequestError(error);
  }

  throw error;
});

export  { axiosInstance }
```