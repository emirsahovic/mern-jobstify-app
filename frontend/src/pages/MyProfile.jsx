import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfile } from "../actions/profileActions";
import Spinner from "../components/Spinner";

const MyProfile = () => {
    const dispatch = useDispatch();
    const { profile, isLoading, isSuccess, isError, message } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getMyProfile());
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            {!profile ? <p>Create profile? </p> : (
                <p>{profile.website}</p>
            )}
        </div >
    )
}

export default MyProfile;
