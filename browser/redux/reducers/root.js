import moment from 'moment';
import { LOGOUT_SUCCESS, INVALID_LOGIN } from 'containers/Login/constants';
import { SAVE_BMR_CALORIES } from 'containers/BMRCalculator/constants';
import {
  CHANGE_DAY_SUCCESS
} from 'containers/ChangeDay/constants';

/** @type {moment} */
const initDate = moment();

/**
 * @typedef {Object} rootInitialStateType
 *
 * @property {boolean} loggedIn
 * @property {Date} initDate
 * @property {string} bmrCalories
 */

/** @type {rootInitialStateType} */
const initialState = {
  loggedIn: false,
  date: initDate,
  bmrCalories: 0
};

/**
 * @param {rootInitialStateType} state
 * @param {{type: string}} action
 */
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DAY_SUCCESS:
      return { ...state, date: action.payload };

    case LOGOUT_SUCCESS:
      return { ...initialState };

    case INVALID_LOGIN:
      return { ...initialState, invalidLogin: true };

    case SAVE_BMR_CALORIES:
      return { ...state, bmrCalories: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
