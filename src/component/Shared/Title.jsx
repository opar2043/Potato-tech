import React from 'react'

const Title = ({head , head2 , para}) => {
  return (
    <div className='flex justify-center flex-col items-center my-5 mt-0 md:mt-10'>
          <div className='flex items-center mb-3'>
             <h2 className='text-2xl md:text-4xl font-bold'>{head} <span className='text-gray-700'>{head2}</span></h2>
             <div className="border-t-2 border-gray-800 w-12 sm:w-16 mt-3 ml-1"></div>
          </div>
        <p className='text-gray-700 text-center'>{para}</p>
    </div>
  )
}

export default Title