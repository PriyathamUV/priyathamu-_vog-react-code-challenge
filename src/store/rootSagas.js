import { all } from "redux-saga/effects"
import { postsSagas } from "./posts"
import { universitiesSagas } from "./universities"

export function* rootSagas() {
	yield all([postsSagas,universitiesSagas])
}

export default rootSagas