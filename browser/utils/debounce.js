/**
 * Delay function execution by a specified amount of time
 * @param {function} fn function to debounce
 * @param {number} time milliseconds
 */
const debounce = (fn, time) => {
  let timer;

  return (...rest) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(fn, rest), time);
  };
};

export default debounce;
