import React from 'react';
import PropTypes from 'prop-types';
import { FormSection, reduxForm } from 'redux-form';
import styled from 'styled-components';
import Loader from 'components/Loader';
import SelectFood from '../../components/SelectFood';


const Wrapper = styled.div``;
export const FORM_NAME = 'select-food-list';

/** The form to search for foods to add */
export function SelectFoodContainer({ addMeal, searchResults, favorites, handleSubmit, onSubmit, searching, submitting }) {
  console.log('SelectFoodContainer', submitting);
  if (searching) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Loader size="150px" label="Searching" />
      </div>
    );
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection name="food">
          <div>
            {favorites[addMeal] && Object.keys(favorites[addMeal]).map((key) => (
              <div key={key}>
                <FormSection
                  component={SelectFood}
                  food={favorites[addMeal][key]}
                  isFavorite
                  name={`-${key}-`}
                />
              </div>
            )
            )}
            {searchResults.rows.filter((food) => !(favorites[addMeal] && favorites[addMeal][food.id])).map((food) => (
              <div key={food.id}>
                <FormSection
                  component={SelectFood}
                  food={food}
                  name={`-${food.id}-`}
                  submitting={submitting}
                />
              </div>
            )
            )}
          </div>
        </FormSection>
      </form>
    </Wrapper>
  );
}

SelectFoodContainer.propTypes = {
  addMeal: PropTypes.number,
  favorites: PropTypes.object,
  searchResults: PropTypes.object,
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: FORM_NAME,
  enableReinitialize: true
})(SelectFoodContainer);
