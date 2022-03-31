import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProfiles } from "../actions/profileActions";
import ProfileItem from "../components/ProfileItem";
import Spinner from "../components/Spinner";

const Profiles = () => {
    const dispatch = useDispatch();
    const { profiles, isSuccess, isLoading } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getAllProfiles());
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="grid xs:grid-cols-1 md:grid-cols-2 container mx-auto mt-14 gap-8">
            {profiles && profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
            ))}
        </div>
    )
}

export default Profiles;
