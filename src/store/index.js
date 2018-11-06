import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import placeReducer from './reducer/placeReducer';
import tripReducer from './reducer/tripReducer';

const rootReducer = combineReducers({
  placeReducer,
  tripReducer,
})

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
applyMiddleware(thunk)
);

const store = createStore(rootReducer, enhancer);

export default store;
