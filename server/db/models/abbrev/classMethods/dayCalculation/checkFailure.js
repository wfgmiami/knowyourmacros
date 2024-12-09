/**
 * 
 * @param {{ main: number, sub1: number, sub2: number }} foods
 * @param {{ weight: number, p: number, c: number, f: number }} factor
 * @param {{ prim: ('p'|'c'|'f'), sec: ('p'|'c'|'f'), min: ('p'|'c'|'f') }} macro
 * @returns {boolean}
 */
function checkFailure(foods, factor, macro) {
  const { main, sub1, sub2 } = foods;
  const { prim, sec, min } = macro;

  const check = main / (factor[prim] * (factor.weight / 100));

  return (factor[sec] * check > sub1) || (factor[min] * check > sub2);
}

module.exports = checkFailure;