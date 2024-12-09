import { UPDATE_WEIGHT, SAVE_MEASUREMENTS, SAVE_BMR_CALORIES } from './constants';

export const updateWeight = (measurements, newWeight, user, date) => ({
  type: UPDATE_WEIGHT,
  measurements,
  newWeight,
  user,
  date
});

export const saveMeasurements = ({ measurements, user }) => ({
  type: SAVE_MEASUREMENTS,
  measurements,
  user
});

export const bmrCalories = (calories) => ({
  type: SAVE_BMR_CALORIES,
  payload: calories
});
