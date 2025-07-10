import React, { useEffect, useState } from 'react'
import useAxios from './useAxios'
import { useQuery } from '@tanstack/react-query';

const useProducts = () => {
  //   const [products , setProduct] = useState([])
  // useEffect(() => {
  //   fetch("/product.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProduct(data);
  //     });
  // }, []);
  // return [ products]
  const axiosSecure = useAxios();
  const {data : products , isLoading , refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async ()=> {
      const res = axiosSecure.get('/products');
      return res.data ;
    }
  })

  return [products , isLoading , refetch ]
}

export default useProducts