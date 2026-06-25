import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import ResetPassword from './pages/ResetPassword'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <div>
      <ToastContainer/>
     <Routes>
      <Route path='/' element= {<Home/>}/>
      <Route path='/login' element= {<Login/>}/>
      <Route path='/reset-password' element= {<ResetPassword/>}/>
      <Route path='/verify-email' element= {<VerifyEmail/>}/>
     </Routes>
    </div>
  )
}

export default App
