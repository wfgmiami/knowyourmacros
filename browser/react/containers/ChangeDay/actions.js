import { CHANGE_DAY, NEXT_DAY, PREVIOUS_DAY, CHANGE_DAY_SUCCESS } from './constants';

export const changeDay = (dateObj, getCals) => ({
  type: CHANGE_DAY,
  dateObj,
  getCals
});

export const changeDaySuccess = (payload) => ({
  type: CHANGE_DAY_SUCCESS,
  payload
});

export const nextDay = (currentDay, calories, getCals) => ({
  type: NEXT_DAY,
  currentDay,
  calories,
  getCals
});

export const previousDay = (currentDay, calories, getCals) => ({
  type: PREVIOUS_DAY,
  currentDay,
  calories,
  getCals
});

