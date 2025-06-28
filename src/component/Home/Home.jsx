
import Banner from './Banner'
import Product from '../AllProducts/Product'
import Review from '../Review/Review'
import { useContext } from 'react'
import { AuthContext } from '../Firebase/AuthProvider'


const Home = () => {
     const {name} = useContext(AuthContext);
     console.log(name);
  return (
    <div>
        
        <Banner></Banner>
        <Product></Product>
        <Review></Review>
    </div>
  )
}

export default Home