import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfile } from "../actions/profileActions";
import { AiFillInfoCircle, AiFillGithub } from 'react-icons/ai';
import { BsFillCheckSquareFill, BsLinkedin } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import avatar from "../assets/avatar.png";
import Spinner from "../components/Spinner";
import ProfileExperience from "../components/ProfileExperience";
import ProfileEducation from "../components/ProfileEducation";

const MyProfile = () => {
    const dispatch = useDispatch();
    const { profile, isLoading } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getMyProfile());
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            {!profile ? (
                <div className="container mx-auto mt-14 lg:max-w-5xl">
                    <h2 className="xs:text-lg md:text-2xl mb-6">You have not created a profile yet? Companies are waiting for you!</h2>
                    <Link to='/create-profile' className="py-2 px-4 bg-green-500 text-white font-bold hover:opacity-80 transition duration-200">Create profile</Link>
                </div>
            ) : (
                <div className="h-full">
                    <div className='profile-image py-10' style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 0, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0 0)' }}>
                        <div className="flex flex-wrap justify-center items-center space-x-24" style={{ marginRight: '9%' }}>
                            <div className="text-3xl font-bold text-center text-white" style={{ letterSpacing: '3px' }}>
                                {profile.user && profile.user.name && profile.user.name.split(' ')[0]} {' '}
                                {profile.user && profile.user.name && profile.user.name.split(' ')[1]} <br />
                                <span className="text-lg text-green-400 font-bold" style={{ letterSpacing: '0px' }}>{profile.position}</span>
                            </div>
                            <img src={avatar} className='w-80 h-56 xs:mt-2 md:mt-0' style={{ borderRadius: '50%' }} alt="Profile" />
                            <div>
                                <h3 className="text-2xl text-white font-bold pb-3 xs:mt-2 md:mt-0" style={{ letterSpacing: '5px' }}>
                                    Skills
                                </h3>
                                {profile.skills ? profile.skills.slice(0, 7).map((skill, index) => (
                                    <div key={index} className="flex items-center text-white" style={{ lineHeight: 1.7 }}>
                                        <BsFillCheckSquareFill className="text-white" />
                                        <p className="font-bold ml-3" key={index}>{skill}</p>
                                    </div>
                                )) : null}
                            </div>
                        </div>
                        <div className="flex items-center justify-center space-x-4 pt-5" style={{ marginRight: '2%' }}>
                            {profile.website &&
                                <a href={profile.website} target="_blank" rel="noreferrer" className="text-white hover:scale-150 hover:text-green-500 transition duration-200">
                                    <CgWebsite className="text-3xl" />
                                </a>}
                            {profile.social && profile.social.github &&
                                <a href={profile.social.github} target="_blank" rel="noreferrer" className="text-white hover:scale-150 hover:text-green-500 transition duration-200">
                                    <AiFillGithub className="text-3xl" />
                                </a>}
                            {profile.social && profile.social.facebook &&
                                <a href={profile.social.facebook} target="_blank" rel="noreferrer" className="text-white hover:scale-125 hover:text-green-500 transition duration-200">
                                    <FaFacebook className="text-3xl" />
                                </a>}
                            {profile.social && profile.social.linkedin &&
                                <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="text-white hover:scale-125 hover:text-green-500 transition duration-200">
                                    <BsLinkedin className="text-3xl" />
                                </a>}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl pb-3 font-bold text-center pt-12">About Me</h3>
                        <div className="bg-green-500 w-20 h-1 mx-auto block"></div>
                        <div className="shadow-xl p-6 border-2 border-green-400 block mx-auto mt-8 text-ellipsis bg-gray-100 xs:w-3/4 lg:w-1/3 relative rounded">
                            <p className="italic text-xl">{profile.bio ? profile.bio : 'This user did not provide any information about himself...'}</p>
                            <p className="absolute top-2 right-2">
                                <AiFillInfoCircle className="text-2xl text-green-400 hover:scale-110" />
                            </p>
                        </div>
                        {(profile.experience && profile.experience.length > 0) || (profile.education && profile.education.length > 0) ? (
                            <>
                                <h3 className="text-3xl pb-3 font-bold text-center pt-12">Experience & Education</h3>
                                <div className="bg-green-500 w-32 h-1 mx-auto block mb-6"></div>
                            </>
                        ) : null}
                        <div className="flex flex-wrap justify-center md:space-x-7">
                            <div className="flex flex-col space-y-4 items-start flex-wrap pt-8 pb-6" style={{ width: '40rem' }}>
                                {profile.experience && profile.experience.map(exp => (
                                    <ProfileExperience key={exp._id} exp={exp} />
                                ))}
                            </div>
                            <div className="flex flex-col space-y-4 items-start flex-wrap pt-8 pb-6" style={{ width: '40rem' }}>
                                {profile.education && profile.education.map(edu => (
                                    <ProfileEducation key={edu._id} edu={edu} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyProfile;
