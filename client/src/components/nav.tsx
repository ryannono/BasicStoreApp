import {
  BookmarkIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/solid';
import {Input, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

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
          <Input
            type="search"
            disableUnderline
            className=" placeholder-gray-50 w-full h-full text-md placeholder- flex items-center content-center pl-5 text-white"
            placeholder="Search"
          ></Input>{' '}
          <Button className="w-14 h-full rounded-l-none bg-[#ffffff1b] items-center">
            <MagnifyingGlassIcon className="h-5 text-gray-400" />
          </Button>
        </div>
        {/* cart logo */}
        <ShoppingBagIcon className="h-6" />
      </div>
    </nav>
  );
}
