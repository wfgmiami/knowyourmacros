import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import ReactHighcharts from 'react-highcharts';
import mapMicro from '../mapMicro';
import bardata from '../bardata';

/**
 * Display the charts
 * @param {Object} props
 * @param {abbrevType} props.food
 * @param {Function} props.calculatePercent
 */
const Charts = ({ food, calculatePercent }) => {
  const totalCal = ((parseFloat(food.Fat) * 9) + (parseFloat(food.Protein) * 4) + (parseFloat(food.Carbohydrates) * 4)) / 100;
  const piedata = {
    labels: ['Fat', 'Protein', 'Carbs'],
    datasets: [
      {
        data: [
          Math.round((food.Fat * 9 * 10) / totalCal) / 10,
          Math.round((food.Protein * 4 * 10) / totalCal) / 10,
          Math.round((food.Carbohydrates * 4 * 10) / totalCal) / 10
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.3)', 'rgba(54, 162, 235, 0.3)', 'rgba(255, 206, 86, 0.3)'],
        hoverBackgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: '1px'
      }
    ]
  };
  const pieOptions = {
    legend: { display: true }
  };
  return (
    <div>
      <p>
        Percent Calories:
      </p>
      <div style={{ maxWidth: '300px', margin: 'auto' }}>
        <Pie
          data={piedata}
          width={120}
          height={120}
          options={pieOptions}
        />
      </div>
      <div>
        <ReactHighcharts
          config={bardata(mapMicro
            .filter((micro) => food.abbrevMicro[micro.key])
            .map((micro) => ({
              name: micro.name,
              val: calculatePercent(micro)
            })))}
        />
      </div>
    </div>
  );
};

Charts.propTypes = {
  food: PropTypes.object,
  calculatePercent: PropTypes.func
};

export default Charts;
