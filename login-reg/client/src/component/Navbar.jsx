import React from 'react'
import logo from '../assets/navlogo.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
   

  return (
    <div className='flex absolute top-2  h-auto w-full items-center justify-between  top-0% p-7'>
        <div className='h-20 w-20 rounded-full overflow-hidden'>
      <img className=" object-cover w-full h-full  " src={logo} alt="not showing" />
      </div>
      <button onClick={()=>{
        navigate('/login')
      }} className='text-white  bg-gray-500 rounded-xl p-2 w-20 cursor-pointer active:scale-105 '>Login
      </button>
      
    </div>
  )
}

export default Navbar
