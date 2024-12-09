import { fromJS } from 'immutable';

import { GET_USER, GET_USER_FAIL, GET_USER_SUCCESS } from './constants';

/**
 * @typedef {Object} rootInitialStateType
 *
 * @property {Object} user
 * @property {boolean} loggedIn
 * @property {string} bmrCalories
 */

/** @type {rootInitialStateType} */
const initialState = fromJS({});

/**
 * @param {rootInitialStateType} state
 * @param {{type: string}} action
 */
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return state;
    case GET_USER_FAIL:
      return state.set('error', action.error);
    case GET_USER_SUCCESS:
      return state.set('user', action.user);
    default:
      return state;
  }
};

export default rootReducer;
