import {HtmlHTMLAttributes} from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * A React component representing a card displaying product information.
 * @component
 * @param {CardProps} props - The component props.
 * @param {string} props.productId - The ID of the product associated with the card.
 * @param {string} props.productName - The name of the product displayed on the card.
 * @param {number} props.productPrice - The price of the product displayed on the card.
 * @param {string} props.productImgSrc - The URL of the product image displayed on the card.
 * @param {string} [props.className] - Additional CSS class name(s) to apply to the card component.
 */
export default function Card({
  productId,
  productName,
  productPrice,
  productImgSrc,
  className,
  ...rest
}: CardProps) {
  const navigate = useNavigate();
  return (
    <article
      className={`flex flex-col h-80 w-64 rounded-md overflow-hidden gap-0 relative cursor-pointer shadow-none hover:shadow-2xl hover:scale-[1.01] transition-all ${className}`}
      onClick={() => navigate(`product/${productId}`)}
      {...rest}
    >
      <img
        src={productImgSrc}
        alt={`Image of ${productName}`}
        className="h-full w-full object-cover"
      />
      <section className="flex flex-col w-full bg-gray-900 bg-opacity-70 backdrop-blur-sm text-white justify-center p-5 gap-2 absolute bottom-0">
        <span className="font-bold">{`${productPrice}$`}</span>
        <span>{productName}</span>
      </section>
    </article>
  );
}

type CardProps = {
  productPrice: number;
  productId: string;
  productName: string;
  productImgSrc: string;
} & HtmlHTMLAttributes<HTMLDivElement>;
