
import { useContext } from 'react'
import midPic from '../assets/headLogo.png'
import { AppContent } from '../context/AppContext.jsx'
import {  Link, useNavigate } from 'react-router-dom'


const Header = () => {
  const navigate = useNavigate()
const {UserData, IsLoggedin} = useContext(AppContent)


  return (
    <div className='items-center h-auto w-1/2 pt-4 justify-center absolute flex flex-col'>
        <div className='h-45 w-45 rounded-full overflow-hidden'>
        <img className='object-cover w-full h-full' src={midPic} alt="" />
        </div>
        <h1 className='text-2xl font-bold m-2'>Hey welcome {UserData ? UserData.Username : 'Otaku'}!</h1>
        <p className='mb-1.5 '>welcome to our otaku website you may login to procced forward</p>
        {IsLoggedin ? <Link to='/hero-page' className='text-white  bg-gray-500 rounded-full p-2  cursor-pointer active:scale-105 '>Get started</Link>
         : <Link to = '/login' className='text-white  bg-gray-500 rounded-full p-2  cursor-pointer active:scale-105 '> Login to continue</Link>
         }
      
    </div>
  )
}

export default Header
