import { ADD_PLACES, ADD_TO_SELECTEDPOIS, REMOVE_FROM_SELECTEDPOIS, SCHEDUAL_PLACES,
  UPDATE_TARGETPLACE, START_DATE, END_DATE, CITY_DETAIL, POIS_DETAIL, GET_TARGET_ID,
  SET_CURRENT_USER, FAILED_LOGIN, LOG_OUT, PLAN_DETAIL,
  PUSH_PLAN_DETAIL, UPDATE_TRIP_ID, ADD_PLAN, FETCHING_POIS, FETCHED_POIS, ADD_TRIP, TRAVEL_PLAN, UPDATE_TRAVEL_PLAN } from './actionTypes'

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

export const targetPlaceUpdate = (data) => ({
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

export const setCurrentUser = (userData) => ({
  type: SET_CURRENT_USER,
  payload: userData
})

export const failedLogin = (errorMsg) => ({
  type: FAILED_LOGIN,
  payload: errorMsg
})

export const logout = () => ({
  type: LOG_OUT
})

export const planDetail = (detail) => ({
  type: PLAN_DETAIL,
  payload: detail
})

export const pushPlanDetail = (detail) => ({
  type: PUSH_PLAN_DETAIL,
  payload: detail
})

export const updateTripId = (tripId) => ({
  type: UPDATE_TRIP_ID,
  payload: tripId
})

export const addPlan = (planIns) => ({
  type: ADD_PLAN,
  payload: planIns
})

export const addTrip = (trips) => ({
  type: ADD_TRIP,
  payload: trips
})

export const addTravelPlan = (plan) => ({
  type: TRAVEL_PLAN,
  payload: plan
})

export const updateusertravelPlan = (trip_id, start_date, end_date, plans, trip_title) => ({
  type: UPDATE_TRAVEL_PLAN,
  payload: {
    trip_id,
    start_date,
    end_date,
    plans,
    trip_title
  }
})

export const fetchTripId = () => {
  return (dispatch) => {
    fetch("http://localhost:3001/api/v1/trips")
    .then(res => res.json())
    .then(trip => {
      dispatch(updateTripId(trip[trip.length -1].id))
    })
  }
}

export const fetchTrips = () => {
  return (dispatch) => {
    fetch('http://localhost:3001/api/v1/trips')
    .then(res => res.json())
    .then(trips => dispatch(addTrip(trips)))
  }
}

export const updatePlan = (plan) => {
  return (dispatch) => {
    fetch('http://localhost:3001/api/v1/batch_update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        plan
      })
    })
    // .then(res => res.json())
    // .then(data => dispatch(addTravelPlan(data)))
  }
}

export const createTrip = (user_id, trip_title, start_date, end_date) => {
  return (dispatch) => {
    dispatch({type: FETCHING_POIS})
    fetch('http://localhost:3001/api/v1/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        trip: {
          user_id: user_id,
          start_date: start_date,
          end_date: end_date,
          trip_title: trip_title
        }
      })
    })
    .then(res => res.json())
    .then(places => {
      console.log(places);
      if(places.status !== 500){
        dispatch(addPlaces(places))
        dispatch({type: FETCHED_POIS})
      }
    })
  }
}

export const createPlan = (trip_id, location_id) => {
  return (dispatch) => {
    fetch('http://localhost:3001/api/v1/plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        plan: {
          trip_id,
          location_id,
        }
      })
    })
    .then(res => res.json())
    .then(data => dispatch(addPlan(data)))
  }
}

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch(authenticatingUser())
    fetch('http://localhost:3001/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch(setCurrentUser(JSONResponse.user))
      })
  }
}

export const fetchCurrentUser = () => {
  return (dispatch) => {
    dispatch(authenticatingUser())
    fetch('http://localhost:3001/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then((JSONResponse) => dispatch(setCurrentUser(JSONResponse.user)))
  }
}

export const signupUser = (username, password, name, email_address) => {
  return (dispatch) => {
    fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
          name: name,
          email_address: email_address
        }
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch(setCurrentUser(JSONResponse.user))
      })
      .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))
  }
}

export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })
