import { createValidator, required, minLength, email } from 'utils/validation';

const rules = {
  // username: [
  //   required,
  //   minLength(3)
  // ],
  password: [
    required,
    minLength(5),
    // match('confirmPassword', 'Passwords don\'t match')
  ],
  // confirmPassword: [
  //   required,
  //   match('password', 'Passwords don\'t match')
  // ],
  firstname: [
    required,
    minLength(3)
  ],
  lastname: [
    required,
    minLength(3)
  ],
  email: [
    required,
    email
  ]
};

export default createValidator(rules);
