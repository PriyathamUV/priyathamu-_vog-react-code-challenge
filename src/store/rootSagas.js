import { all } from "redux-saga/effects"
import { postsSagas } from "./posts"

export function* rootSagas() {
	yield all([postsSagas])
}

export default rootSagas