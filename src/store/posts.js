import { all, call, put, takeLatest } from "redux-saga/effects"
import * as apiService from "../services/ApiService"

const actionTypes = {
	RQT_POSTS: "RQT_POSTS",
	RCV_POSTS: "RCV_POSTS",
	RQT_ADD_POST: "RQT_ADD_POST",
	RCV_ADD_POST: "RCV_ADD_POST",
	RQT_EDIT_POST: "RQT_EDIT_POST",
	RCV_EDIT_POST: "RCV_EDIT_POST",
	RQT_REMOVE_POST: "RQT_REMOVE_POST",
	RCV_REMOVE_POST: "RCV_REMOVE_POST",
}

export const getPosts = () => ({ type: actionTypes.RQT_POSTS })

export const addPost = (payload) => ({
	type: actionTypes.RQT_ADD_POST,
	payload,
})
export const editPost = (payload) => ({
	type: actionTypes.RQT_EDIT_POST,
	payload,
})
export const removePost = (payload) => ({
	type: actionTypes.RQT_REMOVE_POST,
	payload,
})

const initialState = {
	posts: [],
	isLoading: false,
}

export default function posts(state = initialState, action) {
	switch (action.type) {
		case actionTypes.RCV_POSTS:
			return {
				...state,
				isLoading: false,
				posts: action.posts,
			}
		case actionTypes.RQT_POSTS:
			return {
				...state,
				isLoading: true,
			}
		case actionTypes.RCV_ADD_POST:
			return {
				...state,
				posts: [action.response, ...state.posts],
			}
		case actionTypes.RCV_EDIT_POST:
			const index = state.posts.findIndex(
				(item) => item.id === action.response.id
			)
			const data = [...state.posts]
			data[index] = action.response
			return {
				...state,
				posts: [...data],
			}
		case actionTypes.RCV_REMOVE_POST:
			const posts = state.posts.filter((item) => item.id !== action.id)
			return {
				...state,
				posts: [...posts],
			}
		default:
			return state
	}
}


	function* readPosts() {
		try {
			const posts = yield call(apiService.getPosts)
			yield put({ type: "RCV_POSTS", posts })
		} catch (e) {
			throw e
		}
	}
	
	function* createPost(data) {
		try {
			const response = yield call(apiService.addPost, data.payload)
			yield put({ type: "RCV_ADD_POST", response })
		} catch (e) {
			throw e
		}
	}
	
	function* updatePost(data) {
		try {
			const response = yield call(apiService.editPost, data.payload)
			yield put({ type: "RCV_EDIT_POST", response })
		} catch (e) {
			throw e
		}
	}
	
	function* deletePost(data) {
		try {
			yield call(apiService.removePost, data.payload)
			yield put({ type: "RCV_REMOVE_POST", id: data.payload })
		} catch (e) {
			throw e
		}
	}
	


export const postsSagas = all([
	takeLatest(actionTypes.RQT_ADD_POST, createPost),
	takeLatest(actionTypes.RQT_POSTS, readPosts),
	takeLatest(actionTypes.RQT_EDIT_POST, updatePost),
	takeLatest(actionTypes.RQT_REMOVE_POST, deletePost),
])