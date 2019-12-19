import fetch from 'isomorphic-fetch'
import {
    addReducer
} from '../../store'

const fetchSuccess = (data) => {
    return {
        type: "FETCH_NAME_SUCCESS",
        name: data
    }
}

export const fetchData = () => {
    return (dispatch) => {
        dispatch(fetchSuccess('Flyteng'))
    }
}


const demoReducer = (state = {
    name: ''
}, action) => {
    switch (action.type) {
        case "FETCH_NAME_SUCCESS":
            return Object.assign({}, state, {
                name: action.name
            })
        default:
            return state
    }
}

addReducer(demoReducer, 'demoReducer')
