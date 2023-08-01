import {TrashIcon} from '@heroicons/react/24/solid';
import {useCartContext} from '../../../globals/cartContext';
import {useProductsContext} from '../../../globals/productContext';
import {useRef, useState, useEffect, HTMLAttributes} from 'react';
import {IndividualProduct} from '../../../hooks/useProducts';
import React from 'react';
import {IndividualCartItem} from '../../../hooks/useCart/useCartTypes';

export default function CartProducts(props?: CartProductsProps) {
  const cartContext = useCartContext();
  const productsContext = useProductsContext();

  function ProductDivider() {
    return (
      <div className="flex w-3/4 h-[2px] self-center px-10 bg-gray-400 bg-opacity-30">
        &nbsp;
      </div>
    );
  }

  return (
    <>
      {productsContext &&
        cartContext &&
        cartContext.cart?.map((cartItem, index) => {
          const {productsMap} = productsContext;
          const {cart, editCart} = cartContext;
          return (
            <React.Fragment key={`fragment-${index}`}>
              <CartProduct
                cartItem={cartItem}
                productsMap={productsMap}
                key={`cartProduct-${index}`}
                editCart={editCart}
                {...props}
              />
              {index !== cart.length - 1 && (
                <ProductDivider key={`divider-${index}`} />
              )}
            </React.Fragment>
          );
        })}
    </>
  );
}

function CartProduct({
  cartItem,
  editCart,
  productsMap,
  ...rest
}: CartPropductProps) {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const fullProduct = productsMap.get(cartItem.productId);
  const [selection, setSelection] = useState('');
  const quantityOptions = getSelectOptions(Number(selection));

  useEffect(() => {
    setSelection(cartItem.productQuantity.toString());
  }, [cartItem]);

  function handleSelect() {
    const newQuantity = Number(selectRef.current?.value);
    editCart(cartItem.productId, newQuantity);
  }

  function handleRemove() {
    editCart(cartItem.productId, 0);
  }

  const {className, ...containerProps} = rest;
  return (
    <>
      <article
        className={`flex py-6 px-10 gap-2 ${className}`}
        {...containerProps}
      >
        <img
          src={fullProduct?.images[0].url}
          className="w-1/4 rounded-lg aspect-square object-cover"
        />

        <section
          id="cartProductDetails"
          className="flex w-full justify-between p-3"
        >
          <div
            id="nameAndQuantity"
            className="flex flex-col h-full gap-3 justify-between"
          >
            <span>{fullProduct?.name}</span>
            <select
              ref={selectRef}
              onChange={handleSelect}
              value={selection}
              className="w-20 h-8 rounded-md cursor-pointer"
            >
              {quantityOptions}
            </select>
          </div>
          <div
            id="priceAndRemove"
            className="flex flex-col justify-between items-end font-bold"
          >
            {`${fullProduct?.price}$`}
            <TrashIcon
              className="w-6 hover:text-gray-500 transition-all cursor-pointer"
              onClick={handleRemove}
            />
          </div>
        </section>
      </article>
    </>
  );
}

type CartProductsProps = HTMLAttributes<HTMLDivElement>;

type CartPropductProps = {
  cartItem: IndividualCartItem;
  productsMap: Map<string, IndividualProduct>;
  editCart: (
    itemToEditId: string,
    newQuantity: number,
    operation?: 'increment' | 'decrement' | undefined
  ) => Promise<void>;
} & HTMLAttributes<HTMLDivElement>;

export function getSelectOptions(currentSelection: number) {
  const lowerBound = Math.max(1, currentSelection - 4);
  const upperBound = currentSelection + 4;

  const options = [];

  for (let i = lowerBound; i <= upperBound; i++) {
    options.push(
      <option key={`option-${i}`} value={i}>
        {i}
      </option>
    );
  }

  return options;
}
