import {
  getAccessToken,
  onAuthorizeSuccess,
  onLogout,
  saveAccessToken,
} from '@shared/services/auth/auth';
import { isRequestErrorV2 } from '@shared/core/errors';

import {
  HttpClient,
  HttpRequestConfig,
  HttpResponse,
} from '../http/api-client';

let refreshTokenRequest: null | Promise<
  HttpResponse<{
    token: {
      token: string;
    };
  }>
> = null;

let isAuthorizedSuccess = false;

export type AuthRequestConfig = HttpRequestConfig & {
  isRetry?: boolean;
};

const checkIsAuthorizedError = (status?: number) => status === 401;

export class AuthAdapter implements HttpClient<AuthRequestConfig> {
  constructor(private client: HttpClient) {}

  async request<T>(config: AuthRequestConfig): Promise<HttpResponse<T>> {
    const { isRetry = false, ...rest } = config;

    const headers: Record<string, string> = {
      ...rest.headers,
    };

    const accessToken = getAccessToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    try {
      const response = await this.client.request<T>({
        ...rest,
        headers,
      });

      // TODO: убрать проверку авторизации здесь, добавить ее в при чтении профиля
      if (!isAuthorizedSuccess) {
        isAuthorizedSuccess = true;
        onAuthorizeSuccess();
      }

      return response;
    } catch (error) {
      if (isRequestErrorV2(error)) {
        // @ts-expect-error TODO: починить типы
        if (checkIsAuthorizedError(error?.error?.status)) {
          if (isRetry) {
            throw error;
          }

          if (!refreshTokenRequest) {
            refreshTokenRequest = this.client.request<{
              token: {
                token: string;
              };
            }>({
              url: '/auth/refresh_token',
              method: 'POST',
            });
          }

          try {
            const refreshTokenResponse = await refreshTokenRequest;
            saveAccessToken({
              accessToken: refreshTokenResponse.data.token.token,
            });
          } catch (error) {
            onLogout();
            throw error;
          } finally {
            refreshTokenRequest = null;
          }

          return this.request<T>({
            ...config,
            isRetry: true,
          });
        }
      }

      throw error;
    }
  }
}
