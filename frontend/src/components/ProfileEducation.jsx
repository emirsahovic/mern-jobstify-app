import Moment from 'react-moment';
import { MdOutlineSchool, MdDateRange } from 'react-icons/md';

const ProfileEducation = ({ edu: { school, degree, fieldofstudy, to, from } }) => {
    return (
        <div className='bg-green-800 text-white shadow-xl border-2 border-gray-300 rounded-lg w-full p-6 hover:-translate-y-5 hover:scale-110 hover:border-green-300 transition duration-500' style={{ lineHeight: 2 }}>
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
        </div>
    )
}

export default ProfileEducation;
