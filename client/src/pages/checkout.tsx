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

/**
 * StripePaymentGateway - The main functional component representing the Stripe payment gateway.
 *
 * The StripePaymentGateway component uses the cart context to fetch cart items and calculates
 * the subtotal, tax amount, and total amount for the payment.
 * It sets up the Stripe elements options and, based on whether the cart is empty or not,
 * either displays a message with a redirection button or
 * renders the PaymentRoutingManager component inside the Stripe Elements.
 *
 * @returns The StripePaymentGateway component with Stripe elements and payment management setup.
 */
export default function StripePaymentGateway() {
  const cartContext = useCartContext();
  const navigate = useNavigate();

  const PUBLISHABLE_KEY = 'pk_test_29RHQ2la0lz7Q8pCmapGBnS300Rrfcyl9n';
  const stripePromise = useMemo(
    () => loadStripe(PUBLISHABLE_KEY),
    [PUBLISHABLE_KEY]
  );
  const subtotal = cartContext?.totalPrice ?? 0;
  const taxAmount = Number((subtotal * 0.13).toFixed(2));
  const totalRoundedAmount = Number((subtotal + taxAmount).toFixed(2));
  const totalAmountInCents = Number((totalRoundedAmount * 100).toFixed());
  const paymentOptions: StripeElementsOptions = {
    mode: 'payment',
    amount: totalAmountInCents,
    currency: 'cad',
  };

  return (
    <>
      <main className="grid place-items-center px-10 pb-12 pt-32 w-[calc(100vw-(2*3rem))] min-h-[calc(100vh-(2*3rem)-5rem)] overflow-x-hidden bg-slate-100">
        {cartContext && cartContext.totalPrice > 0 ? (
          <Elements stripe={stripePromise} options={paymentOptions}>
            <PaymentRoutingManager />
          </Elements>
        ) : (
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
        )}
      </main>
    </>
  );
}

/**
 * PaymentRoutingManager - Functional component that handles page routing for the checkout process.
 *
 * Based on the current location, the page type is set to either 'checkout' or 'checkoutComplete'.
 * Depending on the page type, it either renders the PaymentSubmissionForm component or displays a
 * message with a redirection button.
 *
 * @returns The PaymentRoutingManager component with routing setup for the checkout process.
 */
export function PaymentRoutingManager() {
  const navigate = useNavigate();
  const location = useLocation().pathname.split('/').at(-1);
  const [pageType, setPageType] = useState<'checkout' | 'checkoutComplete'>(
    location === 'complete' ? 'checkoutComplete' : 'checkout'
  );

  useEffect(() => {
    setPageType(location === 'complete' ? 'checkoutComplete' : 'checkout');
  }, [location]);

  return (
    <>
      {pageType === 'checkout' ? (
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
    </>
  );
}

/**
 * PaymentSubmissionForm - Functional component that represents the payment submission form.
 *
 * The PaymentSubmissionForm component uses Stripe and Elements hooks, as well as the cart and user contexts.
 * It manages the user's address state, calculates the subtotal, tax amount, and total amount for the checkout,
 * and sets up options for the Stripe address elements. This component handles form submission,
 * creates the payment intent, confirms the payment, and catches any errors that may occur.
 * It also renders the payment and address elements, totals, submission button, and the cart products.
 *
 * @returns The PaymentSubmissionForm component with Stripe elements and payment submission setup.
 */
export function PaymentSubmissionForm() {
  const stripe = useStripe();
  const elements = useElements();
  const userContext = useUserContext();
  const cartContext = useCartContext();
  const [address, setAddress] = useState<StripeAddressValue | null>(null);

  const subtotal = cartContext?.totalPrice ?? 0;
  const taxAmount = Number((subtotal * 0.13).toFixed(2));
  const totalRoundedAmount = Number((subtotal + taxAmount).toFixed(2));
  const addressOptions: StripeAddressElementOptions = {mode: 'shipping'};

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    await elements.submit();

    const items = cartContext?.cart;
    const orderDetails = {
      userId: userContext?.user?.id ?? null,
      totalPrice: totalRoundedAmount,
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
      const clientSecret: string = (
        await axios.post('/payments/intent', {
          items,
          orderDetails,
          shippingAddress,
        })
      ).data.clientSecret;

      const paymentElement = elements.getElement(PaymentElement);

      if (paymentElement === null) {
        throw new Error('Stripe Elements not found');
      }

      await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          // Make sure to change this to your payment completion page
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
                  <span>{`${subtotal} $`}</span>
                </div>
                <div className="flex justify-between p-1">
                  <span>HST (13%):</span>
                  <span>{`${taxAmount} $`}</span>
                </div>
                <div className="flex justify-between p-1">
                  <span>Total:</span>
                  <span>{`${totalRoundedAmount} $`}</span>
                </div>
              </section>

              {/* submission button */}
              <Button
                type="submit"
                disabled={!stripe}
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

/**
 * `StripeAddressValue` is a TypeScript type that represents the value of a Stripe address.
 * It contains properties for the user's name, first name, last name, address details, and phone number.
 */
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
