import {
  ADD_NAME_GROUP,
  ADD_SERVING,
  SUBMIT_NEW_FOOD,
  GET_USER_CREATED,
  DELETE_USER_CREATED,
  GET_FOOD_MICRO,
  SEARCH_FOOD
} from 'containers/Database/constants';

export const fetchFoods = (searchVal, offset, extra = {}) => ({ type: SEARCH_FOOD, searchVal, offset, extra });

export const getFood = (id) => ({ type: GET_FOOD_MICRO, id });

/**
 * Submit the NameGroup form
 * @param {object} data
 * @param {string} data.main The general description of the food
 * @param {string} data.sub The specific description of the food
 * @param {{group: number, name: string}} data.group The group for the food
 */
export const submitNameGroup = (data) => ({ type: ADD_NAME_GROUP, data });

/**
 * Add serving infomation to the redux state
 * @param {object} data
 * @param {string} data.servingSize
 * @param {string} data.servingDescription
 * @param {string} data.servingWeight
 */
export const submitServing = (data) => ({ type: ADD_SERVING, data });

/**
 * Add the food
 * @param {abbrevType} requestBody
 */
export const submitMacronutrients = (requestBody) => ({ type: SUBMIT_NEW_FOOD, requestBody });

/** Get the user's created foods */
export const getUserCreatedFoods = () => ({ type: GET_USER_CREATED });

/** Delete a user's created food */
export const deleteUserCreatedFoods = (id) => ({ type: DELETE_USER_CREATED, id });
