// eslint-disable-next-line node/no-extraneous-import
import {User} from '@prisma/client';
import './input.css';
import {motion} from 'framer-motion';
import Card from './components/card';
import {Button, CardActionArea, Input, TextField} from '@mui/material';
import {
  ArrowDownIcon,
  BookmarkIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/solid';
import {useEffect, useState} from 'react';
import axios from './axios';
import useProducts from './useProducts';

function App() {
  const products = useProducts();
  return (
    <>
      <nav className="flex items-center w-screen h-20 bg-black text-blue-50 z-20 fixed shadow-lg ">
        <div className="flex w-full py-5 px-20 items-center  justify-between">
          {/* company logo */}
          <div className="flex gap-1 font-bold">
            <BookmarkIcon className="h-6" />
            TasteTrove
          </div>
          {/* search bar */}
          <div className="flex items-center w-2/3 max-w-xl h-8 justify-between border-[1px] border-gray-600 border-solid rounded-md overflow-hidden">
            <Input
              type="search"
              disableUnderline
              className=" placeholder-gray-50 w-full h-full text-md placeholder- flex items-center content-center pl-5 text-white"
              placeholder="Search"
            ></Input>{' '}
            <Button className="w-14 h-full rounded-l-none bg-[#ffffff1b] items-center">
              <MagnifyingGlassIcon className="h-5 text-gray-400" />
            </Button>
          </div>
          {/* cart logo */}
          <ShoppingBagIcon className="h-6" />
        </div>
      </nav>

      <header className="bg-hero-bg bg-left bg-fill bg-no-repeat bg-[#070707] flex items-center h-[60vh] justify-center font-medium text-white w-screen, relative overflow-clip">
        {/* circle 1 */}
        {/* <div className="rounded-full h-[30rem] w-[30rem] bg-green-700 absolute -left-40 -bottom-40" /> */}
        <div className="flex flex-col relative top-6 items-center backdrop-blur-sm w-full h-full justify-center relative shadow-2xl bg-[#0000005e] py-60 px-20 gap-8">
          <span className="text-lg bg-orange-600 font-bold rounded-lg px-6 py-1">
            TasteTrove The Spice Galore
          </span>
          <div className="flex flex-col items-center gap-10">
            <span className="text-6xl font-bold text-center max-w-3xl">
              Ignite Your Taste Buds with Our Exotic Spices
            </span>
            <Button className="bg-black px-6 py-4 text-orange-600 font-bold rounded-full">
              <ArrowDownIcon />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center py-16 px-8">
        <div className="grid grid-cols-fill w-[80vw] max-w-[1152px] place-items-center gap-16">
          {products.map(product => {
            return <Card productName={product.name} productImgSrc={product.}
          })}
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
