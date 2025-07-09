import React, { useEffect, useState } from 'react'

const useReview = () => {
  const [reviews, setReviews] = useState([]);

    useEffect(() => {
    fetch("/review.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return [reviews]
}

export default useReview