import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import { currPostReducer } from "./reducers/currPostReducer"
import { postsReducer } from "./reducers/postsReducer";



export const rootReducer = combineReducers({
    auth: authReducer,
    postsPage: postsReducer,
    currPost: currPostReducer,
})