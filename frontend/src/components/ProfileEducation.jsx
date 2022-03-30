import Moment from 'react-moment';
import { MdOutlineSchool, MdDateRange } from 'react-icons/md';
import { AiFillCloseSquare } from 'react-icons/ai';
import { deleteEducation } from '../actions/profileActions';
import { useDispatch, useSelector } from 'react-redux';

const ProfileEducation = ({ edu: { _id, school, degree, fieldofstudy, to, from }, profile }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    return (
        <div className='bg-green-800 relative text-white shadow-xl border-2 border-gray-300 rounded-lg w-full p-6 hover:-translate-y-5 hover:scale-110 hover:border-green-300 transition duration-500' style={{ lineHeight: 2 }}>
            <div className='flex items-center'>
                <h3 className="font-bold text-2xl mb-2">{school}</h3>
                <MdOutlineSchool className='text-3xl ml-2 mb-1' />
            </div>
            <div className='flex items-center my-1'>
                <MdDateRange className='text-2xl mr-2' />
                <p><Moment format='MM/YYYY'>{from}</Moment> - {!to ? ' Now' : <Moment format='MM/YYYY'>{to}</Moment>}</p>
            </div>            <p className='text-lg'>
                <strong>Degree: </strong> {degree}
            </p>
            <p className='text-lg'>
                <strong>Field Of Study: </strong> {fieldofstudy}
            </p>
            {user._id === profile.user._id && <button onClick={() => {
                dispatch(deleteEducation(_id))
            }} className='text-red-400 absolute top-2 right-2'><AiFillCloseSquare className='text-3xl' /></button>}
        </div>
    )
}

export default ProfileEducation;
