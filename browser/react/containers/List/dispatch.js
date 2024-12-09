/** @module dispatch/List */

import 'babel-polyfill';
import api from 'utils/api';
import { RECEIVE_LIST_ITEMS } from 'browser/redux/constants';

/**
 * Get the shopping list
 * @param {string} date
 */
export const getList = (date) => async (dispatch) => {
  const { data } = await api.get('/api/shopping-list/list', { params: { date } });
  dispatch({
    type: RECEIVE_LIST_ITEMS,
    payload: data
  });
};
