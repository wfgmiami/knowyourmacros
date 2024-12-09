import { put, takeLatest, all, call } from 'redux-saga/effects';
import api from 'utils/api';
import { browserHistory } from 'react-router';
import { ADD_NAME_GROUP, ADD_NAME_GROUP_SUCCESS, ADD_NAME_GROUP_FAIL, ADD_SERVING, ADD_SERVING_SUCCESS, ADD_SERVING_FAIL, SUBMIT_NEW_FOOD, SUBMIT_NEW_FOOD_SUCCESS, SUBMIT_NEW_FOOD_FAIL, GET_USER_CREATED, GET_USER_CREATED_SUCCESS, GET_USER_CREATED_FAIL, DELETE_USER_CREATED, DELETE_USER_CREATED_SUCCESS, DELETE_USER_CREATED_FAIL, SEARCH_FOOD, GET_FOOD_MICRO, GET_FOOD_MICRO_SUCCESS, GET_FOOD_MICRO_FAIL } from 'containers/Database/constants';

import { SEARCH_FOOD_SUCCESS } from 'containers/Foods/constants';

/**
 * Search for foods
 * @function fetchFoods
 * @param {number} offset integer
 * @param {object} extra form values
 */
export const fetchFoods = function* fetchFoods({ searchVal, extra = {} }) {
  try {
    const { data } = yield api.post('/api/database/search-detail', { searchVal, ...extra });
    yield put({ type: SEARCH_FOOD_SUCCESS, payload: data });
  } catch (err) {
    console.warn(err);
  }
};

export const getFood = function* getFood({ id }) {
  try {
    const { data } = yield api.get(`/api/foodmicro/${id}`);
    yield put({ type: GET_FOOD_MICRO_SUCCESS, food: data });
  } catch (error) {
    yield put({ type: GET_FOOD_MICRO_FAIL, error });
  }
};


/**
 * Submit the NameGroup form
 * @param {object} data
 * @param {string} data.main The general description of the food
 * @param {string} data.sub The specific description of the food
 * @param {{group: number, name: string}} data.group The group for the food
 */
export const submitNameGroup = function* submitNameGroup({ data }) {
  // dispatch({ type: ADD_NAME_GROUP });
  try {
    yield put({ type: ADD_NAME_GROUP_SUCCESS, ...data });
    browserHistory.push('/database/add/serving');
  } catch (error) {
    yield put({ type: ADD_NAME_GROUP_FAIL, error });
  }
};

/**
 * Add serving infomation to the redux state
 * @param {object} data
 * @param {string} data.servingSize
 * @param {string} data.servingDescription
 * @param {string} data.servingWeight
 */
export const submitServing = function* submitServing({ data }) {
  // dispatch({ type: ADD_SERVING });
  try {
    yield put({ type: ADD_SERVING_SUCCESS, ...data });
    browserHistory.push('/database/add/macronutrients');
  } catch (error) {
    yield put({ type: ADD_SERVING_FAIL, error });
  }
};

/**
 * Add the food
 * @param {abbrevType} requestBody
 */
export const submitMacronutrients = function* submitMacronutrients({ requestBody }) {
  // dispatch({ type: SUBMIT_NEW_FOOD });
  try {
    const data = requestBody;
    delete data.addMacronutrientsFail;
    yield api.post('/api/food', data);
    yield put({ type: SUBMIT_NEW_FOOD_SUCCESS });
    yield call(getUserCreatedFoods);
    browserHistory.push('/database/my-foods');
  } catch (error) {
    yield put({ type: SUBMIT_NEW_FOOD_FAIL, error });
  }
};

/** Get the user's created foods */
export const getUserCreatedFoods = function* getUserCreatedFoods() {
  // dispatch({ type: GET_USER_CREATED });
  try {
    const { data } = yield api.get('/api/database/user-created');
    yield put({ type: GET_USER_CREATED_SUCCESS, foods: data });
  } catch (error) {
    yield put({ type: GET_USER_CREATED_FAIL, error });
  }
};

/** Delete a user's created food */
export const deleteUserCreatedFoods = function* deleteUserCreatedFoods({ id }) {
  // dispatch({ type: DELETE_USER_CREATED });
  try {
    yield api.delete('/api/database/user-created', { data: { id } });
    yield put({ type: DELETE_USER_CREATED_SUCCESS });
    yield call(getUserCreatedFoods);
  } catch (error) {
    yield put({ type: DELETE_USER_CREATED_FAIL, error });
  }
};

const databaseSagas = function* databaseSagas() {
  yield all([
    takeLatest(DELETE_USER_CREATED, deleteUserCreatedFoods),
    takeLatest(GET_USER_CREATED, getUserCreatedFoods),
    takeLatest(SUBMIT_NEW_FOOD, submitMacronutrients),
    takeLatest(ADD_SERVING, submitServing),
    takeLatest(ADD_NAME_GROUP, submitNameGroup),
    takeLatest(SEARCH_FOOD, fetchFoods),
    takeLatest(GET_FOOD_MICRO, getFood)
  ]);
};

export default databaseSagas;
