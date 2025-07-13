import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import useAxios from './useAxios'

const useCart = () => {
  //   const [cart , setCart] = useState([])
  // useEffect(() => {
  //   fetch("/addcart.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCart(data);
  //     });
  // }, []);
  // return [ cart]
  const axiosSecure = useAxios()

  const {data: cart = [], isLoading , refetch} = useQuery({
    queryKey: ['orders'],
    queryFn: async ()=>{
      const res =await axiosSecure.get('/add-to-cart');
      return res.data
    }
  })

  return [ cart , isLoading , refetch]
}

export default useCart