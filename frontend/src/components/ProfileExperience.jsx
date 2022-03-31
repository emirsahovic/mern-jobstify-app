import Moment from 'react-moment';
import { FaRegBuilding } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { AiFillCloseSquare } from 'react-icons/ai';
import { deleteExperience } from '../actions/profileActions';
import { useDispatch, useSelector } from 'react-redux';

const ProfileExperience = ({ exp: { _id, company, from, to, title, description }, profile }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    return (
        <div className='bg-gray-700 relative text-white shadow-xl border-2 border-gray-300 rounded-lg md:w-full p-6 hover:-translate-y-5 hover:scale-110 hover:border-green-300 transition duration-500' style={{ lineHeight: 2 }}>
            <div className='flex items-center'>
                <h3 className="font-bold text-2xl mb-2">{company}</h3>
                <span><FaRegBuilding className='text-3xl mb-2 ml-2' /></span>
            </div>
            <div className='flex items-center my-1'>
                <MdDateRange className='text-2xl mr-2 text-gray-200' />
                <p className='text-gray-200'><Moment format='MM/YYYY'>{from}</Moment> - {!to ? ' Now' : <Moment format='MM/YYYY'>{to}</Moment>}</p>
            </div>
            <p className='text-lg'>
                <strong>Position: </strong> {title}
            </p>
            <p className='text-lg'>
                <strong>Description: </strong> {description}
            </p>
            {user && user._id === profile.user._id && <button onClick={() => {
                dispatch(deleteExperience(_id))
            }} className='text-red-400 absolute top-2 right-2'><AiFillCloseSquare className='text-3xl' /></button>}
        </div>
    )
}

export default ProfileExperience;
