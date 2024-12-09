// Boilerplate
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';

// Global components
import Well from 'components/Well';
import ProgressBar from 'components/ProgressBar';
import Logo from 'components/Logo';
import H3 from 'components/H3';
import Container from 'components/Container';
import FlexWrapper from 'components/FlexWrapper';
import Text from 'components/Text';
import FadeInOut from 'components/FadeInOut';

// Actions
import { login } from 'containers/Login/actions';
import { signup } from '../../actions';

// Local components
import { Wrapper } from './styled';
import ProgressListItem from './components/ProgressListItem';
import progressMap from './progressMap';

export const FORM_NAME = 'account-info';

export class SignupForm extends Component {
  static propTypes = {
    formValues: PropTypes.object,
    children: PropTypes.node,
    signup: PropTypes.func
  };

  state = {
    percentComplete: 0
  }

  submit = () => {
    const { formValues } = this.props;
    const next = progressMap(formValues);
    this.setState({ percentComplete: next.percentComplete });
    if (next.path) {
      browserHistory.push(next.path);
    } else {
      this.props.signup(formValues);
    }
  }

  render() {
    const { children, formValues } = this.props;
    return (
      <Container>
        <Text centered>
          <Logo height="80px" width="80px" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
        </Text>
        <FlexWrapper align="flex-start">
          <Wrapper>
            <FadeInOut>
              <ProgressListItem
                title="Gender"
                done={formValues && formValues.gender}
                to="/signup/user-info/gender"
              />
              <ProgressListItem
                title="Lifestyle"
                done={formValues && formValues.lifestyle}
                to="/signup/user-info/activity-level"
              />
              <ProgressListItem
                title="Goal"
                done={formValues && formValues.goal}
                to="/signup/user-info/goal"
              />
              <ProgressListItem
                title="Units"
                done={formValues && formValues.units}
                to="/signup/user-info/units"
              />
              <ProgressListItem
                title="Height"
                done={formValues && formValues.height}
                to={formValues && formValues.units ? '/signup/user-info/height' : '/signup/user-info/units'}
              />
              <ProgressListItem
                title="Weight"
                done={formValues && formValues.weight}
                to={formValues && formValues.units ? '/signup/user-info/weight' : '/signup/user-info/units'}
              />
              <ProgressListItem
                title="Birthdate"
                done={formValues && formValues.birthdate}
                to="/signup/user-info/birthdate"
              />
              <ProgressListItem
                title="Account Info"
                done={formValues && formValues.password}
                to="/signup/user-info/account-info"
              />
            </FadeInOut>
          </Wrapper>
          <Wrapper>
            <Well>
              <H3 centered>Tell Us About Yourself</H3>
              <Text small centered color="darkBlue">We need this information to calculate your ideal calorie intake</Text>
              <div style={{ margin: '1rem 0rem' }}>
                <ProgressBar percent={this.state.percentComplete} />
              </div>
              {React.cloneElement(children, { formValues, progressMap, submit: this.submit })}
            </Well>
          </Wrapper>
          <Wrapper />
        </FlexWrapper>
      </Container>
    );
  }
}

/** Map state to props */
const mapStateToProps = ({ root, form }) => ({
  invalidLogin: root.invalidLogin,
  formValues: getFormValues(FORM_NAME)({ form })
});

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(login(credentials)),
  signup: (formData) => dispatch(signup(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
