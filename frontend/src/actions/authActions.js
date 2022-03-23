import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from "../constants/authConstants";
import axios from 'axios';

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST })

        const res = await axios.post('/api/users/register', userData);

        if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data));
        }

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}