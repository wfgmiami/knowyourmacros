/** @module dispatch/BMRCalculator */

import 'babel-polyfill';
import api from 'utils/api';
import { createProgram } from 'reducers/user';
import { SAVE_BMR_CALORIES, RECEIVE_MEASUREMENTS } from './constants';

/**
 * Save the user's measurements to the database, create a program for the user if there's not one already
 * @param {object} measurements
 * @param {user} user
 */
export const saveMeasurements = (measurements, user) => async (dispatch) => {
  const { data } = await api.post('/api/user/measurements', measurements);
  if (!user.programs) {
    dispatch(createProgram(measurements));
  } else if (!user.programs[0]) {
    dispatch(createProgram(measurements));
  } else if (user.programs[0].status !== 'In Progress') {
    dispatch(createProgram(measurements));
  } else {
    dispatch({ type: RECEIVE_MEASUREMENTS, payload: data });
  }
};

/**
 * Dispatch an event to save the BMR calories of the user
 * @param {number} calories The BMR calories of the user
 */
export const bmrCalories = (calories) => (dispatch) => dispatch({ type: SAVE_BMR_CALORIES, payload: calories });

/**
 * Modify the user's weight on the database
 * @param {object} _measurements
 * @param {number} newWeight
 * @param {object} user
 * @param {string} date
 */
export const updateWeight = (_measurements, newWeight, user, date) => (dispatch) => {
  const measurements = Object.assign({}, _measurements);
  measurements.weight = newWeight;
  delete measurements.id;

  measurements.createdAt = date;
  measurements.updatedAt = date;

  return dispatch(saveMeasurements(measurements, user));
};
