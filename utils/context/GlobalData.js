import { useState, useEffect, createContext, useContext } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
const qs = require('qs');

export const GlobalContext = createContext();

export default function GlobalDataContext({ children }) {
  const [globalCurr, setGlobalCurr] = useState(null);
  const [userID, setUserID] = useState(null);
  const [cartInfo, setCartInfo] = useState([]);
  const [checkCart, setCheckCart] = useState(false);
  const [lolaKey, setLolaKey] = useState('');
  // const URL =
  //   process.env.NODE_ENV !== 'production'
  //     ? 'http://localhost:1337'
  //     : 'https://lola-adeoti-new-backend.herokuapp.com';
  // console.log('userID', userID);
  // console.log('cartInfo :>> ', cartInfo);
  let arr = [];
  // console.log(arr);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('lola-cart'));

    const newCart = cartLocal ? Object.values(cartLocal) : [];

    newCart.forEach(async (elem) => {
      const query = qs.stringify(
        {
          filters: {
            cartId: {
              $eq: elem?.cartId.toString(),
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );
      // const { data } = await axios.get(`${URL}/api/carts/${elem?.datID}`);
      const { data: res } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carts?${query}`
      );
      // console.log('res', res.data[0]);
      // console.log('data', data);
      // arr.push(data?.data?.attributes);
      arr.push(res.data[0]?.attributes);
      // console.log(arr);
    });
    setCartInfo(arr);
  }, []);

  useEffect(() => {
    const curr = localStorage.getItem('currency');
    setGlobalCurr(curr);
    const keys = localStorage.getItem('lola_key');
    setLolaKey(keys);
  }, []);

  useEffect(() => {
    const anonID = localStorage.getItem('lola-userId');
    const cleanedAnon = JSON.parse(anonID);
    const handleUser = async () => {
      if (cleanedAnon?.userID) {
        setUserID(cleanedAnon);
      } else {
        let id = nanoid();
        let addressId = nanoid();
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/anonusers`,
          {
            data: {
              userId: id,
            },
          }
        );
        const { data: addressData } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/addresses`,
          {
            data: {
              userId: addressId,
              anonuser: data?.data?.id,
            },
          }
        );
        // console.log('data', data);
        localStorage.setItem(
          'lola-userId',
          JSON.stringify({
            userID: id,
            anonID: data?.data?.id,
            addressID: addressData?.data?.id,
          })
        );
        setUserID({
          userID: id,
          anonID: data?.data?.id,
          addressID: addressData?.data?.id,
        });
      }
    };
    handleUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        globalCurr,
        setGlobalCurr,
        userID,
        setUserID,
        cartInfo,
        setCartInfo,
        checkCart,
        setCheckCart,
        lolaKey,
        setLolaKey,
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
