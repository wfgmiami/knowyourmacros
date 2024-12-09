/** @module dispatch/List */

import { GET_LIST_ITEMS } from './constants';

/**
 * Get the shopping list
 * @param {string} date
 */
export const getList = (date) => ({ type: GET_LIST_ITEMS, date });
