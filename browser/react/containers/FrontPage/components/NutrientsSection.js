import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FlexWrapper from 'components/FlexWrapper';
import media from 'theme/media';

const Wrapper = styled.div`
  margin-top: 1.5em;
`;

const Row = FlexWrapper.extend`
  border-top: 1px solid gray;
  &:last-child {
    border-bottom: 1px solid gray;
  }
`;

const Col = styled.div`
  width: ${(props) => (props.width || '25%')};
  border-left: 1px solid gray;
  line-height: 2.5em;
  padding-left: 1em;
  background-color: #fff;
  &:last-child {
    border-right: 1px solid gray;
  }
  ${media.mdDown`
    text-align: center;
    padding-left: 0px;
    font-size: 10pt;
  `}
`;

/**
 * Nutrients section
 * @param {object} props
 * @param {object} props.diet
 * @param {number} props.diet.protein
 * @param {number} props.diet.carbs
 * @param {number} props.diet.fat
 * @param {number} props.diet.calories
 */
const NutrientsSection = ({ diet }) => (
  <Wrapper>
    <div>Macronutrients <small>(in grams)</small> and Daily Calories</div>
    <Row>
      <Col width="20%">
        <strong>Protein</strong>
      </Col>
      <Col width="33%">
        <strong>Carbohydrates</strong>
      </Col>
      <Col width="15%">
        <strong>Fat</strong>
      </Col>
      <Col width="32%">
        <strong>Calories</strong>
      </Col>
    </Row>
    <Row>
      <Col width="20%">
        {diet.protein || '-'}
      </Col>
      <Col width="33%">
        {diet.carbs || '-'}
      </Col>
      <Col width="15%">
        {diet.fat || '-'}
      </Col>
      <Col width="32%">
        {diet.calories || '-'}
      </Col>
    </Row>
  </Wrapper>
);

NutrientsSection.propTypes = {
  diet: PropTypes.object
};

export default NutrientsSection;

