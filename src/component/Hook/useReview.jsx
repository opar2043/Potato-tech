import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import useAxios from './useAxios'

const useReview = () => {
  // const [reviews, setReviews] = useState([]);

  //   useEffect(() => {
  //   fetch("/review.json")
  //     .then((res) => res.json())
  //     .then((data) => setReviews(data));
  // }, []);
  // return [reviews]
  const axiosSecure = useAxios()

  const {data: reviews , isLoading , refetch} = useQuery({
    queryKey: ["reviews"],
    queryFn: async ()=> {
      const res = axiosSecure.get('/reviews');
      return res.data
    }
    
  })

  return [ reviews ,isLoading , refetch ]
}

export default useReview