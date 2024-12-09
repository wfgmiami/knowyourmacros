import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Overlay from './Overlay';

const Wrapper = styled.div`
  max-width: ${(props) => props.width || '500px'};
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
`;

class Modal extends React.Component {
  stopClick = (ev) => {
    ev.stopPropagation();
  }
  render() {
    const { children, width, onOverlayClick } = this.props;
    return (
      <Overlay onClick={onOverlayClick}>
        <Wrapper width={width} onClick={this.stopClick}>
          {children}
        </Wrapper>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string,
  onOverlayClick: PropTypes.func
};

export default Modal;
