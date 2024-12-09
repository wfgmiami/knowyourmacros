import api from 'utils/api';

import {
  CREATE_PROGRAM,
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  RECEIVE_USER
} from 'containers/Login/constants';
import {
  GET_USER_SUCCESS
} from 'containers/User/constants';
import { RECEIVE_MEASUREMENTS } from 'containers/BMRCalculator/constants';
import { DESTROY_MEASUREMENT_SUCCESS } from 'containers/Home/constants';
import { SIGN_UP_SUCCESS } from '../../react/containers/Signup/constants';

/**
 * @typedef {Object} rootInitialStateType
 *
 * @property {Object} user
 * @property {boolean} loggedIn
 * @property {string} bmrCalories
 */

/** @type {rootInitialStateType} */
const initialState = {};

/**
 * @param {rootInitialStateType} state
 * @param {{type: string}} action
 */
const rootReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_USER_SUCCESS:
      return action.user;

    case CREATE_PROGRAM:
      newState = changeState();
      newState.programs = state.programs.slice();
      newState.programs.push(action.payload);
      return newState;

    case RECEIVE_MEASUREMENTS:
      newState = changeState();
      newState.userMeasurements = action.payload;
      return newState;

    case LOGIN:
      return state;

    case LOGIN_SUCCESS:
      return action.user;

    case SIGN_UP_SUCCESS:
      return action.user;

    case LOGOUT_SUCCESS:
      return { ...initialState };

    case DESTROY_MEASUREMENT_SUCCESS:
      newState = changeState();
      newState.userMeasurements = newState.userMeasurements.filter((meas) => meas.id !== action.payload);
      return newState;

    default:
      return state;
  }
  /**
   * Changes the state
   * @param {Object} obj new params to merge with the state
   */
  function changeState(obj) {
    return Object.assign({}, state, obj || null);
  }
};

export default rootReducer;

/**
 * Create a user
 * @param {object} userProps
 */
export const createUser = (userProps) => () => api.post('/api/user', userProps)
  .then(({ data }) => {
    // Sign in the new user and take them to the homepage
    localStorage.setItem('token', data.token);
  });

/**
 * Create a program
 * @param {object} measurements
 */
export const createProgram = (measurements) => (dispatch) => api
  .post('api/programs', measurements)
  .then(({ data }) => dispatch({ type: CREATE_PROGRAM, payload: data }));
