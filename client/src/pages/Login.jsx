import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const navigate = useNavigate()

    const {backendUrl,setIsLoggedin, getUserData} = useContext(AppContext)

    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const switchAuthMode = (newState) => {
        setState(newState)
        setName('')
        setEmail('')
        setPassword('')
    }

    const onSubmitHandler = async (e) => {
        try{
            e.preventDefault();
            axios.defaults.withCredentials = true

            if(state === 'Sign Up'){
                const {data} = await axios.post(backendUrl + '/api/auth/register', {name,email,password})
                if(data.success){
                    setIsLoggedin(true)
                    await getUserData()
                    navigate('/')
                }else{
                    toast.error(data.message)
                }
            
            }else{
                const {data} = await axios.post(backendUrl + '/api/auth/login', {email,password})
                if(data.success){
                    setIsLoggedin(true)
                    await getUserData()
                    navigate('/')
                }else{
                    toast.error(data.message)
                }
            }
        }
        catch(error){
            toast.error(error.response?.data?.message || error.message)
        }
        
    }


  return (
    <div
    className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${assets.homepage})` }}
    > 
        <img onClick={()=>navigate('/') }src={assets.logo} alt="" 
        className='absolute left-4 top-4 sm:left-6 sm:top-6 w-28 sm:w-32 cursor-pointer'/>
        <div className='bg-[#f7c59f]/50 backdrop-blur-md p-10 rounded-lg shadow-lg w-full sm:w-96
        text-white text-sm border border-white/20'>
            <h2 className='text-3xl font-bold text-[#1d4e89] text center mb-3'>
                {state === 'Sign Up' ? 'Create  Account' : 'Login!'}</h2>
            <p className='text-center text-[#004e89] text-sm mb-6'> 
                {state === 'Sign Up' ? 'Create your account' : ' login to your account!'}</p>

            <form onSubmit={onSubmitHandler} autoComplete='off'>
                {state ==='Sign Up' && (
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
                rounded-full  bg-[#faf7f0]'>
                    <img src={assets.person_icon} alt="" />
                    <input  onChange={e=> setName(e.target.value)} 
                    value={name}
                     className='auth-input'   type="text" placeholder='Full Name' autoComplete='name' required />
                </div>
                )} 

                 <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
                rounded-full bg-[#faf7f0]'>
                    <img src={assets.mail_icon} alt="" />
                    <input 
                    onChange={e=> setEmail(e.target.value)} 
                    value={email}
                    className='auth-input'   type="email" placeholder='Email ID' autoComplete={state === 'Sign Up' ? 'email' : 'username'} required />
                </div>

                 <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5
                rounded-full bg-[#faf7f0]'>
                    <img src={assets.lock_icon} alt="" />
                    <input 
                    onChange={e=> setPassword(e.target.value)} 
                    value={password}
                    className='auth-input'   type="password" placeholder='Password' autoComplete={state === 'Sign Up' ? 'new-password' : 'current-password'} required />
                </div>

                <p onClick={()=> navigate('/reset-password')} className="mb-4 text-[#ff8200] hover:text-[#ff6b35] cursor-pointer transition-all duration-300 origin-left hover:scale-105">Forgot Password</p>
                
                <button className='w-full py-2.5 rounded-full bg-[#1d4e89] hover:bg-[#003554] transition-colors duration-300 text-white font-medium'>{state}
                </button>

            </form>

            { state=== 'Sign Up' ? 
            (
                <p className='text-[#004e89] text-center text-xs mt-4'>Already have an account? {' '}
                <span  onClick={()=> switchAuthMode('Login')}  className="inline-block text-[#ff8200] cursor-pointer underline transition-all duration-300 origin-left hover:scale-105">Login here</span>
            </p>
            ) : 
            (
                <p className='text-[#004e89] text-center text-xs mt-4'>Don't have an account? {' '}
                <span onClick={()=> switchAuthMode('Sign Up')}  className="inline-block text-[#ff8200] cursor-pointer underline transition-all duration-300 origin-left hover:scale-105"> Sign Up</span>
            </p>
            )}

            

             
        </div>
    </div>
  )
}

export default Login
