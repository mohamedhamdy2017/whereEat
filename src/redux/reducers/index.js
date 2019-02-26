import { combineReducers } from 'redux'
import FetchingReducer from './FetchingReducer'

export default combineReducers({
    fetch: FetchingReducer
})