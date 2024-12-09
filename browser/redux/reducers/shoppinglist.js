import {
  ADD_DAY_SUCCESS,
  FETCHING_DAY_MEAL_PLAN,
  REMOVE_DAY,
  RECALCULATE_DAY_SUCCESS,
  RECEIVE_LIST_ITEMS,
  DAY_ADDED
} from 'containers/DayMealPlanner/constants';

/**
 * @typedef {Object} shoppinglistInitialStateType
 *
 * @property {Array} shoppinglist
 * @property {boolean} fetchingData
 * @property {Array} list
 */

/** @type {shoppinglistInitialStateType} */
const initialState = {
  shoppinglist: [],
  fetchingData: false,
  list: []
};

/**
 * Holds data for the shoppinglist
 * @param {shoppinglistInitialStateType} state
 * @param {{ type: string }} action
 */
const shoppinglistReducer = (state = initialState, action) => {
  const nstate = Object.assign({}, state);

  switch (action.type) {
    case ADD_DAY_SUCCESS:
      nstate.shoppinglist = state.shoppinglist.slice();
      nstate.shoppinglist.push(action.payload);
      return nstate;

    case DAY_ADDED:
      nstate.shoppinglist = state.shoppinglist.slice();
      nstate.shoppinglist = nstate.shoppinglist.map((day) => {
        if (day.uuid === action.uuid) {
          day.isConfirmed = true; // eslint-disable-line
        }
        return day;
      });
      return nstate;

    case FETCHING_DAY_MEAL_PLAN:
      return state;

    case REMOVE_DAY:
      nstate.shoppinglist = state.shoppinglist.slice();
      nstate.shoppinglist.splice(action.payload, 1);
      return nstate;

    case RECALCULATE_DAY_SUCCESS:
      console.log(action);
      nstate.shoppinglist = state.shoppinglist.slice();
      nstate.shoppinglist[action.index] = action.day;
      return nstate;

    case RECEIVE_LIST_ITEMS:
      nstate.list = action.payload;
      return nstate;

    default:
      return state;
  }
};

export default shoppinglistReducer;
