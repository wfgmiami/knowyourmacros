import { GET_MEALS } from './constants';

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
 */
export const getMeals = ({ keyword, meals, postWorkout }) => ({ type: GET_MEALS, keyword, meals, postWorkout });
