import { SET_CURRENT_USER, AUTHENTICATING_USER, AUTHENTICATED_USER, FAILED_LOGIN, LOG_OUT,
  TRAVEL_PLAN, UPDATE_TRAVEL_PLAN } from '../actionTypes'

const defaultState = {
  user: null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null,
  usertravelPlan: []
}

const usersReducer = (state=defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload, loggedIn: true, authenticatingUser: false }
    case AUTHENTICATING_USER: //tells the app we're fetching
      return { ...state, authenticatingUser: true }
    case AUTHENTICATED_USER:
      return { ...state, authenticatingUser: false }
    case FAILED_LOGIN: //for error handling
      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      }
    case LOG_OUT:
      return defaultState
    case TRAVEL_PLAN:
      return {...state, usertravelPlan: action.payload}
    case UPDATE_TRAVEL_PLAN:
      return {...state, usertravelPlan: [...state.usertravelPlan, action.payload]}
    default:
      return state
  }
}

export default usersReducer
