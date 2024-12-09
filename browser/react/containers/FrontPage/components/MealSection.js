import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FlexWrapper from 'components/FlexWrapper';

const Row = styled(FlexWrapper)``;
const Col = styled.div``;

/**
 * Meals section
 * @param {Object} props
 * @param {Array} props.meal
 * @param {string} props.error
 */
const MealSection = ({ meal, error }) => {
  if (error) {
    return (
      <div className="alert alert-danger">
        <strong>{error}</strong>
      </div>
    );
  }

  if (!meal.length) return null;
  function sumMacro(macroToSum) {
    return Math.round(10 * meal.reduce((macro, food) => macro + food.macros[macroToSum], 0)) / 10;
  }

  function modWeight(food, weight) {
    return food.weights.map((wt) => `${(Math.round((weight / (wt.Gr_Wgt * 1)) * (wt.Amount * 1) * 10) / 10)} ${wt.Description}`);
  }

  function calcMacroCont(mealItem, food) {
    const totals = mealItem.foods.reduce((memo, fd) => {
      const mm = {};
      mm.Protein = memo.Protein + (fd.Protein * 1);
      mm.Protein = memo.Carbohydrates + (fd.Carbohydrates * 1);
      mm.Protein = memo.Fat + (fd.Fat * 1);
      return mm;
    }, { Protein: 0, Carbohydrates: 0, Fat: 0 });

    const percent = {
      Protein: food.Protein / totals.Protein || 0,
      Carbohydrates: food.Carbohydrates / totals.Carbohydrates || 0,
      Fat: food.Fat / totals.Fat || 0,
    };

    return {
      Protein: round10(mealItem.macros.protein * percent.Protein),
      Carbohydrates: round10(mealItem.macros.carbs * percent.Carbohydrates),
      Fat: round10(mealItem.macros.fat * percent.Fat),
    };
  }

  function round10(num) {
    return Math.round(num * 10) / 10;
  }

  return (
    <div>
      <Row>
        <Col>Food</Col>
        <Col>Amount</Col>
        <Col>Protein</Col>
        <Col>Carbs</Col>
        <Col>Fat</Col>
      </Row>
      {meal && meal.map((fd) => (
        fd.foods.map((food) => (
          <Row key={food.id}>
            <Col>
              {food.longname}
            </Col>
            <Col>
              {modWeight(food, (fd.weight.gr / fd.foods.length))[0]}
            </Col>
            <Col>
              {calcMacroCont(fd, food).Protein}
            </Col>
            <Col>
              {calcMacroCont(fd, food).Carbohydrates}
            </Col>
            <Col>
              {calcMacroCont(fd, food).Fat}
            </Col>
          </Row>
        ))
      ))}
      <Row>
        <Col colSpan={2}>Total:</Col>
        <Col>{sumMacro('protein')}</Col>
        <Col>{sumMacro('carbs')}</Col>
        <Col>{sumMacro('fat')}</Col>
      </Row>
    </div>
  );
};

MealSection.propTypes = {
  meal: PropTypes.array,
  error: PropTypes.string
};

export default MealSection;

