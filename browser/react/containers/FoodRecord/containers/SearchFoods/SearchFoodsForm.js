import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { required, minLength, createValidator } from 'utils/validation';
import { Input, InputGroup } from 'components/FormComponents';
import Button from 'components/Button';

export const FORM_NAME = 'search-foods';

/** The form to search for foods to add */
export class SearchFoodsContainer extends React.Component { // eslint-disable-line
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup align="stretch">
          <Field
            label="Search Terms:"
            component={Input}
            name="searchVal"
          />
          <Button color="darkBlue">Submit</Button>
        </InputGroup>
      </form>
    );
  }
}

SearchFoodsContainer.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func
};

export default reduxForm({
  form: FORM_NAME,
  validate: createValidator({
    searchVal: [required, minLength(3)]
  })
})(SearchFoodsContainer);
