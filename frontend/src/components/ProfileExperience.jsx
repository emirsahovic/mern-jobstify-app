import Moment from 'react-moment';

const ProfileExperience = ({ exp: { company, from, to, title, description } }) => {
    return (
        <div className='bg-gray-700 text-white shadow-xl border-2 border-gray-300 rounded-lg md:w-full p-6 hover:-translate-y-5 hover:scale-110 hover:border-green-300 transition duration-500' style={{ lineHeight: 2 }}>
            <h3 className="font-bold text-2xl mb-2">{company}</h3>
            <p className='text-gray-200'><Moment format='MM/YYYY'>{from}</Moment> - {!to ? ' Now' : <Moment format='MM/YYYY'>{to}</Moment>}</p>
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
