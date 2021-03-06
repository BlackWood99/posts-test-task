import { LOGIN, SET_ERROR_AUTH, SET_ERROR_LOGIN, SIGN_OUT, SIGN_UP } from "../constans"

const initialState = {
	token: null,
	userId: null,
	error: null,
    errorLogin: null
}

const myUserId = 46

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_UP: {
			return {
				...state,
				token: action.payload,
				userId: myUserId,
			}
		}
		case SIGN_OUT: {
			return {
                ...state,
				token: null,
				userId: null,
				error: null,
			}
		}
		case SET_ERROR_AUTH: {
			return {
				...state,
				error: action.payload,
			}
		}
        case LOGIN: {
			return {
				...state,
				token: action.payload,
				userId: myUserId,
			}
		}
        case SET_ERROR_LOGIN: {
			return {
				...state,
				errorLogin: action.payload,
			}
		}
		default:
			return state
	}
}
