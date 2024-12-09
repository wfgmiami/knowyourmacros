import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateFood, calculateFood } from 'reducers/fpdietgenerator';
import Well from 'components/Well';
import FlexWrapper from 'components/FlexWrapper';
import Button from 'components/Button';
import Container from 'components/Container';
import NutrientsSection from '../NutrientsSection';
import MealSection from '../MealSection';
import filteredMeals from '../../../../../../filteredmeals.json';
import { Wrapper, HalfCol, GetRecommendation } from './styled';
import Goal from './components/Goal';
import GenderAge from './components/GenderAge';
import Height from './components/Height';
import Weight from './components/Weight';
import Lifestyle from './components/Lifestyle';
import createNutrients from './utils/createNutrients';
import cmHeight from './utils/cmHeight';

/** Inputs section */
export class InputsSection extends Component {
  /** Validate prop types */
  static propTypes = {
    calculateFood: PropTypes.func,
    meal: PropTypes.array,
    generatedFoods: PropTypes.array,
    error: PropTypes.bool
  };

  /** Component state */
  state = {
    age: '',
    gender: 'Male',
    height: '',
    cmheight: '',
    hunit: 'feet\' inches',
    weight: '',
    wunit: 'lbs',
    lifestyle: 'Normal',
    goal: 'lose 4 pounds in 1 month',
    BMR: '',
    recommendation: {
      calories: null,
      protein: null,
      carbs: null,
      fat: null,
      foodChoice: null
    },
    generatedFood: filteredMeals
  };

  /** @param {React.SyntheticEvent} ev */
  onCreateMeals = (ev) => {
    if (ev) {
      ev.preventDefault();
    }

    this.props.calculateFood({
      proteinGoal: this.state.recommendation.protein,
      carbGoal: this.state.recommendation.carbs,
      fatGoal: this.state.recommendation.fat
    });
  }

  /** @param {React.SyntheticEvent} ev */
  onCreateNutrients = (ev) => {
    if (ev) {
      ev.preventDefault();
    }

    const { lifestyle, goal, height, gender, weight } = createNutrients(this.state);

    this.setState({
      lifestyle,
      goal,
      BMR: Math.round(((10 * weight) + (625 * height) + gender) - (5 * this.state.age))
    }, this.calculateRecommendation);
  }

  /** @param {React.SyntheticEvent} ev */
  onHeightChange = (ev) => {
    const { value } = ev.target;
    const height = cmHeight(value);
    this.setState(height);
  }

  /** @param {string} param */
  change = (param) => (ev) => {
    const obj = {};
    obj[param] = ev.target.value;
    this.setState(obj);
  }

  /** Calculate the recommendation */
  calculateRecommendation = () => {
    const { BMR, lifestyle, goal } = this.state;

    const calories = Math.round((BMR * lifestyle) + goal);
    const protein = Math.round((calories * 0.3) / 4);
    const carbs = Math.round((calories * 0.4) / 4);
    const fat = Math.round((calories * 0.3) / 9);

    this.setState({
      recommendation: {
        calories,
        protein,
        carbs,
        fat
      }
    });
  }

  /** Display */
  render() {
    return (
      <Container>
        <Well>
          <FlexWrapper>
            <HalfCol>
              <Wrapper>
                <Goal
                  goal={this.state.goal}
                  onChange={this.change('goal')}
                />
              </Wrapper>
              <Wrapper>
                <GenderAge
                  gender={this.state.gender}
                  age={this.state.age}
                  onChangeGender={this.change('gender')}
                  onChangeAge={this.change('age')}
                />
              </Wrapper>
              <Wrapper>
                <Height
                  height={this.state.height}
                  onChangeHeight={this.onHeightChange}
                  units={this.state.hunit}
                />
              </Wrapper>
              <Wrapper>
                <Weight
                  weight={this.state.weight}
                  units={this.state.wunit}
                  onChangeUnits={this.change('wunit')}
                  onChangeWeight={this.change('weight')}
                />
              </Wrapper>
              <Wrapper>
                <Lifestyle
                  lifestyle={this.state.lifestyle}
                  onChangeLifestyle={this.change('lifestyle')}
                />
              </Wrapper>
            </HalfCol>

            <HalfCol>
              <GetRecommendation info onClick={this.onCreateNutrients}>
                <strong>Get Recommendation</strong>
              </GetRecommendation>
              <NutrientsSection diet={this.state.recommendation} />
            </HalfCol>
          </FlexWrapper>
          <div>
            {this.state.BMR && (
              <Button info onClick={this.onCreateMeals}>
                <strong>
                  Create My Diet
                </strong>
              </Button>
            )}
            {this.state.BMR && this.props.meal.length > 0 && (
              <MealSection
                foods={this.props.generatedFoods}
                meal={this.props.meal}
                error={this.props.error}
              />
            )}
          </div>
        </Well>
      </Container>
    );
  }
}

/** Map state to props */
const mapStateToProps = ({ fpdietgenerator }) => ({
  generatedFoods: fpdietgenerator.generatedFoods,
  meal: fpdietgenerator.meal,
  error: fpdietgenerator.error
});

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  generateFood: (foodChoice) => dispatch(generateFood(foodChoice)),
  calculateFood: (params) => dispatch(calculateFood(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(InputsSection);
