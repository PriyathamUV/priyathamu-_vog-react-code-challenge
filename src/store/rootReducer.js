import { combineReducers } from "redux"
import posts from "./posts"
import universities from "./universities"

const getRootReducer = () => combineReducers({ posts ,universities})

export default getRootReducer