import { useMemo, useState } from 'react';

import { UserContext } from './UserContext';

interface UserProviderProps {
  user?: User;
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = (props) => {
  const [user, setUser] = useState(props.user);

  const userState = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={userState}>{props.children}</UserContext.Provider>;
};
