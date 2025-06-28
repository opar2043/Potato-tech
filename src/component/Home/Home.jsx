import React from 'react'
import Banner from './Banner'
import Product from '../AllProducts/Product'
import Review from '../Review/Review'

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <Product></Product>
        <Review></Review>
    </div>
  )
}

export default Home