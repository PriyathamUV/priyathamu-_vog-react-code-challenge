import { all } from "redux-saga/effects"
import { postsSagas } from "./posts"
import { universitiesSagas } from "./universities"
import { postalLookupSagas } from "./postalLookup"

export function* rootSagas() {
	yield all([postsSagas, universitiesSagas, postalLookupSagas])
}

export default rootSagas