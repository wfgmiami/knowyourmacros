import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';
import Button from 'components/Button';

import SearchFoods from './SearchFoods';
import { HIDE_MODAL } from '../constants';
import SelectFoodList from './SelectFoodList';

/** A styled `div` component */
const Wrapper = styled.div``;

const OffsetBtn = styled(Button)`
  &:not(:first-child) {
    border-left: none;
  }
`;

/** The form to search for foods to add */
export class SelectFoodContainer extends React.Component {
  state = {
    searchVal: ''
  };

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

  hideModal = (ev) => {
    ev.stopPropagation();
    this.props.hideModal();
  }

  render() {
    const { searchResults } = this.props;
    return (
      <Wrapper>
        <SearchFoods />
        {searchResults && searchResults.rows.length > 0 &&
          <div>
            Showing {(searchResults.offset * 50) + 1} - {((searchResults.offset * 50) + 50) > searchResults.count ? searchResults.count : ((searchResults.offset * 50) + 50)} of {searchResults.count} foods matching your query
            {this.offsetList.length > 0 && <div>
              {this.offsetList.map((offList) => (
                <OffsetBtn
                  key={offList.offset}
                  disabled={offList.offset === searchResults.offset}
                  onClick={(ev) => this.fetchFoods(searchResults.query, offList.offset, ev)}
                >
                  {offList.offset + 1}
                </OffsetBtn>
              ))}
            </div>}
          </div>
        }
        <SelectFoodList />
      </Wrapper>
    );
  }
}

SelectFoodContainer.propTypes = {
  hideModal: PropTypes.func,
  searchResults: PropTypes.object
};

const mapStateToProps = ({ root, foodrecord, foods }) => ({
  addMeal: foodrecord.addMeal,
  day: root.date,
  searchResults: foods
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch({ type: HIDE_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectFoodContainer);
