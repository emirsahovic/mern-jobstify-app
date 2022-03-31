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
        case GET_PROFILES_REQUEST:
        case GET_USERS_PROFILE_REQUEST:
        case DELETE_EXPERIENCE_REQUEST:
        case DELETE_EDUCATION_REQUEST:
            return { isLoading: true }
        case GET_MY_PROFILE_SUCCESS:
        case GET_USERS_PROFILE_SUCCESS:
        case ADD_EXPERIENCE_SUCCESS:
        case DELETE_EXPERIENCE_SUCCESS:
        case ADD_EDUCATION_SUCCESS:
        case DELETE_EDUCATION_SUCCESS:
            return { isLoading: false, isSuccess: true, profile: action.payload }
        case GET_PROFILES_SUCCESS:
            return { ...state, isLoading: false, isSuccess: true, profiles: action.payload }
        case GET_MY_PROFILE_FAIL:
            return { isLoading: false, isError: true, message: action.payload }
        case CREATE_PROFILE_SUCCESS:
            return { isLoading: false, isSuccess: true, profile: action.payload, profiles: [...state.profiles, action.payload] }
        case CREATE_PROFILE_FAIL:
        case ADD_EXPERIENCE_FAIL:
        case DELETE_EXPERIENCE_FAIL:
        case ADD_EDUCATION_FAIL:
        case DELETE_EDUCATION_FAIL:
        case GET_PROFILES_FAIL:
        case GET_USERS_PROFILE_FAIL:
            return { isLoading: false, isError: true, message: action.payload }
        default:
            return state
    }
}
