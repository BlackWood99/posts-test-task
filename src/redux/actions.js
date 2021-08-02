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
//import { store } from "./store"

// const _token = localStorage.getItem("token")
// const stateToken = store.getState().auth.token
// console.log("Actions, local: ", localStorage.getItem("token"))

const instance = axios.create({
	baseURL: "http://test.flcd.ru/api",
})

let instanceWithToken = axios.create({
	baseURL: "http://test.flcd.ru/api",
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	},
})

// let instanceWithToken = axios.create({
// 	baseURL: "http://test.flcd.ru/api",
// 	timeout: 1000,
// 	// Static headers
	
// 	transformRequest: [
// 		function (data, headers) {
// 			// You may modify the headers object here
// 			headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`
// 			console.log("data: ", data)
// 			// Do not change data

// 			return data
// 		},
// 	],
// })

// const testFetch = () => {
// 	const url = "http://test.flcd.ru/api/post"
// 	let tokenStr = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzcyM2U2NmU3ZjZkZDBjMjJjMWU3YTZmODZkODVkNTI4MjE4M2E5M2JmY2RjMGQ4NGRmMjkzMzIwMGNkYjcyZGNhYTUzZGRjM2EwYTQyNmQiLCJpYXQiOjE2Mjc4MzU2OTEuMzQ2NDU0LCJuYmYiOjE2Mjc4MzU2OTEuMzQ2NDYsImV4cCI6MTY1OTM3MTY5MS4xMjQ0Mywic3ViIjoiNDYiLCJzY29wZXMiOltdfQ.qHGMa3cqI8X5S-M04PgVUoK3p4W6dsHvZcdjyMblH8BYsL8zgtpAh38DsLZBho-4e9PD7pXOq2WDiTX9geRToM-k5SolufsmOHrw7wcWBlQ8Ezv_YuDmo7GFTsTW6-SADiMbl9RefOJ2atO0DGHAsfrVIqnL1cz6FGtKl_6yxq1yHwr5QzL97vH2a_OK3VGTOAZTfe3A3b2eHhLwSaaFq4qiJDcH-E1cyrgIo7pXJIffb7Q4uEjDGZ1wlvHz0tSWLGoczDFJ_vQHTqcYuT_gseMHGWhAqLg9Jb8PWNWj7idYBDNGen-eQE89tD4paq-lLAYBekhvKTV2Cj1G6_7FPHsvw0COuXDGRiuF6iSuMVdSkBbB9HBYPbCm_3wn4TWXLF2tG5ml6ETr3oIB3WghuPKnNsqumtU13a4pFjiFZKRLbzbn3zF1wgl3MDAArbsM7IB5JT_a88FLTg-dtq5gRaOlLGrcVmUdq0a_SKuuCVUE8XYQ9NZ1cgSg06gr_Ea8MO0DvQhEO27nd5PgQqivHTmxFA-avqVCfV898plBpztSFmr2QuxFkw5aPWcdlyltqXKucs0nRGtO24Rf5uSKMysfr2wH-jOQ9bXD4WV_nkaIzGFlV5pxoTF6yx0ZGPhWqKqIvxhPOJf_D3aFt3HIqmsHRgcnPtHBvXrbrx0IPus';
// 	axios.post(url, {text: "qwertttttty"}, { headers: {"Authorization" : `Bearer ${tokenStr}`} }).then(res => console.log(res))
// }

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
		const res = await instance.get("/post")
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
		const res = await instance.get(`/post/${id}`)
		if (res.status === 200) {
			dispatch(getCurrPostAC(res.data))
		}
		dispatch(loadingCurrPostAC(false))
	} catch (error) {
		console.log("ERROR: " + error)
	}
}

export const createPost = (post) => async (dispatch) => {
	// try {
	// 	const res = await instanceWithToken.post(`/post`, post)
	// 	if (res.status === 200) {
	// 		dispatch(getPosts())
	// 	}
	// } catch (error) {
	// 	console.log("ERROR: " + error)
	// }
	instanceWithToken
		.post("/post", post)
		.then((res) => {
			if (res.status === 200) dispatch(getPosts())
		})
		.catch((err) => console.log(err.response))
}

export const deletePost = (postId) => async (dispatch) => {
	try {
		const res = await instanceWithToken.delete(`/post/${postId}`)
		if (res.status === 200) {
			dispatch(getPosts())
		}
	} catch (error) {
		console.log("ERROR: " + error)
	}
}

export const editPost = (postId, postText) => async (dispatch) => {
	try {
		console.log(localStorage.getItem("token"))
		const res = await instanceWithToken.patch(`/post/${postId}`, {
			text: postText,
		})
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
		const res = await instance.post(`/register`, authData)
		if (res.status === 200) {
			localStorage.removeItem("token")
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
		const res = await instance.post(`/token`, loginData)
		if (res.status === 200) {
			localStorage.removeItem("token")
			localStorage.setItem("token", res.data.token)
			dispatch(getTokenAC(res.data))
		}
	} catch (error) {
		console.log("ERROR: " + error)
		dispatch(loginErrorAC("ERROR"))
	}
}
