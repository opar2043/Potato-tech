import React, { useEffect, useState } from 'react'

const useCart = () => {
    const [cart , setCart] = useState([])
  useEffect(() => {
    fetch("/addcart.json")
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      });
  }, []);
  return [ cart]
}

export default useCart