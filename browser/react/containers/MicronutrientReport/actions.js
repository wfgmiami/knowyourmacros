import { GET_MICRO_RECORD } from './constants';

/**
 * Get the food record, including micronutrients, for the date requested
 * @param {Object} date
 */
export const getMicroRecord = (date) => ({ type: GET_MICRO_RECORD, date });
