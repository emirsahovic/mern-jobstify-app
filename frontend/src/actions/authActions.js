import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from "../constants/authConstants";
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

export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const res = await axios.post('/api/users/login', userData);

        if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data));
        }

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}
