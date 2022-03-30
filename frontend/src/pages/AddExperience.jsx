import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addExperience } from '../actions/profileActions';
import BackButton from '../components/BackButton';

const AddExperience = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError } = useSelector(state => state.profile);

    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false);
    const { company, title, location, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        dispatch(addExperience(formData));

        setTimeout(() => {
            if (!isError) {
                navigate('/my-profile');
            }
        }, 700)
    }

    return (
        <div className='h-full'>
            <div className='mx-auto pt-14 xs:max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-6xl'>
                <BackButton />
                <h1 className="text-center text-3xl pb-3">Add An Experience</h1>
                <div className="bg-green-500 w-32 h-1 mx-auto block mb-6"></div>
                <small className='text-green-500'>* = required field</small>
                <form className='flex flex-col space-y-4 mt-2' onSubmit={e => onSubmit(e)}>
                    <div className='flex flex-col'>
                        <input type="text" required className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' placeholder="* Position" name="title" value={title} onChange={(e) => onChange(e)} />
                    </div>
                    <div className='flex flex-col'>
                        <input type="text" required className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' placeholder="* Company" name="company" value={company} onChange={(e) => onChange(e)} />
                    </div>
                    <div className='flex flex-col'>
                        <input type="text" className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' placeholder="Location" name="location" value={location} onChange={(e) => onChange(e)} />
                    </div>
                    <div className='flex flex-col'>
                        <h3 className='text-lg'>From Date *</h3>
                        <input type='date' required className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' name="from" value={from} onChange={(e) => onChange(e)} />
                    </div>
                    <div className='flex flex-col'>
                        <p><input type="checkbox" name="current" checked={current} value={current} onChange={(e) => {
                            setFormData({ ...formData, current: !current });
                            toggleDisabled(!toDateDisabled);
                        }} />{' '} Current Job</p>
                    </div>
                    <div className='flex flex-col'>
                        <h3 className='text-lg'>To Date</h3>
                        <input type='date' className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' name="to" value={to} onChange={(e) => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
                    </div>
                    <div className='flex flex-col'>
                        <textarea placeholder="Job Description" rows={3} className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' name="description" value={description} onChange={(e) => onChange(e)}></textarea>
                    </div>

                    <div className='pb-14 pt-4'>
                        <button type='submit' className='bg-green-500 py-2 mx-auto block px-10 rounded text-white font-bold hover:opacity-80 transition duration-200'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddExperience;
