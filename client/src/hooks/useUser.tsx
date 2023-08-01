import {useState} from 'react';
import axios from '../axios';
import {useEffect} from 'react';

export default function useUser() {
  const [user, setUser] = useState<ClientUser | null>(null);

  useEffect(() => {
    async function setInitial() {
      setUser(await renewUser());
    }

    setInitial().then(() => console.log(JSON.stringify(user)));
  }, []);
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
    return (await axios.get('/users')).data as ClientUser;
  } catch (err) {
    console.error(err);
    return null;
  }
}
