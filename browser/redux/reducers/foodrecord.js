import 'babel-polyfill';
import api from 'utils/api';
import moment from 'moment';
import { modWeight } from 'containers/DayMealPlanner/dispatch';
// // import foodRecordCache from 'utils/foodRecordCache';

import { ADD_MEAL, DISPLAY_MODAL, HIDE_MODAL, RECEIVE_CALORIES, UPDATE_RECORD, REMOVE_FOOD_RECORD_ITEM_SUCCESS, CONFIRM_RECORD_SUCCESS, UPDATE_RECORD_QUANTITY_SUCCESS, RECEIVE_FOOD_RECORD_ITEM, RECEIVE_FOOD_RECORD_LIST, SET_MEAL_FAVORITES, UPDATE_FAVORITES_SUCCESS, RECEIVE_FOOD_RECORD_ITEMS } from 'containers/FoodRecord/constants';
import { GET_CALORIES_MULTI_SUCCESS } from 'containers/Home/constants';

/**
 * @typedef {Object} foodrecordInitialStateType
 *
 * @property {{ id: number, name: string }} addMeal
 * @property {number} calories
 * @property {boolean} displayModal
 * @property {Array} foodSearchResults
 * @property {Array} record
 */

/** @type {foodrecordInitialStateType} */
const initialState = {
  addMeal: {
    id: 1,
    name: 'Breakfast'
  },
  calories: {},
  displayModal: false,
  favorites: {},
  foodSearchResults: {
    rows: [],
    count: 0,
    query: '',
    offset: 0
  },
  record: []
};

/**
 * @param {foodrecordInitialStateType} state
 * @param {Object} action
 * @param {string} action.type
 * @param {foodrecordType} action.foodrecord
 * @param {Array<foodrecordType>} action.foodrecordlist
 */
const foodrecordReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_MEAL:
      return { ...state, addMeal: action.payload };

    case RECEIVE_CALORIES:
      return { ...state, calories: action.payload };

    case SET_MEAL_FAVORITES:
      return { ...state, favorites: action.favorites };

    case GET_CALORIES_MULTI_SUCCESS:
      return { ...state, calories: Object.assign({}, state.calories, action.calories) };

    case DISPLAY_MODAL:
      return { ...state, displayModal: true };

    case HIDE_MODAL:
      return { ...state, displayModal: false };

    case UPDATE_FAVORITES_SUCCESS:
      return { ...state, favorites: action.favorites };

    case REMOVE_FOOD_RECORD_ITEM_SUCCESS:
      // foodRecordCache.removeRecord(action.payload, action.date);
      return {
        ...state,
        record: state.record.filter((food) => !action.payload.filter((id) => food.id === id).length)
      };

    case RECEIVE_FOOD_RECORD_LIST:
      // foodRecordCache[action.date] = action.foodrecordlist.slice();
      return { ...state, record: action.foodrecordlist };

    case RECEIVE_FOOD_RECORD_ITEM:
      // foodRecordCache.addRecord(action.foodrecord);
      newState = { ...state, record: state.record.slice() };
      if (moment(new Date(action.foodrecord.Date)).format('YYYY-MM-DD') === moment(action.date).format('YYYY-MM-DD')) {
        newState.record.push(action.foodrecord);
      }
      return newState;

    case RECEIVE_FOOD_RECORD_ITEMS:
      // action.foodrecord.forEach((record) => foodRecordCache.addRecord(record));
      newState = { ...state, record: state.record.slice() };
      if (moment(new Date(action.foodrecord[0].Date)).format('YYYY-MM-DD') === moment(action.date).format('YYYY-MM-DD')) {
        newState.record = newState.record.concat(action.foodrecord);
      }
      return newState;

    case UPDATE_RECORD:
      return {
        ...state,
        record: state.record.map((food) => {
          const fd = { ...food };
          if (food.meal.id === action.payload.id) {
            fd.meal = action.payload;
          }
          return fd;
        })
      };

    case UPDATE_RECORD_QUANTITY_SUCCESS:
      // foodRecordCache.updateRecord(action.payload);
      return {
        ...state,
        record: state.record.map((food) => {
          let fd = { ...food };
          if (food.id === action.payload.id) {
            fd = action.payload;
          }
          return fd;
        })
      };

    case CONFIRM_RECORD_SUCCESS:
      newState = {
        ...state,
        record: state.record.slice().map((fd) => {
          let food = { ...fd };
          const matchFood = action.payload.filter((record) => record.id === fd.id);
          if (matchFood.length) {
            food = matchFood[0];
          }
          return food;
        })
      };
      // foodRecordCache[action.date.format('YYYY-MM-DD')] = newState.record.slice();
      return newState;

    default:
      return state;
  }
};

export default foodrecordReducer;

/** Add records to the database
 * @param {number} meal
 * @param {number} mealId
 * @param {string} date
 */
export const handleAddMeal = (meal, mealId, date) => async (dispatch) => {
  const allFoods = meal.reduce((mm, factor) => { // eslint-disable-line
    return mm.concat(factor.foods.reduce((memo, food) => memo.concat({
      abbrev_id: food.id,
      date: date.format('MMMM DD YYYY'),
      meal: mealId,
      quantity: modWeight(food, factor.weight)[0],
      unit: food.weights[0].Seq,
      confirmed: false
    }), []));
  }, []);
  const { data } = await api.post('/api/food-record', allFoods);
  dispatch({ type: RECEIVE_FOOD_RECORD_ITEMS, foodrecord: data, date });
};

  // api
  //   .post('/api/food-record', record, {
  //     params: {
  //       token: getToken()
  //     }
  //   })

/** Update the database to make a meal public
 * @param {number} mealId - Meal id (an integer)
 */
export const makeMealPublic = (mealId) => (dispatch) => api
  .put('/api/food-record/meal', { mealId })
  .then(({ data }) => dispatch({ type: UPDATE_RECORD, payload: data }));

