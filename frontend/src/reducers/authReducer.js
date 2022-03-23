import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from "../constants/authConstants"

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return { isLoading: true }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { isLoading: false, isSuccess: true, user: action.payload }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return { isLoading: false, isError: true, message: action.payload }
        default:
            return state
    }
}
