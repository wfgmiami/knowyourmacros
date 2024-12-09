
const pieData = (calories) => ({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    height: 120,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  title: {
    text: ''
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: false
      },
      colors: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)'
      ]
    }
  },
  series: [
    {
      name: 'Calories',
      colorByPoint: true,
      data: [
        {
          name: 'Fat',
          y: calories.fat
        }, {
          name: 'Protein',
          y: calories.protein
        }, {
          name: 'Carbs',
          y: calories.carbs
        }
      ]
    }
  ]
});

export default pieData;
