import 'babel-polyfill';
import api from 'utils/api';
import { browserHistory } from 'react-router';
import { ADD_NAME_GROUP, ADD_NAME_GROUP_SUCCESS, ADD_NAME_GROUP_FAIL, ADD_SERVING, ADD_SERVING_SUCCESS, ADD_SERVING_FAIL, SUBMIT_NEW_FOOD, SUBMIT_NEW_FOOD_SUCCESS, SUBMIT_NEW_FOOD_FAIL, GET_USER_CREATED, GET_USER_CREATED_SUCCESS, GET_USER_CREATED_FAIL, DELETE_USER_CREATED, DELETE_USER_CREATED_SUCCESS, DELETE_USER_CREATED_FAIL } from 'containers/Database/constants';

import { SEARCH_FOOD, SEARCH_FOOD_SUCCESS } from 'containers/Foods/constants';

/**
 * Search for foods
 * @function fetchFoods
 * @param {number} offset integer
 * @param {object} extra form values
 */
export const fetchFoods = (offset, extra = {}) => async (dispatch) => {
  dispatch({ type: SEARCH_FOOD });
  try {
    const { data } = await api.post('/api/database/search-detail', extra);
    dispatch({ type: SEARCH_FOOD_SUCCESS, payload: data });
  } catch (err) {
    console.warn(err);
  }
};

/**
 * Submit the NameGroup form
 * @param {object} data
 * @param {string} data.main The general description of the food
 * @param {string} data.sub The specific description of the food
 * @param {{group: number, name: string}} data.group The group for the food
 */
export const submitNameGroup = (data) => (dispatch) => {
  dispatch({ type: ADD_NAME_GROUP });
  try {
    dispatch({ type: ADD_NAME_GROUP_SUCCESS, ...data });
    browserHistory.push('/database/add/serving');
  } catch (error) {
    dispatch({ type: ADD_NAME_GROUP_FAIL, error });
  }
};

/**
 * Add serving infomation to the redux state
 * @param {object} data
 * @param {string} data.servingSize
 * @param {string} data.servingDescription
 * @param {string} data.servingWeight
 */
export const submitServing = (data) => (dispatch) => {
  dispatch({ type: ADD_SERVING });
  try {
    dispatch({ type: ADD_SERVING_SUCCESS, ...data });
    browserHistory.push('/database/add/macronutrients');
  } catch (error) {
    dispatch({ type: ADD_SERVING_FAIL, error });
  }
};

/**
 * Add the food
 * @param {abbrevType} requestBody
 */
export const submitMacronutrients = (requestBody) => async (dispatch) => {
  dispatch({ type: SUBMIT_NEW_FOOD });
  try {
    const data = requestBody;
    delete data.addMacronutrientsFail;
    await api.post('/api/food', data);
    dispatch({ type: SUBMIT_NEW_FOOD_SUCCESS });
    await dispatch(getUserCreatedFoods());
    browserHistory.push('/database/my-foods');
  } catch (error) {
    dispatch({ type: SUBMIT_NEW_FOOD_FAIL, error });
  }
};

/** Get the user's created foods */
export const getUserCreatedFoods = () => async (dispatch) => {
  dispatch({ type: GET_USER_CREATED });
  try {
    const { data } = await api.get('/api/database/user-created');
    dispatch({ type: GET_USER_CREATED_SUCCESS, foods: data });
  } catch (error) {
    dispatch({ type: GET_USER_CREATED_FAIL, error });
  }
};

/** Delete a user's created food */
export const deleteUserCreatedFoods = (id) => async (dispatch) => {
  dispatch({ type: DELETE_USER_CREATED });
  try {
    await api.delete('/api/database/user-created', { data: { id } });
    dispatch({ type: DELETE_USER_CREATED_SUCCESS });
    dispatch(getUserCreatedFoods());
  } catch (error) {
    dispatch({ type: DELETE_USER_CREATED_FAIL, error });
  }
};
