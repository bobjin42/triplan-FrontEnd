import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import placeReducer from './reducer/placeReducer';
import tripReducer from './reducer/tripReducer';
import usersReducer from './reducer/usersReducer';
import planReducer from './reducer/planReducer';

const rootReducer = combineReducers({
  placeReducer,
  tripReducer,
  usersReducer,
  planReducer
})

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
applyMiddleware(thunk)
);

const store = createStore(rootReducer, enhancer);

export default store;
