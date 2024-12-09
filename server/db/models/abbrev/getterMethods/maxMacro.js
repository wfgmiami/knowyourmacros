module.exports = maxMacro;

/**
 * Find out the maximum macronutrient
 * @this abbrev
 * @return {string}
 */
function maxMacro() {
  let arr = [
    {
      macro: 'Protein',
      value: this.Protein * 1
    }, {
      macro: 'Carbohydrates',
      value: this.Carbohydrates * 1
    }, {
      macro: 'Fat',
      value: this.Fat * 1
    }
  ];

  arr = arr.sort((a, b) => {
    if (a.value > b.value) {
      return -1;
    }
    if (a.value < b.value) {
      return 1;
    }
    return 0;
  });

  return arr[0].macro;
}
