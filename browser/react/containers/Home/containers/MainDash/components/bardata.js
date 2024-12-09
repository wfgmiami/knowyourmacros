import { MEALS } from 'browser/redux/constants';

/**
 * Get the sum of a macronutrient in a meal
 * @param {Array} records food records
 * @param {number} meal meal id
 * @param {string} macro the macronutrient to sum
 */
function macrosByMeal(records, meal, macro) {
  const mealRecords = records.filter((food) => parseInt(food.Meal, 10) * 1 === meal);
  return Math.round(mealRecords.reduce((total, food) => total + food[macro], 0) * 10) / 10;
}

/**
 * @typedef {Object} xAxisType
 *
 * @property {string} type
 * @property {{text: string}} title
 * @property {*} categories
 * @property {boolean} crosshair
 */

/**
 * @typedef {Object} yAxisType
 *
 * @property {{text: string}} title
 */

/**
 * @typedef {Object} tooltipType
 *
 * @property {string} headerFormat
 * @property {string} pointFormat
 * @property {string} footerFormat
 * @property {boolean} shared
 * @property {boolean} useHTML
 */

/**
 * @typedef {Object} seriesType
 *
 * @property {string} name
 * @property {string} color
 * @property {string} borderColor
 * @property {Array<Array<number>>} data
 */

/**
 * @param {Array<foodrecordType>} foodrecord food records
 * @return {{ chart: { type: string }, xAxis: xAxisType, yAxis: yAxisType, animation: boolean, title: string, tooltip: tooltipType, series: seriesType }}
 */
const bardata = (foodrecord) => {
  const fdrecord = foodrecord.filter((fd) => fd.confirmed);

  const getData = (macro) => [
    [0, macrosByMeal(fdrecord, 1, macro)],
    [1, macrosByMeal(fdrecord, 2, macro)],
    [2, macrosByMeal(fdrecord, 3, macro)],
    [3, macrosByMeal(fdrecord, 4, macro)],
    [4, macrosByMeal(fdrecord, 5, macro)],
    [5, macrosByMeal(fdrecord, 6, macro)]
  ];

  return {
    chart: {
      type: 'column',
    },
    animation: true,
    title: 'Macros By Meal',
    xAxis: {
      type: 'integer',
      title: {
        text: 'Meal'
      },
      categories: MEALS.map((meal) => (meal.indexOf('Snack') > -1 ? 'Snack' : meal)),
      crosshair: true
    },
    yAxis: {
      title: {
        text: 'Macros (g)'
      },
      min: 0
    },
    tooltip: {
      headerFormat: '<table>',
      pointFormat: `
      <tr style="background:{point.color}">
        <td>
          <b>{series.name}:</b>
        </td>
        <td>{point.y} g
        </td>
      </tr>`,
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    series: [{
      name: 'Fat',
      color: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255,99,132,1)',
      data: getData('Fat')
    }, {
      name: 'Protein',
      color: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      data: getData('Protein')
    }, {
      name: 'Carbs',
      color: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      data: getData('Carbohydrates')
    }]
  };
};

export default bardata;

