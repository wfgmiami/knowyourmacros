import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Well from 'components/Well';
import { MEALS } from 'browser/redux/constants';
import FadeInOut from 'components/FadeInOut';
import FoodList from './FoodList';
import Header from './Header';
import SelectFoodContainer from '../containers/SelectFood';
import { changeAddMeal } from '../actions';

const Wrapper = Well.extend`
  cursor: pointer;
  :hover {
    background-color: rgb(245, 245, 245);
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.3)
  }
`;

/**
 * @param {Object} props
 * @param {Array<foodrecordType>} props.foodrecord
 * @param {boolean} props.display
 */
export const RecordList = ({ foodrecord, display, chngMeal }) => {
  if (!foodrecord) return null;
  const meals = MEALS.slice();
  if (display) {
    return (
      <FadeInOut>
        <Well>
          <SelectFoodContainer />
        </Well>
      </FadeInOut>
    );
  }
  return (
    <FadeInOut>
      {meals.map((meal, idx) => (
        <Wrapper key={meal} small onClick={() => chngMeal(idx + 1)}>
          <Header title={meal} mealIdx={idx + 1} />
          <FoodList foods={foodrecord.filter((record) => record.Meal - 1 === (idx))} />
        </Wrapper>
      ))}
    </FadeInOut>
  );
};

RecordList.propTypes = {
  foodrecord: PropTypes.array,
  display: PropTypes.bool,
  chngMeal: PropTypes.func
};

/** Map state to props */
const mapStateToProps = ({ foodrecord }) => ({
  foodrecord: foodrecord.record,
  display: foodrecord.displayModal
});

const mapDispatchToProps = (dispatch) => ({
  chngMeal: (ix) => dispatch(changeAddMeal(ix))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
