import { INVALID_LOGIN, LOGIN_SUCCESS, LOGIN, LOGOUT, EXCHANGE_TOKEN_FOR_USER } from './constants';

export const login = (credentials) => ({ type: LOGIN, credentials });
export const logout = () => ({ type: LOGOUT });
export const loginFail = () => ({ type: INVALID_LOGIN });
export const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, user });
export const exchangeTokenForUser = () => ({ type: EXCHANGE_TOKEN_FOR_USER });
