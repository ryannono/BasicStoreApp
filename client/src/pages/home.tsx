import {ArrowDownIcon} from '@heroicons/react/24/solid';
import {Button, CircularProgress} from '@mui/material';
import Card from '../components/card';
import {useRef} from 'react';
import {scrollToElement} from '../globals/globalFunctions';
import {useFilterContext} from '../globals/filterContext';
import {useProductsContext} from '../globals/productContext';

/**
 * Home - The main functional component representing the landing page of the application.
 *
 * The Home component uses the product and filter contexts to fetch and filter the products respectively.
 * It maps the products to create a gallery of product cards, which are filterable based on the user's filter context input.
 *
 * This component consists of two main sections:
 * 1. The Hero section - Displays a catchy banner and a call-to-action (CTA) button. On clicking the button, the page scrolls to the product gallery section.
 * 2. The Product Gallery section - Displays the product cards. If the products are not yet loaded, a spinner is displayed.
 * @returns The Home component with a Hero section and a Product Gallery section.
 */
export default function Home() {
  const productsContext = useProductsContext();
  const productsGalleryRef = useRef<HTMLDivElement>(null);
  const filterContext = useFilterContext();

  const productCards = productsContext?.products?.map((product, index) => {
    const {category, images, name, price, id} = product;
    const {filter} = filterContext!;

    return (
      <Card
        key={`productCard-${index}`}
        productId={id}
        productName={name}
        productPrice={price}
        productImgSrc={images[0].url}
        className={
          filter &&
          !(
            name.toLowerCase().includes(filter) ||
            category.name.toLowerCase().includes(filter)
          )
            ? 'hidden'
            : 'flex'
        }
      />
    );
  });

  return (
    <>
      <header className="bg-hero-bg bg-left bg-fill bg-no-repeat bg-[#070707] flex items-center h-[60vh] justify-center font-medium text-white w-screen, relative overflow-clip">
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
        <>
          {productsContext?.products ? (
            <div className="grid grid-cols-fill w-[80vw] max-w-[1152px] place-items-center gap-16">
              {productCards}
            </div>
          ) : (
            <div className="flex w-screen items-center justify-center p-8">
              <CircularProgress />
            </div>
          )}
        </>
      </main>
    </>
  );
}
