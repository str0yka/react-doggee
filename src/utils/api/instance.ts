type BaseURL = string;

export class API {
  readonly baseURL: BaseURL;
  readonly defaultOptions: Pick<RequestInit, 'credentials' | 'headers'>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultOptions = {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    };
  }

  async request<T>(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(this.baseURL + endpoint, {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...this.defaultOptions.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json() as Promise<T>;
  }

  get<T>(endpoint: string, options: Omit<RequestInit, 'method' | 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body: unknown, options: Omit<RequestInit, 'method' | 'body'> = {}) {
    return this.request<T>(endpoint, {
      ...options,
      ...(!!body && { body: JSON.stringify(body) }),
      method: 'POST',
    });
  }
}

export const api = new API(import.meta.env.VITE_API_URL);
