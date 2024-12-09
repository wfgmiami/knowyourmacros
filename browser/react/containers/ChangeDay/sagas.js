/**
 * Updates the date of the application
 * @fileoverview
 * Identifies the redux methods for {@link module:react/ChangeDay}
 * @author Richard Lucas
 *
 * @module dispatch/ChangeDay
 * @memberof module:react/ChangeDay
 */

import { takeLatest, all, put, call } from 'redux-saga/effects';
import moment from 'moment';
import { fetchFoodRecord } from 'containers/FoodRecord/actions';
import { getCalories } from 'containers/Home/sagas';
import { CHANGE_DAY, NEXT_DAY, PREVIOUS_DAY } from './constants';
import { changeDaySuccess } from './actions';

/**
 * Update the date for the whole application
 * @param {moment} dateObj
 */
export const changeDay = function* changeDay({ dateObj, getCals }) {
  yield put(fetchFoodRecord(dateObj.format('YYYY-MM-DD')));
  if (getCals) {
    yield call(getCalories, moment(dateObj));
  }
  yield put(changeDaySuccess(dateObj));
};

/**
 * Forward increment one day for the whole application
 * @param {string} currentDay The date of the application state
 * @param {Object} calories The calories of the application state
 * @param {string} getCals Fitbit token, if it exists
 */
export const nextDayClick = function* nextDayClick({ currentDay, calories, getCals }) {
  const nextDay = currentDay.add(1, 'days');
  const getCls = getCals && (nextDay.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') || typeof calories[nextDay.format('YYYY-MM-DD')] !== 'number');
  yield call(changeDay, { dateObj: nextDay, getCals: getCls });
};

/**
 * Backward increment one day for the whole application
 * @param {string} currentDay The date of the application state
 * @param {Object} calories The calories of the application state
 * @param {string} getCals Fitbit token, if it exists
 */
export const previousDayClick = function* previousDayClick({ currentDay, calories, getCals }) {
  const previousDay = currentDay.subtract(1, 'days');
  const getCls = getCals && (previousDay.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') || typeof calories[previousDay.format('YYYY-MM-DD')] !== 'number');
  yield call(changeDay, { dateObj: previousDay, getCals: getCls });
};

export default function* changeDaySagas() {
  yield all([
    takeLatest(CHANGE_DAY, changeDay),
    takeLatest(NEXT_DAY, nextDayClick),
    takeLatest(PREVIOUS_DAY, previousDayClick)
  ]);
}
