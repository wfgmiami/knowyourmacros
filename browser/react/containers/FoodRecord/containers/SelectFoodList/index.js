import React from 'react';
import { connect } from 'react-redux';
import { isSubmitting } from 'redux-form';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Form, { FORM_NAME } from './SelectFoodForm';
import { addFoodRecord } from '../../actions';
import { FORM_NAME as SearchFoodsFormName } from '../SearchFoods/SearchFoodsForm';

const Wrapper = styled.div``;

/** The form to search for foods to add */
export class SelectFoodList extends React.PureComponent {
  onSubmit = (data) => {
    if (data.food) {
      const toSend = Object.keys(data.food).map((key) => ({
        ...data.food[key],
        abbrev_id: key.replace(/-/g, ''),
        date: this.props.day.format('YYYY-MM-DD'),
        meal: this.props.addMeal
      }));
      this.props.handleAddFoodRecord(toSend, this.props.day);
    }
  }

  render() {
    const { favorites, addMeal, searchResults, searching } = this.props;
    return (
      <Wrapper>
        <Form
          onSubmit={this.onSubmit}
          favorites={favorites}
          addMeal={addMeal}
          searchResults={searchResults}
          searching={searching}
        />
      </Wrapper>
    );
  }
}

SelectFoodList.propTypes = {
  day: PropTypes.object,
  handleAddFoodRecord: PropTypes.func,
  searchResults: PropTypes.object,
  favorites: PropTypes.object,
  addMeal: PropTypes.number,
  searching: PropTypes.bool
};

const mapStateToProps = ({ root, foodrecord, foods, form }) => ({
  day: root.date,
  favorites: foodrecord.favorites,
  addMeal: foodrecord.addMeal.id,
  searchResults: foods,
  searching: isSubmitting(SearchFoodsFormName)({ form })
});

const mapDispatchToProps = (dispatch) => ({
  handleAddFoodRecord: (record, date) => dispatch(addFoodRecord(record, date, FORM_NAME)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectFoodList);
