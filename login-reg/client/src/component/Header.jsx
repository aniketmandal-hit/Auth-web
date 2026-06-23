import React from 'react'
import midPic from '../assets/headLogo.png'

const Header = () => {
  return (
    <div className='items-center h-auto w-full pt-4 justify-center absolute flex flex-col'>
        <div className='h-45 w-45 rounded-full overflow-hidden'>
        <img className='object-cover w-full h-full' src={midPic} alt="" />
        </div>
        <h1 className='text-2xl font-bold m-2'>Hey welcome!</h1>
        <p className='mb-1.5'>welcome to our otaku website you may login to procced forward</p>
      <button className='text-white  bg-gray-500 rounded-xl p-2  cursor-pointer active:scale-105 '>Get started</button>
    </div>
  )
}

export default Header
