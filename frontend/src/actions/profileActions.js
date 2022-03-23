import { GET_MY_PROFILE_REQUEST, GET_MY_PROFILE_SUCCESS, GET_MY_PROFILE_FAIL } from "../constants/profileConstants";
import axios from 'axios';

export const getMyProfile = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_MY_PROFILE_REQUEST })

        const { auth: { user } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const res = await axios.get('/api/profile/me', config);

        dispatch({
            type: GET_MY_PROFILE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GET_MY_PROFILE_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}
