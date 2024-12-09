import { GET_CALORIES_MULTI, DESTROY_MEASUREMENT } from 'containers/Home/constants';

export const getCalories = (startDate, endDate) => ({
  type: GET_CALORIES_MULTI,
  startDate,
  endDate
});

export const destroyMeasurement = (measId) => ({
  type: DESTROY_MEASUREMENT,
  measId
});
