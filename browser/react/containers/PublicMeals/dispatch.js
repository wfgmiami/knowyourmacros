/** @module dispatch/PublicMeals */

import 'babel-polyfill';
import api from 'utils/api';
import { RECEIVE_MEALS } from './constants';

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
export const getMeals = ({ keyword, meals, postWorkout }) => async (dispatch) => {
  const { data } = await api.get('/api/meal', { params: { keyword, meals, postWorkout } });
  dispatch({ type: RECEIVE_MEALS, payload: data });
};
