/**
 * @param {Array<object>} foods - Array of food records
 */
export const getFactors = (foods) => {
  let fc = foods.reduce((memo, food) => {
    memo[food.maxMacro].push(food);
    return memo;
  }, { Protein: [], Carbohydrates: [], Fat: [] });

  const fct = { pFood: reduceFoods(fc.Protein), cFood: reduceFoods(fc.Carbohydrates), fFood: reduceFoods(fc.Fat) };

  ensureBalance('fFood', 'Fat', () => Object.assign(fct, { pFood: reduceFoods(fc.Protein), cFood: reduceFoods(fc.Carbohydrates) }));
  ensureBalance('pFood', 'Protein', () => Object.assign(fct, { cFood: reduceFoods(fc.Carbohydrates) }));
  ensureBalance('cFood', 'Carbohydrates');

  /**
   * Make sure that foods with the highest macronutrient represents that macronutrient in the calculation
   * @param {string} type - 'fFood', 'pFood', or 'cFood'
   * @param {string} macro - 'Fat', 'Protein', or 'Carbohydrates'
   * @param {function} [cb] - optional callback
   */
  function ensureBalance(type, macro, cb) {
    if (fct[type].weight === 0) {
      fct[type].foods = foods.reduce((memo, fd) => ((fd[macro] * 1 > memo[macro]) ? fd : memo), { Fat: 0 });
      fct[type].foods = [fct[type].foods];
      fct[type].weight = 100;
      fct[type].p = fct[type].foods[0].Protein * 1;
      fct[type].c = fct[type].foods[0].Carbohydrates * 1;
      fct[type].f = fct[type].foods[0][macro] * 1;
      foods = foods.slice(0).filter(fd => fd.id !== fct[type].foods[0].id); // eslint-disable-line
    }

    fc = foods.reduce((memo, food) => {
      memo[food.maxMacro].push(food);
      return memo;
    }, { Protein: [], Carbohydrates: [], Fat: [] });
    if (cb) cb();
  }
  return fct;

  /**
   * Combine foods
   * @param {Array<object>} foodArr
   */
  function reduceFoods(foodArr) {
    return foodArr.reduce((memo, food) => {
      const mm = { ...memo };
      mm.p += food.Protein * 1;
      mm.c += food.Carbohydrates * 1;
      mm.f += food.Fat * 1;
      mm.weight += 100;
      mm.foods.push(food);
      return mm;
    }, { p: 0, c: 0, f: 0, weight: 0, foods: [] });
  }
};
