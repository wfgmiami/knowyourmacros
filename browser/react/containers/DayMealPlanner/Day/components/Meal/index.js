import React from 'react';
import PropTypes from 'prop-types';
import { RowWrapper, FoodLabel, AmountLabel } from './styled';

function modWeight(food, weight) {
  return food.weights.map((wt) => `${Math.round((weight / (wt.Gr_Wgt * 1)) * (wt.Amount * 1) * 10) / 10} ${wt.Description}`);
}

const Meal = ({ meal }) => (
  <div>
    {
      meal.map((factor) => (
        factor.foods.map((food, idx) => (
          <RowWrapper key={idx}>
            <FoodLabel>
              {food.longname}
            </FoodLabel>
            <AmountLabel primary>
              {modWeight(food, (factor.weight.gr / factor.foods.length))[0]}
            </AmountLabel>
          </RowWrapper>
        ))
      ))
    }
  </div>
);

Meal.propTypes = {
  meal: PropTypes.array
};

export default Meal;
