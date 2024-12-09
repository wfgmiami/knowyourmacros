import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import FlexWrapper from 'components/FlexWrapper';
import Button from 'components/Button';
import { Input, Select, Dropdown } from 'components/FormComponents';
import foodGroups from 'components/foodGroups';
import brands from 'components/brands';

const required = (value) => (value ? undefined : 'Required');

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
  icon: PropTypes.object,
  name: PropTypes.string
};

const Margin = styled.div`
  margin-top: 1em;
`;

/** Find foods */
export class SearchForm extends React.PureComponent {
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          component={Input}
          validate={[required]}
          label="Search"
          name="searchVal"
        />
        <Margin>
          <Field component={Dropdown} name="group" label="Filter by Food Group" optionWidth="25%">
            {foodGroups({ height: '25px', width: '25px' }).map((grp) => (
              <Group key={grp.group} value={grp.group} name={grp.name} icon={grp.icon} style={{ textAlign: 'center', fontSize: '10pt' }} />
            ))}
          </Field>
        </Margin>
        <Margin>
          <Field component={Select} name="brand" label="Filter by Brand Name">
            <option value={0}>Brands</option>
            {brands.map((brand) => <option key={brand}>{brand}</option>)}
          </Field>
        </Margin>
        <Margin>
          <FlexWrapper align="center">
            <Field component={Input} label="Percent Protein" type="number" name="proteinPer" />
            <Field component={Input} label="Percent Carbs" type="number" name="carbsPer" />
            <Field component={Input} label="Percent Fat" type="number" name="fatPer" />
          </FlexWrapper>
        </Margin>
        <Margin>
          <Button color="blue">
            Search
          </Button>
        </Margin>
      </form>
    );
  }
}

/** Validate prop types */
SearchForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func
};

export default reduxForm({
  form: 'database-search',
  touchOnBlur: true,
  touchOnChange: true
})(SearchForm);
