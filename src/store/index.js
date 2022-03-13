import { applyMiddleware, compose, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import getRootReducer from "./rootReducer"
import rootSagas from "./rootSagas"

const configureStore = (initialState) => {
	const sagaMiddleware = createSagaMiddleware()
	const middleWares = [sagaMiddleware]

	const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
		? window.__REDUX_DEVTOOLS_EXTENSION__()
		: (f) => f
	const store = createStore(
		getRootReducer(),
		initialState,
		compose(applyMiddleware(...middleWares), reduxDevTools)
	)

	sagaMiddleware.run(rootSagas)
	return store
}

export default configureStore