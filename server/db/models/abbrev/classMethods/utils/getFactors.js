/**
 * @module models/abbrev/classMethods/getFactors
 */

module.exports = getFactors;

/**
 * @param {Array<abbrevType>} foods array of foods
 */
function getFactors(foods) {
  console.log(foods);
  let fc = foods.reduce((memo, food) => {
    memo[food.maxMacro].push(food);
    return memo;
  }, {
    Protein: [],
    Carbohydrates: [],
    Fat: []
  });

  const fct = {
    pFood: reduceFoods(fc.Protein),
    cFood: reduceFoods(fc.Carbohydrates),
    fFood: reduceFoods(fc.Fat)
  };

  ensureBalance('fFood', 'Fat', () => Object.assign(fct, {
    pFood: reduceFoods(fc.Protein),
    cFood: reduceFoods(fc.Carbohydrates)
  }));
  ensureBalance('pFood', 'Protein', () => Object.assign(fct, {
    cFood: reduceFoods(fc.Carbohydrates)
  }));
  ensureBalance('cFood', 'Carbohydrates');

  /**
   * Manipulate the factor to describe different foods as having most appropriate highest
   * @param {string} type
   * @param {string} macro
   * @param {Funtion} [cb]
   */
  function ensureBalance(type, macro, cb) {
    if (fct[type].weight === 0) {
      fct[type].foods = foods.reduce((memo, fd) => {
        if (fd[macro] * 1 > memo[macro]) {
          return fd;
        }
        return memo;
      }, { Fat: 0 });
      fct[type].foods = [fct[type].foods];
      fct[type].weight = 100;
      fct[type].p = fct[type].foods[0].Protein * 1;
      fct[type].c = fct[type].foods[0].Carbohydrates * 1;
      fct[type].f = fct[type].foods[0][macro] * 1;
      foods = foods.slice().filter(fd => fd.id !== fct[type].foods[0].id);
    }

    fc = foods.reduce((memo, food) => {
      memo[food.maxMacro].push(food);
      return memo;
    }, {
      Protein: [],
      Carbohydrates: [],
      Fat: []
    });
    if (cb) {
      cb();
    }
  }
  return fct;

  /**
   * Combine foods
   * @param {Array<{Protein: string, Carbohydrates: string, Fat: string}>} foodArr
   */
  function reduceFoods(foodArr) {
    return foodArr.reduce((memo, food) => {
      const mm = Object.assign({}, memo);
      mm.p += food.Protein * 1;
      mm.c += food.Carbohydrates * 1;
      mm.f += food.Fat * 1;
      mm.weight += 100;
      mm.foods.push(food);
      return mm;
    }, {
      p: 0,
      c: 0,
      f: 0,
      weight: 0,
      foods: []
    });
  }
}
