import { useState, useEffect, createContext, useContext } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
export const GlobalContext = createContext();

export default function GlobalDataContext({ children }) {
  const [globalCurr, setGlobalCurr] = useState(null);
  const [userID, setUserID] = useState(null);
  const [cartInfo, setCartInfo] = useState(null);
  // console.log('userID', userID);

  useEffect(() => {
    const curr = localStorage.getItem('currency');
    const anonID = localStorage.getItem('lola-userId');
    const cleanedAnon = JSON.parse(anonID);

    const handleUser = async () => {
      if (cleanedAnon) {
        setUserID(cleanedAnon);
      } else {
        let id = nanoid();
        localStorage.setItem('lola-userId', JSON.stringify({ userID: id }));
        setUserID({ userID: id });
        await createNewUser(id);
      }
    };
    handleUser();
    setGlobalCurr(curr);
  }, []);

  const createNewUser = async (id) => {
    const URL =
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:1337'
        : 'https://lola-adeoti-new-backend.herokuapp.com';
    await axios.post(`${URL}/api/anonusers`, {
      data: {
        userId: id,
      },
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        globalCurr,
        setGlobalCurr,
        userID,
        setUserID,
        cartInfo,
        setCartInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => useContext(GlobalContext);

/**
 * *if a userdoes not have an Id in local storage
 * *create one for the user
 */
