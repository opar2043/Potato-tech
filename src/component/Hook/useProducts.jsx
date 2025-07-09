import React, { useEffect, useState } from 'react'

const useProducts = () => {
    const [products , setProduct] = useState([])
  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);
  return [ products]
}

export default useProducts