import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 * A link item
 * @param {Object} props
 * @param {string} props.path
 * @param {string} props.children
 */
const LinkItem = ({ path, children }) => (
  <Link to={path} activeClassName="active">
    {children}
  </Link>
);

LinkItem.propTypes = {
  path: PropTypes.string,
  children: PropTypes.node,
};

export default LinkItem;
