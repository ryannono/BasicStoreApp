import React from 'react';
import useProducts from '../hooks/useProducts';
import {useLocation} from 'react-router-dom';

export default function ProductPage() {
  const location = useLocation();
  const product = useProducts(location.pathname.split('/').at(-1));

  console.log(product);
  return (
    <main className="flex w-screen">
      <div className="flex w-full">
        <img src={product ? product.images[0].url : ''} />
      </div>
    </main>
  );
}
