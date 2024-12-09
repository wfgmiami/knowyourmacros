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
 * @property {Array<number>} data
 */

/**
 * @param {Array<foodrecordType>} foodrecord food records
 * @return {{ chart: {type: string}, xAxis: xAxisType, yAxis: yAxisType, animation: boolean, title: string, tooltip: tooltipType, series: seriesType }}
 */
const bardata = (micro) => {
  const maxVal = micro.reduce((memo, mro) => (memo > mro.val ? memo : mro.val), 0);
  return {
    chart: {
      type: 'column',
    },
    legend: {
      enabled: false
    },
    animation: true,
    title: 'Micronutrients',
    xAxis: {
      type: 'string',
      title: {
        text: ''
      },
      categories: micro.map((mro) => mro.name),
      crosshair: true
    },
    yAxis: {
      title: {
        text: 'Percent (%)'
      },
      min: 0,
      max: maxVal > 100 ? maxVal : 100
    },
    tooltip: {
      headerFormat: '<div>',
      pointFormat: '{point.y}%',
      footerFormat: '</div>',
      shared: true,
      useHTML: true
    },
    series: [{
      name: 'Micro',
      color: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      data: micro.map((mro) => mro.val)
    }]
  };
};

export default bardata;

