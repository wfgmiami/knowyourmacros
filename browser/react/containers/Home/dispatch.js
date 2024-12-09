/** @module dispatch/Home */

import 'babel-polyfill';
import api from 'utils/api';
import debounce from 'utils/debounce';
import moment from 'moment';

import { DESTROY_MEASUREMENT, GET_CALORIES_MULTI, GET_CALORIES_MULTI_SUCCESS } from 'containers/Home/constants';

/**
 * @type {function}
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {function} dispatch
 * @return {Promise}
 */
const getCalsDb = debounce(async (startDate = new Date(), endDate, dispatch) => {
  dispatch({ type: GET_CALORIES_MULTI });
  let effEndDate = endDate;
  let effStartDate = startDate;
  if (!endDate) {
    effEndDate = moment(startDate).subtract(30, 'days');
    if (startDate > moment()) {
      effEndDate = moment(startDate).add(30, 'days');
    }
    if (startDate < moment()) {
      effEndDate = moment(startDate);
      effStartDate = moment(startDate).subtract(30, 'days');
    }
  }
  const { data } = await api.get('/api/fitbit/calories', {
    params: {
      startDate: effStartDate.format('Y-MM-DD'),
      endDate: effEndDate ? effEndDate.format('Y-MM-DD') : undefined
    }
  });
  let cals = data;
  if (typeof data === 'string') {
    console.warn('Calories data returned string');
    cals = [];
  }
  const calories = cals.reduce((memo, day) => {
    const mm = {};
    mm[day.dateTime] = parseInt(day.value, 10);
    return { ...memo, ...mm };
  }, {});
  dispatch({ type: GET_CALORIES_MULTI_SUCCESS, calories });
}, 300);

/**
 * Retrieve calories
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {AxiosPromise}
 */
export const getCalories = (startDate = new Date(), endDate) => (dispatch) => getCalsDb(startDate, endDate, dispatch);

/**
 * Remove a measurement from the database
 * @param {number} measId - Measurement id (integer)
 */
export const destroyMeasurement = (measId) => async (dispatch) => {
  await api.delete('/api/user/measurements', { data: { id: measId } });
  dispatch({ type: DESTROY_MEASUREMENT, payload: measId });
};
