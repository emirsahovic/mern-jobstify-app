import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from "../constants/authConstants"

const initialState = {
    user: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return { isLoading: true }
        case REGISTER_SUCCESS:
            return { isLoading: false, isSuccess: true, user: action.payload }
        case REGISTER_FAIL:
            return { isLoading: false, isError: true, message: action.payload }
        default:
            return state
    }
}
