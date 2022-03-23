import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfile } from "../actions/profileActions";

const MyProfile = () => {
    const dispatch = useDispatch();
    const { profile, isLoading, isSuccess, isError, message } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getMyProfile());
    }, [dispatch])

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            {profile.website}
        </div>
    )
}

export default MyProfile;
