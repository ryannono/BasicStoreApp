import {ReactNode, createContext, useContext, useState} from 'react';

type FilterContexType = {
  filter: string | null;
  setFilter: React.Dispatch<React.SetStateAction<string | null>>;
} | null;

const FilterContext = createContext<FilterContexType | null>(null);

export default function FilterProvider(props: {children: ReactNode}) {
  const [filter, setFilter] = useState<string | null>(null);
  return (
    <FilterContext.Provider value={{filter, setFilter}}>
      {props.children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  return useContext(FilterContext);
}
