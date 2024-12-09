import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import debounce from 'utils/debounce';
import Container from 'components/Container';
import H3 from 'components/H3';
import Well from 'components/Well';
import { submitNameGroup } from 'containers/Database/actions';
import Form, { FORM_NAME } from './components/NameGroupForm';

/** Specify the new food name and group */
export class NameGroup extends React.Component {
  /** Validate prop types */
  static propTypes = {
    submitNameGroup: PropTypes.func,
    formValues: PropTypes.object
  }

  /** Debounce getFoodGroup method */
  constructor() {
    super();

    this.getFoodGroup = this.getFoodGroup.bind(this);
    this.getFoodGroup = debounce(this.getFoodGroup, 700);
  }

  /** Application state */
  state = {
    main: '',
    sub: '',
    suggestedGroup: {},
  };

  /** Fetch the most appropriate group from the backend */
  getFoodGroup() {
    const { formValues } = this.props;
    if (formValues && formValues.values && formValues.values.main) {
      const { main } = formValues.values;
      if (main.length < 3) {
        return;
      }
      axios.get('/api/database/foodgroup', {
        params: {
          food: main.split(', ')
        }
      })
        .then(({ data }) => this.setState({
          suggestedGroup: data
        }))
        .catch(() => {
          this.setState({ suggestedGroup: {
            group: null,
            name: 'No group could be found'
          } });
        });
    }
  }

  /** Display */
  render() {
    return (
      <Container>
        <H3>Add to the Database</H3>
        <hr />
        <Well>
          <Form
            onSubmit={this.props.submitNameGroup}
            formValues={this.props.formValues}
            getFoodGroup={this.getFoodGroup}
            suggestedGroup={this.state.suggestedGroup}
          />
        </Well>
      </Container>
    );
  }
}

const mapStateToProps = ({ form }) => ({
  formValues: form[FORM_NAME]
});

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  submitNameGroup: (data) => dispatch(submitNameGroup(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(NameGroup);
