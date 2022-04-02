import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';
import logo from '../assets/job-logo.png';

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <nav className="bg-gray-700 p-1">
            <div className="container mx-auto px-20 flex items-center justify-between flex-wrap ">
                <Link to={`${user ? '/my-profile' : '/'}`} className='flex items-center hover:opacity-75 transition duration-200'>
                    <h2 className="text-white font-bold text-xl mr-2">Jobstify</h2>
                    <img src={logo} alt="Logo" className='h-12 w-14' style={{ margin: '3px 0 3px' }} />
                </Link>
                {user ? (
                    <div className='flex space-x-8'>
                        <Link to='/profiles' className='text-white font-semibold text-md flex items-center hover:opacity-75 transition duration-100'>
                            Developers
                        </Link>
                        <button onClick={handleLogout} className='text-white font-semibold text-md flex items-center hover:opacity-75 transition duration-100'>
                            <FaSignInAlt className='mr-2' /> Logout
                        </button>
                    </div>
                ) : (
                    <div className='flex space-x-8'>
                        <Link to='/login' className='text-white font-semibold text-md flex items-center hover:opacity-75 transition duration-100'>
                            <FaSignInAlt className='mr-2' /> Login
                        </Link>
                        <Link to='/register' className='text-white font-semibold text-md flex items-center hover:opacity-75 transition duration-100'>
                            <FaUser className='mr-2' /> Register
                        </Link>
                    </div>
                )}
            </div >
        </nav >
    )
}

export default Header
