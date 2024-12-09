import { SEARCH_FOOD, SEARCH_FOOD_SUCCESS, ADD_MEAL, CHANGE_ADD_MEAL, ADD_FOOD_RECORD, REMOVE_FOOD_RECORD_ITEM, FETCH_FOOD_RECORD, ADD_FAVORITE, REMOVE_FAVORITE, CONFIRM_RECORD, UPDATE_RECORD_QUANTITY } from './constants';

export const searchFoods = (queryString, offset, formId) => ({
  type: SEARCH_FOOD,
  queryString,
  offset,
  formId
});

export const updateQuantity = (record, quant) => ({
  type: UPDATE_RECORD_QUANTITY,
  record,
  quant
});

export const confirmRecord = (ids, date) => ({
  type: CONFIRM_RECORD,
  ids,
  date
});

export const searchFoodSuccess = (payload) => ({
  type: SEARCH_FOOD_SUCCESS,
  payload
});

export const addMeal = (payload) => ({
  type: ADD_MEAL,
  payload
});

export const changeAddMeal = (mealIdx) => ({
  type: CHANGE_ADD_MEAL,
  mealIdx
});

export const addFavorite = (abbrevId, meal, favorites) => ({
  type: ADD_FAVORITE,
  abbrevId,
  meal,
  favorites
});

export const removeFavorite = (abbrevId, meal, favorites) => ({
  type: REMOVE_FAVORITE,
  abbrevId,
  meal,
  favorites
});

export const addFoodRecord = (record, date, formId) => ({
  type: ADD_FOOD_RECORD,
  record,
  date,
  formId
});

export const removeFoodRecordItem = (ids, date) => ({
  type: REMOVE_FOOD_RECORD_ITEM,
  ids,
  date
});

export const fetchFoodRecord = (datestring, token) => ({
  type: FETCH_FOOD_RECORD,
  datestring,
  token
});
