import {useState} from 'react';
import axios from '../axios';
import {useEffect} from 'react';

export default function useUser() {
  const [user, setUser] = useState<ClientUser | null>(null);
  useEffect(() => {
    async function setInitial() {
      setUser(await renewUser());
    }

    if (!user) {
      setInitial();
    }
  }, [user]);
  return [user, setUser] as const;
}

export type ClientUser = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'BASIC';
};

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
