/** @module dispatch/DayMealPlanner */

import { all, takeLatest, put, takeEvery } from 'redux-saga/effects';
import api from 'utils/api';
import moment from 'moment';
import {
  RECEIVE_FOOD_RECORD_ITEMS,
  RECEIVE_FOOD_RECORD_ITEM_FAIL
} from 'containers/FoodRecord/constants';
import {
  ADD_DAY,
  ADD_DAY_SUCCESS,
  FETCHING_DAY_MEAL_PLAN,
  HANDLE_ADD_DAY,
  RECALCULATE_DAY,
  RECALCULATE_DAY_SUCCESS,
  REMOVE_DAY,
  DAY_ADDED
} from './constants';

/**
 * Get new foods from the database and calculate based on goals
 * @param {number} index - (integer)
 * @param {string} type - Should be 'train' or 'rest'
 */
export const recalculateDay = function* recalculateDay({ index, mealType, uuid }) {
  yield put({ type: FETCHING_DAY_MEAL_PLAN, payload: true });
  try {
    const { data } = yield api.post('/api/calculate/day', { type: mealType, uuid });
    yield put({
      type: RECALCULATE_DAY_SUCCESS,
      index,
      day: data
    });
  } catch (err) {
    console.warn(err);
  }
};

/**
 * Remove a day
 * @param {number} index - (integer)
 */
export const removeDay = function* removeDay(index) {
  yield put({ type: REMOVE_DAY, payload: index });
};

/** Take the weight from food records and round them to 1/10
 * @param {{ weights: {gr: number, Gr_Wgt: number, Amount: number}}} food
 * @param {{gr: number}} weight
 */
export const modWeight = (food, weight) => food
  .weights
  .map((wt) => Math.round((weight.gr / (wt.Gr_Wgt * 1)) * (wt.Amount * 1) * 10) / 10);

/** Add all food records for the day to the database
 * @param {Array<Array<{foods: Array<{weight: number, weights:Array<{Seq: number}>, id: number}>}>>} dayMeals
 * @param {Date|string} date - Instance of Date, or a string
 */
export const handleAddDay = function* handleAddDay({ dayMeals, date, uuid }) {
  try {
    const allFoods = dayMeals.reduce((dayMemo, meal, ix) => { // eslint-disable-line
      return !meal ? dayMemo : dayMemo.concat(meal.reduce((mm, factor) => { // eslint-disable-line
        return mm.concat(factor.foods.reduce((memo, food) => memo.concat({
          abbrev_id: food.id,
          date: moment(date).format('YYYY-MM-DD'),
          meal: ix + 1,
          quantity: modWeight(food, factor.weight)[0],
          unit: food.weights[0].Seq,
          confirmed: false
        }), []));
      }, []));
    }, []);
    // console.log(allFoods);
    const { data } = yield api.post('/api/food-record', allFoods);
    yield put({ type: RECEIVE_FOOD_RECORD_ITEMS, foodrecord: data, date });
    yield put({
      type: DAY_ADDED,
      uuid
    });
  } catch (error) {
    yield put({
      type: RECEIVE_FOOD_RECORD_ITEM_FAIL,
      error,
      uuid
    });
  }
};

/**
 * Add a day to the shopping list, with calculations complete
 * @param {string} type Should be `train` or `rest`
 */
export const addDay = function* addDay({ mealType }) {
  yield put({ type: FETCHING_DAY_MEAL_PLAN, payload: true });
  const { data } = yield api.post('/api/calculate/day', { type: mealType });
  const payload = { ...data };
  if (typeof payload.date === 'string') {
    payload.date = new Date(payload.date);
  }
  yield put({ type: ADD_DAY_SUCCESS, payload: data });
};

const dayMealPlannerSagas = function* dayMealPlannerSagas() {
  yield all([
    takeEvery(ADD_DAY, addDay),
    takeLatest(HANDLE_ADD_DAY, handleAddDay),
    takeLatest(RECALCULATE_DAY, recalculateDay)
  ]);
};

export default dayMealPlannerSagas;
