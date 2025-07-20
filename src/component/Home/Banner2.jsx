import React from 'react'
import img from '../../assets/PotatoWEB.png'
const Banner2 = () => {
  return (
    <div>
        <div className='w-full flex justify-center items-center my-10 md:my-16'>
            <img src={img} alt="banner image potato" className='w-full md:w-3/4 bg-cover' />
        </div>
    </div>
  )
}

export default Banner2