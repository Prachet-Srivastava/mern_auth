import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { assets } from '../assets/assets'

const Home = () => {
  return (
    
    <div
    className="flex min-h-screen flex-col items-center justify-start bg-cover bg-center bg-no-repeat pt-2"
    style={{ backgroundImage: `url(${assets.homepage})` }}
    >
        <Navbar/> 
        <Header/>
    </div>
  )
}

export default Home
