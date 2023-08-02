import {ReactNode, createContext, useContext, useState} from 'react';

/**
 * The type of context that will be provided by FilterContext.
 *
 * @property {string | null} filter - The current value of the filter.
 * @property {React.Dispatch<React.SetStateAction<string | null>>} setFilter - A function to update the value of the filter.
 */
type FilterContexType = {
  filter: string | null;
  setFilter: React.Dispatch<React.SetStateAction<string | null>>;
} | null;

/**
 * FilterContext is a React Context object. If React Component is a part of the context provider,
 * FilterContext.Provider can be used to change the context.
 *
 */
const FilterContext = createContext<FilterContexType | null>(null);

export default function FilterProvider(props: {children: ReactNode}) {
  const [filter, setFilter] = useState<string | null>(null);
  return (
    <FilterContext.Provider value={{filter, setFilter}}>
      {props.children}
    </FilterContext.Provider>
  );
}

/**
 * FilterProvider is a context provider for FilterContext. It holds the state for filter and
 * a function to update it. It uses the built-in useState hook to create this state.
 *
 * @param {Object} props - The props that are passed to the FilterProvider.
 * @param {ReactNode} props.children - The child components over which this context will be provided.
 * @returns {ReactNode} A Provider component which wraps the children and injects the context into them.
 */
export function useFilterContext() {
  return useContext(FilterContext);
}
