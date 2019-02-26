import { IS_FETCHING, FETCHING_SUCCESS, FETCHING_FAILED } from '../actions/actionTypes'

const INIT_STATE = {
    loading: false, lat: '', lon: '', name: '', rate: '', cat: ''
}

export default (state= INIT_STATE, action) => {
    switch(action.type){

        case IS_FETCHING:
            return { ...state, loading: true}

        case FETCHING_SUCCESS: 
            return { 
                ...state, 
                lat: action.payload, 
                lon: action.payload, 
                name: action.payload, 
                rate: action.payload,
                cat: action.payload,
                loading: false
            }

        case FETCHING_FAILED: 
            return INIT_STATE

        default:
            return state
    }
}