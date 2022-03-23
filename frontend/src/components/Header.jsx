import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUser, FaBlogger } from 'react-icons/fa';
import logo from '../assets/job-logo.png';

const Header = () => {
    return (
        <nav className="bg-gray-700 p-1 static">
            <div className="container mx-auto px-20 flex items-center justify-between flex-wrap ">
                <Link to='/dashboard' className='flex items-center hover:opacity-75 transition duration-200'>
                    <h2 className="text-white font-bold text-xl mr-2">Jobstify</h2>
                    <img src={logo} alt="Logo" className='h-16 w-20 py-1' />
                </Link>
                <div className='flex space-x-8'>
                    <Link to='/login' className='text-white font-semibold text-lg flex items-center hover:opacity-75 transition duration-100'>
                        <FaSignInAlt className='mr-2' /> Login
                    </Link>
                    <Link to='/register' className='text-white font-semibold text-lg flex items-center hover:opacity-75 transition duration-100'>
                        <FaUser className='mr-2' /> Register
                    </Link>
                </div>
            </div >
        </nav >
    )
}

export default Header
