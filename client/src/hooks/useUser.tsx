import {useState} from 'react';
import axios from '../axios';
import {useEffect} from 'react';

export default function useUser() {
  const [user, setUser] = useState<ClientUser | null>(null);

  useEffect(() => {
    async function setInitial() {
      setUser(await renewUser());
    }

    setInitial();
  }, []);
  return [user, setUser] as const;
}

export type ClientUser = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

async function renewUser() {
  try {
    return (
      await axios.get('/users', {
        headers: {'Content-Type': 'application/JSON'},
        withCredentials: true,
      })
    ).data as ClientUser;
  } catch (err) {
    console.error(err);
    return null;
  }
}
