/**
 * Formats and returns number string (only digits)
 * @param  {String} value [Unformatted string]
 * @return {String}       [Formatted number string]
 */
export function numberMask(value) {
  if (!value) {
    return '';
  }
  return value.replace(/\D+/g, '');
}

export function commaNumberMask(value) {
  if (value !== 0 && !value) {
    return '';
  }
  const stringValue = typeof value !== 'string' ? value.toString() : value;

  return numberMask(stringValue) // removeNonDigits
    .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // add commas
}

/**
 * Formats decimal string
 * @param  {[type]} value [description]
 * @return [type]         [description]
 */
export function decimalMask(value) {
  if (!value) {
    return '';
  }

  // return value;
  const stripped = value.replace(/[^\d\\.]/g, '')
    .replace(/\./, 'x')
    .replace(/\./g, '')
    .replace(/x/, '.');


  if (stripped[0] === '.') return '0.';

  if (stripped[stripped.length - 1] === '.') return stripped;

  const string = stripped; // remove leading 0s

  if (string.lastIndexOf('.') === -1) {
    return string.replace(/\b0(\d+)/g, '$1');
  }
  const split = string.split('.');

  const cents = split[1] && split[1].substring(0, 2);

  const joined = split[0] && [split[0], cents].join('.');

  return joined;
}

/**
 * Formats and returns money string
 *  ex. $10,000
 * @param  {String} value [Unformatted string]
 * @return {String}       [Formatted money string]
 */
export function moneyMask(value) {
  if (value === 0) {
    return '$0';
  }
  if (!value) {
    return '';
  }
  const stringValue = typeof value !== 'string' ? value.toString() : value;

  const addCommas = decimalMask(stringValue) // removeNonDigits
    .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // add commas
  return `$${addCommas}`;
}

/**
 * Formats and returns phone string
 * @param  {String} value [Unformatted string]
 * @return {String}       [Formatted phone string]
 */
export function phoneMask(value) {
  if (value === '(' || !value) {
    return '';
  }
  const digits = numberMask(value);
  if (digits.length < 4) {
    return `(${digits}`;
  }
  if (digits.length < 7) {
    return `(${digits.substring(0, 3)}) ${digits.substring(3)}`;
  }
  return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6, 10)}`;
}

/**
 * Formats and returns SSN string
 * @param  {String} value [Unformatted string]
 * @return {String}       [Formatted SSN string]
 */
export function ssnMask(value) {
  if (!value) {
    return '';
  }
  const digits = numberMask(value);
  if (digits.length > 5) {
    return `${digits.substring(0, 3)}-${digits.substring(3, 5)}-${digits.substring(5, 9)}`;
  }
  if (digits.length > 3) {
    return `${digits.substring(0, 3)}-${digits.substring(3, 5)}`;
  }
  return digits;
}

/**
 * Formats and returns date string
 * @param  {String} value [Unformatted string]
 * @return {String}       [Formatted date string]
 */
export function dateMask(value) {
  if (!value) {
    return '';
  }
  const digits = numberMask(value);
  if (digits.length > 4) {
    return `${digits.substring(0, 2)}/${digits.substring(2, 4)}/${digits.substring(4, 8)}`;
  }
  if (digits.length > 2) {
    return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
  }
  return digits;
}
