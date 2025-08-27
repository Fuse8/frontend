import { API_URL } from '@shared/api/legacy/path';

import { FetchClient } from './http/fetch-client';
import { NextAdapter } from './adapters/next-adapter';
import { ApiClient } from './http/api-client';

const base = new FetchClient({ baseUrl: API_URL });
const withNext = new NextAdapter(base);

export const requestUnauthorized = new ApiClient(withNext);
