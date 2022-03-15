import { all, call, put, takeLatest } from "redux-saga/effects"
import * as apiService from "../services/ApiService"

const actionTypes = {
	RQT_AREA_DETAILS: "RQT_AREA_DETAILS",
	RCV_AREA_DETAILS: "RCV_AREA_DETAILS",
}

export const getAreaDetails = (code) => ({
	type: actionTypes.RQT_AREA_DETAILS,
	payload: { code },
})

const initialState = {
	areaDetails: {},
	isLoading: false,
}

export default function postalLookup(state = initialState, action) {
	switch (action.type) {
		case actionTypes.RCV_AREA_DETAILS:
			return {
				...state,
				isLoading: false,
				areaDetails: { ...action.areaDetails },
			}
		case actionTypes.RQT_AREA_DETAILS:
			return {
				...state,
				isLoading: true,
			}
		default:
			return state
	}
}

function* readAreaDetails(action) {
	try {
		const { code } = action.payload;
		const areaDetails = yield call(
			apiService.getAreaDetails,
			code
		)
		yield put({ type: "RCV_AREA_DETAILS", areaDetails })
	} catch (e) {
		yield put({ type: "RCV_AREA_DETAILS", areaDetails:{} })
	}
}

export const postalLookupSagas = all([
	takeLatest(actionTypes.RQT_AREA_DETAILS, readAreaDetails),
])
