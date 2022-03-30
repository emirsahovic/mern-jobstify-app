import {
    GET_MY_PROFILE_REQUEST,
    GET_MY_PROFILE_SUCCESS,
    GET_MY_PROFILE_FAIL,
    CREATE_PROFILE_FAIL,
    CREATE_PROFILE_SUCCESS,
    ADD_EXPERIENCE_SUCCESS,
    ADD_EXPERIENCE_FAIL,
    DELETE_EXPERIENCE_SUCCESS,
    DELETE_EXPERIENCE_FAIL,
    DELETE_EXPERIENCE_REQUEST
} from "../constants/profileConstants";
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

export const createProfile = (profileData) => async (dispatch, getState) => {
    try {
        const { auth: { user } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const res = await axios.post('/api/profile', profileData, config);

        dispatch({
            type: CREATE_PROFILE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CREATE_PROFILE_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const addExperience = (profileData) => async (dispatch, getState) => {
    try {
        const { auth: { user } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const res = await axios.put('/api/profile/experience', profileData, config);

        dispatch({
            type: ADD_EXPERIENCE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ADD_EXPERIENCE_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}
export const deleteExperience = (expId) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_EXPERIENCE_REQUEST })

        const { auth: { user } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const res = await axios.delete('/api/profile/experience/' + expId, config);

        dispatch({
            type: DELETE_EXPERIENCE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: DELETE_EXPERIENCE_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}
