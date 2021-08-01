import { GET_CURR_POST, IS_LOADING_POST, SET_ERROR_POST } from "../constans"


const initialState = {
    currPost: {},
    isLoading: false,
    error: null
}

export const currPostReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CURR_POST: {
            return {
                ...state,
                currPost: action.payload
            }
        }
        case IS_LOADING_POST: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case SET_ERROR_POST: {
            return {
                ...state,
                error: action.payload
            }
        }
        default: return state
    }
}