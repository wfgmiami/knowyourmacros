import { all, takeLatest, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import api from 'utils/api';
import setToken from 'utils/setToken';
// import accountValidator from './containers/AccountInfo/validate';
import { UPDATE_ACCOUNT_INFO, SIGN_UP } from './constants';
import { signupFail, signupSuccess } from './actions';
/**
 * @typedef {Object} accountInfoType
 * @property {string} username
 * @property {string} password
 * @property {string} confirmPassword
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} email
 */

/**
 * @param {accountInfoType} accountInfo
 */
export const updateAccount = function* updateAccount() {
  try {
    browserHistory.push('/signup/user-info');
  } catch (err) {
    console.warn(err);
  }
};

const signup = function* signup({ formData }) {
  try {
    const { data, headers } = yield api.post('/api/user/signup', formData);
    yield put(signupSuccess(data));
    setToken(headers.token);
    api.defaults.headers.token = headers.token;
    browserHistory.push('/signup/goals');
  } catch (err) {
    yield put(signupFail(err));
  }
};

const signupSagas = function* signupSagas() {
  yield all([
    takeLatest(UPDATE_ACCOUNT_INFO, updateAccount),
    takeLatest(SIGN_UP, signup)
  ]);
};

export default signupSagas;
