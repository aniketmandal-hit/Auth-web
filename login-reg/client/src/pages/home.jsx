
import Navbar from '../component/Navbar.jsx'
import Header from '../component/Header.jsx'

const home = () => {
  return (
    <div className='flex flex-col  h-screen w-screen items-center justify-center  bg-linear-to-br from-purple-500 to-emerald-300'>
      <Navbar/>
      <Header/>
    </div>
  )
}

export default home
