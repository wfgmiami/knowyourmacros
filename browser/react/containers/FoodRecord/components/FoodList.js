import React from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import ListGroup from 'components/ListGroup';
import MultiClick from 'components/Button/MultiClick';
import { FlexW } from './styled';
import { removeFoodRecordItem, confirmRecord } from '../actions';
import calculateDayMacros from '../utils/calculateDayMacros';
import FoodListItem from './FoodListItem';

/** Consistently display */
const Col = ({ num, children }) => <div>{children}: {num}</div>;

Col.propTypes = {
  num: PropTypes.number,
  children: PropTypes.node
};

/** List of records */
class FoodList extends React.Component {
  confirmFoods = (ev) => {
    ev.stopPropagation();
    this.props.confirmFoodRecord(this.props.foods.map((food) => food.id), this.props.date);
  }

  destroyRecords = (ev) => {
    if (ev) {
      ev.stopPropagation();
    }
    const { foods, date } = this.props;
    this.props.destroyRecord(foods.map((food) => food.id), date);
  }

  macroSummary = () => {
    const { foods } = this.props;
    const { raw } = calculateDayMacros(foods);

    return (
      <FlexW>
        <Col num={raw.calories}>Calories</Col>
        <Col num={raw.protein}>Protein</Col>
        <Col num={raw.carbs}>Carbs</Col>
        <Col num={raw.fat}>Fat</Col>
      </FlexW>
    );
  }

  render() {
    const { foods } = this.props;
    if (!foods.length) return this.macroSummary();

    return (
      <div>
        {this.macroSummary()}
        {foods.filter((food) => !food.confirmed).length > 0 && <MultiClick onClick={this.confirmFoods}>Confirm All</MultiClick>}
        <CSSTransitionGroup
          transitionName="fade"
          transitionLeaveTimeout={100}
          transitionEnterTimeout={100}
        >
          <ListGroup>
            {foods.map((food) => (
              <FoodListItem key={`${food.id}_${food.confirmed}`} food={food} />)
            )}
          </ListGroup>
        </CSSTransitionGroup>
        {foods.length > 0 && <MultiClick small onClick={this.destroyRecords}>Delete All</MultiClick>}
      </div>
    );
  }
}

FoodList.propTypes = {
  foods: PropTypes.array,
  confirmFoodRecord: PropTypes.func,
  destroyRecord: PropTypes.func,
  date: PropTypes.object
};

const mapStateToProps = ({ root }) => ({
  date: root.date
});

const mapDispatchToProps = (dispatch) => ({
  destroyRecord: (id, date) => dispatch(removeFoodRecordItem(id, date)),
  confirmFoodRecord: (ids, date) => dispatch(confirmRecord(ids, date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodList);
