import {Button} from '@mui/material';
import {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCartContext} from '../../../globals/cartContext';
import {CartChip} from './cartChip';
import {XMarkIcon} from '@heroicons/react/24/solid';
import CartProducts from './cartProducts';

export default function Cart() {
  const cartPanelRef = useRef<HTMLDivElement>(null);
  const cartOverlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const cartContext = useCartContext();
  const {totalPrice, totalQuantity} = cartContext!;
  function toggleCartPanel() {
    document.body.classList.toggle('overflow-hidden');
    cartOverlayRef.current?.classList.toggle('hidden');
    cartPanelRef.current?.classList.toggle('translate-x-[512px]');
  }

  return (
    <>
      {/* cart chip */}
      <CartChip onClick={toggleCartPanel} totalQuantity={totalQuantity} />

      {/* cart overlay */}
      <div
        onClick={toggleCartPanel}
        id="cartPanelOverlay"
        className="w-screen h-screen fixed top-0 right-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 transition-all hidden"
        ref={cartOverlayRef}
      >
        {/* cart menu */}
        <section
          onClick={e => e.stopPropagation()}
          id="cartPanel"
          className="fixed flex flex-col h-[calc(100vh-(2*0.75rem))] w-[calc(512px-(2*0.75rem))] right-0 top-0 p-3 gap-4 bg-black text-white transition-all translate-x-[512px] -z-50"
          ref={cartPanelRef}
        >
          {/* cart header */}
          <div className="flex w-full p-5 items-center justify-center">
            <XMarkIcon
              className="h-[24px] absolute left-4 cursor-pointer hover:scale-[1.2] transition-all"
              onClick={toggleCartPanel}
            />
            {totalQuantity
              ? `${totalQuantity} items in your cart`
              : 'Your cart is empty'}
          </div>

          {/* cart products */}
          <section className="flex flex-col px-3 py-6 gap-3 h-[70vh] overflow-scroll border-1 border-solid border-slate-50 border-opacity-30 rounded-lg">
            <CartProducts />
          </section>

          {/* cart checkout button */}
          <section id="checkout" className="flex flex-col gap-2">
            <div className="flex justify-between p-4">
              <span>Subtotal:</span>
              <span>{totalPrice}</span>
            </div>
            <Button className="w-full bg-orange-600 text-white hover:bg-[#363636] py-4">
              Checkout
            </Button>
          </section>
        </section>
      </div>
    </>
  );
}
