import { UPDATE_ACCOUNT_INFO, SIGN_UP, SIGN_UP_FAIL, SIGN_UP_SUCCESS } from './constants';

export const updateAccount = (accountInfo) => ({
  type: UPDATE_ACCOUNT_INFO,
  accountInfo
});

export const signup = (formData) => ({
  type: SIGN_UP,
  formData
});

export const signupFail = (error) => ({
  type: SIGN_UP_FAIL,
  error
});

export const signupSuccess = (user) => ({
  type: SIGN_UP_SUCCESS,
  user
});
