/**
 * Give a consistent error object
 * @constructor
 * @constructs Error
 * @param {string|number} commonType 
 * @param {string} description 
 * @param {boolean} [isOperational] 
 */
function appError(commonType, description, isOperational) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.commonType = commonType;
  this.description = description;
  this.message = description;
  this.isOperational = isOperational;
}

module.exports = appError;
