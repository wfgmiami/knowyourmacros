/** @module dispatch/BMRCalculator */

import { takeLatest, all, put, call } from 'redux-saga/effects';
import api from 'utils/api';
import { createProgram } from 'reducers/user';
import { SAVE_BMR_CALORIES, RECEIVE_MEASUREMENTS, UPDATE_WEIGHT, SAVE_MEASUREMENTS } from './constants';

/**
 * Save the user's measurements to the database, create a program for the user if there's not one already
 * @param {object} measurements
 * @param {user} user
 */
export const saveMeasurements = function* saveMeasurements({ measurements, user }) {
  const { data } = yield api.post('/api/user/measurements', measurements);
  if (!user.programs) {
    yield call(createProgram, measurements);
  } else if (!user.programs[0]) {
    yield call(createProgram, measurements);
  } else if (user.programs[0].status !== 'In Progress') {
    yield call(createProgram, measurements);
  } else {
    yield put({ type: RECEIVE_MEASUREMENTS, payload: data });
  }
};

/**
 * Modify the user's weight on the database
 * @param {object} measurements
 * @param {number} newWeight
 * @param {object} user
 * @param {string} date
 */
export const updateWeight = function* updateWeight({ measurements, newWeight, user, date }) {
  const meas = Object.assign({}, measurements);
  meas.weight = newWeight;
  delete meas.id;

  meas.createdAt = date;
  meas.updatedAt = date;

  yield call(saveMeasurements, { measurements: meas, user });
};

const BMRCalculatorSagas = function* BMRCalculatorSagas() {
  yield all([
    takeLatest(UPDATE_WEIGHT, updateWeight),
    takeLatest(SAVE_MEASUREMENTS, saveMeasurements)
  ]);
};

export default BMRCalculatorSagas;
