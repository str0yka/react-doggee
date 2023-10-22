import { useMemo, useState } from 'react';

import { UserContext } from './UserContext';

interface UserProviderProps {
  user?: User;
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ user, children }) => {
  const [userState, setUserState] = useState(user);

  const userStateMemoized = useMemo(() => ({ user: userState, setUser: setUserState }), [user]);

  return <UserContext.Provider value={userStateMemoized}>{children}</UserContext.Provider>;
};
