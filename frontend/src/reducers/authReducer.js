import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    RESET
} from "../constants/authConstants"

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isErrorLogin: false,
    isErrorRegister: false,
    message: ''
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return { ...state, isLoading: true }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, isSuccess: true, user: action.payload, isError: false }
        case REGISTER_FAIL:
            return { ...state, isLoading: false, isErrorRegister: true, message: action.payload }
        case LOGIN_FAIL:
            return { ...state, isLoading: false, isErrorLogin: true, message: action.payload }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('user')
            return { ...state, user: null }
        case RESET:
            return { ...state, isLoading: false, isSuccess: false, isErrorLogin: false, isErrorRegister: false }
        default:
            return state
    }
}
