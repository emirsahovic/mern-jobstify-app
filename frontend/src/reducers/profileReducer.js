import { GET_MY_PROFILE_REQUEST, GET_MY_PROFILE_SUCCESS, GET_MY_PROFILE_FAIL } from "../constants/profileConstants";

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
            return { isLoading: true }
        case GET_MY_PROFILE_SUCCESS:
            return { isLoading: false, isSuccess: true, profile: action.payload }
        case GET_MY_PROFILE_FAIL:
            return { isLoading: false, isError: true, message: action.payload }
        default:
            return state
    }
}
