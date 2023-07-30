// eslint-disable-next-line node/no-extraneous-import
import {ReactNode, createContext, useContext} from 'react';
import {ClientUser} from '../hooks/useUser';
import useUser from '../hooks/useUser';

type UserContexType = {
  user: ClientUser | null;
  setUser: React.Dispatch<React.SetStateAction<ClientUser | null>> | null;
};

const UserContext = createContext<UserContexType | null>(null);

export default function UserProvider(props: {children: ReactNode}) {
  const [user, setUser] = useUser();
  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
