import { createContext, useReducer } from "react";
import filterReducer from "../../reducers/filterReducer";
import { initialFilterState } from "../../store/filterState";

export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);

  const value = {
    state,
    dispatch,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;
