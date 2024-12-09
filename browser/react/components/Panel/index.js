import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Heading, Body, Footer } from './styled';
/**
 * @return {React.Component}
 */
const Panel = ({ title, footer = '', children, titleStyle, ...rest, wrapper = {} }) => (
  <Wrapper {...wrapper}>
    <Heading {...rest}>
      <h4 style={titleStyle || {}}>
        {title}
      </h4>
    </Heading>
    <Body {...rest}>
      {children}
    </Body>
    {footer.length > 0 &&
    <Footer {...rest}>
      {footer}
    </Footer>
    }
  </Wrapper>
);

Panel.propTypes = {
  wrapper: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.node,
  titleStyle: PropTypes.object,
  footer: PropTypes.node
};

export default Panel;
