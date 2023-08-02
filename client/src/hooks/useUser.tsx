import {useState} from 'react';
import axios from '../axios';
import {useEffect} from 'react';

/**
 * `useUser` is a custom React hook that fetches and provides the current authenticated user data.
 * It also provides a function to set this user data.
 * @returns A tuple where the first item is the user data and the second item is a function to set this data.
 */
export default function useUser() {
  // Initialize user state
  const [user, setUser] = useState<ClientUser | null>(null);
  useEffect(() => {
    // Fetch the user data and set the user state
    async function setInitial() {
      setUser(await renewUser());
    }

    // If there's no user data, fetch it
    if (!user) {
      setInitial();
    }
  }, [user]);
  return [user, setUser] as const;
}

/**
 * `renewUser` is an asynchronous function that fetches the authenticated user's data.
 * It first tries to fetch the user's data with the current access token.
 * If this fails, it tries to get a new access token with the refresh token and fetches the user's data with the new access token.
 * @returns The user's data, or null if fetching the data fails.
 */
async function renewUser() {
  try {
    const validResponse = await axios.get('/users').catch(() => {
      console.log('Access token auth failled, trying again with refresh');
    });

    if (validResponse) return validResponse.data as ClientUser;
    return (await axios.post('/auth/refresh')).data as ClientUser;
  } catch (err) {
    return null;
  }
}

/**
 * `ClientUser` is a type that represents a user in the system.
 */
export type ClientUser = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'BASIC';
};
