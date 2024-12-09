/** @module dispatch/FoodRecord */

import 'babel-polyfill';
import api from 'utils/api';
import foodRecordCache from 'utils/foodRecordCache';
import { SEARCH_FOOD, SEARCH_FOOD_SUCCESS } from 'containers/Foods/constants';
import { ADD_MEAL, DISPLAY_MODAL, /* RECEIVE_FOOD_RECORD_ITEM,  */RECEIVE_FOOD_RECORD_LIST, UPDATE_RECORD_QUANTITY, REMOVE_FOOD_RECORD_ITEM, REMOVE_FOOD_RECORD_ITEM_SUCCESS, CONFIRM_RECORD, CONFIRM_RECORD_SUCCESS, CONFIRM_RECORD_FAIL, UPDATE_FAVORITES, UPDATE_FAVORITES_SUCCESS, REMOVE_FAVORITE, REMOVE_FAVORITE_SUCCESS, RECEIVE_FOOD_RECORD_ITEMS } from './constants';

/**
 * Search for foods
 * @function fetchFoods
 * @param {string} queryString the name of the foods
 * @param {number} offset integer
 */
export const fetchFoods = (queryString, offset) => async (dispatch) => {
  dispatch({ type: SEARCH_FOOD });
  try {
    const params = {};
    if (offset) {
      params.offset = offset;
    }
    const { data } = await api.get(`/api/food/${queryString}`, { params });
    dispatch({ type: SEARCH_FOOD_SUCCESS, payload: data });
  } catch (err) {
    console.warn(err);
  }
};

/**
 * Modify a record to udate the quantity
 * @function updateQuantity
 * @param {{ id: number }} record
 * @param {number} quant
 */
export const updateQuantity = (record, quant) => async (dispatch) => {
  const { data } = await api.put(`/api/food-record/quantity/${record.id}`, quant);
  dispatch({ type: UPDATE_RECORD_QUANTITY, payload: data });
};


/**
 * Remove a food record from the database
 * @function destroyFoodRecord
 * @param {number} id - Record id (an integer)
 */
export const destroyFoodRecord = (ids, date) => async (dispatch) => {
  dispatch({ type: REMOVE_FOOD_RECORD_ITEM });
  await api.delete('/api/food-record', { data: { ids } });
  dispatch({ type: REMOVE_FOOD_RECORD_ITEM_SUCCESS, payload: ids, date });
};
/**
 * Update the record status to 'confirmed' in the database
 * @function confirmRecord
 * @param {number} id - the record id
 */
export const confirmRecord = (ids, date) => async (dispatch) => {
  dispatch({ type: CONFIRM_RECORD });
  try {
    const { data } = await api.put('/api/food-record', { ids, status: true });
    dispatch({ type: CONFIRM_RECORD_SUCCESS, payload: data, date });
  } catch (error) {
    console.warn(error);
    dispatch({ type: CONFIRM_RECORD_FAIL, error });
  }
};

/**
 * Change the meal id regarding which meal to which a record is added
 * @function changeAddMeal
 * @param {!number} mealIdx - integer between 1 and 6
 */
export const changeAddMeal = (mealIdx) => (dispatch) => {
  const meals = ['Breakfast', 'Morning Snack', 'Lunch', 'Afternoon Snack', 'Dinner', 'Evening Snack'];
  dispatch({ type: DISPLAY_MODAL });
  dispatch({ type: ADD_MEAL, payload: { id: mealIdx, name: meals[mealIdx - 1] } });
};

/**
 * Add a food record to the database
 * @function handleAddFoodRecord
 * @param {foodrecordType} record
 * @param {Date} date
 * @return {AxiosPromise}
 */
export const handleAddFoodRecord = (record, date) => (dispatch) => api.post('/api/food-record', record)
  .then(({ data }) => {
    dispatch({
      type: RECEIVE_FOOD_RECORD_ITEMS,
      foodrecord: data,
      date
    });
  });

/**
 * Mark a food as favorite
 * @param {number} abbrevId
 * @param {number} meal
 * @param {Object} favorites
 */
export const addFavorite = (abbrevId, meal, favorites) => async (dispatch) => {
  dispatch({ type: UPDATE_FAVORITES });
  try {
    const { data } = await api.post('/api/favorites/food', { abbrevId, meal });
    const favs = { ...favorites };
    if (!favs[data.recordFavorite.meal]) {
      favs[data.recordFavorite.meal] = {};
    }
    favs[data.recordFavorite.meal][data.id] = data;
    dispatch({ type: UPDATE_FAVORITES_SUCCESS, favorites: favs });
  } catch (err) {
    console.warn(err);
  }
};

/**
 * Unmark a food as favorite
 * @param {number} abbrevId
 * @param {number} meal
 * @param {Object} favorites
 */
export const removeFavorite = (abbrevId, meal, favorites) => async (dispatch) => {
  dispatch({ type: REMOVE_FAVORITE });
  await api.delete('/api/favorites/food', {
    data: {
      abbrevId,
      meal
    }
  });
  const favs = { ...favorites };
  delete favs[meal][abbrevId];
  dispatch({ type: REMOVE_FAVORITE_SUCCESS });
  dispatch({ type: UPDATE_FAVORITES });
  dispatch({ type: UPDATE_FAVORITES_SUCCESS, favorites: favs });
};

/**
 * Retrieve a food record from the database
 * @function fetchFoodRecord
 * @param {string} datestring identifies a date
 */
export const fetchFoodRecord = (datestring) => async (dispatch) => {
  if (datestring === 'Invalid Date') return;
  if (!foodRecordCache[datestring]) {
    const { data } = await api.get(`/api/food-record/${datestring}`);
    foodRecordCache[datestring] = data;
    dispatch({
      type: RECEIVE_FOOD_RECORD_LIST,
      foodrecordlist: data,
      date: datestring
    });
  } else {
    dispatch({
      type: RECEIVE_FOOD_RECORD_LIST,
      foodrecordlist: foodRecordCache[datestring]
    });
  }
};
