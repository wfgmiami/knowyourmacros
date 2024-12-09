/** @module dispatch/List */

import { put, takeLatest, all } from 'redux-saga/effects';
import api from 'utils/api';
import { RECEIVE_LIST_ITEMS } from 'browser/redux/constants';
import { GET_LIST_ITEMS } from './constants';

/**
 * Get the shopping list
 * @param {string} date
 */
export const getList = function* getList({ date }) {
  const { data } = yield api.get('/api/shopping-list/list', { params: { date } });
  yield put({
    type: RECEIVE_LIST_ITEMS,
    payload: data
  });
};

const listSagas = function* listSagas() {
  yield all([
    takeLatest(GET_LIST_ITEMS, getList)
  ]);
};

export default listSagas;
