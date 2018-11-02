import { ADD_PLACES, ADD_TO_SELECTEDPOIS, REMOVE_FROM_SELECTEDPOIS } from './actionTypes'

const defaultState = {
  places: [],
  SelectedPlaces: []
};


export default (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_PLACES":
      return {...state, places: [...state.places, ...action.payload]};
    case 'ADD_TO_SELECTEDPOIS':
      return {...state, SelectedPlaces: [...state.SelectedPlaces, action.payload]};
    case 'REMOVE_FROM_SELECTEDPOIS':
      return {...state, SelectedPlaces: [...state.SelectedPlaces].filter(place => place !== action.payload)}
  default:
    return state;
  }
}
