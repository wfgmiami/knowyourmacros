import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Row = styled.div`
  padding-top: 0.33rem;
  padding-bottom: 0.33rem;
`;

const H4 = styled.h4`
  text-decoration: underline;
`;

function Recommendation({ recommendation }) {
  return (
    <div>
      <H4>Daily Maintenance Values</H4>
      <Row><strong>Calories:</strong> {recommendation.calories}</Row>
      <Row><strong>Protein:</strong> {recommendation.protein}g</Row>
      <Row><strong>Carbs:</strong> {recommendation.carbs}g</Row>
      <Row><strong>Fat:</strong> {recommendation.fat}g</Row>
    </div>
  );
}

Recommendation.propTypes = {
  recommendation: PropTypes.object
};

export default Recommendation;
