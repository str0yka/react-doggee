import { api } from '~utils/api';

interface CreateAuthRequest {
  username: string;
  password: string;
  notMyComputer: boolean;
}

type CreateAuthResponse = ApiResponse<User>;

export const createAuth = (body: CreateAuthRequest) => api.post<CreateAuthResponse>('/auth', body);
