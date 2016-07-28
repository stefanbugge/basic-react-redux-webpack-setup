import * as types from '../constants/ActionTypes'

export function makeGreeting(greeting) {
  return {
    type: types.GREETING_ACTION,
    greeting,
    timestamp: Date.now()
  }
}
