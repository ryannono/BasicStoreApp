import {useMemo, useState} from 'react';
import useProducts from '../hooks/useProducts';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {useCartContext} from '../globals/cartContext';

export default function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const productId = useMemo(
    () => location.pathname.split('/').at(-1) as string,
    [location.pathname]
  );
  const product = useProducts(productId);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const cartContext = useCartContext();

  function handleImageSelection(index: number) {
    setSelectedImageIndex(index);
  }

  async function handleAddTocart() {
    if (product && cartContext) {
      cartContext.addToCart({productId: product.id, productQuantity: 1});
    }
  }

  async function handleCheckout() {
    if (product && cartContext) {
      cartContext.addToCart({productId: product.id, productQuantity: 1});
      navigate('/checkout');
    }
  }

  return (
    <main className="flex w-screen h-[92vh] relative top-20">
      {product && (
        <div className="flex w-full h-full p-20 gap-20">
          <div
            id="leftContainer"
            className="flex flex-col gap-4 w-1/2 items-end"
          >
            <img
              id="mainImage"
              src={product.images[selectedImageIndex].url}
              className="w-[35rem] rounded-lg shadow-2xl aspect-square object-cover"
            />
            <div id="secondaryImages" className="flex h-32 w-[35rem] gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    key={`secondaryImage-${index}`}
                    className={`aspect-square object-cover w-[7.5rem] rounded-md border-2 border-solid border-gray-600 shadow-md cursor-pointer ${
                      index === selectedImageIndex
                        ? 'border-solid border-orange-600 border-[4px]'
                        : ''
                    }`}
                    src={image.url}
                    alt={`image of ${product.name} ${index}`}
                    onClick={() => handleImageSelection(index)}
                  />
                );
              })}
            </div>
          </div>

          <div id="rightContainer" className="flex flex-col w-1/2 gap-5">
            <div id="nameAndPrice" className="flex flex-col gap-2">
              <span id="productName" className="font-black text-4xl">
                {product.name}
              </span>
              <span
                id="productPrice"
                className="font-bold text-3xl  text-gray-500"
              >
                {`${product.price}$`}
              </span>
            </div>

            <div
              id="divider"
              className="max-w-md h-[2px] bg-gray-700 bg-opacity-40"
            />

            <span id="productDescription" className="max-w-md font-semibold">
              {product.description}
            </span>

            <div id="CTA's" className="flex flex-col gap-4">
              <Button
                className="max-w-md bg-black text-orange-600 hover:bg-[#363636] py-4"
                onClick={handleAddTocart}
              >
                Add to cart
              </Button>
              <Button
                className="max-w-md bg-orange-600 text-white hover:bg-[#363636] py-4"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
