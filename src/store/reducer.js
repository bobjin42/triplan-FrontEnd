import { reducers } from 'redux';

const defaultState = {
  places: [],

};


export default (state = defaultState, action) => {
    switch (action.type) {
      case "ADD_PLACES":
      return {...state, places: state.places.concat(action.payload)}
      default:

    }
    return state;
  }
}
