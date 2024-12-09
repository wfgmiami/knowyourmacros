import React from 'react';
import PropTypes from 'prop-types';
import { Bar, Progress, Label } from './styled';

class ProgressBar extends React.Component {
  static propTypes = {
    percent: PropTypes.number,
    primary: PropTypes.bool,
    danger: PropTypes.bool
  };

  componentWillReceiveProps() {
  }

  render() {
    return (
      <Bar>
        <Progress
          primary={this.props.primary}
          danger={this.props.danger}
          progress={`${this.props.percent || 0}%`}
        />
      </Bar>
    );
  }
}

export default ProgressBar;
