import 'regenerator-runtime/runtime';
import { put, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
// import { startSubmit, stopSubmit } from 'redux-form/immutable';
import { browserHistory } from 'react-router';
import getToken from 'utils/getToken';
import { getUserFail, getUserSuccess } from './actions';
import { GET_USER, UPDATE_ACCOUNT_INFO } from './constants';


export const getUserSaga = function* getUserSaga() {
  try {
    const token = yield getToken();
    if (!token) {
      throw new Error('No local storage token');
    } else {
      api.defaults.headers.token = token;
      const { data } = yield api.get(`/api/session/${token}`);
      yield put(getUserSuccess(data));
    }
  } catch (err) {
    yield put(getUserFail(err));
  }
};

export const updateAccountInfoSaga = function* updateAccountInfoSaga({ formData }) {
  try {
    const { data } = yield api.put('/api/user', formData);
    yield put(getUserSuccess(data));
    browserHistory.push('/profile');
  } catch (err) {
    yield put(getUserFail(err));
  }
};

export const userSaga = function* userSaga() {
  yield [
    takeLatest(GET_USER, getUserSaga),
    takeLatest(UPDATE_ACCOUNT_INFO, updateAccountInfoSaga)
  ];
};

export default userSaga;
