/** @module dispatch/DayMealPlanner */

import 'babel-polyfill';
import api from 'utils/api';
import moment from 'moment';
import {
  RECEIVE_FOOD_RECORD_ITEMS,
  RECEIVE_FOOD_RECORD_ITEM_FAIL
} from 'containers/FoodRecord/constants';
import {
  ADD_DAY,
  FETCHING_DAY_MEAL_PLAN,
  RECALCULATE_DAY,
  REMOVE_DAY,
  DAY_ADDED
} from './constants';

/**
 * Get new foods from the database and calculate based on goals
 * @param {number} index - (integer)
 * @param {string} type - Should be 'train' or 'rest'
 */
export const recalculateDay = (index, type, uuid) => async (dispatch) => {
  dispatch({ type: FETCHING_DAY_MEAL_PLAN, payload: true });
  try {
    const { data } = await api.post('/api/calculate/day', { type, uuid });
    dispatch({
      type: RECALCULATE_DAY,
      payload:
    { index, day: data }
    });
  } catch (err) {
    console.warn(err);
  }
};

/**
 * Remove a day
 * @param {number} index - (integer)
 */
export const removeDay = (index) => (dispatch) => dispatch({ type: REMOVE_DAY, payload: index });

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
export const handleAddDay = (dayMeals, date, uuid) => async (dispatch) => {
  try {
    console.log(uuid);
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
    const { data } = await api.post('/api/food-record', allFoods);
    dispatch({ type: RECEIVE_FOOD_RECORD_ITEMS, foodrecord: data, date });
    dispatch({
      type: DAY_ADDED,
      uuid
    });
  } catch (error) {
    dispatch({
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
export const addDay = (type) => async (dispatch) => {
  dispatch({ type: FETCHING_DAY_MEAL_PLAN, payload: true });
  const { data } = await api.post('/api/calculate/day', { type });
  const payload = { ...data };
  console.log('payload ->', FETCHING_DAY_MEAL_PLAN, payload);
  if (typeof payload.date === 'string') {
    payload.date = new Date(payload.date);
  }
  dispatch({ type: ADD_DAY, payload: data });
};
