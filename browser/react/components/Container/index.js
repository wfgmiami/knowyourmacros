import React from 'react';
import styled from 'styled-components';
import media from 'theme/media';
import PropTypes from 'prop-types';
import Text from '../Text';

/**
 * A styled `div` element
 * @type {React.Component}
 */
const ContainerDiv = styled.div`
  padding: 0rem 0.7rem;
  margin: auto;

  ${media.mdUp`
    max-width: 1050px
    ${(props) => props.fluid && `
      width: 100% !important;
    `}
  `}
`;

const Container = ({ title, subtitle, children, ...rest }) => {
  return (
    <ContainerDiv {...rest}>
      {title && <h3>{title}</h3>}
      {subtitle && <Text color="halfOpacityBlue">{subtitle}</Text>}
      {(title || subtitle) && <hr style={{ marginBottom: '2rem' }} /> }
      {children}
    </ContainerDiv>
  );
};

Container.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node
};

export default Container;
