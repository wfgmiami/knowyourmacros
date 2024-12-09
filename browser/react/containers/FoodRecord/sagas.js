/** @module dispatch/FoodRecord */
import 'regenerator-runtime/runtime';
import { startSubmit, stopSubmit } from 'redux-form';
import { takeLatest, put, all } from 'redux-saga/effects';
import api from 'utils/api';
import foodRecordCache from 'utils/foodRecordCache';
import { searchFoodSuccess } from 'containers/Foods/actions';
import { SEARCH_FOOD } from 'containers/Foods/constants';
import { ADD_MEAL, DISPLAY_MODAL, /* RECEIVE_FOOD_RECORD_ITEM */ RECEIVE_FOOD_RECORD_LIST, UPDATE_RECORD_QUANTITY, UPDATE_RECORD_QUANTITY_SUCCESS, REMOVE_FOOD_RECORD_ITEM, REMOVE_FOOD_RECORD_ITEM_SUCCESS, CONFIRM_RECORD, CONFIRM_RECORD_SUCCESS, CONFIRM_RECORD_FAIL, UPDATE_FAVORITES, UPDATE_FAVORITES_SUCCESS, REMOVE_FAVORITE, REMOVE_FAVORITE_SUCCESS, RECEIVE_FOOD_RECORD_ITEMS, CHANGE_ADD_MEAL, ADD_FOOD_RECORD, FETCH_FOOD_RECORD, ADD_FAVORITE } from './constants';

/**
 * Search for foods
 * @param {string} queryString the name of the foods
 * @param {number} offset integer
 */
export const fetchFoods = function* fetchFoods({ queryString, offset, formId }) {
  if (formId) yield put(startSubmit(formId));
  try {
    const params = {};
    if (offset) {
      params.offset = offset;
    }
    const { data } = yield api.get(`/api/food/${queryString}`, { params });
    yield put(searchFoodSuccess(data));
  } catch (err) {
    console.warn(err);
  }
  if (formId) yield put(stopSubmit(formId));
};

/**
 * Modify a record to udate the quantity
 * @function updateQuantity
 * @param {{ id: number }} record
 * @param {number} quant
 */
export const updateQuantity = function* updateQuantity({ record, quant }) {
  const { data } = yield api.put(`/api/food-record/quantity/${record.id}`, quant);
  yield put({ type: UPDATE_RECORD_QUANTITY_SUCCESS, payload: data });
};

/**
 * Remove a food record from the database
 * @function destroyFoodRecord
 * @param {number} id - Record id (an integer)
 */
export const destroyFoodRecord = function* destroyFoodRecord({ ids, date }) {
  yield api.delete('/api/food-record', { data: { ids } });
  yield put({ type: REMOVE_FOOD_RECORD_ITEM_SUCCESS, payload: ids, date });
};
/**
 * Update the record status to 'confirmed' in the database
 * @function confirmRecord
 * @param {number} id - the record id
 */
export const confirmRecord = function* confirmRecord({ ids, date }) {
  try {
    const { data } = yield api.put('/api/food-record', { ids, status: true });
    yield put({ type: CONFIRM_RECORD_SUCCESS, payload: data, date });
  } catch (error) {
    yield put({ type: CONFIRM_RECORD_FAIL, error });
  }
};

/**
 * Change the meal id regarding which meal to which a record is added
 * @function changeAddMeal
 * @param {!number} mealIdx - integer between 1 and 6
 */
export const changeAddMeal = function* changeAddMeal({ mealIdx }) {
  try {
    const meals = ['Breakfast', 'Morning Snack', 'Lunch', 'Afternoon Snack', 'Dinner', 'Evening Snack'];
    yield put({ type: DISPLAY_MODAL });
    yield put({ type: ADD_MEAL, payload: { id: mealIdx, name: meals[mealIdx - 1] } });
  } catch (err) {
    console.warn(err);
  }
};

/**
 * Add a food record to the database
 * @function handleAddFoodRecord
 * @param {foodrecordType} record
 * @param {Date} date
 * @return {AxiosPromise}
 */
export const handleAddFoodRecord = function* handleAddFoodRecord({ record, date, formId }) {
  if (formId) yield put(startSubmit(formId));
  const { data } = yield api.post('/api/food-record', record);
  yield put({
    type: RECEIVE_FOOD_RECORD_ITEMS,
    foodrecord: data,
    date
  });
  if (formId) yield put(stopSubmit(formId));
};

/**
 * Mark a food as favorite
 * @param {number} abbrevId
 * @param {number} meal
 * @param {Object} favorites
 */
export const addFavorite = function* addFavorite({ abbrevId, meal, favorites }) {
  // yield put({ type: UPDATE_FAVORITES });
  try {
    const { data } = yield api.post('/api/favorites/food', { abbrevId, meal });
    const favs = { ...favorites };
    if (!favs[data.recordFavorite.meal]) {
      favs[data.recordFavorite.meal] = {};
    }
    favs[data.recordFavorite.meal][data.id] = data;
    yield put({ type: UPDATE_FAVORITES_SUCCESS, favorites: favs });
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
export const removeFavorite = function* removeFavorite({ abbrevId, meal, favorites }) {
  yield api.delete('/api/favorites/food', {
    data: {
      abbrevId,
      meal
    }
  });
  const favs = { ...favorites };
  delete favs[meal][abbrevId];
  yield put({ type: REMOVE_FAVORITE_SUCCESS });
  yield put({ type: UPDATE_FAVORITES });
  yield put({ type: UPDATE_FAVORITES_SUCCESS, favorites: favs });
};

/**
 * Retrieve a food record from the database
 * @function fetchFoodRecord
 * @param {string} datestring identifies a date
 */
export const fetchFoodRecord = function* fetchFoodRecord({ datestring, token }) {
  if (datestring === 'Invalid Date') return;
  if (!foodRecordCache[datestring]) {
    if (token) api.defaults.headers.token = token;
    const { data } = yield api.get(`/api/food-record/${datestring}`);
    foodRecordCache[datestring] = data;
    yield put({
      type: RECEIVE_FOOD_RECORD_LIST,
      foodrecordlist: data,
      date: datestring
    });
  } else {
    yield put({
      type: RECEIVE_FOOD_RECORD_LIST,
      foodrecordlist: foodRecordCache[datestring]
    });
  }
};

export default function* foodRecordSaga() {
  yield all([
    takeLatest(SEARCH_FOOD, fetchFoods),
    takeLatest(CHANGE_ADD_MEAL, changeAddMeal),
    takeLatest(ADD_FOOD_RECORD, handleAddFoodRecord),
    takeLatest(REMOVE_FOOD_RECORD_ITEM, destroyFoodRecord),
    takeLatest(FETCH_FOOD_RECORD, fetchFoodRecord),
    takeLatest(ADD_FAVORITE, addFavorite),
    takeLatest(REMOVE_FAVORITE, removeFavorite),
    takeLatest(CONFIRM_RECORD, confirmRecord),
    takeLatest(UPDATE_RECORD_QUANTITY, updateQuantity)
  ]);
}
