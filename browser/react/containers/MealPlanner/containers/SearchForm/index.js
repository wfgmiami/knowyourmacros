import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchFood } from 'containers/MealPlanner/actions';
import Form from './components/SearchForm';

/**
 * The search form
 * @param {Object} props
 * @param {string} props.searchVal
 * @param {function} props.changeSearchTerm
 */
export class SearchForm extends React.Component {
  onSearch = (formData) => {
    if (formData.searchVal !== this.props.lastSearch) {
      this.props.searchFood(formData.searchVal);
    }
  }

  render() {
    const { lastSearch } = this.props;
    return (
      <div>
        <Form onSubmit={this.onSearch} lastSearch={lastSearch} initialValues={{ lastSearch }} />
      </div>
    );
  }
}

SearchForm.propTypes = {
  searchFood: PropTypes.func,
  lastSearch: PropTypes.string
};

/** Map state to props */
const mapStateToProps = ({ mealplanner }) => ({
  retainedFoods: mealplanner.retainedFoods,
  lastSearch: mealplanner.lastSearch
});

const mapDispatchToProps = (dispatch) => ({
  searchFood: (searchTerm) => dispatch(searchFood(searchTerm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
