import React from 'react';
import PropTypes from 'prop-types';
import FlexWrapper from 'components/FlexWrapper';
import styled from 'styled-components';

/** A styled `h4` component */
const H4 = styled.h4`
  margin: 0px;
`;

/**
 * @param {number} mealIdx
 */
export const Header = ({ title }) => (
  <FlexWrapper align="center">
    <H4>{title}</H4>
  </FlexWrapper>
);

Header.propTypes = {
  title: PropTypes.string
};

export default Header;
