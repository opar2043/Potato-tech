import React, { useEffect, useState } from 'react'

const useOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/order.json")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);
  return [orders]
}

export default useOrder