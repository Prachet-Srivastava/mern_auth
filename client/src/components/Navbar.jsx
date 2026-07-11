import { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'





const Navbar = () => {

    const navigate = useNavigate()
    const {userData, backendUrl, setuserData, setIsLoggedin }= useContext(AppContext)
    
    const sendVerificationOtpp = async ()=>{
        try{
            axios.defaults.withCredentials = true;

            const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')

            if(data.success){
                navigate('/email-verify') 
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.response?.data?.message || error.message)
        }
    }
    
    const logout = async ()=>{
        try{
            axios.defaults.withCredentials = true

            const { data } = await axios.post(backendUrl + '/api/auth/logout')
            data.success && setIsLoggedin(false)
            data.success && setuserData(false)
            navigate('/')

        }
        catch(error){
            toast.error(error.response?.data?.message || error.message)
        }
    }




  return (
    <div className='w-full flex justify-between items-center px-4 py-3 pr-6 sm:px-6 sm:py-4 sm:pr-10'>
      <img src={assets.logo} alt="" className='w-28 sm:w-32'/>
      {userData?
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-[#c38e70] text-white relative group'>
            {userData.name[0].toUpperCase()}
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                    
                    {!userData.isAccountVerified &&
                    <li onClick={sendVerificationOtpp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>}
                    <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
                </ul>
            </div>
        </div>:<button onClick={() => navigate('/login')}
            className="group flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-[#1d4e89] hover:text-white transition-all duration-300">
            Login
            <img src={assets.arrow_icon} alt="" className="transition-all duration-300 group-hover:brightness-0 group-hover:invert"/></button>}
        </div>
  )
}

export default Navbar
