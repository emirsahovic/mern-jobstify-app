import { Link } from 'react-router-dom';
import avatar from '../assets/avatar.png';

const ProfileItem = ({ profile }) => {
    return (
        <div className="bg-gray-200 rounded-md p-8 relative">
            <div className='flex'>
                <img src={avatar} className='rounded-full w-24 h-20 hover:scale-110 transition duration-200' alt="Avatar" />
                <div>
                    <h1 className='text-xl ml-3'>{profile.user.name}</h1>
                    <h3 className='text-md text-gray-600 ml-3 mt-1'>{profile.position}</h3>
                </div>
            </div>
            <p className='text-gray-700 mt-4 mb-8'>{profile.bio}</p>
            <p className='absolute text-gray-700 bottom-2 right-3'>{profile.location}</p>
            <div className='text-center absolute bottom-5'>
                <Link to={`/profile/${profile.user._id}`} className='p-2 bg-green-500 rounded-sm font-bold text-white hover:opacity-80 transition duration-150'>View More</Link>
            </div>
        </div >
    )
}

export default ProfileItem;
