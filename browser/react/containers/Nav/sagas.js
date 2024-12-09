/** @module dispatch/Nav */

import { takeLatest, all, put } from 'redux-saga/effects';
import { LOGOUT_SUCCESS, LOGOUT } from 'containers/Login/constants';


console.log(LOGOUT);

/**
 * Create the logout success action
 * @type {Function}
 */
const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

/**
 * Log the user out and remove the token
 * @type {Function}
 * */
export const logout = function* logout() {
  console.log('logout saga');
  try {
    localStorage.removeItem('token');
    yield put(logoutSuccess());
  } catch (err) {
    console.warn(err);
  }
};

const logoutSagas = function* logoutSagas() {
  yield all([
    takeLatest(LOGOUT, logout)
  ]);
};

export default logoutSagas;
