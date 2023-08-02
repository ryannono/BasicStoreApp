import {ShoppingBagIcon} from '@heroicons/react/24/solid';
import {Chip, Avatar} from '@mui/material';

/**
 * A React component representing a cart chip showing the total quantity of items in the cart.
 * @component
 * @param {CartChipProps} props - The component props.
 * @param {Function} props.onClick - A function to be executed when the cart chip is clicked.
 * @param {number | null} props.totalQuantity - The total quantity of items in the cart. If null, the cart is considered empty.
 */
export function CartChip({onClick, totalQuantity}: CartChipProps) {
  const className =
    'bg-orange-300 hover:bg-orange-300 hover:scale-[1.1] text-black font-bold items-center cursor-pointer px-0 transition-all';

  return (
    <>
      {totalQuantity && totalQuantity > 0 ? (
        <Chip
          className={className}
          onClick={onClick}
          icon={<ShoppingBagIcon className="h-6" color="black" />}
          label={totalQuantity}
        />
      ) : (
        <Avatar className={className} onClick={onClick}>
          <ShoppingBagIcon className="h-6" color="black" />
        </Avatar>
      )}
    </>
  );
}

type CartChipProps = {
  onClick: () => void;
  totalQuantity: number | null;
};
