import { ADD_PLACES, ADD_TO_SELECTEDPOIS, REMOVE_FROM_SELECTEDPOIS, SCHEDUAL_PLACES,
  CITY_DETAIL, POIS_DETAIL, GET_TARGET_ID } from '../actionTypes'

const defaultState = {
  places: [],
  selectedPlaces: [],
  schedualPlaces: [],
  detailPlace: [],
  targetDetailId: "",
  detailCity: []
};


function placeReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_PLACES:
      return {...state, places: [...state.places, ...action.payload]};
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
  default:
    return state;
  }
}

export default placeReducer
