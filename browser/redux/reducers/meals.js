import { RECEIVE_MEALS } from 'containers/PublicMeals/constants';

/**
 * @typedef {Object} mealsInitialStateType
 * @property {Array} meals
 */

/** @type {mealsInitialStateType} */
const initialState = {
  meals: []
};

/**
 * @param {mealsInitialStateType} state
 * @param {{ type: string }} action
 */
const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MEALS:
      return { ...state, meals: action.payload };

    default:
      break;
  }
  return state;
};

export default mealsReducer;
