import React from 'react';
import './input.css';
import {motion} from 'framer-motion';
import Card from './components/card';
// eslint-disable-next-line node/no-extraneous-import
import {User} from '@prisma/client';

function App() {
  let x: User;
  return (
    <>
      <nav className="flex flex-row w-screen py-5 px-20 items-center bg-black text-blue-50 justify-between z-20 fixed">
        {/* company logo */}
        <span>LOGO</span>

        {/* search bar */}
        <div className="flex items-center w-2/3 max-w-xl h-10 justify-between overflow-clip rounded-md">
          <input
            className="bg-white w-full h-full text-black flex items-center pl-5"
            placeholder="Search"
          ></input>{' '}
          <button className="w-14 h-full bg-slate-500"></button>
        </div>

        {/* cart logo */}
        <div>cart</div>
      </nav>

      <header className="flex items-center h-96 justify-center text-7xl font-medium text-white w-screen, bg-gray-800 relative overflow-clip">
        {/* circle 1 */}
        <div className="rounded-full h-[30rem] w-[30rem] bg-green-700 absolute -left-40 -bottom-40" />
        <span className="relative top-8 z-10">COMPANY NAME</span>
        {/* circle 2 */}
        <div className="rounded-full h-96 w-96 bg-green-700 absolute -right-32 -top-60 z-0" />
      </header>

      <main className="flex items-center justify-center py-16 px-8">
        <div className="grid grid-cols-fill w-[80vw] max-w-[1152px] place-items-center gap-16">
          <Card
            productName="test"
            productPrice={99.99}
            productImgSrc="https://images.unsplash.com/photo-1690286727405-ecdf6ab04bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
          />
          <Card
            productName="test"
            productPrice={99.99}
            productImgSrc="https://images.unsplash.com/photo-1690286727405-ecdf6ab04bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
          />{' '}
          <Card
            productName="test"
            productPrice={99.99}
            productImgSrc="https://images.unsplash.com/photo-1690286727405-ecdf6ab04bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
          />{' '}
          <Card
            productName="test"
            productPrice={99.99}
            productImgSrc="https://images.unsplash.com/photo-1690286727405-ecdf6ab04bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
          />{' '}
          <Card
            productName="test"
            productPrice={99.99}
            productImgSrc="https://images.unsplash.com/photo-1690286727405-ecdf6ab04bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
          />{' '}
          <Card
            productName="test"
            productPrice={99.99}
            productImgSrc="https://images.unsplash.com/photo-1690286727405-ecdf6ab04bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
          />{' '}
          <Card
            productName="test"
            productPrice={99.99}
            productImgSrc="https://images.unsplash.com/photo-1690286727405-ecdf6ab04bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
          />{' '}
          <Card
            productName="test"
            productPrice={99.99}
            productImgSrc="https://images.unsplash.com/photo-1690286727405-ecdf6ab04bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
          />{' '}
          <Card
            productName="test"
            productPrice={99.99}
            productImgSrc="https://images.unsplash.com/photo-1690286727405-ecdf6ab04bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
          />
        </div>
      </main>
    </>
  );
}

export default App;
