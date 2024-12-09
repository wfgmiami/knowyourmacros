import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.1);
`;

const Overlay = ({ children, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      {children}
    </Wrapper>
  );
};

Overlay.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default Overlay;
