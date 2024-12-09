/**
 * @module react/ChangeDay
 */

import React from 'react';
// import { DateField } from 'react-date-picker';
import PropTypes from 'prop-types';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ButtonBase from 'components/Button';
import FlexWrapperBase from 'components/FlexWrapper';
import { changeDay, nextDay, previousDay } from './actions';

/**
 * A styled `button` component
 * {@link components/Button}
 * @type {React.Component}
 */
const Button = styled(ButtonBase)`
  padding-top: 2.6px;
  padding-bottom: 2.6px;
`;

/**
 * A styled `div` component
 * {@link components/FlexWrapper}
 * @type {React.Component}
 */
const FlexWrapper = FlexWrapperBase.extend`
  justify-content: center;
  align-items: stretch;
  &>*:first-child ${Button} {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    /* border-right: none; */
  }
  &>*:first-child {
    text-align: right;
  }
  &>*:last-child {
    text-align: left;
  }
  &>*:last-child ${Button} {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    /* border-left: none; */
  }
`;

/**
 * A styled `input` component
 * @type {React.Component}
 */
// const DField = styled(DateField)`
//   border: 1px solid #ccc;
//   & input {
//     max-width: 100px;
//   }
// `;

/**
 * A styled `div` component
 * @type {React.Component}
 */
const Wrapper = styled.div`
  margin: auto;
  text-align: center;
`;

/**
 * Component to change the date of the entire application
 */
export class ChangeDayContainer extends React.Component {
  /** Validate prop types */
  static propTypes = {
    changeDay: PropTypes.func,
    calories: PropTypes.object,
    nexDayClick: PropTypes.func,
    prevDayClick: PropTypes.func,
    date: PropTypes.object,
    fitbitToken: PropTypes.string,
    displayDay: PropTypes.bool
  };

  /** Set default props */
  static defaultProps = {
    date: moment()
  };

  /**
   * Update the date for the entire application
   * @param {string} date
   */
  changeDate = (date) => {
    if (typeof date !== 'string') {
      console.warn('date is not a string');
    }
    const { calories } = this.props;
    const newDate = moment(new Date(date));
    let getCals = (newDate === moment() || typeof calories[newDate.format('YYYY-MM-DD')] !== 'number');
    if (!this.props.fitbitToken) {
      getCals = false;
    }
    this.props.changeDay(newDate, getCals);
  }

  /** Increment date forward */
  changeNextDay = () => {
    const { date, calories } = this.props;
    this.props.nexDayClick(date, calories, this.props.fitbitToken);
  }

  /** Decrement date backward */
  changePreviousDay = () => {
    const { date, calories } = this.props;
    this.props.prevDayClick(date, calories, this.props.fitbitToken);
  }

  render() {
    const { date, displayDay } = this.props;

    const currentDate = moment();
    const isToday = date.format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD');

    const dateDiff = Math.round(date.diff(currentDate, 'days', true));
    return (
      <Wrapper>
        <div>
          <FlexWrapper>
            <div>
              <Button onClick={this.changePreviousDay}>
                <FontAwesome name="minus" />
              </Button>
              <div>
                <small>{dateDiff < 0 && `(${dateDiff})`}</small>
              </div>
            </div>
            &nbsp;
            &nbsp;
            <div>
              {/* <DField
                dateFormat="YYYY-MM-DD"
                defaultValue={date}
                onChange={this.changeDate}
              /> */}
              <div>
                <small>
                  <i>YYYY-MM-DD</i>
                </small>
              </div>
            </div>
            &nbsp;
            &nbsp;
            <div>
              <Button onClick={this.changeNextDay}>
                <FontAwesome name="plus" />
              </Button>
              <div>
                <small>{dateDiff > 0 && `(${dateDiff})`}</small>
              </div>
            </div>
          </FlexWrapper>
          <div>
            {displayDay &&
              <b>{isToday
                ? <span className="text-primary">Today</span>
                : <span className="text-warning">{date.format('YYYY-MM-DD')}</span>
              }</b>
            }
          </div>
        </div>
      </Wrapper>
    );
  }
}

/** Map dispatches to props */
const mapDispatchToProps = (dispatch) => ({
  changeDay: (dt, getCals) => dispatch(changeDay(dt, getCals)),
  nexDayClick: (dt, cals, getCals) => dispatch(nextDay(dt, cals, getCals)),
  prevDayClick: (dt, cals, getCals) => dispatch(previousDay(dt, cals, getCals))
});

/** Map state to props */
const mapStateToProps = ({ root, foodrecord, user }) => ({
  calories: foodrecord.calories,
  date: moment(root.date),
  fitbitToken: user.fitbitToken
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDayContainer);
