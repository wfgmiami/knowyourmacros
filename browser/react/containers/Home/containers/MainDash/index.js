import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import DayMacroSummary from 'containers/DayMacroSummary';
import Panel from 'components/Panel';
import RecordList from 'containers/FoodRecord/components/RecordList';
import ChangeDay from 'containers/ChangeDay';
import Container from 'components/Container';
import FlexWrapperBase from 'components/FlexWrapper';
import media from 'theme/media';

import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ReactHighcharts from 'react-highcharts';
import { getCalories } from '../../actions';
import bardataFunc from './components/bardata';
import WeightChart from './components/WeightChart';
import CaloriesReport from '../../components/CaloriesReport';

/** A styled `div` component */
const Column = styled.div`
  padding: 0px 0.5rem;

  &:first-child {
    padding-left: 0px;
  }
  &:last-child {
    padding-right: 0px;
  }
  ${media.lgUp`
    width: ${(props) => props.width}
  `}
  ${media.lgDown`
    width: 50%;
  `}
  ${media.mdDown`
    padding: 0px;
    width: 100%;
  `}
`;

/** A styled `div` component which only shows on specific screen sizes */
const Screen = styled.div`
  ${media.lgUp`
    display: ${(props) => (props.mdScreen || props.smScreen ? 'none' : 'initial')};
  `}
  ${media.lgDown`
    display: ${(props) => (props.lgScreen || props.smScreen ? 'none' : 'initial')};
  `}
  ${media.mdDown`
    display: ${(props) => (props.lgScreen || props.mdScreen ? 'none' : 'initial')};
  `}
`;

/** A styled `div` component */
const FlexWrapper = FlexWrapperBase.extend`
  align-items: stretch;
  height: 100vh;
`;

/**
 * Main dashboard
 * @param {Object} props
 * @param {Date} props.date
 * @param {Array<foodrecordType>} props.foodrecord
 * @param {Array<userType>} props.user
 * @param {number} props.calories
 */
export const MainDash = ({ date, foodrecord, user }) => {
  if (!user.mealGoals.length) {
    browserHistory.push('/modify-goals');
    return null;
  }

  const isToday = date.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
  const bardata = bardataFunc(foodrecord);
  const titleStyle = isToday ? {} : { color: '#f8d104' };
  const dateStr = isToday ? 'Today' : date.format('dddd, MMMM Do, YYYY');

  return (
    <Container fluid>
      <CaloriesReport />
      <FlexWrapper align="stretch">
        <Column width="25%">
          <Panel title={dateStr} primary titleStyle={titleStyle}>
            <DayMacroSummary />
          </Panel>
          <Panel title="Macronutrients By Meal" primary>
            <ReactHighcharts config={bardata} />
          </Panel>
          {/** Only show on a medium screen */}
          <Screen mdScreen>
            <Panel title="Change Day" primary>
              <ChangeDay />
            </Panel>
            <Panel title="Weight Progress" primary>
              <WeightChart />
            </Panel>
          </Screen>
        </Column>
        <Column width="45%">
          <RecordList />
        </Column>
        <Column width="30%">
          {/** Only show on a large screen */}
          <Screen lgScreen>
            <Panel title="Change Day" primary>
              <ChangeDay />
            </Panel>
            <Panel title="Weight Progress" primary>
              <WeightChart />
            </Panel>
          </Screen>
        </Column>
      </FlexWrapper>
    </Container>
  );
};

MainDash.defaultProps = {
  date: new Date()
};

MainDash.propTypes = {
  date: PropTypes.object,
  user: PropTypes.object,
  foodrecord: PropTypes.array
};

/** Map state to props */
const mapStateToProps = ({ root, user, foodrecord }) => ({
  date: root.date,
  foodrecord: foodrecord.record,
  user
});

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  getCalories: (startDate) => dispatch(getCalories(startDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainDash);
