/** @module dispatch/PublicMeals */

import { all, put, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { RECEIVE_MEALS, GET_MEALS } from './constants';

/**
 * @typedef {Object} getMealsProp
 *
 * @property {string} keyword
 * @property {Array<number>} meals
 * @property {boolean} postWorkout
 */

/**
 * Get public meals
 * @param {getMealsProps} param0
 * @async
 */
export const getMeals = function* getMeals({ keyword, meals, postWorkout }) {
  const { data } = yield api.get('/api/meal', { params: { keyword, meals, postWorkout } });
  yield put({ type: RECEIVE_MEALS, payload: data });
};

const publicMealsSagas = function* publicMealsSagas() {
  yield all([
    takeLatest(GET_MEALS, getMeals)
  ]);
};

export default publicMealsSagas;
