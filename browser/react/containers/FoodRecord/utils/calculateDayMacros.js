/**
 * Get the day's macronutrients in raw numbers as well as percentages
 * @function calculateDayMacros
 * @param {Array<{Calories: number, Protein: number, Carbohydrates: number, Fat: number}>} records - array of records
 */
export const calculateDayMacros = (records) => {
  /**
   * Reduce the array and return a rounded summation of the parameter
   * @param {Array<{Calories: number, Protein: number, Carbohydrates: number, Fat: number}>} arr
   * @param {string} param - The macronutrient
   * @return {number}
   */
  const reduceRound10 = (arr, param) => Math.round(arr.reduce((total, food) => total + food[param], 0) * 10) / 10;

  const confirmed = records.filter((fd) => fd.confirmed);

  const calories = Math.round(reduceRound10(confirmed, 'Calories'));
  const protein = reduceRound10(confirmed, 'Protein');
  const carbs = reduceRound10(confirmed, 'Carbohydrates');
  const fat = reduceRound10(confirmed, 'Fat');

  const totalCals = (protein * 4) + (carbs * 4) + (fat * 9);

  return {
    raw: { calories, protein, carbs, fat },
    percentCals: {
      calories: totalCals,
      protein: Math.round((protein * 4000) / totalCals) / 10,
      carbs: Math.round((carbs * 4000) / totalCals) / 10,
      fat: Math.round((fat * 9000) / totalCals) / 10
    }
  };
};

export default calculateDayMacros;
