import { combineReducers } from "redux"
import posts from "./posts"

const getRootReducer = () => combineReducers({ posts })

export default getRootReducer