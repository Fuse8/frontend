export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpRequestConfig = {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<
    string,
    string | number | boolean | null | undefined | (string | number | boolean)[]
  >;
  body?: any;
};

export type HttpResponse<T = any> = {
  data: T;
  status: number;
  headers?: Record<string, string>;
};

export interface HttpClient<C extends HttpRequestConfig = HttpRequestConfig> {
  request<T>(config: C): Promise<HttpResponse<T>>;
}

export class ApiClient<C extends HttpRequestConfig = HttpRequestConfig> {
  constructor(private client: HttpClient<C>) {}

  get<T>(url: string, options?: Partial<C>) {
    return this.client.request<T>({ url, method: 'GET', ...options } as C);
  }

  post<T>(url: string, body?: any, options?: Partial<C>) {
    return this.client.request<T>({
      url,
      method: 'POST',
      body,
      ...options,
    } as C);
  }

  put<T>(url: string, body?: any, options?: Partial<C>) {
    return this.client.request<T>({
      url,
      method: 'PUT',
      body,
      ...options,
    } as C);
  }

  patch<T>(url: string, body?: any, options?: Partial<C>) {
    return this.client.request<T>({
      url,
      method: 'PATCH',
      body,
      ...options,
    } as C);
  }

  delete<T>(url: string, options?: Partial<C>) {
    return this.client.request<T>({ url, method: 'DELETE', ...options } as C);
  }
}
