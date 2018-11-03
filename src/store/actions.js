import { ADD_PLACES, ADD_TO_SELECTEDPOIS, REMOVE_FROM_SELECTEDPOIS, SCHEDUAL_PLACES } from './actionTypes'

export const addPlaces = (data) => ({
  type: ADD_PLACES,
  payload: data
})

export const addToSelectedPois = (place) => ({
  type: ADD_TO_SELECTEDPOIS,
  payload: place
})

export const removeFromPois = (place) => ({
  type: REMOVE_FROM_SELECTEDPOIS,
  payload: place
})

export const schedualedPlace = (data) => ({
  type: SCHEDUAL_PLACES,
  payload: data
})
