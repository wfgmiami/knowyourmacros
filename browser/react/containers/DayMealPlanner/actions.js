import {
  ADD_DAY,
  RECALCULATE_DAY,
  REMOVE_DAY
} from './constants';

/**
 * Get new foods from the database and calculate based on goals
 * @param {number} index (integer)
 * @param {string} mealType Should be 'train' or 'rest'
 */
export const recalculateDay = (index, mealType, uuid) => ({ type: RECALCULATE_DAY, index, mealType, uuid });

/**
 * @param {number} index - (integer)
 */
export const removeDay = (index) => ({ type: REMOVE_DAY, payload: index });

/** Add all food records for the day to the database
 * @param {Array<Array<{foods: Array<{weight: number, weights:Array<{Seq: number}>, id: number}>}>>} dayMeals
 * @param {Date|string} date - Instance of Date, or a string
 */
export const handleAddDay = (dayMeals, date, uuid) => ({ type: ADD_DAY, dayMeals, date, uuid });

/**
 * Add a day to the shopping list, with calculations complete
 * @param {string} type Should be `train` or `rest`
 */
export const addDay = (mealType) => ({ type: ADD_DAY, mealType });
