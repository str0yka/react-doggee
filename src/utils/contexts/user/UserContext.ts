import { createContext } from 'react';

interface UserState {
  user?: User;
  setUser: (user?: User) => void;
}

export const UserContext = createContext<UserState>({ setUser: () => {} });
