import { GET_MICRO_RECORD, GET_MICRO_RECORD_SUCCESS, GET_MICRO_RECORD_FAIL } from 'containers/MicronutrientReport/constants';


/**
 * @typedef {Object} microReportInitialStateType
 * @property {Array} record
 */

/** @type {microReportInitialStateType} */
const initialState = {
  record: []
};

/**
 * @param {mealsInitialStateType} state
 * @param {Object} action
 * @param {string} action.type
 * @param {Object} action.error
 * @param {Array} action.record
 */
const microReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MICRO_RECORD:
      return state;

    case GET_MICRO_RECORD_SUCCESS:
      console.log(action);
      return { ...state, record: [...action.record] };

    case GET_MICRO_RECORD_FAIL:
      return { ...state, error: action.error };

    default:
      break;
  }
  return state;
};

export default microReportReducer;
