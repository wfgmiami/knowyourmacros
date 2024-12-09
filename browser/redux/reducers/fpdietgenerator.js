import api from 'utils/api';

import { CALCULATE_MEAL_SUCCESS, CALCULATE_MEAL_ERROR, GENERATE_FOOD_SUCCESS, GENERATE_FOOD_ERROR } from '../constants';

/**
 * @typedef {Object} fbdietgeneratorInitialStateType
 *
 * @property {Array} generatedFoods
 * @property {Array} meal
 * @property {boolean|string} error
 */

/** @type {fbdietgeneratorInitialStateType} */
const initialState = {
  generatedFoods: [],
  meal: [],
  error: false
};

/**
 * @param {fbdietgeneratorInitialStateType} state
 * @param {{ type: string }} action
 */
const fpdietgeneratorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_FOOD_SUCCESS:
      if (state.generatedFoods.length > 4) {
        return { ...state, generatedFoods: state.generatedFoods.slice(1) };
      }
      return { ...state, generatedFoods: state.generatedFoods.push(action.payload) };
    case GENERATE_FOOD_ERROR:
      return { ...state, error: action.payload };
    case CALCULATE_MEAL_SUCCESS:
      return { ...state, meal: action.payload, error: null };
    case CALCULATE_MEAL_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

/**
 * Get the meal quantities
 * @param {Object} params
 */
export const calculateFood = (params) => (dispatch) => api
  .get('/api/generate/calculate/', { params })
  .then(({ data }) => dispatch({ type: CALCULATE_MEAL_SUCCESS, payload: data }));

/**
 * Get some random foods
 * @param {Object} params
 */
export const generateFood = (params) => (dispatch) => api
  .get('api/generate/', { params })
  .then(({ data }) => {
    if (data.error) {
      return dispatch({ type: GENERATE_FOOD_ERROR, payload: data.error });
    }
    return dispatch({ type: GENERATE_FOOD_SUCCESS, payload: { generatedFoods: data } });
  });

export default fpdietgeneratorReducer;
