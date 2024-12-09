import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from 'components/Text';
import withDelayedRender from 'utils/withDelayedRender';

const Wrapper = styled.div`
  text-align: center;
`;

const Loader = ({ size, label }) => (
  <Wrapper>
    <svg width={size} height={size} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-wedges" style={{ background: 'none' }}>
      <g transform="translate(50,50)">
        <g transform="scale(0.7)">
          <g transform="translate(-50,-50)">
            <g transform="rotate(145.263 50 50)">
              <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="0.95s" begin="0s" repeatCount="indefinite" />
              <path ng-attr-fill-opacity="{{config.opacity}}" ng-attr-fill="{{config.c1}}" d="M50 50L50 0A50 50 0 0 1 100 50Z" fillOpacity="0.8" fill="red" />
            </g>
            <g transform="rotate(108.947 50 50)">
              <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.2666666666666666s" begin="0s" repeatCount="indefinite" />
              <path ng-attr-fill-opacity="{{config.opacity}}" ng-attr-fill="{{config.c2}}" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(90 50 50)" fillOpacity="0.8" fill="green" />
            </g>
            <g transform="rotate(72.6316 50 50)">
              <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.9s" begin="0s" repeatCount="indefinite" />
              <path ng-attr-fill-opacity="{{config.opacity}}" ng-attr-fill="{{config.c3}}" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(180 50 50)" fillOpacity="0.8" fill="blue" />
            </g>
            <g transform="rotate(36.3158 50 50)">
              <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="3.8s" begin="0s" repeatCount="indefinite" />
              <path ng-attr-fill-opacity="{{config.opacity}}" ng-attr-fill="{{config.c4}}" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(270 50 50)" fillOpacity="0.8" fill="#f7941e" />
            </g>
          </g>
        </g>
      </g>
    </svg>
    {label && <Text>{label}</Text>}
  </Wrapper>
);

Loader.propTypes = {
  size: PropTypes.string
};

Loader.defaultProps = {
  size: '80px'
};

export default withDelayedRender(500)(Loader);
