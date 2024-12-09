/**
 * Reformat data for the line chart
 * @param {Array} measurements
 * @param {Array<programType>} programs
 */
const linedata = (measurements = [], programs) => {
  let data = measurements.map((inst) => {
    const dt = new Date(inst.createdAt);
    return [
      Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()),
      parseFloat(inst.weight)
    ];
  });

  if (!programs[0]) {
    return null;
  }
  const program = programs[0];
  const dt = new Date();

  const startDate = new Date(program.startDate);
  const endDate = new Date(program.endDate);

  data.splice(0, 0, [
    Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
    parseFloat(program.startWeight)
  ]);
  data.push([
    Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
    parseFloat(program.endGoal)
  ]);

  data = data.sort((aa, bb) => {
    let ret = 0;
    if (aa[0] > bb[0]) {
      ret = 1;
    }
    if (aa[0] < bb[0]) {
      ret = -1;
    }
    return ret;
  });

  return {
    chart: {
      type: 'spline'
    },
    title: '',
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: 'Weight (lbs)'
      },
      min: parseFloat(program.endGoal) - 5
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '{point.x:%e %b}: {point.y:.1f} lbs'
    },

    plotOptions: {
      spline: {
        marker: {
          enabled: true
        }
      }
    },
    series: [
      {
        name: 'Weight (lbs)',
        showInLegend: false,
        data
      }, {
        name: 'Current Date',
        showInLegend: true,
        data: [
          [
            Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()),
            parseFloat(program.startWeight) + 5
          ],
          [
            Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()),
            parseFloat(program.endGoal) - 5
          ]
        ]
      }
    ]
  };
};

export default linedata;
