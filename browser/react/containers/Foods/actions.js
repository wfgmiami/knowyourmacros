import { SEARCH_FOOD, SEARCH_FOOD_SUCCESS } from './constants';

export const searchFood = (queryString, offset, formId) => ({
  type: SEARCH_FOOD,
  queryString,
  offset,
  formId
});

export const searchFoodSuccess = (payload) => ({
  type: SEARCH_FOOD_SUCCESS,
  payload
});

