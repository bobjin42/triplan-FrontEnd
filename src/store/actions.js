import { ADD_PLACES, ADD_TO_SELECTEDPOIS, REMOVE_FROM_SELECTEDPOIS, SCHEDUAL_PLACES,
  UPDATE_TARGETPLACE, START_DATE, END_DATE, CITY_DETAIL, POIS_DETAIL, GET_TARGET_ID,
  SET_CURRENT_USER, AUTHENTICATING_USER, AUTHENTICATED_USER, FAILED_LOGIN, LOG_OUT, PLAN_DETAIL, PUSH_PLAN_DETAIL } from './actionTypes'

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

export const fetchPlaces = () => {
  return (dispatch) => {
    fetch("http://localhost:3001/api/v1/locations")
    .then(res => res.json())
    .then(places => {
      dispatch(addPlaces(places))
    })
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

export const createTrip = (user_id, start_date, end_date) => {
  return (dispatch) => {
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
          end_date: end_date
        }
      })
    })
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
