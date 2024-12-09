/**
 * Checks if any elements in an array are true.
 * This is primarily used in `shouldComponentUpdate` lifecycle methods.
 * Put comparisons most likely to be true first.
 * @param {Array<boolean>} boolArray An array of truthy or falsy
 * @returns {boolean}
 */
const anyTrue = (boolArray) => {
  for (let ix = 0; ix < boolArray.length; ix += 1) {
    if (boolArray[ix]) return true;
  }
  return false;
};

export default anyTrue;
