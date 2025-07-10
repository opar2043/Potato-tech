
import Banner from './Banner'
import Product from '../AllProducts/Product'
import Review from '../Review/Review'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Firebase/AuthProvider'
import Navbar2 from './Navbar2'


const Home = () => {
     const {name} = useContext(AuthContext);
     const id = 1
     const [product , setProduct] = useState([])
       useEffect(() => {
         fetch("/product.json")
           .then((res) => res.json())
           .then((data) => {
             const matchedProduct = data.find((item) => item.id === id || item._id === id);
             setProduct(matchedProduct);
           });
       }, []);
     
       console.log(product);
     
  return (
    <div>
        <Navbar2></Navbar2>
        <Banner></Banner>
        <Product></Product>
        <Review></Review>
    </div>
  )
}

export default Home