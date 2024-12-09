import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListGroup from 'components/ListGroup';
import H3 from 'components/H3';
import Well from 'components/Well';
import FlexWrapper from 'components/FlexWrapper';
import { MEALS } from 'browser/redux/constants';
import { removeDay, recalculateDay } from '../actions';
import Meal from './components/Meal';
import Header from './components/Header';
import Control from './components/Control';

/** Display the day meals */
export class Day extends React.Component {
  constructor(props) {
    super();
    this.day = props.routeParams ? props.routeParams.day : props.day;
    /** Component state */
    this.state = {
      type: 'rest',
      added: false
    };
  }

  /**
   * Set state to display if the meal has been added
   * @param {{ isConfirmed: boolean }} props
   */
  componentWillReceiveProps = (props) => {
    console.log(props);
    if (props.isConfirmed) {
      this.setState({ added: true });
    }
    this.day = props.routeParams ? props.routeParams.day : props.day;
  }

  /**
   * Change the meal type
   * @param {React.SyntheticEvent} ev
   */
  onChangeType = (ev) => {
    const { renderDay } = this.props;
    this.props.recalculateDay(this.day, ev.target.value, renderDay.uuid);
  }

  /** Confirm that the meals have been added to the record */
  confirmAddDay = () => {
    this.setState({ added: true });
  }

  /** Display */
  render() {
    const meals = MEALS.slice();
    if (!this.props.renderDay) {
      browserHistory.push('/shopping-list');
      return null;
    }
    const { renderDay } = this.props;
    return (
      <Well>
        {renderDay.isConfirmed && (
          <div>
            <b>Meals Added</b>
          </div>
        )}
        <Header index={parseInt(this.day, 10)} date={this.props.date} />
        <br />
        <Control
          type={renderDay.type}
          onChangeType={this.onChangeType}
          day={renderDay}
          uuid={renderDay.uuid}
          date={this.props.date}
          index={this.props.index}
          confirmAddDay={this.confirmAddDay}
          recalculateDay={this.props.recalculateDay}
          removeDay={this.props.removeDay}
        />
        <br />
        <ListGroup>
          { renderDay.foods.map((meal, ix) => (
            meal && (
              <FlexWrapper key={ix}>
                <H3>{meals[ix]}</H3>
                <Meal meal={meal} />
              </FlexWrapper>
            ))
          ) }
        </ListGroup>
      </Well>
    );
  }
}

Day.propTypes = {
  recalculateDay: PropTypes.func,
  index: PropTypes.number,
  isConfirmed: PropTypes.bool,
  date: PropTypes.string,
  renderDay: PropTypes.object,
  routeParams: PropTypes.object,
  day: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  removeDay: PropTypes.func
};

const mapStateToProps = ({ shoppinglist }, props) => {
  const dayIx = props.routeParams ? props.routeParams.day : props.day;
  return ({
    renderDay: shoppinglist.shoppinglist.filter((day, ix) => ix === parseInt(dayIx, 10))[0]
  });
};

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  removeDay: (index) => dispatch(removeDay(index)),
  recalculateDay: (index, type, uuid) => dispatch(recalculateDay(index, type, uuid))
});


export default connect(mapStateToProps, mapDispatchToProps)(Day);
