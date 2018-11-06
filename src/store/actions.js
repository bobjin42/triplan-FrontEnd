import { ADD_PLACES, ADD_TO_SELECTEDPOIS, REMOVE_FROM_SELECTEDPOIS, SCHEDUAL_PLACES,
  UPDATE_TARGETPLACE, START_DATE, END_DATE, CITY_DETAIL, POIS_DETAIL, GET_TARGET_ID } from './actionTypes'

export const addPlaces = (places) => ({
  type: ADD_PLACES,
  payload: places
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

export const targetPlace = (data) => ({
  type: UPDATE_TARGETPLACE,
  payload: data
})

export const startDateTrip = (data) => ({
  type: START_DATE,
  payload: data
})

export const endDateTrip = (data) => ({
  type: END_DATE,
  payload: data
})

export const cityDetail = (city) => ({
  type: CITY_DETAIL,
  payload: city
})

export const poisDetail = (data) => ({
  type: POIS_DETAIL,
  payload: data
})

export const getTargetId = (id) => ({
  type: GET_TARGET_ID,
  payload: id
})

export const fetchPlaces = () => {
  return (dispatch) => {
    fetch("http://localhost:3001/api/v1/locations")
    .then(res => res.json())
    .then(places => dispatch(addPlaces(places)))
  }
}

export const fetchCityDetail = () => {
  return (dispatch) => {
    fetch('http://localhost:5001/city')
    .then(res => res.json())
    .then(city => dispatch(cityDetail(city)))
  }
}

export const fetchPOIsDetail = () => {
  return (dispatch) => {
    fetch('http://localhost:5000/detail')
    .then(res => res.json())
    .then(data => dispatch(poisDetail(data)))
  }
}
