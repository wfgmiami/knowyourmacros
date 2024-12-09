import { ADD_TO_SEARCH_LIST, RETAIN_FOOD, REMOVE_FOOD, CALCULATE_MEAL, LOAD_SEARCHED_FOODS } from './constants';

/**
 * Query the database for the food
 * @param {string} searchTerm - The name of a food
 */
export const searchFood = (searchTerm) => ({ type: LOAD_SEARCHED_FOODS, searchTerm });

/**
 * Add a food to the list on which to calculate quantities
 * @param {object} food - A food record
 * @return {Promise<null>}
 */
export const retainFood = (food) => ({ type: RETAIN_FOOD, payload: food });

/**
 * Remove a food from the list on which to calculate quantities
 * @param {{ id: number }} food - Food
 */
export const removeFood = (food) => ({ type: REMOVE_FOOD, payload: food.id });

/**
 * Remove a food from the list on which to calculate quantities
 * @param {number} id - Food id
 */
export const addToSearchList = (food) => ({ type: ADD_TO_SEARCH_LIST, payload: food });

/**
 * Send foods/goals to the server to calculate quantities
 * @param {object} params - data to send
 */
export const calculateFood = (params) => ({ type: CALCULATE_MEAL, params });
