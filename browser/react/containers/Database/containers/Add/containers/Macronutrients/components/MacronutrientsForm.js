import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { Input } from 'components/FormComponents';
import Button from 'components/Button';
import Well from 'components/Well';

/** Form to add macronutrients */
export class MacronutrientsForm extends React.Component { // eslint-disable-line
  static propTypes = {
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func
  };

  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Well>
          <Field
            component={Input}
            label="Calories"
            name="calories"
            type="number"
            min={0}
            max={3000}
          />
          <Field
            component={Input}
            label="Protein"
            name="protein"
            type="number"
            min={0}
            step={0.01}
            max={3000}
          />
          <Field
            component={Input}
            label="Carbohydrates"
            name="carbohydrates"
            type="number"
            min={0}
            step={0.01}
            max={3000}
          />
          <Field
            component={Input}
            label="Fat"
            name="fat"
            type="number"
            min={0}
            step={0.01}
            max={3000}
          />
        </Well>
        <Button color="blue">
          Submit
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'Macronutrients'
})(MacronutrientsForm);
