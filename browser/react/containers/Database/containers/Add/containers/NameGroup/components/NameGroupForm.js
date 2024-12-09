import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';
import Button from 'components/Button';
import { Select, Input, Dropdown } from 'components/FormComponents';
import foodGroups from 'components/foodGroups';
import validate from './validation';

/** A styled `div` component */
const Margin = styled.div`
  margin-top: 1rem;
`;

export const Group = ({ selected, icon, name, ...rest }) => {
  return (
    <div {...rest}>
      <div style={selected ? { backgroundColor: 'rgba(0, 255, 0, 0.07)', padding: '8px' } : { padding: '8px' }}>
        {icon}
        <br />
        <span style={selected ? { color: 'green' } : {}}>{name}</span>
      </div>
    </div>
  );
};

Group.propTypes = {
  selected: PropTypes.bool,
  icon: PropTypes.string,
  name: PropTypes.name
};

/** Specify the new food name and group */
export class NameGroup extends React.PureComponent {
  /** Display */
  render() {
    const { handleSubmit, onSubmit, getFoodGroup } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field component={Input} label="General Description" name="main" />
        <Field component={Input} label="Specific Description" name="sub" />
        <Margin>
          <Field component={Dropdown} name="group" label="Food Group" optionWidth="25%">
            {foodGroups({ height: '25px', width: '25px' }).map((grp) => (
              <Group key={grp.group} value={grp.group} name={grp.name} icon={grp.icon} style={{ textAlign: 'center', fontSize: '10pt' }} />
            ))}
          </Field>
          <div>
            {this.props.suggestedGroup.name}
          </div>
          <div>
            <small><a onClick={getFoodGroup}>Suggest a group</a></small>
          </div>
        </Margin>
        <Margin>
          <Button>
            Continue
          </Button>
        </Margin>
      </form>
    );
  }
}

NameGroup.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  getFoodGroup: PropTypes.func,
  suggestedGroup: PropTypes.object
};

export const FORM_NAME = 'name-group';

export default reduxForm({
  form: FORM_NAME,
  validate
})(NameGroup);
