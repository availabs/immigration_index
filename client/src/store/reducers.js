import { combineReducers } from 'redux'
import locationReducer from './location'
import analysis from 'store/modules/analysis'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    analysis,
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
