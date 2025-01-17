import React, { createContext, createElement, useContext } from "react";
import Main from "../components/main/Main";
const Context = createContext();
function Provider({ children }) {
  const [popal, setPopal] = React.useState(false);
  let str = "salom";
  return (
    <>
      <Context.Provider value={{ popal, setPopal }}>
        {children}
      </Context.Provider>
    </>
  );
}

export default Provider;

export const usestatevalue = () => useContext(Context);
