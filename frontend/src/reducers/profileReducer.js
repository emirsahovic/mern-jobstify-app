import {
    GET_MY_PROFILE_REQUEST,
    GET_MY_PROFILE_SUCCESS,
    GET_MY_PROFILE_FAIL,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAIL,
    ADD_EXPERIENCE_FAIL,
    ADD_EXPERIENCE_SUCCESS,
    DELETE_EXPERIENCE_SUCCESS,
    DELETE_EXPERIENCE_FAIL,
    DELETE_EXPERIENCE_REQUEST
} from "../constants/profileConstants";

const initialState = {
    profiles: [],
    profile: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_PROFILE_REQUEST:
        case DELETE_EXPERIENCE_REQUEST:
            return { isLoading: true }
        case GET_MY_PROFILE_SUCCESS:
        case ADD_EXPERIENCE_SUCCESS:
        case DELETE_EXPERIENCE_SUCCESS:
            return { isLoading: false, isSuccess: true, profile: action.payload }
        case GET_MY_PROFILE_FAIL:
            return { isLoading: false, isError: true, message: action.payload }
        case CREATE_PROFILE_SUCCESS:
            return { isLoading: false, isSuccess: true, profile: action.payload, profiles: [...state.profiles, action.payload] }
        case CREATE_PROFILE_FAIL:
        case ADD_EXPERIENCE_FAIL:
        case DELETE_EXPERIENCE_FAIL:
            return { isLoading: false, isError: true, message: action.payload }
        default:
            return state
    }
}
