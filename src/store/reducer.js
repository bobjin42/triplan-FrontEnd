import { ADD_PLACES, ADD_TO_SELECTEDPOIS, REMOVE_FROM_SELECTEDPOIS, SCHEDUAL_PLACES } from './actionTypes'

const defaultState = {
  places: [],
  selectedPlaces: [],
  schedualPlaces: [],
};


export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_PLACES:
      return {...state, places: [...state.places, ...action.payload]};
    case ADD_TO_SELECTEDPOIS:
      return {...state, selectedPlaces: [...state.selectedPlaces, action.payload]};
    case REMOVE_FROM_SELECTEDPOIS:
      return {...state, selectedPlaces: [...state.selectedPlaces].filter(place => place !== action.payload)};
    case SCHEDUAL_PLACES:
      return {...state, schedualPlaces: action.payload}
  default:
    return state;
  }
}
