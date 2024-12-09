import React from 'react';
import PropTypes from 'prop-types';
import FlexWrapper from 'components/FlexWrapper';
import { MEALS } from 'browser/redux/constants';
import styled from 'styled-components';

const Col = styled.div`
  width: 20%;
  border-left: 1px solid #dedede;
  padding: 0.35em;
  background-color: ${(props) => (props.primary ? props.theme.primary.background : '#fff')};
  color: ${(props) => (props.primary ? props.theme.primary.color : '#000')};
  &:last-child {
    border-right: 1px solid #dedede;
  }
`;

const Row = styled(FlexWrapper)`
  border-top: 1px solid #dedede;
  &:last-child {
    border-bottom: 1px solid #dedede;
  }
`;

const GoalsReport = ({ goals, title }) => {
  if (!goals || goals === '') return null;

  const mealNames = MEALS.slice();

  const gls = goals.map((meal, ix) => ({ ...meal, id: ix })).filter((meal) => (meal.pGoal > 0 || meal.cGoal > 0 || meal.fGoal > 0));
  const calories = ({ pGoal, cGoal, fGoal }) => Math.round((pGoal * 4) + (cGoal * 4) + (fGoal * 9));

  return (
    <div>
      <h4>{title}</h4>
      <Row>
        <Col primary><b>Meal</b></Col>
        <Col primary><b>Protein</b></Col>
        <Col primary><b>Carbs</b></Col>
        <Col primary><b>Fat</b></Col>
        <Col primary><b>Calories</b></Col>
      </Row>
      {gls.map((meal) => (
        <Row key={meal.id} align="stretch">
          <Col>{mealNames[meal.id]}</Col>
          <Col>{meal.pGoal}</Col>
          <Col>{meal.cGoal}</Col>
          <Col>{meal.fGoal}</Col>
          <Col>{calories(meal)}</Col>
        </Row>
      ))}
    </div>
  );
};

GoalsReport.propTypes = {
  goals: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  title: PropTypes.string
};

export default GoalsReport;
