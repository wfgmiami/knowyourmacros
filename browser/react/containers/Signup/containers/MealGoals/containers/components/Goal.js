import React from 'react';
import PropTypes from 'prop-types';
import GoalsReport from 'containers/SetGoals/components/GoalsReport';

class Goal extends React.Component {
  componentWillReceiveProps(props) {
    if (this.props.input) {
      if (props.goals !== this.props.goals) {
        this.props.input.onChange(props.goals);
      }
    }
  }

  render() {
    const { input, title } = this.props;
    return (
      <GoalsReport goals={input.value} title={title} />
    );
  }
}

Goal.propTypes = {
  input: PropTypes.object,
  goals: PropTypes.array,
  title: PropTypes.string
};

export default Goal;
