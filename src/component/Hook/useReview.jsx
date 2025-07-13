import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

const useReview = () => {
  const axiosSecure = useAxios()

  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews'); // ✅ Add `await` here
      return res.data;
    },
  });

  return [reviews, isLoading, refetch];
}

export default useReview;
