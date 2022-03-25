import Moment from 'react-moment';

const ProfileEducation = ({ edu: { school, degree, fieldofstudy, to, from } }) => {
    return (
        <div className='bg-green-300 shadow-xl border-2 border-gray-300 rounded-lg w-full p-6 hover:-translate-y-5 hover:scale-110 hover:border-green-300 transition duration-500' style={{ lineHeight: 2 }}>
            <h3 className="font-bold text-2xl mb-2">{school}</h3>
            <p className='text-gray-500'><Moment format='MM/YYYY'>{from}</Moment> - {!to ? ' Now' : <Moment format='MM/YYYY'>{to}</Moment>}</p>
            <p className='text-lg'>
                <strong>Degree: </strong> {degree}
            </p>
            <p className='text-lg'>
                <strong>Field Of Study: </strong> {fieldofstudy}
            </p>
        </div>
    )
}

export default ProfileEducation;
