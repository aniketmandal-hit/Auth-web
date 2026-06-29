import React, { useContext, useRef, useState } from 'react';
import logo from '../assets/navLogo.png'
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  const { backendUrl } = useContext(AppContent)

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [IsEmailSubmited, setIsEmailSubmited] = useState(false)
  const [otp, setotp] = useState('')
  const [IsotpSubmited, setIsotpSubmited] = useState(false)

  const inputRef = useRef([])

  const onSubmitEmail = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email })
      if (data.success) {
        toast.success(data.message)
        setIsEmailSubmited(true)
      } else {
        toast.error(data.error || data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const inputHandler = (e, idx) => {
    if (e.target.value.length > 0 && idx < inputRef.current.length - 1) {
      inputRef.current[idx + 1].focus()
    }
  }

  const deleteHandler = (e, idx) => {
    if (e.key === 'Backspace' && e.target.value.length === 0 && idx > 0) {
      inputRef.current[idx - 1].focus()
    }
  }

  const onSubmitOtp = (e) => {
    e.preventDefault()
    // Element ka naam 'el' rakha hai taaki 'e' safe rahe
    const optArray = inputRef.current.map(el => el.value)
    setotp(optArray.join(''))
    setIsotpSubmited(true)
  }

  const onSubmitPassword = async (e) => {
    try {
      e.preventDefault()
      
      // Agar state late update hui ho, toh directly DOM se fresh OTP utha lo yahan
      const finalOtp = otp || inputRef.current.map(el => el.value).join('')

      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp: finalOtp, password })
      if (data.success) {
        toast.success(data.message || "Password changed successfully")
        navigate('/login')
      } else {
        toast.error(data.error || data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

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
          alt="logo"
        />
      </div>

      {/* Step 1: Email Form */}
      {!IsEmailSubmited &&
        <form onSubmit={onSubmitEmail} className='flex flex-col gap-5 rounded-3xl bg-linear-to-br from-purple-500 to-emerald-300 h-auto w-fit items-center justify-center p-9 '>
          <div className='w-auto flex flex-col justify-center items-center'>
            <h1 className='text-3xl mb-4 font-bold'>Forget password</h1>
            <p className='text-sm mb-6 font-semibold'>Enter your email</p>
          </div>
          <input 
            onChange={(e) => setemail(e.target.value)}
            className='w-65 h-9 outline-0 bg-linear-to-br mb-4 from-white to-gray-400 rounded-2xl px-3'
            type="email" 
            value={email} 
            required 
            placeholder='Email' 
          />
          <button type="submit" className='border-2 cursor-pointer border-violet-400 p-2 rounded-full bg-linear-to-br from-gray-50 to-gray-400' >
            Submit email
          </button>
        </form>
      }

      {/* Step 2: OTP Form */}
      {!IsotpSubmited && IsEmailSubmited &&
        <form onSubmit={onSubmitOtp} className='flex flex-col gap-5 rounded-3xl bg-linear-to-br from-purple-500 to-emerald-300 h-auto w-fit items-center justify-center p-9 '>
          <div className='w-auto flex flex-col justify-center items-center'>
            <h1 className='text-3xl mb-4 font-bold'>Enter otp</h1>
            <p className='text-sm mb-6 font-semibold'>Enter your otp</p>
          </div>
          <div className='flex items-center gap-0.5 justify-between'>
            {Array(6).fill(0).map((_, idx) => (
              <input 
                type="text" 
                required 
                maxLength='1' 
                key={idx} 
                ref={el => { inputRef.current[idx] = el }}
                onInput={(e) => inputHandler(e, idx)}
                onKeyDown={(e) => deleteHandler(e, idx)}
                className='text-center text-xl h-12 w-12 rounded-2xl border-2 border-purple-400 bg-linear-to-br from-white to-gray-400 ' 
              />
            ))}
          </div>
          <button type="submit" className='border-2 cursor-pointer border-violet-400 p-2 rounded-full bg-linear-to-br from-gray-50 to-gray-400' >
            Submit otp
          </button>
        </form>
      }

      {/* Step 3: Password Form */}
      {IsotpSubmited && IsEmailSubmited &&
        <form onSubmit={onSubmitPassword} className='flex flex-col gap-5 rounded-3xl bg-linear-to-br from-purple-500 to-emerald-300 h-auto w-fit items-center justify-center p-9 '>
          <div className='w-auto flex flex-col justify-center items-center'>
            <h1 className='text-3xl mb-4 font-bold'>New password</h1>
            <p className='text-sm mb-6 font-semibold'>Enter new password</p>
          </div>
          <input 
            onChange={(e) => setpassword(e.target.value)}
            className='w-65 h-9 outline-0 bg-linear-to-br from-white to-gray-400 rounded-2xl px-3'
            type="password" 
            required 
            value={password} 
            placeholder='New password' 
          />
          <button type="submit" className='border-2 cursor-pointer border-violet-400 p-2 rounded-full bg-linear-to-br from-gray-50 to-gray-400' >
            Change password
          </button>
        </form>
      }
    </div>
  )
}

export default ResetPassword;