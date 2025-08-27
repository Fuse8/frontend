import { CONFIG } from '@shared/core';

import {
  HttpClient,
  HttpRequestConfig,
  HttpResponse,
} from '../http/api-client';

export type NextRequestConfig = HttpRequestConfig & {
  cache?: RequestCache;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export class NextAdapter implements HttpClient<NextRequestConfig> {
  constructor(private client: HttpClient) {}

  async request<T>(config: NextRequestConfig): Promise<HttpResponse<T>> {
    const { cache, next, ...rest } = config;

    return this.client.request<T>({
      ...rest,
      cache,
      next: {
        revalidate: next?.revalidate || CONFIG.revalidationCacheFetchTime,
        tags: ['global', ...(next?.tags || [])],
      },
    } as NextRequestConfig);
  }
}
