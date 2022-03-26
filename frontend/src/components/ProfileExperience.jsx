import Moment from 'react-moment';
import { FaRegBuilding } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

const ProfileExperience = ({ exp: { company, from, to, title, description } }) => {
    return (
        <div className='bg-gray-700 text-white shadow-xl border-2 border-gray-300 rounded-lg md:w-full p-6 hover:-translate-y-5 hover:scale-110 hover:border-green-300 transition duration-500' style={{ lineHeight: 2 }}>
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
        </div>
    )
}

export default ProfileExperience;
