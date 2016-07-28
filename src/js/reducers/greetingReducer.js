import {
    GREETING_ACTION
} from '../constants/ActionTypes'

const initialState = {
    text: "",
    timestamp: null
}

export default function greeting(state = initialState, action) {

    switch (action.type) {

        case GREETING_ACTION:
            return Object.assign({}, state, {
                text: action.greeting,
                timestamp: action.timestamp
            })

        default:
            return state
    }
}
