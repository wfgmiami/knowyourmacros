import {
  GET_USER,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  UPDATE_ACCOUNT_INFO
} from './constants';

export const getUser = () => ({
  type: GET_USER
});

export const updateAccountInfo = (formData) => ({
  type: UPDATE_ACCOUNT_INFO,
  formData
});

export const getUserFail = (error) => ({
  type: GET_USER_FAIL,
  error
});

export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  user
});
