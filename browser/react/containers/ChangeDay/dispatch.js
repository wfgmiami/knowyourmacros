/**
 * Updates the date of the application
 * @fileoverview
 * Identifies the redux methods for {@link module:react/ChangeDay}
 * @author Richard Lucas
 *
 * @module dispatch/ChangeDay
 * @memberof module:react/ChangeDay
 */

import moment from 'moment';
import { fetchFoodRecord } from 'containers/FoodRecord/actions';
import { getCalories } from 'containers/Home/actions';
import { CHANGE_DAY } from './constants';

/**
 * Update the date for the whole application
 * @param {moment} dateObj
 */
export const changeDay = (dateObj, getCals) => (dispatch) => {
  dispatch({ type: CHANGE_DAY, payload: dateObj });
  dispatch(fetchFoodRecord(dateObj.format('YYYY-MM-DD')));
  if (getCals) {
    dispatch(getCalories(dateObj));
  }
};

/**
 * Forward increment one day for the whole application
 * @param {string} currentDay The date of the application state
 * @param {Object} calories The calories of the application state
 * @param {string} getCals Fitbit token, if it exists
 */
export const nextDayClick = (currentDay, calories, getCals) => (dispatch) => {
  const nextDay = currentDay.add(1, 'days');
  const getCls = getCals && (nextDay.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') || typeof calories[nextDay.format('YYYY-MM-DD')] !== 'number');
  dispatch(changeDay(nextDay, getCls));
};

/**
 * Backward increment one day for the whole application
 * @param {string} currentDay The date of the application state
 * @param {Object} calories The calories of the application state
 * @param {string} getCals Fitbit token, if it exists
 */
export const previousDayClick = (currentDay, calories, getCals) => (dispatch) => {
  const previousDay = currentDay.subtract(1, 'days');
  const getCls = getCals && (previousDay.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') || typeof calories[previousDay.format('YYYY-MM-DD')] !== 'number');
  dispatch(changeDay(previousDay, getCls));
};
