/** @module dispatch/Home */

import { takeLatest, put, all } from 'redux-saga/effects';
import api from 'utils/api';
import moment from 'moment';

import { DESTROY_MEASUREMENT, DESTROY_MEASUREMENT_SUCCESS, DESTROY_MEASUREMENT_FAIL, GET_CALORIES_MULTI, GET_CALORIES_MULTI_SUCCESS } from 'containers/Home/constants';

/**
 * Retrieve calories
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {AxiosPromise}
 */
export const getCalories = function* getCalories({ startDate = new Date(), endDate }) {
  // dispatch({ type: GET_CALORIES_MULTI });
  let effEndDate = moment(endDate);
  let effStartDate = moment(startDate);
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
  const { data } = yield api.get('/api/fitbit/calories', {
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
  yield put({ type: GET_CALORIES_MULTI_SUCCESS, calories });
};

/**
 * Remove a measurement from the database
 * @param {number} measId - Measurement id (integer)
 */
export const destroyMeasurement = function* destroyMeasurement({ measId }) {
  try {
    yield api.delete('/api/user/measurements', { data: { id: measId } });
    yield put({ type: DESTROY_MEASUREMENT_SUCCESS, payload: measId });
  } catch (error) {
    yield put({ type: DESTROY_MEASUREMENT_FAIL, error });
  }
};

const homeSagas = function* homeSagas() {
  yield all([
    takeLatest(GET_CALORIES_MULTI, getCalories),
    takeLatest(DESTROY_MEASUREMENT, getCalories)
  ]);
};

export default homeSagas;
