import {ShoppingBagIcon} from '@heroicons/react/24/solid';
import useCartContext from '../hooks/useCartContext';
import {Avatar, Button, Chip} from '@mui/material';
import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Cart() {
  const cartContext = useCartContext();
  const navigate = useNavigate();
  const totalQuantity = useMemo(() => {
    return cartContext?.cart.reduce((runningTotal, item) => {
      return runningTotal + item.productQuantity;
    }, 0);
  }, [cartContext?.cart]);

  const baseClasses = {
    onClick: () => navigate('/cart'),
    className:
      'bg-orange-300 text-black font-bold items-center cursor-pointer px-0 label',
  };

  const chipProps = {
    ...baseClasses,
    icon: <ShoppingBagIcon className="h-6" color="black" />,
    label: totalQuantity,
  };

  return (
    <Button className="w-16 p-0">
      {totalQuantity && totalQuantity > 0 ? (
        <Chip {...chipProps} />
      ) : (
        <Avatar {...baseClasses}>
          <ShoppingBagIcon className="h-6" color="black" />
        </Avatar>
      )}
    </Button>
  );
}
