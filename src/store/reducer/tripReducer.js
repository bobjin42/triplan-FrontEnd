import { UPDATE_TARGETPLACE, START_DATE, END_DATE, ADD_TRIP } from '../actionTypes'

const defaultState = {
  targetPlace: "",
  startDate: "",
  endDate: "",
  allTrips: []
};

function tripReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_TARGETPLACE:
      return {...state, targetPlace:action.payload};
    case START_DATE:
      return {...state, startDate:action.payload};
    case END_DATE:
      return {...state, endDate:action.payload};
    case ADD_TRIP:
      return {...state, allTrips:action.payload};
    default:
      return state;
  }
}

export default tripReducer
