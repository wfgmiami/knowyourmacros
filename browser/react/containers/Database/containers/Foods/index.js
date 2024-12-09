import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ListGroup from 'components/ListGroup';
import { Percent } from './styled';

export function Foods({ foods }) {
  return (
    <ListGroup>
      {foods.rows.map((food) => (
        <div key={food.id}>
          <Link to={`/database/view/${food.id}`}><strong>{food.Main}</strong> {food.Sub}</Link>
          <p>
            <Percent>Protein: {Math.round((parseFloat(food.Protein) * 4000) / parseFloat(food.Calories)) / 10}%</Percent>
            <Percent>Carbs: {Math.round((parseFloat(food.Carbohydrates) * 4000) / parseFloat(food.Calories)) / 10}%</Percent>
            <Percent>Fat: {Math.round((parseFloat(food.Fat) * 9000) / parseFloat(food.Calories)) / 10}%</Percent>
          </p>
        </div>
      ))
      }
    </ListGroup>
  );
}

Foods.propTypes = {
  foods: PropTypes.object
};

const mapStateToProps = ({ foods }) => ({
  foods
});

export default connect(mapStateToProps)(Foods);
