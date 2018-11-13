import { ADD_PLACES, ADD_TO_SELECTEDPOIS, REMOVE_FROM_SELECTEDPOIS, SCHEDUAL_PLACES,
  CITY_DETAIL, POIS_DETAIL, GET_TARGET_ID, UPDATE_TRIP_ID, FETCHING_POIS, FETCHED_POIS } from '../actionTypes'

const defaultState = {
  places: [],
  selectedPlaces: [],
  schedualPlaces: [],
  detailPlace: [],
  targetDetailId: "",
  detailCity: [],
  tripId: "",
  isLoading: false
};


function placeReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_PLACES:
      return {...state, places: action.payload};
    case ADD_TO_SELECTEDPOIS:
      return {...state, selectedPlaces: [...state.selectedPlaces, action.payload]};
    case REMOVE_FROM_SELECTEDPOIS:
      return {...state, selectedPlaces: [...state.selectedPlaces].filter(place => place !== action.payload)};
    case SCHEDUAL_PLACES:
      return {...state, schedualPlaces: action.payload};
    case CITY_DETAIL:
      return {...state, detailCity: action.payload};
    case POIS_DETAIL:
      return {...state, detailPlace: action.payload};
    case GET_TARGET_ID:
      return {...state, targetDetailId: action.payload};
    case UPDATE_TRIP_ID:
      return {...state, tripId: action.payload};
    case FETCHING_POIS:
      return {...state, isLoading: true};
    case FETCHED_POIS:
      return {...state, isLoading: false};
  default:
    return state;
  }
}

export default placeReducer
