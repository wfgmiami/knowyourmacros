import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFoods } from 'containers/Database/actions';
import Form from './components/SearchForm';

/** Find foods with more precision */
export class DatabaseSearch extends React.PureComponent {
  /**
   * @param {string} search
   * @param {number} offset
   */
  handleSubmit = (vals) => {
    this.props.fetchFoods(vals.searchVal, 0, vals);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} />
    );
  }
}

DatabaseSearch.propTypes = {
  fetchFoods: PropTypes.func
};

const mapStateToProps = ({ foodrecord }) => ({
  searchResults: foodrecord.foodSearchResults,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFoods: (searchVal, offset, extra) => dispatch(fetchFoods(searchVal, offset, extra))
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseSearch);
