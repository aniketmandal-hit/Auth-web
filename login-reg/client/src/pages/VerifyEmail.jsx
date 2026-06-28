import React, { useContext, useEffect } from 'react'
import logo from '../assets/navLogo.png'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import  axios  from 'axios'
import { toast } from 'react-toastify'



const VerifyEmail = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true

  const {backendUrl , IsLoggedin, setIsLoggedin, UserData,getUserData} = useContext(AppContent)
  const inputRef = React.useRef([])

  const onInputHandler = (e, idx)=>{
    if(e.target.value.length > 0 && idx < inputRef.current.length - 1){
      inputRef.current[idx + 1].focus()
    }
  }
  const onDeleteHandler = (e, idx)=>{
    if(e.key === 'Backspace' && e.target.value ===  '' && idx > 0){
      inputRef.current[idx - 1].focus()
    }
  }

const onSubmitHandler = async(e)=>{
  try {
     e.preventDefault()
     const optArray = inputRef.current.map(e => e.value)
     const otp = optArray.join('')

     const {data} = await axios.post(backendUrl + '/api/auth/verify-Otp', {otp})
     if(data.success){
      toast.success(data.message)
      getUserData()
      navigate('/')
     } else {
      toast.error(data.message)
     }
  } catch (error) {
    toast.error(error.message)
  }
}
useEffect(() => {
  if (IsLoggedin && UserData?.isAccountVerified) {
    navigate('/');
  }
}, [IsLoggedin, UserData, navigate]);

  return (
    <div className='flex items-center justify-center h-screen w-screen bg-linear-to-br from-purple-700 to-emerald-800'>
       <div
              onClick={() => {
                navigate("/");
              }}
              className="absolute flex-none cursor-pointer h-20 w-20 rounded-full overflow-hidden top-5 left-5 bg-amber-50"
            >
              <img
                className="overflow-hidden object-cover h-full w-full"
                src={logo}
                alt="Logo"
              />
            </div>
      <form onSubmit={(e)=>
        {onSubmitHandler(e)}}
        className='flex items-center flex-col h-auto w-auto p-8 bg-linear-to-br rounded-3xl from-purple-500 to-emerald-300 '> 
        <h1 className='font-bold  text-2xl mb-4'>Verify otp</h1>
        <p className='font-semibold text-sm mb-4'>Enter the 6-digit code sent on your email id</p>

        <div className='flex items-center mb-8 justify-between w-76 h-fit'>
          {Array(6).fill(0).map((_,idx) =>(
            <input className='flex h-12 rounded-2xl border-violet-400 border-2  w-12 bg-linear-to-br from-gray-300 to-purple-300 text-center text-xl'
            type="text"
            required
            maxLength='1'
            key={idx}
            ref={e =>{inputRef.current[idx] = e}}
            onInput={(e)=>{
              onInputHandler(e, idx)
            }
          }
            onKeyDown={(e)=>{
              onDeleteHandler(e, idx)
            }}/>
          ))}
        </div>
        <button  className='border-2 cursor-pointer border-violet-400 p-2 rounded-full bg-linear-to-br from-gray-50 to-gray-400'>Submit otp</button>

      </form>
    </div>
  )
}

export default VerifyEmail
