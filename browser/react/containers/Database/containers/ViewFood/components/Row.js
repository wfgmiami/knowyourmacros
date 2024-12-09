import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FlexWrapper from 'components/FlexWrapper';
import A from 'components/A';

/** @type {JSX.Element} */
const Nutrient = styled(A)`
  text-decoration: none;
  color: #337ab7;
  font-weight: ${(props) => (props.major ? 'bold' : 'initial')};
`;

/** @type {JSX.Element} */
const LeftCol = styled.div`
flex: 3;
padding-left: ${(props) => (props.indent ? '1.5rem' : '0')};
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
 * Macro/micro row
 * @param {Object} props
 * @param {string} props.href
 * @param {string} props.nutrient
 * @param {number} props.amount
 * @param {number} props.percent
 * @param {boolean} props.major
 * @param {boolean} props.indent
 */
const Row = ({ href, nutrient, amount, percent, major, indent }) => (
  <Wrapper>
    <FlexWrapper>
      <LeftCol indent={indent}>
        <Nutrient
          href={href}
          target="_blank"
          major={major}
        >
          {nutrient}
        </Nutrient>
        {' '}
        {amount}
      </LeftCol>
      <RightCol>
        {typeof percent === 'number' && `${percent}%`}
      </RightCol>
    </FlexWrapper>
  </Wrapper>
);

Row.propTypes = {
  href: PropTypes.string,
  nutrient: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  amount: PropTypes.string,
  percent: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  major: PropTypes.bool,
  indent: PropTypes.bool
};

export default Row;
