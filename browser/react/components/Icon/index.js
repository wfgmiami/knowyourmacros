/**
*
* Icon
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import icons from './icons.json';
/**
 * A styled `svg` element
 * @type {React.Component}
 */
const Svg = styled.svg`
  cursor: ${(props) => (props.onClick ? 'pointer' : 'inherit')};
  width: ${(props) => props.width || '50px'};
  height: ${(props) => props.height || '50px'};
`;
/**
 * An icon which fits the viewBox to the svg
 * @class
 */
class Icon extends React.Component {
  /** Component state */
  state = {
    viewBox: {
      x: 100,
      y: 100,
      width: 1000,
      height: 1000
    }
  };

  /** Set the viewbox size */
  componentDidMount() {
    const vb = Object.values(this.elms).reduce((memo, el) => {
      const bbox = el.getBBox();
      return {
        x: memo.x > bbox.x ? memo.x : bbox.x,
        y: memo.y > bbox.y ? memo.y : bbox.y,
        width: memo.width > bbox.width ? memo.width : bbox.width,
        height: memo.height > bbox.height ? memo.height : bbox.height,
      };
    }, { x: 0, y: 0, width: 0, height: 0 });
    this.setState({ viewBox: vb }); // eslint-disable-line
  }

  /**
   * Make a reference
   * @param {string} name
   * @param {Element} el
   */
  setRef = (name, el) => {
    this.elms[name] = el;
  }

  /** Element map for reference */
  elms = {};

  render() {
    const { icon, fill = '#000', stroke, strokeWidth, height = '1em', width = '1em', ...props } = this.props;
    const { viewBox } = this.state;
    let sWidth = 0;
    if (strokeWidth && (strokeWidth.length || strokeWidth > 0)) {
      const viewWidth = viewBox.width - viewBox.x;
      sWidth = (strokeWidth * 1) * (viewWidth / 100);
    }

    let paths = icons[icon];
    if (!Array.isArray(paths)) {
      paths = [paths];
    }

    const vb = `${viewBox.x - sWidth} ${viewBox.y - sWidth} ${viewBox.width + (sWidth * 2)} ${viewBox.height + (sWidth * 2)}`;

    return (
      <Svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox={vb} height={height} width={width} title={this.props.title}>
        {paths.map((path) => (
          <path
            ref={(el) => this.setRef(path, el)}
            key={path}
            d={path}
            stroke={stroke || fill}
            strokeWidth={sWidth}
            fill={fill}
          />
        ))}
      </Svg>
    );
  }
}

Icon.propTypes = {
  fill: PropTypes.string,
  strokeWidth: PropTypes.string,
  stroke: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.string,
  icon: PropTypes.string.isRequired,
  props: PropTypes.object,
  onClick: PropTypes.func
};

export default Icon;
