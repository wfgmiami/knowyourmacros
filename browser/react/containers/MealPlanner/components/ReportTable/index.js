import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ChangeDay from 'containers/ChangeDay';
import { Wrapper, Row, Total, FoodName, Macro, Amount, AmountDesc } from './styled';
import AddToMeals from '../AddToMeals';


/**
 * The report table
 * @param {Object} props
 * @param {number} props.meal
 * @param {string} props.error
 */
export const ReportTable = ({ meal, error }) => {
  if (error) {
    return (
      <div className="alert alert-danger">
        <strong>{error}</strong>
      </div>
    );
  }

  if (!meal.length) {
    return null;
  }
  function sumMacro(macroToSum) {
    return Math.round(10 * meal.reduce((macro, food) => macro + food.macros[macroToSum], 0)) / 10;
  }

  function modWeight(food, weight) {
    return food
      .weights
      .map((wt) => `${Math.round((weight / (wt.Gr_Wgt * 1)) * (wt.Amount * 1) * 10) / 10} ${wt.Description}`);
  }

  function calcMacroCont(mealItem, food) {
    const totals = mealItem
      .foods
      .reduce((memo, fd) => {
        const mm = { ...memo };
        mm.Protein += fd.Protein * 1;
        mm.Carbohydrates += fd.Carbohydrates * 1;
        mm.Fat += fd.Fat * 1;
        return mm;
      }, {
        Protein: 0,
        Carbohydrates: 0,
        Fat: 0
      });

    const percent = {
      Protein: food.Protein / totals.Protein || 0,
      Carbohydrates: food.Carbohydrates / totals.Carbohydrates || 0,
      Fat: food.Fat / totals.Fat || 0
    };

    return {
      Protein: round10(mealItem.macros.protein * percent.Protein),
      Carbohydrates: round10(mealItem.macros.carbs * percent.Carbohydrates),
      Fat: round10(mealItem.macros.fat * percent.Fat)
    };
  }

  function round10(num) {
    return Math.round(num * 10) / 10;
  }

  return (
    <div>
      <ChangeDay displayDay />
      <AddToMeals meal={meal} />
      <Wrapper>
        <Row align="stretch">
          <FoodName>
            <strong>Food</strong>
          </FoodName>
          <Amount>
            <strong>Amount</strong>
          </Amount>
          <Macro>
            <strong>Weight (g)</strong>
          </Macro>
          <Macro>
            <strong>Protein (g)</strong>
          </Macro>
          <Macro>
            <strong>Carbs (g)</strong>
          </Macro>
          <Macro>
            <strong>Fat (g)</strong>
          </Macro>
        </Row>
        {meal.map((fd) => (fd.foods.map((food) => (
          <Row align="stretch" key={food.id}>
            <FoodName>
              {food.longname}
            </FoodName>
            <Amount>
              {modWeight(food, (fd.weight.gr / fd.foods.length)).map((wt) => <AmountDesc key={wt}>{wt}</AmountDesc>)}
            </Amount>
            <Macro>
              {Math.round(fd.weight.gr / fd.foods.length)}
            </Macro>
            <Macro>
              {calcMacroCont(fd, food).Protein}
            </Macro>
            <Macro>
              {calcMacroCont(fd, food).Carbohydrates}
            </Macro>
            <Macro>
              {calcMacroCont(fd, food).Fat}
            </Macro>
          </Row>
        ))))
        }
        <Row align="stretch">
          <Total>Total:</Total>
          <Macro>{sumMacro('protein')}</Macro>
          <Macro>{sumMacro('carbs')}</Macro>
          <Macro>{sumMacro('fat')}</Macro>
        </Row>
      </Wrapper>
    </div>
  );
};

ReportTable.propTypes = {
  meal: PropTypes.object,
  error: PropTypes.string
};

ReportTable.defaultProps = {
  error: null
};

/** Map state to props */
const mapStateToProps = ({ mealplanner }) => ({ meal: mealplanner.meal });

export default connect(mapStateToProps)(ReportTable);
