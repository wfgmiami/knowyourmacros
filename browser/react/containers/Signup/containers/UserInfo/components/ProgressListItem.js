import React from 'react';
import H3 from 'components/H3';
import styled from 'styled-components';
import FontAwesomeBase from 'react-fontawesome';
import PropTypes from 'prop-types';
import { Link as LinkBase } from 'react-router';
import theme from 'theme';

const FontAwesome = styled(FontAwesomeBase)`
  transition: color 500ms ease-in-out;
`;

const Link = styled(LinkBase)`
  text-decoration: none;
  color: inherit;
  :visited {
    color: inherit;
  }
`;

const ProgressListItem = ({ done, title, to }) => (
  <H3 color={done ? 'green' : 'darkBlue'}>
    <Link to={to}>
      <FontAwesome name="check-square-o" style={{ color: done ? theme.green : '#cdcdcd' }} />
      &nbsp;
      {title}
    </Link>
  </H3>
);

ProgressListItem.propTypes = {
  done: PropTypes.any,
  title: PropTypes.string,
  to: PropTypes.string
};

export default ProgressListItem;
