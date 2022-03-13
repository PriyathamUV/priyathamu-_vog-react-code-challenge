import { all, call, put, takeLatest } from "redux-saga/effects"
import * as apiService from "../services/ApiService"

const actionTypes = {
	RQT_POSTS: "RQT_POSTS",
	RCV_POSTS: "RCV_POSTS",
}

export const getPosts = () => ({ type: actionTypes.RQT_POSTS })

const initialState = {
	posts: [],
}

export default function posts(state = initialState, action) {
	switch (action.type) {
		case actionTypes.RCV_POSTS:
			return {
				...state,
				posts: action.posts,
			}
		default:
			return state
	}
}

function* fetchPosts() {
	try {
		const posts = yield call(apiService.getPosts)
		yield put({ type: "RCV_POSTS", posts })
	} catch (e) {
		console.log(e)
	}
}

export const postsSagas = all([takeLatest(actionTypes.RQT_POSTS, fetchPosts)])