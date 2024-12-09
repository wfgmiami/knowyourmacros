import { browserHistory } from 'react-router';
// import accountValidator from './containers/SignupForm/containers/AccountInfo/validate';
import { UPDATE_ACCOUNT_INFO, UPDATE_ACCOUNT_INFO_SUCCESS, UPDATE_ACCOUNT_INFO_FAIL } from './constants';

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
export const updateAccount = (accountInfo) => (dispatch) => {
  dispatch({ type: UPDATE_ACCOUNT_INFO });
  // const errors = accountValidator(accountInfo);
  // if (!errors.length) {
  dispatch({ type: UPDATE_ACCOUNT_INFO_SUCCESS, accountInfo });
  browserHistory.push('/signup/user-info');
  // } else {
  //   dispatch({ type: UPDATE_ACCOUNT_INFO_FAIL, errors });
  // }
};
