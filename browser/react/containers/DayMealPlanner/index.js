import React from 'react';
import TrainingWheels from 'utils/TrainingWheels';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import FlexWrapper from 'components/FlexWrapper';
import ChangeDay from 'containers/ChangeDay';
import { Select } from 'components/FormComponents';
import Button from 'components/Button';
import Well from 'components/Well';
import Container from 'components/Container';

import { addDay, removeDay, recalculateDay, handleAddDay } from './actions';
// import { MarginWrapper } from '../Signup/containers/AccountInfo/styled';

/** The shopping list */
export class DayMealPlanner extends TrainingWheels {
  static propTypes = {
    shoppinglist: PropTypes.array,
    fetchingData: PropTypes.bool,
    date: PropTypes.object,
    children: PropTypes.node,
    addWholeDay: PropTypes.func,
    addWholeWeek: PropTypes.func,
    confirmWeek: PropTypes.func
  };

  /** Component state */
  state = {
    confirmAll: false
  };

  /** Confirm all meals */
  confirmAll = () => {
    this.props.confirmWeek(this.props.shoppinglist, this.props.date);
    this.setState({ confirmAll: true });
  }

  navTo = (ev) => {
    if (ev.target.value.length) {
      browserHistory.push(ev.target.value);
    } else {
      browserHistory.push('/shopping-list');
    }
  }

  /** Display */
  render() {
    const { shoppinglist, addWholeDay, addWholeWeek, fetchingData, children } = this.props;
    return (
      <Container title="Day Meal Planner">
        { fetchingData && <span className="alert alert-warning pull-right"><b>Getting your meal plan</b></span> }
        <ChangeDay />
        <Well>
          <FlexWrapper>
            <div>
              <Button color="darkBlue" onClick={() => addWholeDay('rest')}>
                Add Day
              </Button>
              { ' ' }
              <Button color="darkBlue" onClick={() => addWholeWeek('rest')}>
                Add Week
              </Button>
            </div>
            <div>
              <Button color="green" onClick={this.confirmAll}>
                Confirm All
              </Button>
            </div>
          </FlexWrapper>
        </Well>
        {shoppinglist.length > 1 && (
          // <MarginWrapper>
          <Select onChange={this.navTo} noBlankOption label="View Day">
            <option value="/shopping-list">All Days</option>
            {shoppinglist.map((day, ix) => (<option key={ix} value={`/shopping-list/${ix}`}>Day {ix + 1}</option>))}
          </Select>
          // </MarginWrapper>
        )}
        {children}
      </Container>
    );
  }
}


/** Map state to props */
const mapStateToProps = ({ shoppinglist }) => ({
  shoppinglist: shoppinglist.shoppinglist,
  fetchingData: shoppinglist.fetchingData
});

/**
 * Get the following day
 * @param {Date} date
 * @param {number} numDays
 */
const followingDay = (date, numDays) => date.add(numDays, 'days').format('YYYY-MM-DD');

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  addWholeDay: (type) => dispatch(addDay(type)),
  addWholeWeek: (type) => {
    for (let i = 0; i < 7; i++) {
      dispatch(addDay(type));
    }
  },
  confirmWeek: (shoppingList, date) => {
    shoppingList.forEach((meals, ix) => {
      dispatch(handleAddDay(meals, followingDay(date, ix)));
    });
  },
  removeDay: (index) => dispatch(removeDay(index)),
  recalculateDay: (index, type, uuid) => dispatch(recalculateDay(index, type, uuid))
});

export default connect(mapStateToProps, mapDispatchToProps)(DayMealPlanner);
