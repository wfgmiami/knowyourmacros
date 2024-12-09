/** @module dispatch/MealPlanner */

import { all, put, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { ADD_TO_SEARCH_LIST, RETAIN_FOOD, REMOVE_FOOD, CALCULATE_MEAL, CALCULATE_MEAL_SUCCESS, LOAD_SEARCHED_FOODS, LOAD_SEARCHED_FOODS_SUCCESS } from './constants';
import { getFactors } from './utils';

/**
 * Query the database for the food
 * @param {string} searchTerm - The name of a food
 */
export const searchFood = function* searchFood({ searchTerm }) {
  if (searchTerm) {
    const { data } = yield api.get(`/api/food/${searchTerm}`);
    yield put({ type: LOAD_SEARCHED_FOODS_SUCCESS, payload: data, lastSearch: searchTerm });
  }
};

/**
 * Add a food to the list on which to calculate quantities
 * @param {object} food - A food record
 * @return {Promise<null>}
 */
export const retainFood = (food) => (dispatch) => {
  dispatch({ type: RETAIN_FOOD, payload: food });
  return Promise.resolve();
};

/**
 * Remove a food from the list on which to calculate quantities
 * @param {{ id: number }} food - Food
 * @return {Promise<null>}
 */
export const removeFood = (food) => (dispatch) => {
  dispatch({ type: REMOVE_FOOD, payload: food.id });
  return Promise.resolve();
};

/**
 * Remove a food from the list on which to calculate quantities
 * @param {number} id - Food id
 * @return {Promise<null>}
 */
export const addToSearchList = (food) => (dispatch) => {
  dispatch({ type: ADD_TO_SEARCH_LIST, payload: food });
  return Promise.resolve();
};

/**
 * Send foods/goals to the server to calculate quantities
 * @param {object} params - data to send
 * @return {Promise<null>}
 */
export const calculateFood = function* calculateFood({ params }) {
  const { data } = yield api.get('/api/calculate/', { params });
  if (data.error) {
    return Promise.reject(data.error);
  }
  yield put({ type: CALCULATE_MEAL_SUCCESS, payload: { meal: data } });
  return Promise.resolve();
};

/**
 * Check if foods can actually make a meal with the specified goals
 * @param {object} param0
 * @param {Array<object>} param0.foods
 * @param {Array<object>} param0.goals
 */
export function checkPossibility({ foods, goals }) {
  const factors = getFactors(foods);
  let isError;
  let error;

  // Check for obvious failures
  const { proteinGoal, carbGoal, fatGoal } = goals;
  const check1 = proteinGoal / (factors.pFood.p * (factors.pFood.weight / 100));
  if (factors.pFood.c * check1 > carbGoal) {
    error = 'Add more carbs to the goal';
    isError = true;
  }
  if (factors.pFood.f * check1 > fatGoal) {
    error = 'Add more fat to the goal';
    isError = true;
  }

  const check2 = carbGoal / (factors.cFood.c * (factors.cFood.weight / 100));
  if (factors.cFood.p * check2 > proteinGoal) {
    error = 'Add more protein to the goal';
    isError = true;
  }
  if (factors.cFood.f * check2 > fatGoal) {
    error = 'Add more fat to the goal';
    isError = true;
  }

  const check3 = fatGoal / (factors.fFood.f * (factors.fFood.weight / 100));
  if (factors.fFood.p * check3 > proteinGoal) {
    error = 'Add more protein to the goal';
    isError = true;
  }
  if (factors.fFood.c * check3 > carbGoal) {
    error = 'Add more carbs to the goal';
    isError = true;
  }

  return isError ? Promise.reject(error) : Promise.resolve();
}

const mealPlannerSagas = function* mealPlannerSagas() {
  yield all([
    takeLatest(LOAD_SEARCHED_FOODS, searchFood),
    takeLatest(CALCULATE_MEAL, calculateFood)
  ]);
};

export default mealPlannerSagas;
