import React from 'react';
import axios from '../axios';

export default function useUser() {
  const [user, setUser] = useState<>(null);
  return <div></div>;
}

async function renewUser() {
  try {
    axios.get('/users/')
  } catch (err) {}
}
