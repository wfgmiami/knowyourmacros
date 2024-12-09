/** @module dispatch/Login */

import 'babel-polyfill';
import api from 'utils/api';
import { browserHistory } from 'react-router';
import { getCalories } from 'containers/Home/actions';
import getToken from 'utils/getToken';
import { SET_MEAL_FAVORITES } from 'containers/FoodRecord/constants';
import { INVALID_LOGIN, LOGIN, LOGIN_SUCCESS, EXCHANGE_TOKEN_FOR_USER } from './constants';
/**
 * Create the login fail action
 * @type {Function}
 */
const loginFail = () => ({ type: INVALID_LOGIN });

/**
 * Dispatch the login fail action
 * @type {Function}
 */
const invalidLogin = () => (dispatch) => dispatch(loginFail());

/**
 * Create the login success action
 * @type {Function}
 */
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, user });


/** Get the user from the database */
export const exchangeTokenForUser = () => async (dispatch) => {
  dispatch({ type: LOGIN });
  if (!getToken()) {
    console.warn('No local storage token'); // eslint-disable-line
  } else {
    dispatch({ type: EXCHANGE_TOKEN_FOR_USER });
    api.defaults.headers.token = getToken();
    const { data } = await api.get(`/api/session/${getToken()}`);
    dispatch(loginSuccess(data));
    if (data.fitbitToken) {
      dispatch(getCalories(new Date()));
    }
    const dt = await api.get('/api/favorites/food');
    const favorites = dt.data.reduce((memo, abbrev) => {
      if (!memo[abbrev.recordFavorite.meal]) {
        memo[abbrev.recordFavorite.meal] = {}; // eslint-disable-line
      }
      memo[abbrev.recordFavorite.meal][abbrev.id] = abbrev; // eslint-disable-line
      return memo;
    }, {});
    dispatch({ type: SET_MEAL_FAVORITES, favorites });
  }
};

/**
 * Log in
 * @param {object} credentials - Login credentials
 */
export const login = (credentials) => async (dispatch) => {
  try {
    const { data: { token } } = await api.post('/api/session', credentials);
    localStorage.setItem('token', token);
    browserHistory.push('/');
    dispatch(exchangeTokenForUser());
  } catch (err) {
    localStorage.removeItem('token');
    dispatch(invalidLogin());
  }
};
