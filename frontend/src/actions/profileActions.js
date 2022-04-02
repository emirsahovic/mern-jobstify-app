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
    DELETE_EXPERIENCE_REQUEST,
    ADD_EDUCATION_SUCCESS,
    ADD_EDUCATION_FAIL,
    DELETE_EDUCATION_REQUEST,
    DELETE_EDUCATION_SUCCESS,
    DELETE_EDUCATION_FAIL,
    GET_PROFILES_REQUEST,
    GET_PROFILES_SUCCESS,
    GET_PROFILES_FAIL,
    GET_USERS_PROFILE_REQUEST,
    GET_USERS_PROFILE_SUCCESS,
    GET_USERS_PROFILE_FAIL
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

export const getAllProfiles = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PROFILES_REQUEST })

        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GET_PROFILES_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const getFilteredProfilesByPosition = (value = '') => async (dispatch) => {
    try {
        let res;
        dispatch({ type: GET_PROFILES_REQUEST })

        if (value === 'All Profiles') {
            res = await axios.get('/api/profile');
            dispatch({
                type: GET_PROFILES_SUCCESS,
                payload: res.data
            })
        } else {
            res = await axios.get(`/api/profile?position=${value}`);

            dispatch({
                type: GET_PROFILES_SUCCESS,
                payload: res.data
            })
        }

    } catch (error) {
        dispatch({
            type: GET_PROFILES_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const getFilteredProfilesBySkill = (skill = '') => async (dispatch) => {
    try {
        let res;
        dispatch({ type: GET_PROFILES_REQUEST })

        if (skill === '') {
            res = await axios.get('/api/profile');
            dispatch({
                type: GET_PROFILES_SUCCESS,
                payload: res.data
            })
        } else {
            res = await axios.get(`/api/profile?skills[in]=${skill}`);

            dispatch({
                type: GET_PROFILES_SUCCESS,
                payload: res.data
            })
        }

    } catch (error) {
        dispatch({
            type: GET_PROFILES_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const getUsersProfile = (userId) => async (dispatch) => {
    try {
        dispatch({ type: GET_USERS_PROFILE_REQUEST })

        const res = await axios.get('/api/profile/user/' + userId);

        dispatch({
            type: GET_USERS_PROFILE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GET_USERS_PROFILE_FAIL,
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

export const addEducation = (profileData) => async (dispatch, getState) => {
    try {
        const { auth: { user } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const res = await axios.put('/api/profile/education', profileData, config);

        dispatch({
            type: ADD_EDUCATION_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ADD_EDUCATION_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

export const deleteEducation = (eduId) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_EDUCATION_REQUEST })

        const { auth: { user } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const res = await axios.delete('/api/profile/education/' + eduId, config);

        dispatch({
            type: DELETE_EDUCATION_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: DELETE_EDUCATION_FAIL,
            payload: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        })
    }
}

