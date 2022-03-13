import { useState, useEffect, createContext, useContext } from 'react';

export const GlobalContext = createContext();

export default function GlobalDataContext({ children }) {
  const [globalCurr, setGlobalCurr] = useState(null);

  useEffect(() => {
    const curr = localStorage.getItem('currency');

    setGlobalCurr(curr);
  }, []);

  return (
    <GlobalContext.Provider value={{ globalCurr, setGlobalCurr }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => useContext(GlobalContext);
