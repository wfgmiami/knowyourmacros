/**
 * @module utils/getToken
 */

/** Get the token or throw an error if it doesn't exist */
const getToken = () => {
  const token = localStorage.getItem('token');
  return token || null;
};

export default getToken;
