import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowDown } from 'react-icons/ai';

const CreateProfile = () => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        skills: '',
        bio: '',
        facebook: '',
        linkedin: '',
        github: '',
    });

    const [displaySocial, toggleSocial] = useState(false);

    const { position, company, website, location, skills, bio, facebook, linkedin, github } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        navigate('/my-profile');
    }

    return (
        <div className='h-full'>
            <div className='mx-auto pt-14 xs:max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-6xl'>
                <h1 className="text-center text-3xl pb-3">Create Your Profile</h1>
                <div className="bg-green-500 w-32 h-1 mx-auto block mb-6"></div>
                <small className='text-green-500'>* = required field</small>
                <form className='flex flex-col space-y-4 mt-2' onSubmit={e => onSubmit(e)}>
                    <div className='flex flex-col'>
                        <select name="position" value={position} className='py-2 rounded-lg bg-gray-200' onChange={onChange}>
                            <option value="0">* Select Your Position</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Full Stack Developer">Full Stack Developer</option>
                            <option value="Software Engineer">Software Engineer</option>
                            <option value="Mobile Developer">Mobile Developer</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                            <option value="QA Engineer">QA Engineer</option>
                            <option value="DevOps Engineer">DevOps Engineer</option>
                            <option value="System Administrator">System Administrator</option>
                            <option value="Project Manager">Project Manager</option>
                            <option value="Social Media Manager">Social Media Manager</option>
                            <option value="Business Manager">Business Manager</option>
                            <option value="Intern">Intern</option>
                            <option value="Other">Other</option>
                        </select>
                        <small className="text-gray-600">Current position in your career</small>
                    </div>
                    <div className='flex flex-col'>
                        <input type="text" className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' placeholder="Company" name="company" value={company} onChange={(e) => onChange(e)} />
                        <small className="text-gray-600">The current company you work for </small>
                    </div>
                    <div className='flex flex-col'>
                        <input type="text" className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' placeholder="Website" name="website" value={website} onChange={(e) => onChange(e)} />
                        <small className="text-gray-600">Your personal website</small>
                    </div>
                    <div className='flex flex-col'>
                        <input type="text" className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' placeholder="Location" name="location" value={location} onChange={(e) => onChange(e)} />
                        <small className="text-gray-600">City (eg. Sarajevo)</small>
                    </div>
                    <div className='flex flex-col'>
                        <input type="text" className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' placeholder="* Skills" name="skills" value={skills} onChange={(e) => onChange(e)} />
                        <small className="text-gray-600">A list of your technical skills (eg. Python, Java, C#, JavaScript, React.js)</small>
                    </div>
                    <div className='flex flex-col'>
                        <textarea placeholder="Say something about yourself... " className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' name="bio" value={bio} onChange={(e) => onChange(e)}></textarea>
                    </div>

                    <div className="flex items-center">
                        <button onClick={() => toggleSocial(!displaySocial)} type="button" className="bg-gray-200 hover:opacity-80 rounded-lg py-2 px-3">
                            Add Social Network Links
                        </button>
                        <span><AiOutlineArrowDown className='text-3xl text-green-500 ml-2' /></span>
                    </div>

                    {displaySocial &&
                        <>
                            <div className='flex flex-col'>
                                <input type="text" placeholder="Facebook URL" className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' name="facebook" value={facebook} onChange={(e) => onChange(e)} />
                            </div>

                            <div className='flex flex-col'>
                                <input type="text" placeholder="Linkedin URL" className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' name="linkedin" value={linkedin} onChange={(e) => onChange(e)} />
                            </div>

                            <div className='flex flex-col'>
                                <input type="text" placeholder="Github URL" className='border-gray-300 border-2 focus:outline-none rounded-lg w-full p-2.5' name="instagram" value={github} onChange={(e) => onChange(e)} />
                            </div>
                        </>
                    }

                    <div className='pb-14 pt-4'>
                        <button type='submit' className='bg-green-500 py-2 mx-auto block px-10 rounded text-white font-bold hover:opacity-80 transition duration-200'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProfile;
