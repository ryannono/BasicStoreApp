import {Button, Input, TextField} from '@mui/material';
import React, {FormEvent} from 'react';
import {useRef} from 'react';
import axios from '../axios';
import {ClientUser} from '../hooks/useUser';
import {useUserContext} from '../globals/userContext';
import {useNavigate} from 'react-router-dom';

export default function Auth() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const userContext = useUserContext();
  const navigate = useNavigate();

  async function handleSignin(e: FormEvent) {
    if (!userContext || !userContext || !userContext.setUser) return;
    e.preventDefault();
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    try {
      const user: ClientUser = (
        await axios.post(
          '/auth/login',
          {email, password},
          {withCredentials: true}
        )
      ).data;
      console.log(user);
      userContext.setUser(user);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <main className="grid place-items-center p-12 w-[calc(100vw-(2*3rem))] h-[calc(100vh-(2*3rem))] bg-slate-100">
      <form
        className="flex flex-col gap-10 w-full h-full p-8 max-w-xs max-h-[400px] rounded-xl bg-white shadow-md text-center"
        onSubmit={handleSignin}
      >
        <header className="flex flex-col gap-0">
          <h1 className="text-3xl font-black text-slate-800">Sign in</h1>
          <span>
            Don't have an account yet?{' '}
            <span className="text-orange-600 font-medium cursor-pointer hover:text-orange-700 hover:underline transition-all">
              Sign up here
            </span>
          </span>
        </header>

        <div className="flex flex-col gap-4">
          <TextField inputRef={emailInputRef} label="Email" type="email" />
          <TextField
            inputRef={passwordInputRef}
            label="Password"
            type="password"
          />
        </div>

        <Button
          className="bg-orange-600 text-white hover:bg-orange-800 py-4 transition-all"
          type="submit"
        >
          Sign In
        </Button>
      </form>
    </main>
  );
}
