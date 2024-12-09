import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Polygon = styled.polygon`
  transition: transform 500ms ease-in-out;
`;

class Logo extends React.PureComponent {
  static animateStart = {
    topTriangle: 'translate(0px, 0px)',
    bottomRightTriangle: 'translate(0px, 0px)',
    bottomLeftTriangle: 'translate(0px, 0px)'
  };

  static animateEnd = {
    topTriangle: 'translate(0px, -5px)',
    bottomLeftTriangle: 'translate(-4.33px, 2.5px)',
    bottomRightTriangle: 'translate(4.33px, 2.5px)'
  };

  static animations = {
    clamp: () => {
      let ix = 0;
      return () => {
        ix += 1;
        if (ix % 2) {
          return ({
            topTriangle: 'translate(0px, 0px)',
            bottomRightTriangle: 'translate(0px, 0px)',
            bottomLeftTriangle: 'translate(0px, 0px)'
          });
        }
        return ({
          topTriangle: 'translate(0px, -5px)',
          bottomLeftTriangle: 'translate(-4.33px, 2.5px)',
          bottomRightTriangle: 'translate(4.33px, 2.5px)'
        });
      };
    },
    rotateOuter: (angle = 120) => {
      let currentAngle = 0;
      return () => {
        currentAngle += angle;
        return ({
          topTriangle: `rotate(${currentAngle}deg)`,
          bottomRightTriangle: `rotate(${currentAngle}deg)`,
          bottomLeftTriangle: `rotate(${currentAngle}deg)`
        });
      };
    }
  };

  state = {};

  componentDidMount() {
    if (this.props.animation) {
      this.animate(this.props.animation);
    }
  }

  componentWillReceiveProps(props) {
    if (props.animation !== this.props.animation) {
      this.animate(props.animation);
    }
  }

  componentWillUnmount() {
    this.animateStop();
  }

  timer = null;

  animate = (name) => {
    this.animateStop();
    if (Logo.animations[name]) {
      const fn = Logo.animations[name]();
      this.setState(fn());
      this.timer = setInterval(() => {
        this.setState(fn());
      }, 1000);
    } else {
      this.animateStop();
    }
  }

  animateStop = () => {
    if (this.timer) clearInterval(this.timer);
    this.setState(Logo.animateStart);
  }

  render() {
    const { height, width } = this.props;
    return (
      <svg width="800" height="800" viewBox="0 0 100 100" style={{ height, width }}>
        <g transform="translate(50, 50)">
          <circle cx="0" cy="0" stroke="black" r="30" fill="white" />
          <circle cx="0" cy="0" stroke="black" r="26.66" fill="white" />
          <Polygon points="43.30127018922194,-25 -43.301270189221924,-25 0,50" stroke="black" fill="white" />
          <circle cx="0" cy="0" stroke="black" r="20" fill="white" />
          <circle cx="0" cy="0" stroke="black" r="16.66" fill="white" />
          <circle cx="0" cy="0" stroke="black" r="13.33" fill="white" />
          <circle cx="0" cy="0" stroke="white" r="10" fill="white" />
          <Polygon points="43.30127018922194,-25 0,-10 -43.301270189221924,-25 43.30127018922194,-25" style={{ transform: this.state.topTriangle }} fill="rgba(255,0,0,1)" />
          <Polygon points="-43.30127018922194,-25 -8.665,5 0,50" fill="rgba(0,150,0,1)" style={{ transform: this.state.bottomLeftTriangle }} />
          <Polygon points="0,50 8.66,5 43.30127018922194,-25" fill="rgba(0,0,255,1)" style={{ transform: this.state.bottomRightTriangle }} />
          <Polygon points="43.30127018922194,-25 -43.301270189221924,-25 0,50" stroke="black" fill="rgba(0,0,0,0)" />
        </g>
      </svg>
    );
  }
}

Logo.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  animation: PropTypes.string
};

export default Logo;
