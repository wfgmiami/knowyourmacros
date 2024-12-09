import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayMacroSummary from 'containers/DayMacroSummary';
import ChangeDay from 'containers/ChangeDay';
import FlexWrapper from 'components/FlexWrapper';
import Container from 'components/Container';
import H3 from 'components/H3';
import Panel from 'components/Panel';
import RecordList from './components/RecordList';

/**
 * @param {Object} props
 * @param {Date} props.date
 */
export const FoodRecord = ({ date }) => {
  const isToday = date.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
  return (
    <Container>
      <H3 centered>{isToday
        ? <span>Today</span>
        : <span>{date.toLocaleDateString()}</span>
      }</H3>
      <FlexWrapper align="stretch" direction="column">
        <Panel title="Change Day" primary wrapper={{ flex: 1 }}>
          <ChangeDay />
        </Panel>
        <Panel title="Macronutrient Summary" primary wrapper={{ flex: 1 }}>
          <DayMacroSummary />
        </Panel>
      </FlexWrapper>
      <RecordList />
    </Container>
  );
};

FoodRecord.propTypes = {
  date: PropTypes.object
};

/** Map state to props */
const mapStateToProps = ({ root }) => ({
  date: root.date
});

export default connect(mapStateToProps)(FoodRecord);
