/**
 * @module utils/getToken
 */

/** Get the token or throw an error if it doesn't exist */
const setToken = (val) => {
  localStorage.setItem('token', val);
  return true;
};

export default setToken;
