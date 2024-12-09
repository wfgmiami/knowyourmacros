/** @module dispatch/Nav */

import { LOGOUT_SUCCESS } from 'containers/Login/constants';
/**
 * Create the logout success action
 * @type {Function}
 */
const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

/**
 * Log the user out and remove the token
 * @type {Function}
 * */
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logoutSuccess());
  return Promise.resolve();
};
