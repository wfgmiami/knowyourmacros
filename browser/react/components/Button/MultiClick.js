import React from 'react';
import styled from 'styled-components';
import colorCSS from 'colorCSS';
import PropTypes from 'prop-types';

/**
 * A styled `button` element
 * @type {React.Component}
 */
const Button = styled.button`
  font-size: ${(props) => ((props.small || props.sm) ? '12px' : '14px')};
  line-height: 1.42857143;
  display: ${(props) => (props.block ? 'block' : 'inline-block')};
  width: ${(props) => (props.block && '100%')};
  margin-bottom: 0;
  text-align: center;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  background: #fff;
  border: 1px solid #ccc;
  white-space: nowrap;
  border-radius: 0px;
  padding: 5px 10px;
  height: ${(props) => ((props.small || props.sm) ? '25px' : '35px')};
  &:hover {
    background: #f2f2f2;
  }

  ${(props) => (props.sm
    ? `
    padding: 3px 7px;
    font-size: 14px;
    line-height: 1.5;
    `
    : null)
};

  ${(props) => (props.xs
    ? `
    padding: 1px 5px;
    font-size: 12px;
    line-height: 1.5;
    `
    : null)
};

  ${colorCSS}
`;

const Progress = styled.div`
  height: 3px;
  background-color: rgba(0,0,0,0.4);
  width: ${(props) => 100 * (props.clicks / props.requiredClicks)}%;
  position: absolute;
  left: 0;
  bottom: 0;
  transition: height .1s;
`;

class MultiClickBtn extends React.PureComponent {
  state = {
    clicks: 0
  };

  componentWillUnmount() {
    if (this.resetTimer) {
      clearInterval(this.resetTimer);
    }
  }

  onClick = (ev) => {
    if (ev) {
      ev.stopPropagation();
    }
    if (this.state.clicks < this.props.requiredClicks) {
      this.setState((state) => ({ clicks: state.clicks + 1 }), () => {
        if (this.state.clicks === this.props.requiredClicks) {
          this.props.onClick();
        }
        if (this.resetTimer) {
          clearInterval(this.resetTimer);
        }
        this.resetTimer = setInterval(() => this.setState({ clicks: 0 }), this.props.time);
      });
    }
  }

  resetTimer;

  render() {
    const { children, time, progressStyle, ...rest } = this.props;
    return (
      <Button {...rest} onClick={this.onClick}>
        {children}
        <Progress clicks={this.state.clicks} requiredClicks={this.props.requiredClicks} style={progressStyle} />
      </Button>
    );
  }
}

MultiClickBtn.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  progressStyle: PropTypes.object,
  requiredClicks: PropTypes.number,
  time: PropTypes.number
};

MultiClickBtn.defaultProps = {
  requiredClicks: 2,
  time: 200
};

export default MultiClickBtn;
