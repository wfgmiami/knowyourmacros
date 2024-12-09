import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from 'theme';

const Rect = styled.rect`
  transition: width 1000ms ease-in-out;
`;

const ProgressBar = ({ height, width, percent }) => (
  <svg width={width} height={height} viewBox="0 0 100 10" preserveAspectRatio="xMidYMid" className="lds-wedges" style={{ background: 'none' }}>
    <g transform="translate(-50,0)">
      <Rect x="0" y="0" height="10" width="200" fill="#f2f2f2" />
    </g>
    <g transform="translate(-50, 0)">
      <Rect x="0" y="0" height="10" width={`${200 * percent}`} fill={theme.green} />
    </g>
  </svg>
);

ProgressBar.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  percent: PropTypes.number
};

ProgressBar.defaultProps = {
  height: '1rem',
  width: '100%',
  percent: 0
};

export default ProgressBar;
