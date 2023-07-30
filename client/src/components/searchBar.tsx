import {MagnifyingGlassIcon} from '@heroicons/react/24/solid';
import {Input, Button} from '@mui/material';
import {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useFilterContext} from '../globals/filterContext';

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const filterContext = useFilterContext();
  const navigate = useNavigate();

  function handleFilter() {
    if (!filterContext) return;
    filterContext.setFilter(inputRef.current?.value.toLowerCase() ?? null);
  }

  return (
    <>
      <Input
        onChange={handleFilter}
        inputRef={inputRef}
        type="search"
        disableUnderline
        className=" placeholder-gray-50 w-full h-full text-md placeholder- flex items-center content-center pl-5 text-white"
        placeholder="Search"
      ></Input>
      <Button
        className="w-14 h-full rounded-l-none bg-[#ffffff1b] items-center"
        onClick={() => navigate('/')}
      >
        <MagnifyingGlassIcon className="h-5 text-gray-400" />
      </Button>
    </>
  );
}
