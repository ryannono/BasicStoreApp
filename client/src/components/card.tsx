import React from 'react';

type CardProps = {
  productPrice: number;
  productName: string;
  productImgSrc: string;
};

export default function Card({
  productName,
  productPrice,
  productImgSrc,
}: CardProps) {
  return (
    <article className="h-80 w-64 rounded-md border-4 border-gray-700 border-solid">
      <img
        src={productImgSrc}
        alt={`Image of ${productName}`}
        className="h-2/3 w-full object-cover"
      />
      <section className="flex flex-col bg-gray-900 h-1/3 text-white justify-center p-5 gap-2">
        <span className="font-bold">{`${productPrice}$`}</span>
        <span>{productName}</span>
      </section>
    </article>
  );
}
