import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Select, Input, InputGroup } from 'components/FormComponents';
import Button from 'components/Button';
import HorizontalLoader from 'components/Loader/Horizontal';
import FlexWrapperBase from 'components/FlexWrapper';
import { groupsObj } from 'components/foodGroups';
import { handleAddFoodRecord, addFavorite, removeFavorite } from '../actions';

const groups = groupsObj({ height: '1.5em', width: '1.5em' });

const FlexWrapper = FlexWrapperBase.extend`
  cursor: pointer;
  justify-content: flex-start;
`;

const Wrapper = styled.div`
  padding: 0.5rem;
  :hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.mediumGray};
  }
`;

const validate = (checkAgainst, foodname) => (val, allVals) => {
  if (!allVals.food || !allVals.food[foodname]) {
    return undefined;
  }
  if (!val && allVals.food[foodname][checkAgainst]) {
    return 'Required';
  }
  return undefined;
};

/** Form to add the food record with quantity */
export class SelectFoodComponent extends React.Component {
  static propTypes = {
    addFavorite: PropTypes.func,
    removeFavorite: PropTypes.func,
    favorites: PropTypes.object,
    food: PropTypes.object,
    isFavorite: PropTypes.bool,
    addMeal: PropTypes.object
  };
  constructor(props) {
    super();
    this.state = {
      showForm: false,
      isFavorite: props.isFavorite
    };
    this.quantityValidate = validate('unit', `-${props.food.id}-`);
    this.weightValidate = validate('quantity', `-${props.food.id}-`);
  }

  toggleForm = () => {
    this.setState((state) => ({
      showForm: !state.showForm
    }));
  }

  /** Add or remove favorite status */
  handleFavorite = (ev) => {
    ev.stopPropagation();
    const { food, addMeal, favorites } = this.props;
    if (this.state.isFavorite) {
      this.props.removeFavorite(food.id, addMeal.id, favorites);
      this.setState({ isFavorite: false });
    } else {
      this.props.addFavorite(food.id, addMeal.id, favorites);
      this.setState({ isFavorite: true });
    }
  }

  inputForm = () => {
    return (
      <div>
        <InputGroup>
          <Field
            component={Input}
            noMargin
            name="quantity"
            type="number"
            min="0"
            max="500"
            step="0.01"
            validate={this.quantityValidate}
          />
          <Field
            component={Select}
            name="unit"
            noMargin
            validate={this.weightValidate}
          >
            {this.props.food.weights.map((weight) => (
              <option key={weight.Seq} value={weight.Seq}>
                {weight.normalized.txt}
              </option>))}
          </Field>
          <Button>
            Submit
          </Button>
        </InputGroup>
      </div>
    )
  }

  render() {
    const { food, submitting } = this.props;
    const { foodDesc: { FdGrp_Cd } } = food;
    return (
      <Wrapper>
        <FlexWrapper align="stretch" onClick={this.toggleForm}>
          <span title={`${this.state.isFavorite ? 'Remove from' : 'Add to'} Favorites`}>
            <FontAwesome
              name="heart"
              height="20"
              width="20"
              style={{ color: this.state.isFavorite ? 'rgb(85,136,170)' : 'rgba(0, 0, 0, 0.2)', cursor: 'pointer' }}
              strokeWidth="7"
              stroke="hsl(204,33.3%,35%)"
              onClick={this.handleFavorite}
            />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {groups[FdGrp_Cd < 1000 ? `0${FdGrp_Cd}` : `${FdGrp_Cd}`].icon}
          &nbsp;
          <div>
            <b>{food.Main}</b> - {food.Sub}
          </div>
        </FlexWrapper>
        {this.state.showForm && (
          submitting ? <HorizontalLoader height="1rem" width="100px" /> : this.inputForm()
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ root, foodrecord }) => ({
  addMeal: foodrecord.addMeal,
  day: root.date,
  favorites: foodrecord.favorites,
  searchResults: foodrecord.foodSearchResults
});

const mapDispatchToProps = (dispatch) => ({
  handleAddFoodRecord: (record, date) => dispatch(handleAddFoodRecord(record, date)),
  addFavorite: (abbrevId, meal, favorites) => dispatch(addFavorite(abbrevId, meal, favorites)),
  removeFavorite: (abbrevId, meal, favorites) => dispatch(removeFavorite(abbrevId, meal, favorites))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectFoodComponent);
