import {
  AddressElement,
  Elements,
  PaymentElement,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  StripeAddressElementOptions,
  StripeElementsOptions,
  loadStripe,
} from '@stripe/stripe-js';
import axios, {BASE_URL} from '../axios';
import {useCartContext} from '../globals/cartContext';
import {Button} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import {useMemo, useState, FormEvent, useEffect} from 'react';
import CartProducts from '../components/nav/cart/cartProducts';
import {useUserContext} from '../globals/userContext';
import {useElements} from '@stripe/react-stripe-js';

export default function StripePaymentGateway() {
  const cartContext = useCartContext();

  const PUBLISHABLE_KEY = 'pk_live_GDivFnbDb7zQeRFcGQLLP5ws00FJWq75EN';
  const stripePromise = useMemo(
    () => loadStripe(PUBLISHABLE_KEY),
    [PUBLISHABLE_KEY]
  );
  const TO_CENTS_MULTIPLIER = 100;
  const taxAmount = Number(cartContext?.totalPrice) * 0.13;
  const taxtIncludedPrice = Number(cartContext?.totalPrice) + taxAmount;
  const totalAmount = Math.round(taxtIncludedPrice * TO_CENTS_MULTIPLIER);
  const paymentOptions: StripeElementsOptions = {
    mode: 'payment',
    amount: totalAmount,
    currency: 'cad',
  };

  return (
    <Elements stripe={stripePromise} options={paymentOptions}>
      <PaymentRoutingManager />
    </Elements>
  );
}

export function PaymentRoutingManager() {
  const navigate = useNavigate();
  const location = useLocation().pathname.split('/').at(-1);
  const cartContext = useCartContext();
  const [pageType, setPageType] = useState<'checkout' | 'checkoutComplete'>(
    location === 'complete' ? 'checkoutComplete' : 'checkout'
  );

  useEffect(() => {
    setPageType(location === 'complete' ? 'checkoutComplete' : 'checkout');
  }, [location]);

  return (
    <main className="grid place-items-center px-10 pb-12 pt-32 w-[calc(100vw-(2*3rem))] min-h-[calc(100vh-(2*3rem)-5rem)] overflow-x-hidden bg-slate-100">
      {!cartContext || !cartContext?.totalPrice ? (
        <section className="flex flex-col gap-5 w-full p-8 max-w-xs rounded-xl bg-white shadow-md text-center">
          <h1>Your cart is empty</h1>
          <Button
            className="bg-orange-600 text-white hover:bg-orange-800 py-4 transition-all"
            onClick={() => {
              navigate('/');
            }}
          >
            Shop products
          </Button>
        </section>
      ) : pageType === 'checkout' ? (
        <PaymentSubmissionForm />
      ) : (
        <section className="flex flex-col gap-5 w-full p-8 max-w-xs rounded-xl bg-white shadow-md text-center">
          <h1>Checkout complete</h1>
          <Button
            className="bg-orange-600 text-white hover:bg-orange-800 py-4 transition-all"
            onClick={() => {
              navigate('/');
            }}
          >
            Shop products
          </Button>
        </section>
      )}
    </main>
  );
}

export function PaymentSubmissionForm() {
  const stripe = useStripe();
  const elements = useElements();
  const userContext = useUserContext();
  const cartContext = useCartContext();
  const [address, setAddress] = useState<StripeAddressValue | null>(null);

  const TO_CENTS_MULTIPLIER = 100;
  const taxAmount = Number(cartContext?.totalPrice) * 0.13;
  const taxtIncludedPrice = Number(cartContext?.totalPrice) + taxAmount;
  const totalAmount = Math.round(taxtIncludedPrice * TO_CENTS_MULTIPLIER);
  const addressOptions: StripeAddressElementOptions = {mode: 'shipping'};

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    const items = cartContext?.cart;
    const orderDetails = {
      userId: userContext?.user ?? null,
      totalPrice: totalAmount / 100,
    };
    const shippingAddress = {
      addressLine1: address?.address.line1,
      addressLine2: address?.address.line2,
      city: address?.address.city,
      province: address?.address.state,
      postalCode: address?.address.postal_code,
      country: address?.address.country,
    };

    try {
      const {clientSecret: clientSecret} = (
        await axios.post(
          '/payments/intent',
          {items, orderDetails, shippingAddress},
          {withCredentials: true}
        )
      ).data;

      await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${BASE_URL}/checkout/complete`,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {cartContext && (
        <form
          className="flex flex-col rounded-xl bg-white shadow-md text-left"
          onSubmit={handleSubmit}
        >
          {/* header */}
          <h1 className="px-16 py-6">Payment details</h1>

          <div
            id="contentContainer"
            className="flex gap-16 w-full px-16 pt-4 pb-16 max-w-4xl min-h-[400px]"
          >
            <section
              id="leftPaymentSection"
              className="flex flex-col min-w-[400px] gap-4"
            >
              {/* payment element */}
              <PaymentElement />
              <AddressElement
                onChange={e => {
                  if (e.complete) setAddress(e.value);
                }}
                options={addressOptions}
              />

              {/* Totals */}
              <section id="checkout" className="flex flex-col gap-1 py-7">
                <div className="flex justify-between p-1">
                  <span>Subtotal:</span>
                  <span>{cartContext.totalPrice}</span>
                </div>
                <div className="flex justify-between p-1">
                  <span>HST(13%):</span>
                  <span>{Math.round(taxAmount * 100) / 100}</span>
                </div>
                <div className="flex justify-between p-1">
                  <span>Total:</span>
                  <span>{totalAmount / 100}</span>
                </div>
              </section>

              {/* submission button */}
              <Button
                type="submit"
                className="bg-orange-600 text-white hover:bg-orange-800 py-4 transition-all"
              >
                Submit
              </Button>
            </section>

            {/* products */}
            <div
              id="rightOverviewSection"
              className="w-full rounded-xl border-2 border-solid border-black border-opacity-50 overflow-y-scroll bg-orange-300 bg-opacity-5 text-black"
            >
              <CartProducts />
            </div>
          </div>
        </form>
      )}
    </>
  );
}

type StripeAddressValue = {
  name: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  address: {
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  phone?: string | undefined;
};
