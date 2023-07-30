import {ArrowDownIcon} from '@heroicons/react/24/solid';
import {Button} from '@mui/material';
import Card from '../components/card';
import {useRef} from 'react';
import {scrollToElement} from '../globals/globalFunctions';
import useProducts from '../hooks/useProducts';

export default function Home() {
  const products = useProducts(null);
  const productsGalleryRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <header className="bg-hero-bg bg-left bg-fill bg-no-repeat bg-[#070707] flex items-center h-[60vh] justify-center font-medium text-white w-screen, relative overflow-clip">
        {/* circle 1 */}
        {/* <div className="rounded-full h-[30rem] w-[30rem] bg-green-700 absolute -left-40 -bottom-40" /> */}
        <div className="flex flex-col top-6 items-center backdrop-blur-sm w-full h-full justify-center relative shadow-2xl bg-[#0000005e] py-60 px-20 gap-8">
          <span className="text-lg bg-orange-600 font-bold rounded-lg px-6 py-1">
            TasteTrove The Spice Galore
          </span>
          <div className="flex flex-col items-center gap-10">
            <span className="text-6xl font-bold text-center max-w-3xl">
              Ignite Your Taste Buds with Our Exotic Spices
            </span>
            <Button
              className="bg-black px-6 py-4 text-orange-600 font-bold rounded-full"
              onClick={() => scrollToElement(productsGalleryRef.current)}
            >
              <ArrowDownIcon />
            </Button>
          </div>
        </div>
      </header>

      <main
        id="productsGallery"
        ref={productsGalleryRef}
        className="flex items-center justify-center py-16 px-8"
      >
        <div className="grid grid-cols-fill w-[80vw] max-w-[1152px] place-items-center gap-16">
          {products &&
            products.map((product, index) => {
              return (
                <Card
                  key={`productCard-${index}`}
                  productId={product.id}
                  productName={product.name}
                  productPrice={product.price}
                  productImgSrc={product.images[0].url}
                />
              );
            })}
        </div>
      </main>
    </>
  );
}