import React, { useEffect, useState } from 'react'
import useAxios from './useAxios'
import { useQuery } from '@tanstack/react-query';

const useOrder = () => {
  // const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   fetch("/order.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setOrders(data);
  //     });
  // }, []);
  // return [orders]


  const axiosSecure = useAxios();
  const {data: orders, isLoading , refetch} = useQuery({
    queryKey: ['orders'],
    queryFn: async ()=> {
      const res = axiosSecure.get('/orders')
      return res.data
    }
  })

  return [orders, isLoading , refetch ]
}

export default useOrder