import { API_URL } from '@shared/api/legacy/path';

import { FetchClient } from './http/fetch-client';
import { AuthAdapter } from './adapters/auth-adapter';
import { ApiClient } from './http/api-client';

const base = new FetchClient({ baseUrl: API_URL });
const withAuth = new AuthAdapter(base);

export const request = new ApiClient(withAuth);
