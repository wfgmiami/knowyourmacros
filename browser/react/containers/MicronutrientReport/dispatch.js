import 'babel-polyfill';
import api from 'utils/api';
import { GET_MICRO_RECORD, GET_MICRO_RECORD_SUCCESS, GET_MICRO_RECORD_FAIL } from './constants';

/**
 * Get the food record, including micronutrients, for the date requested
 * @param {Object} date
 */
export const getMicroRecord = (date) => async (dispatch) => {
  dispatch({ type: GET_MICRO_RECORD });
  try {
    const { data } = await api.get(`/api/food-record/micro/${date.format('YYYY-MM-DD')}`);
    console.log(data);
    dispatch({ type: GET_MICRO_RECORD_SUCCESS, record: data });
  } catch (error) {
    console.warn(error);
    dispatch({ type: GET_MICRO_RECORD_FAIL, error });
  }
};

