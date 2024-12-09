const assert = require('assert');
const md5 = require('crypto-md5');

module.exports = findByPassword;

/**
 * Get the user from the password
 * @param {{ password: string }} credentials
 * @return {Promise}
 * @this user
 * @async
 */
function findByPassword(credentials) {
  assert(!!credentials, 'No credentials provided');
  assert(!!credentials.password, 'Password must be included in credentials');
  assert.notEqual(credentials.password.length, 0, 'Password password cannot be an empty string');

  const cred = Object.assign({}, credentials);
  cred.password = md5(credentials.password, 'hex');

  return this
    .scope('measurements', 'meal-goals')
    .findOne({ where: cred });
}
