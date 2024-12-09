module.exports = getMax;

/**
 * Modify factors
 * @param {string} factor
 * @param {string} macro
 */
function getMax(factor, macro, factors) {
  const retFactors = Object.assign({}, factors);
  retFactors[factor].foods = oFoods.reduce((memo, fd) => {
    if (parseFloat(fd[macro]) > memo[macro]) {
      return fd;
    }
    return memo;
  }, { Protein: 0 });
  retFactors[factor].foods = [retFactors[factor].foods];
  retFactors[factor].weight = 100;

  retFactors[factor].p = parseFloat(retFactors[factor].foods[0].Protein);
  retFactors[factor].c = parseFloat(retFactors[factor].foods[0].Carbohydrates);
  retFactors[factor].f = parseFloat(retFactors[factor].foods[0].Fat);

  return retFactors;
}