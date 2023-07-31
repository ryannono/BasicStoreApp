import {BookmarkIcon} from '@heroicons/react/24/solid';
import {useNavigate} from 'react-router-dom';
import Cart from './cart/cart';
import SearchBar from './searchBar';

/**
 * A functional component that renders the navigation bar.
 *
 * The navigation bar contains a company logo, a search bar, and a shopping bag icon.
 * The company logo is clickable and navigates the user back to the home page.
 * The search bar allows the user to search for products.
 * The shopping bag icon represents the user's shopping cart.
 *
 * @returns The navigation bar as a JSX element.
 */
export default function Nav() {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center w-screen h-20 bg-black text-blue-50 z-20 fixed shadow-lg ">
      <div className="flex w-full py-5 px-20 items-center  justify-between">
        {/* company logo */}
        <div
          className="flex gap-1 font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          <BookmarkIcon className="h-6" />
          TasteTrove
        </div>

        {/* search bar */}
        <div className="flex items-center w-2/3 max-w-xl h-8 justify-between border-[1px] border-gray-600 border-solid rounded-md overflow-hidden">
          <SearchBar />
        </div>

        {/* cart logo */}
        <Cart />
      </div>
    </nav>
  );
}
