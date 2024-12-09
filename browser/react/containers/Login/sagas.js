/** @module dispatch/Login */

import { takeLatest, put, all, call } from 'redux-saga/effects';
import api from 'utils/api';
import { browserHistory } from 'react-router';
import { getCalories } from 'containers/Home/sagas';
import getToken from 'utils/getToken';
import { SET_MEAL_FAVORITES } from 'containers/FoodRecord/constants';
import { INVALID_LOGIN, LOGIN, LOGIN_SUCCESS, EXCHANGE_TOKEN_FOR_USER } from './constants';
import { loginFail, loginSuccess } from './actions';

/**
 * Dispatch the login fail action
 * @type {Function}
 */
const invalidLogin = () => (dispatch) => dispatch(loginFail());


/** Get the user from the database */
export const exchangeTokenForUser = function* exchangeTokenForUser() {
  if (!getToken()) {
    console.warn('No local storage token'); // eslint-disable-line
  } else {
    // dispatch({ type: EXCHANGE_TOKEN_FOR_USER });
    api.defaults.headers.token = getToken();
    const { data } = yield api.get(`/api/session/${getToken()}`);
    yield put(loginSuccess(data));
    if (data.fitbitToken) {
      yield call(getCalories, new Date());
    }
    const dt = yield api.get('/api/favorites/food');
    const favorites = dt.data.reduce((memo, abbrev) => {
      if (!memo[abbrev.recordFavorite.meal]) {
        memo[abbrev.recordFavorite.meal] = {}; // eslint-disable-line
      }
      memo[abbrev.recordFavorite.meal][abbrev.id] = abbrev; // eslint-disable-line
      return memo;
    }, {});
    yield put({ type: SET_MEAL_FAVORITES, favorites });
  }
};

/**
 * Log in
 * @param {object} credentials - Login credentials
 */
export const login = function* login({ credentials }) {
  try {
    const { data: { token } } = yield api.post('/api/session', credentials);
    localStorage.setItem('token', token);
    browserHistory.push('/');
    yield call(exchangeTokenForUser);
  } catch (err) {
    localStorage.removeItem('token');
    yield put(invalidLogin());
  }
};

const loginSagas = function* loginSagas() {
  yield all([
    takeLatest(LOGIN, login),
    takeLatest(EXCHANGE_TOKEN_FOR_USER, exchangeTokenForUser)
  ]);
};

export default loginSagas;
