import axios from "axios"
import {
	GET_CURR_POST,
	GET_POSTS,
	IS_LOADING,
	IS_LOADING_POST,
	SET_ERROR_AUTH,
	SET_ERROR_LOGIN,
	SIGN_OUT,
	SIGN_UP,
} from "./constans"

const API_URI = "http://test.flcd.ru/api"

export default function authHeader() {
	const _token = localStorage.getItem("token")

	if (_token) {
		return { Authorization: "Bearer " + _token }
	} else {
		return {}
	}
}

// const instance = axios.create({
// 	baseURL: "http://test.flcd.ru/api",
// })

// let instanceWithToken = axios.create({
// 	baseURL: "http://test.flcd.ru/api",
// 	headers: {
// 		Authorization: `Bearer ${localStorage.getItem("token")}`,
// 	},
// })

// -------------- POSTS

const getPostsAC = (posts) => {
	return {
		type: GET_POSTS,
		payload: posts,
	}
}

const loadingPostsAC = (isLoading) => {
	return {
		type: IS_LOADING,
		payload: isLoading,
	}
}

export const getPosts = () => async (dispatch) => {
	try {
		dispatch(loadingPostsAC(true))
		const res = await axios.get(`${API_URI}/post`)
		if (res.status === 200) {
			dispatch(getPostsAC(res.data))
		}
		dispatch(loadingPostsAC(false))
	} catch (error) {
		console.log("ERROR: " + error)
	}
}

// -------------- ONE POST

const getCurrPostAC = (post) => {
	return {
		type: GET_CURR_POST,
		payload: post,
	}
}

const loadingCurrPostAC = (isLoading) => {
	return {
		type: IS_LOADING_POST,
		payload: isLoading,
	}
}

export const getCurrPost = (id) => async (dispatch) => {
	try {
		dispatch(loadingCurrPostAC(true))
		const res = await axios.get(`${API_URI}/post/${id}`)
		if (res.status === 200) {
			dispatch(getCurrPostAC(res.data))
		}
		dispatch(loadingCurrPostAC(false))
	} catch (error) {
		console.log("ERROR: " + error)
	}
}

export const createPost = (post) => async (dispatch) => {
	axios
		.post(`${API_URI}/post`, post, { headers: authHeader() })
		.then((res) => {
			if (res.status === 200) dispatch(getPosts())
		})
		.catch((err) => console.log(err.response))
}

export const deletePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.delete(`${API_URI}/post/${postId}`, {
			headers: authHeader(),
		})
		if (res.status === 200) {
			dispatch(getPosts())
		}
	} catch (error) {
		console.log("ERROR: " + error)
	}
}

export const editPost = (postId, postText) => async (dispatch) => {
	try {
		const res = await axios.patch(
			`${API_URI}/post/${postId}`,
			{
				text: postText,
			},
			{ headers: authHeader() }
		)
		if (res.status === 200) {
			dispatch(getPosts())
		}
	} catch (error) {
		console.log("ERROR: " + error)
	}
}

// -------------- AUTH

export const getTokenAC = (token) => {
	return {
		type: SIGN_UP,
		payload: token,
	}
}

export const authErrorAC = (error) => {
	return {
		type: SET_ERROR_AUTH,
		payload: error,
	}
}

export const signUp = (authData) => async (dispatch) => {
	try {
		const res = await axios.post(`${API_URI}/register`, authData)
		if (res.status === 200) {
			localStorage.setItem("token", res.data.token)
			dispatch(getTokenAC(res.data))
		} else {
			dispatch(authErrorAC(res.status))
		}
	} catch (error) {
		console.log("ERROR: ", error)
		dispatch(authErrorAC("ERROR"))
	}
}

export const signOutAC = () => {
	localStorage.removeItem("token")
	return {
		type: SIGN_OUT,
	}
}

const loginErrorAC = (error) => {
	return {
		type: SET_ERROR_LOGIN,
		payload: error,
	}
}

export const login = (loginData) => async (dispatch) => {
	try {
		const res = await axios.post(`${API_URI}/token`, loginData)
		if (res.status === 200) {
			localStorage.setItem("token", res.data.token)
			dispatch(getTokenAC(res.data))
		}
	} catch (error) {
		console.log("ERROR: " + error)
		dispatch(loginErrorAC("ERROR"))
	}
}
