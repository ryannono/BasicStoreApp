// eslint-disable-next-line node/no-extraneous-import
import {ReactNode, createContext, useContext} from 'react';
import {ClientUser} from '../hooks/useUser';
import useUser from '../hooks/useUser';

/**
 * Defines the type of the context that will be provided by the UserContext.
 *
 * @property {ClientUser | null} user - The current logged in user, or null if no user is logged in.
 * @property {React.Dispatch<React.SetStateAction<ClientUser | null>> | null} setUser - A function to update the current user.
 */
type UserContexType = {
  user: ClientUser | null;
  setUser: React.Dispatch<React.SetStateAction<ClientUser | null>> | null;
};

/**
 * UserContext is a React Context object. If a React Component is a part of the context provider,
 * UserContext.Provider can be used to change the context.
 */
const UserContext = createContext<UserContexType | null>(null);

/**
 * UserProvider is a context provider for UserContext. It holds the state for user and
 * a function to update it. It uses the built-in useUser hook to create this state.
 *
 * @param {Object} props - The props that are passed to the UserProvider.
 * @param {ReactNode} props.children - The child components over which this context will be provided.
 * @returns {ReactNode} A Provider component which wraps the children and injects the context into them.
 */
export default function UserProvider(props: {children: ReactNode}) {
  const [user, setUser] = useUser();
  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  );
}

/**
 * useUserContext is a custom hook which provides an easy way to use the UserContext.
 * It can be used in any functional component to get the current context.
 *
 * @returns {UserContexType} Returns the user and setUser function from the UserContext.
 */
export function useUserContext() {
  return useContext(UserContext);
}
