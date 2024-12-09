import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Button from 'components/Button';
import { handleAddDay } from './actions';

const AddIcon = styled(FontAwesome).attrs({ name: 'plus' })`
  color: ${(props) => props.theme.darkGreen};
`;

/** Add new day to meals list */
export class AddToMeals extends React.Component {
  /** Validate the prop types */
  static propTypes = {
    handleAddDay: PropTypes.func,
    day: PropTypes.string,
    meals: PropTypes.object,
    clickAddDay: PropTypes.func
  };

  /**
   * Change meal id
   * @param {React.SyntheticEvent} ev
   */
  onChangeMealId = (ev) => {
    this.setState({ mealId: ev.target.value });
  }

  /** Save the day */
  onSaveDay = () => {
    this.props.handleAddDay(this.props.meals.foods, this.props.day, this.props.meals.uuid);
    this.props.clickAddDay();
  }

  /** Display */
  render() {
    console.log(this.props);
    return (
      <Button
        default
        title="Add to Food Record"
        onClick={this.onSaveDay}
      >
        <AddIcon />
      </Button>
    );
  }
}

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  handleAddDay: (meals, day, uuid) => dispatch(handleAddDay(meals, day, uuid))
});

export default connect(null, mapDispatchToProps)(AddToMeals);
