import React from 'react';
import {useNavigate} from 'react-router-dom';

type CardProps = {
  productPrice: number;
  productId: string;
  productName: string;
  productImgSrc: string;
  className: string;
};

export default function Card({
  productId,
  productName,
  productPrice,
  productImgSrc,
  className,
}: CardProps) {
  const navigate = useNavigate();
  return (
    <article
      className={`flex flex-col h-80 w-64 rounded-md overflow-hidden gap-0 relative cursor-pointer ${className}`}
      onClick={() => navigate(`product/${productId}`)}
    >
      <img
        src={productImgSrc}
        alt={`Image of ${productName}`}
        className="h-full w-full object-cover"
      />
      <section className="flex flex-col w-full bg-gray-900 bg-opacity-70 backdrop-blur-sm text-white justify-center p-5 gap-2 absolute bottom-0">
        <span className="font-bold">{`${productPrice}$`}</span>
        <span>{productName}</span>
      </section>
    </article>
  );
}
