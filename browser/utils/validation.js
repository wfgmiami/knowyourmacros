import moment from 'moment';

const isEmpty = (value) => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map((rule) => rule(value, data)).filter((error) => !!error)[0];

/* eslint-disable consistent-return */
export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function zipCode(zip) {
  if (!isEmpty(zip) && !/(^\d{5}$)|(^\d{5}-\d{4}$)/i.test(zip)) {
    return 'Invalid Zip Code';
  }
}

// export function height(value) {
//   if (!isEmpty(value) && !/^[3-7]/.test(cleanNumber(value.substring(0, 1)))) {
//     return 'Enter Feet between 3 and 7';
//   }
//   if (!isEmpty(value) && !/^([0-9]|1[0-1])$/.test(cleanNumber(value.substring(2, 4)))) {
//     return 'Enter Inches between 0 and 11';
//   }
// }
//
// export function weight(value) {
//   if (!isEmpty(value) && (cleanNumber(value) < 75 || cleanNumber(value) > 750)) {
//     return 'Please enter a weight between 75 and 750';
//   }
// }

export function poBox(value) {
  const pattern = /^ *(?!(#\d+)|((box|bin)[-. \/\\]?\d+)|(.*p[ \.]? ?(o|0)[-. \/\\]? *-?((box|bin)|b|(#|num)?\d+))|(p(ost)? *(o(ff(ice)?)?)? *((box|bin)|b)? *\d+)|(p *-?\/?(o)? *-?box)|post office box|((box|bin)|b) *(number|num|#)? *\d+|(num|number|#) *\d+)/i; //eslint-disable-line
  if (!isEmpty(value) && !pattern.test(value)) {
    return 'No PO Boxes';
  }
}

export function validDate(value) {
  if (!isEmpty(value) && !moment(value, 'MM/DD/YYYY', true).isValid()) {
    return 'Must be a valid date';
  }
}

export function youngerThan18(value) {
  if (!isEmpty(value) && !moment(value, 'MM/DD/YYYY', true).isBefore(moment().subtract(18, 'years'))) {
    return 'Must be 18 or older';
  }
}

export function citizenship(value) {
  if (!isEmpty(value) && value === 'N') {
    return 'Must be a citizen or resident alien';
  }
}

export function ssn(value) {
  if (!isEmpty(value) && !/^(?!219099999|078051120)(?!666|000|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4}$/.test(value.replace(/-/g, ''))) {
    return 'Not a valid Social Security Number';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength(min) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function exactLength(length, error) {
  return (value) => {
    if (!isEmpty(value) && value.length !== length) {
      return (error || `Must be ${length} characters`);
    }
  };
}

export function maxLength(max) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function maxNumber(max, error) {
  return (valueArg) => {
    let value = valueArg;
    if (typeof value === 'string') {
      value = parseInt(value, 10);
    }
    if (value > max) {
      return error || `The maximum value allowed is ${max}`;
    }
  };
}

export function minNumber(min, error) {
  return (valueArg) => {
    let value = valueArg;
    if (typeof value === 'string') {
      value = parseInt(value, 10);
    }
    if (value < min) {
      return error || `The minimum value allowed is ${min}`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

// export function oneOf(enumeration) {
//   return (value) => {
//     if (!~enumeration.indexOf(value)) {
//       return `Must be one of: ${enumeration.join(', ')}`;
//     }
//   };
// }

export function match(field, msg) {
  return (value, data) => { //eslint-disable-line
    if (data) {
      if (value !== data[field]) {
        return msg || 'Do not match';
      }
    }
  };
}

export function age(value) {
  if (value < 18) {
    return 'Must be over 18';
  }
}

export function futureYear(value) {
  if (parseInt(value, 10) > parseInt(moment().format('YYYY'), 10)) {
    return 'Not a valid year';
  }
}

export function textNumber(value) {
  if (isNaN(Number(value))) {
    return 'Not a number';
  }
}

export function password(value) {
  let errors = [];
  if (required(value)) {
    errors.push(required(value));
  }
  if (typeof value === 'undefined' || (value && value.length < 8)) {
    errors.push('Must be at least 8 characters');
  }
  if (!value || !(/.*[a-z].*/.test(value))) {
    errors.push('Must contain a lower case letter');
  }
  if (!(/.*[A-Z].*/.test(value))) {
    errors.push('Must contain a capital letter');
  }
  if (!(/.*[0-9].*/.test(value))) {
    errors.push('Must contain a number');
  }
  if (!(/.*[!@#$%^&*()].*/.test(value))) {
    errors.push('Must contain a special character !@#$%^&*()');
  }
  if (errors.length === 0) {
    errors = undefined;
  }
  return errors;
}


export function createValidator(rules) {
  return (data = {}) => {
    if (data.toJS) {
      data = data.toJS(); //eslint-disable-line
    }
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
//
// export function addressRules(addressFields, poBoxValidate) {
//   return Object.keys(addressFields).reduce((errors, name) => { //eslint-disable-line
//     const newFields = { ...errors };
//     newFields.address1 = required;
//     if (poBoxValidate) {
//       newFields.address2 = [poBox];
//     }
//     newFields.city = [required];
//     newFields.state = [required];
//     newFields.zip = [required, minLength(5), zipCode];
//     return newFields;
//   }, {});
// }
/* eslint-enable */
