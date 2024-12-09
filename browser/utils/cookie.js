/**
 * Get a cookie by name
 * @param {string} name name of the cookie to get
 * @return {string|null}
 */
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
};
