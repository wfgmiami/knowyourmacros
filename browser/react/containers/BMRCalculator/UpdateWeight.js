import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeightCollapse from 'components/HeightCollapse';
import Button from 'components/Button';
import { CSSTransitionGroup } from 'react-transition-group';
import { Input, InputGroup } from 'components/FormComponents';
import { updateWeight } from './actions';

/** An input for the user to add a weight record */
export class UpdateWeight extends React.Component {
  /** Component state */
  state = {
    weight: ''
  };

  /**
   * Control the input
   * @param {Event} ev
   */
  changeWeight = (ev) => {
    this.setState({ weight: ev.target.value });
  }

  /**
   * Submit the form
   * @param {Event} ev
   */
  submitForm = (ev) => {
    ev.preventDefault();
    this.props.updateWeight(this.props.user.userMeasurements[0], this.state.weight, this.props.user, this.props.date);
  }

  render() {
    const { date, user } = this.props;
    const day = Math.floor((date - new Date(user.programs[0].startDate)) / 86400000);
    return (
      <CSSTransitionGroup
        transitionName="collapse"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      >
        {(!(day % 7) && day !== 0) && (
          <HeightCollapse ms={200} key={1} height="34px">
            <form onSubmit={this.submitForm}>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="Update Weight"
                  step="0.1"
                  value={this.state.weight}
                  onChange={this.changeWeight}
                />
                <Button color="darkBlue">
                Submit
                </Button>
              </InputGroup>
            </form>
          </HeightCollapse>
        )}
      </CSSTransitionGroup>
    );
  }
}

UpdateWeight.propTypes = {
  user: PropTypes.object,
  updateWeight: PropTypes.func,
  date: PropTypes.object
};

/** Get props from redux state */
const mapsStateToProps = ({ root, user }) => ({
  user,
  date: root.date
});

/** Get dispatch functions */
const mapDispatchToProps = (dispatch) => ({
  /**
   * @param {Object} measurements
   * @param {number} newWeight
   * @param {userType} user
   * @param {string} date
   */
  updateWeight: (measurements, newWeight, user, date) => dispatch(updateWeight(measurements, newWeight, user, date))
});

export default connect(mapsStateToProps, mapDispatchToProps)(UpdateWeight);
