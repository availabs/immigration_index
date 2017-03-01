/* @flow */
import fetch from 'isomorphic-fetch'
// ------------------------------------
// Constants
// ------------------------------------
export const RECIEVE_ANALYSIS = 'RECIEVE_ANALYSIS'

export const dataSources = {
  nativity: {
    babs: 'group1.json',
    hs: 'group2.json'
  },
  race: {
    babs: 'group3.json',
    hs: 'group4.json'
  },
  gender: {
    babs: 'group9.json',
    hs: 'group10.json'
  },
  vulnerable: {
    babs: 'group11.json',
    hs: 'group11.json'
  }
}

// --------------------------------------------
//          Actions
// --------------------------------------------
export function receiveAnalysis (type, education, value) {
  return {
    type: RECIEVE_ANALYSIS,
    payload: value,
    analysis_type: type,
    education: education
  }
}

export const loadAnalyses = (type, education) => {
  return (dispatch) => {
    return fetch(`/json/${dataSources[type][education]}`)
      .then(response => response.json())
      .then(json => {
        return dispatch(receiveAnalysis(type, education, json))
      })
  }
}

export const actions = {
  loadAnalyses
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECIEVE_ANALYSIS]: (state, action) => {
    var newState = Object.assign({}, state)
    if (!newState[action.analysis_type]) newState[action.analysis_type] = {}
    if (!newState[action.analysis_type][action.education]) newState[action.analysis_type][action.education] = {}
    newState[action.analysis_type][action.education] = action.payload
    return newState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}

export default function reportReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
