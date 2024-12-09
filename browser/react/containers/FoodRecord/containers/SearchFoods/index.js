import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { searchFood } from 'containers/Foods/actions';
import FlexWrapper from 'components/FlexWrapper';
import Icon from 'components/Icon';
import Form, { FORM_NAME } from './SearchFoodsForm';
import { HIDE_MODAL } from '../../constants';

const Wrapper = styled.div``;

/** The form to search for foods to add */
export class SelectFoodContainer extends React.Component {
  componentWillMount = () => {
    const { searchResults } = this.props;
    if (searchResults && typeof searchResults.count === 'number') {
      /** Reset the offset list */
      this.offsetList = [];
      if (searchResults.count > 50) {
        for (let i = 0; i < Math.ceil(searchResults.count / 50); i++) {
          this.offsetList.push({
            offset: i,
            query: searchResults.query
          });
        }
      }
    }
  }

  /** Make list of offsets to enable display of pagination */
  componentWillReceiveProps = (newProps) => {
    const { searchResults } = newProps;
    if (searchResults && typeof searchResults.count === 'number') {
      /** Reset the offset list */
      this.offsetList = [];
      if (searchResults.count > 50) {
        for (let i = 0; i < Math.ceil(searchResults.count / 50); i++) {
          this.offsetList.push({
            offset: i,
            query: searchResults.query
          });
        }
      }
    }
  }

  /** List of offsets to enable display of pagination */
  offsetList = [];

  handleSubmit = (data) => {
    this.searchFoods(data.searchVal);
  }

  hideModal = (ev) => {
    ev.stopPropagation();
    this.props.hideModal();
  }

  /**
   * @param {string} search
   * @param {number} offset
   */
  searchFoods(search, offset, ev) {
    if (ev) {
      ev.stopPropagation();
    }
    this.props.searchFoods(search, offset || 0);
  }

  render() {
    const { addMeal, day } = this.props;
    return (
      <Wrapper>
        <FlexWrapper align="stretch">
          <strong className="modal-title">
            {day.format('dddd, D MMMM YYYY')}
          </strong>
          <strong className="modal-title">
            {addMeal.name}
          </strong>
          <Icon icon="cross" fill="gray" onClick={this.hideModal} />
        </FlexWrapper>
        <div style={{ marginTop: '1rem' }}>
          <Form onSubmit={this.handleSubmit} />
        </div>
      </Wrapper>
    );
  }
}

SelectFoodContainer.propTypes = {
  addMeal: PropTypes.object,
  day: PropTypes.object,
  searchFoods: PropTypes.func,
  hideModal: PropTypes.func,
  searchResults: PropTypes.object
};

/** Map state to props */
const mapStateToProps = ({ root, foodrecord, foods }) => ({
  addMeal: foodrecord.addMeal,
  day: root.date,
  searchResults: foods
});

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  searchFoods: (val, offset) => dispatch(searchFood(val, offset, FORM_NAME)),
  hideModal: () => dispatch({ type: HIDE_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectFoodContainer);
