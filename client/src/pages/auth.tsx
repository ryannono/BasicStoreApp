import {Button, LinearProgress, TextField} from '@mui/material';
import {FormEvent, useEffect, useState} from 'react';
import {useRef} from 'react';
import axios from '../axios';
import {ClientUser} from '../hooks/useUser';
import {useUserContext} from '../globals/userContext';
import {useNavigate, useLocation} from 'react-router-dom';

export default function Auth() {
  const location = useLocation().pathname.split('/').at(-1);
  const userContext = useUserContext();
  const navigate = useNavigate();
  const [pageType, setPageType] = useState<'signin' | 'register'>(
    location === 'signin' ? 'signin' : 'register'
  );

  useEffect(() => {
    setPageType(location === 'signin' ? 'signin' : 'register');
  }, [location]);

  const progressBarRef = useRef<HTMLElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);

  function toggleProgresBar() {
    progressBarRef.current?.classList.toggle('hidden');
  }

  async function handleSignin(e: FormEvent) {
    if (!userContext || !userContext || !userContext.setUser) return;
    e.preventDefault();
    toggleProgresBar();
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
      toggleProgresBar();
      navigate('/');
    } catch (err) {
      toggleProgresBar();
      console.error(err);
    }
  }

  async function handleRegister(e: FormEvent) {
    if (!userContext || !userContext || !userContext.setUser) return;
    e.preventDefault();
    toggleProgresBar();
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const firstName = firstNameInputRef.current?.value;
    const lastName = lastNameInputRef.current?.value;
    const phoneNumber = phoneNumberInputRef.current?.value;

    try {
      const user: ClientUser = (
        await axios.post(
          '/auth/register',
          {email, password, firstName, lastName, phoneNumber},
          {withCredentials: true}
        )
      ).data;
      console.log(user);
      userContext.setUser(user);
      toggleProgresBar();
      navigate('/');
    } catch (err) {
      toggleProgresBar();
      console.error(err);
    }
  }

  return (
    <main className="grid place-items-center p-12 w-[calc(100vw-(2*3rem))] h-[calc(100vh-(2*3rem))] bg-slate-100">
      <form
        className="flex flex-col gap-5 w-full p-8 max-w-xs min-h-[400px] rounded-xl bg-white shadow-md text-center"
        onSubmit={pageType === 'signin' ? handleSignin : handleRegister}
      >
        <div id="progressContainer" className="relative">
          <LinearProgress
            ref={progressBarRef}
            className="w-full max-w-xs -top-3 absolute hidden"
          />
        </div>
        <div id="formContainer" className="flex flex-col gap-10">
          <header className="flex flex-col gap-0 relative">
            <h1 className="text-3xl font-black text-slate-800">{`${
              pageType === 'signin' ? 'Sign in' : 'Register'
            }`}</h1>
            <span>
              {`${
                pageType === 'signin'
                  ? "Don't have an account yet?"
                  : 'Already have an account?'
              }`}{' '}
              <span
                className="text-orange-600 font-medium cursor-pointer hover:text-orange-700 hover:underline transition-all"
                onClick={() => {
                  navigate(pageType === 'signin' ? 'register' : 'signin');
                }}
              >
                {`${pageType === 'signin' ? 'Register here' : 'Sign in here'}`}
              </span>
            </span>
          </header>
          <div id="inputs" className="flex flex-col gap-4">
            {pageType === 'register' && (
              <>
                <TextField
                  inputRef={firstNameInputRef}
                  label="First Name"
                  type="text"
                />
                <TextField
                  inputRef={lastNameInputRef}
                  label="Last Name"
                  type="text"
                />
              </>
            )}
            <TextField inputRef={emailInputRef} label="Email" type="email" />
            <TextField
              inputRef={passwordInputRef}
              label="Password"
              type="password"
            />
            {pageType === 'register' && (
              <TextField
                inputRef={phoneNumberInputRef}
                label="Phone number"
                type="tel"
              />
            )}
          </div>
          <Button
            className="bg-orange-600 text-white hover:bg-orange-800 py-4 transition-all"
            type="submit"
          >
            {`${pageType === 'signin' ? 'Sign In' : 'Register'}`}
          </Button>
        </div>
      </form>
    </main>
  );
}
