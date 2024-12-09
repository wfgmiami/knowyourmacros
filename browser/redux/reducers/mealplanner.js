import { CALCULATE_MEAL_ERROR, CALCULATE_MEAL_SUCCESS, LOAD_SEARCHED_FOODS_SUCCESS, REMOVE_FOOD, RETAIN_FOOD, ADD_TO_SEARCH_LIST } from 'containers/MealPlanner/constants';

/**
 * @typedef {Object} mealplannerInitialStateType
 *
 * @property {Array} searchedFoods
 * @property {Array} retainedFoods
 * @property {Array} meal
 * @property {string} lastSearch
 * @property {boolean} error
 */

/** @type {mealplannerInitialStateType} */
const initialState = {
  searchedFoods: {
    rows: []
  },
  retainedFoods: [],
  meal: [],
  lastSearch: '',
  error: false
};

/**
 * @param {mealplannerInitialStateType} state
 * @param {*} action
 */
const mealplannerReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SEARCHED_FOODS_SUCCESS:
      return { ...state, searchedFoods: action.payload, lastSearch: action.lastSearch };

    case RETAIN_FOOD:
      newState = { ...state, retainedFoods: state.retainedFoods.slice() };
      newState.searchedFoods.rows = state.searchedFoods.rows.filter((fd) => fd.id !== action.payload.id);
      newState.retainedFoods.push(action.payload);
      return newState;

    case REMOVE_FOOD:
      newState = { ...state, retainedFoods: state.retainedFoods.slice() };
      newState.retainedFoods = state.retainedFoods.filter((fd) => fd.id !== action.payload);
      return newState;

    case ADD_TO_SEARCH_LIST:
      newState = { ...state };
      newState.searchedFoods.rows = state.searchedFoods.rows.slice();
      newState.searchedFoods.rows.splice(0, 0, action.payload);
      return newState;

    case CALCULATE_MEAL_SUCCESS:
      newState = Object.assign({}, state, action.payload);
      if (newState.error) delete newState.error;
      return newState;

    case CALCULATE_MEAL_ERROR:
      return { ...state, error: action.payload, meal: [] };

    default:
      return state;
  }
};

export default mealplannerReducer;
