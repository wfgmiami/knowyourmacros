import { createValidator, required, minLength } from 'utils/validation';

const rules = {
  main: [required, minLength(3)],
  sub: [required, minLength(3)],
  group: required
};

export default createValidator(rules);
