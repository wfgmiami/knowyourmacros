import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FlexWrapper from 'components/FlexWrapper';

/** @type {JSX.Element} */
const LeftCol = styled.div`
flex: 1;
padding-left: ${(props) => (props.indent ? '2rem' : '0')};
`;

/** @type {JSX.Element} */
const RightCol = styled.div`
flex: 1;
text-align: right;
`;

/** @type {JSX.Element} */
const Wrapper = styled.div`
  font-size: 10.5pt;
  line-height: 2em;
`;

/**
 * Calories row
 * @param {Object} props
 * @param {number} props.calories
 * @param {number} props.caloriesFromFat
 */
const Row = ({ calories, caloriesFromFat }) => (
  <Wrapper>
    <FlexWrapper>
      <LeftCol>
        <b>Calories</b>
        {' '}
        {calories}
      </LeftCol>
      <RightCol>
        {caloriesFromFat && `Calories from Fat ${caloriesFromFat}`}
      </RightCol>
    </FlexWrapper>
  </Wrapper>
);

Row.propTypes = {
  calories: PropTypes.number,
  caloriesFromFat: PropTypes.string
};

export default Row;
