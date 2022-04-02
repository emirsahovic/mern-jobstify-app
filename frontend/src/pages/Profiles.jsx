import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProfiles, getFilteredProfilesByPosition, getFilteredProfilesBySkill } from "../actions/profileActions";
import { FcSearch } from 'react-icons/fc';
import ProfileItem from "../components/ProfileItem";
import Spinner from "../components/Spinner";

const Profiles = () => {
    const [position, setPosition] = useState('');
    const [skill, setSkill] = useState('');
    const dispatch = useDispatch();
    const { profiles, isLoading, isSuccess } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getAllProfiles());
    }, [dispatch])

    const handlePositionFilter = () => {
        dispatch(getFilteredProfilesByPosition(position));
    }

    const handleSkillFilter = () => {
        dispatch(getFilteredProfilesBySkill(skill));
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="container mx-auto">
            <select name="position" value={position} className='p-2 rounded-lg bg-gray-200 mt-6' onChange={(e) => setPosition(e.target.value)}>
                <option selected hidden>Filter By Position</option>
                <option value="All Profiles">All Profiles</option>
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
            </select>
            <button onClick={handlePositionFilter} className='ml-3 bg-green-500 py-1 px-3 text-white font-bold'>Search</button>
            <input name="skill" value={skill} placeholder='Search by skill... (eg. HTML)' className='py-2 px-3 md:ml-8 rounded-lg bg-gray-200 mt-6' onChange={(e) => setSkill(e.target.value)} />
            <button onClick={handleSkillFilter} className='ml-3 bg-green-500 py-1 px-3 text-white font-bold'>Search</button>
            <div className="grid xs:grid-cols-1 md:grid-cols-2 container mx-auto mt-10 gap-8">
                {profiles && profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                ))}
            </div>
            {profiles && profiles.length === 0 && isSuccess &&
                <div className="h-full w-full bg-gray-200 p-6 flex flex-wrap items-center space-x-3">
                    <h2 className="text-xl">Sorry, we couldn't find any results.</h2>
                    <FcSearch className="text-5xl" />
                </div>}
        </div >
    )
}

export default Profiles;
