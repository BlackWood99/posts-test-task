import { GET_POSTS, IS_LOADING } from "../constans"


const initialState = {
    posts: [],
    isLoading: false
}

export const postsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_POSTS: {
            return {
                posts: action.payload
            }
        }
        case IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        default: return state
    }
}