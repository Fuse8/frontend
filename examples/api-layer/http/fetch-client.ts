import { createRequestError } from '../create-request-error';
import { HttpClient, HttpRequestConfig, HttpResponse } from './api-client';

function normalizeHeaders(headers: Headers): Record<string, string> {
  const obj: Record<string, string> = {};

  headers.forEach((value, key) => {
    obj[key] = value;
  });

  return obj;
}

const buildUrlWithParams = (
  url: string,
  params?: Record<
    string,
    string | number | boolean | null | undefined | (string | number | boolean)[]
  >
): string => {
  if (!params) return url;

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined) {
          searchParams.append(key, String(item));
        }
      });
    } else {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${url}?${queryString}` : url;
};

export class FetchClient implements HttpClient<HttpRequestConfig> {
  private baseUrl: string;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.baseUrl = baseUrl;
  }

  async request<T>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    const { url, method, headers, body, params } = config;

    const fullUrl = buildUrlWithParams(`${this.baseUrl}${url}`, params);

    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    });

    let data: any;
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw createRequestError({
        data,
        error: response,
      });
    }

    return {
      data,
      status: response.status,
      headers: normalizeHeaders(response.headers),
    };
  }
}
