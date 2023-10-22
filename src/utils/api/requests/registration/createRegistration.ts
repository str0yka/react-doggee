import { api } from '~utils/api';

interface CreateRegistrationRequest {
  username: string;
  password: string;
}

type CreateRegistrationResponse = ApiResponse<User>;

export const createRegistration = (body: CreateRegistrationRequest) =>
  api.post<CreateRegistrationResponse>('/registration', body);
