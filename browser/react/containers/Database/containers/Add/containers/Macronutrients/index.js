import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Container from 'components/Container';
import { submitMacronutrients } from 'containers/Database/actions';
import Form from './components/MacronutrientsForm';

/** A styled `div` component */
const Wrapper = styled(Container)`
  max-width: 500px;
`;

/** Form to add macronutrients */
export class Macronutrients extends React.Component {
  /** Validate prop types */
  static propTypes = {
    submitMacronutrients: PropTypes.func,
    database: PropTypes.object
  };

  /** Component state */
  state = {};

  /**
   * Add the new food
   * @param {React.SyntheticEvent} ev
   */
  onSubmitMacros = (data) => {
    const notSet = (param) => typeof param !== 'number';
    const { calories, protein, carbohydrates, fat } = data;
    if (notSet(calories) || notSet(protein) || notSet(carbohydrates) || notSet(fat)) {
      return;
    }
    if (calories <= 0 || protein < 0 || carbohydrates < 0 || fat < 0) {
      return;
    }
    this.props.submitMacronutrients({ ...data, ...this.props.database.add });
  };

  /** Display */
  render() {
    return (
      <Wrapper>
        <Form onSubmit={this.onSubmitMacros} />
      </Wrapper>
    );
  }
}

/** Map state to props */
const mapStateToProps = ({ database }) => ({ database });

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  submitMacronutrients: (requestBody) => dispatch(submitMacronutrients(requestBody))
});

export default connect(mapStateToProps, mapDispatchToProps)(Macronutrients);
