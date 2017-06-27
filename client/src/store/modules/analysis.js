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
  nativity_women: {
    babs: 'group5.json',
    hs: 'group6.json'
  },
  race: {
    babs: 'group3.json',
    hs: 'group4.json'
  },
  race_women: {
    babs: 'group7.json',
    hs: 'group8.json'
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

const cats = [
  'Overall',
  'Full Time',
  'Poverty',
  'Working Poor',
  'Homeownership',
  'Rent Burden',
  'Unemployment',
  'Income'
]

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
    return fetch(`/json_v2/${dataSources[type][education]}`)
      .then(response => response.json())
      .then(json => {
        return dispatch(receiveAnalysis(type, education, json))
      })
  }
}

export const actions = {
  loadAnalyses
}

import regInfo from './regions.json'

function calculateRanks (data) {
  var regions = Object.keys(data)
    .filter(d => Object.keys(regInfo).indexOf(d) !== -1)
  var pumas = Object.keys(data)
    .filter(d => !Object.keys(regInfo).indexOf(d) !== -1 && d.indexOf('PUMA') !== -1)
  var getData = function (reg, cat) {
    return isNaN(+data[reg][cat].Score) ? -4 : +data[reg][cat].Score
  }
  //console.log('calculateRanks', pumas, pumas.length)
  cats.forEach(cat => {
    var catSort = regions.sort((a, b) => {
      return getData(b, cat) - getData(a, cat)
    })

    catSort.forEach((reg, i) => {
      data[reg][cat].Rank = i + 1
    })

    catSort = pumas.sort((a, b) => {
      return getData(b, cat) - getData(a, cat)
    })

    catSort.forEach((reg, i) => {
      var rank = data[reg][cat].Score.indexOf('#') !== -1 ? 'No Data' : i + 1
      data[reg][cat].Rank = rank
    })
  })
  return data
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECIEVE_ANALYSIS]: (state, action) => {
    var newState = Object.assign({}, state)
    if (!newState[action.analysis_type]) newState[action.analysis_type] = {}
    if (!newState[action.analysis_type][action.education]) newState[action.analysis_type][action.education] = {}
    var results = calculateRanks(action.payload)
    console.log('results', results)
    newState[action.analysis_type][action.education] = action.payload // results

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
