import validator from 'validator';

/**
 * Validate account info
 * @param {accountInfoType} accountInfo
 */
const validate = (accountInfo) => {
  const { username, password, confirmPassword, firstname, lastname, email } = accountInfo;
  const errors = [];
  if (!username.length) {
    errors.push('Username is required');
  }
  if (username.length && username.length < 5) {
    errors.push('Username is too short');
  }
  if (!password.length) {
    errors.push('Password is required');
  }
  if (password.length && password.length < 5) {
    errors.push('Password is too short');
  }
  if (confirmPassword !== password) {
    errors.push('Failed to confirm the password');
  }
  if (!firstname.length) {
    errors.push('First name is required');
  }
  if (!lastname.length) {
    errors.push('Last name is required');
  }
  if (!email.length) {
    errors.push('Email is required');
  }
  if (email.length && !validator.isEmail(email)) {
    errors.push('Invalid email');
  }
  return errors;
};

export default validate;
