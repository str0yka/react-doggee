type BaseURL = string;

export class API {
  private readonly baseURL: BaseURL;

  private readonly defaultConfig: RequestInit;

  constructor(baseURL: string, defaultConfig?: RequestInit) {
    this.baseURL = baseURL;
    this.defaultConfig = defaultConfig ?? {};
  }

  private async request<T>(endpoint: string, config: RequestInit = {}) {
    const response = await fetch(this.baseURL + endpoint, {
      ...this.defaultConfig,
      ...config,
      headers: {
        ...this.defaultConfig.headers,
        ...config.headers
      }
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json() as Promise<T>;
  }

  get<T>(endpoint: string, config: Omit<RequestInit, 'method' | 'body'> = {}) {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  post<T>(endpoint: string, body: unknown, config: Omit<RequestInit, 'method' | 'body'> = {}) {
    return this.request<T>(endpoint, {
      ...config,
      ...(!!body && { body: JSON.stringify(body) }),
      method: 'POST'
    });
  }
}
