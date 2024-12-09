import axios from 'axios';
import {
  ADD_DAY,
  FETCHING_DAY_MEAL_PLAN,
  REMOVE_DAY,
  RECALCULATE_DAY,
  RECEIVE_LIST_ITEMS
} from '../constants';

import { getToken } from './root';

const initialState = {
  shoppinglist: [],
  fetchingData: false,
  list: []
};

export default (state = initialState, action) => {
  state = Object.assign({}, state);

  switch (action.type) {

  case ADD_DAY:
    state.fetchingData = false;
    state.shoppinglist = state.shoppinglist.slice(0);
    state.shoppinglist.push(action.payload);
    break;

  case FETCHING_DAY_MEAL_PLAN:
    state.fetchingData = true;
    break;

  case REMOVE_DAY:
    state.shoppinglist = state.shoppinglist.slice();
    state.shoppinglist.splice(action.payload, 1);
    break;

  case RECALCULATE_DAY:
    state.shoppinglist = state.shoppinglist.slice();
    state.shoppinglist[action.payload.index] = action.payload.day;
    state.fetchingData = false;
    break;

  case RECEIVE_LIST_ITEMS:
    state.list = action.payload;
    break;

  default:
    break;
  }

  return state;

};

/**
 * Add a day to the shopping list, with calculations complete
 * @param {string} type - Should be 'train' or 'rest'
 */
export const addDay = type => dispatch => {
  dispatch({ type: FETCHING_DAY_MEAL_PLAN, payload: true });
  return axios.get('/api/calculate/day', { params: { token: getToken(), type } })
    .then(({ data }) => dispatch({ type: ADD_DAY, payload: data }));
};

/**
 * Get new foods from the database and calculate based on goals
 * @param {number} index - (integer)
 * @param {string} type - Should be 'train' or 'rest'
 */
export const recalculateDay = (index, type) => dispatch => {
  dispatch({ type: FETCHING_DAY_MEAL_PLAN, payload: true });
  return axios.get('/api/calculate/day', { params: { token: getToken(), type } })
    .then(({ data }) => dispatch({ type: RECALCULATE_DAY, payload: { index, day: data } }));
};

/**
 * Get the shopping list
 * @param {string} date
 */
export const getList = date => dispatch => {
  return axios.get('/api/shopping-list/list', { params: { token: getToken(), date } })
    .then(({ data }) => dispatch({ type: RECEIVE_LIST_ITEMS, payload: data }));
};

/**
 * Remove a day
 * @param {number} index - (integer)
 */
export const removeDay = index => dispatch => {
  return dispatch({ type: REMOVE_DAY, payload: index });
};

