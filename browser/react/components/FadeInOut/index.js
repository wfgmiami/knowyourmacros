import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

const FadeInOut = ({ children }) => (
  <CSSTransitionGroup
    transitionName="fade"
    transitionEnterTimeout={300}
    transitionAppear
    transitionAppearTimeout={300}
    transitionLeaveTimeout={300}
  >
    {children}
  </CSSTransitionGroup>
);

FadeInOut.propTypes = {
  children: PropTypes.node
};

export default FadeInOut;
