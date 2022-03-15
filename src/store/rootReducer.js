import { combineReducers } from "redux"
import posts from "./posts"
import universities from "./universities"
import postalLookup from "./postalLookup"

const getRootReducer = () => combineReducers({ posts ,universities,postalLookup})

export default getRootReducer