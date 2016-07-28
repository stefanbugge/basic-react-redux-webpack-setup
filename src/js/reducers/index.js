import { combineReducers } from 'redux'

import greeting from './greetingReducer'

const rootReducer = combineReducers({
    greeting
})

export default rootReducer
