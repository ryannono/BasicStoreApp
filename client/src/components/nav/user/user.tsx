import React, {useRef} from 'react';
import UserChip from './userChip';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useUserContext} from '../../../globals/userContext';
import axios from '../../../axios';

export default function User() {
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userOverlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {user, setUser} = useUserContext()!;

  function toggleUserMenu() {
    document.body.classList.toggle('overflow-hidden');
    userOverlayRef.current?.classList.toggle('hidden');
    userMenuRef.current?.classList.toggle('translate-y-[-100px]');
  }

  function handleEntryAuth(selection: 'signin' | 'register') {
    toggleUserMenu();
    navigate(`/auth/${selection}`);
  }

  async function handleExitAuth() {
    toggleUserMenu();
    localStorage.clear();
    if (setUser) setUser(null);
    await axios.post('/auth/logout', {}, {withCredentials: true});
  }

  return (
    <>
      {/* user chip */}
      <UserChip onClick={toggleUserMenu} />
      <div
        ref={userOverlayRef}
        onClick={toggleUserMenu}
        id="userPanelOverlay"
        className="w-screen h-screen fixed top-0 right-0 bg-black bg-opacity-40 z-40 transition-all hidden"
      >
        <div
          ref={userMenuRef}
          onClick={e => e.stopPropagation()}
          id="userMenu"
          className="flex flex-col max-w-xs p-8 bg-white w-full translate-y-[-100px] z-50 text-center justify-center gap-7 shadow-2xl rounded-xl absolute top-20 right-40 text-black"
        >
          <Button
            className="bg-orange-600 text-white hover:bg-orange-800 py-4 transition-all"
            onClick={() => {
              user ? handleExitAuth() : handleEntryAuth('signin');
            }}
          >
            {user ? 'Sign Out' : 'Sign In'}
          </Button>
          {!user && (
            <span>
              New customer?{' '}
              <span
                className="text-orange-600 font-medium cursor-pointer hover:text-orange-700 hover:underline transition-all"
                onClick={() => handleEntryAuth('register')}
              >
                start here
              </span>
            </span>
          )}
        </div>
      </div>
    </>
  );
}
