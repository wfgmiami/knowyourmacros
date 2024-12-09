import { all, put, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { GET_MICRO_RECORD, GET_MICRO_RECORD_SUCCESS, GET_MICRO_RECORD_FAIL } from './constants';

/**
 * Get the food record, including micronutrients, for the date requested
 * @param {Object} date
 */
export const getMicroRecord = function* getMicroRecord({ date }) {
  // dispatch({ type: GET_MICRO_RECORD });
  try {
    const { data } = yield api.get(`/api/food-record/micro/${date.format('YYYY-MM-DD')}`);
    yield put({ type: GET_MICRO_RECORD_SUCCESS, record: data });
  } catch (error) {
    yield put({ type: GET_MICRO_RECORD_FAIL, error });
  }
};

const microReportSagas = function* microReportSagas() {
  yield all([
    takeLatest(GET_MICRO_RECORD, getMicroRecord)
  ]);
};

export default microReportSagas;
