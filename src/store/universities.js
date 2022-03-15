import { all, call, put, takeLatest } from "redux-saga/effects"
import * as apiService from "../services/ApiService"

const actionTypes = {
	RQT_UNIVERSITES: "RQT_UNIVERSITES",
	RCV_UNIVERSITES: "RCV_UNIVERSITES",
}

export const getUniversities = (payload) => ({
	type: actionTypes.RQT_UNIVERSITES,
	payload,
})

const initialState = {
	universities: [],
	isLoading: false,
}

export default function universities(state = initialState, action) {
	switch (action.type) {
		case actionTypes.RCV_UNIVERSITES:
			return {
				...state,
				isLoading: false,
				universities: action.universities,
			}
		case actionTypes.RQT_UNIVERSITES:
			return {
				...state,
				isLoading: true,
			}
		default:
			return state
	}
}

function* readUniversities(payload) {
	try {
		const universities = yield call(
			apiService.getUniversities,
			payload.payload
		)
		yield put({ type: actionTypes.RCV_UNIVERSITES, universities })
	} catch (e) {
		console.log(e)
        throw e
	}
}

export const universitiesSagas = all([
	takeLatest(actionTypes.RQT_UNIVERSITES, readUniversities),
])