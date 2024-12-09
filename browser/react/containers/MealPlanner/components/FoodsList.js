import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Button from 'components/Button';
import Text from 'components/Text';
import Badge from 'components/Badge';
import { retainFood } from 'containers/MealPlanner/actions';

const InfoBtn = Button.extend`
  border-right: none;
`;

const Wrapper = styled.div`
  & + & {
    margin-top: 0.25em;
  }
`;

/** The list of foods */
export class FoodsList extends React.Component {
  /**
   * Select a food
   * @param {abbrevType} fd
   */
  selectFood = (fd) => {
    const { retainedFoods } = this.props;
    if (retainedFoods.filter((rfd) => rfd.id === fd.id).length) {
      return;
    }
    this.props.retainFood(fd);
    // if (this.props.retainedFoods.length > 3) {
    //   checkPossibility({
    //     foods: this.props.retainedFoods,
    //     goals: this.state
    //   });
    // }
  }

  render() {
    const { searchedFoods } = this.props;
    if (!searchedFoods || !searchedFoods.length) {
      return (
        <div style={{ border: '1px dashed gray', padding: '25px' }}>
          <Text color="copyGray">Searched Foods Will Appear Here</Text>
        </div>
      );
    }

    let main = null;
    const list = searchedFoods.map((fd) => {
      let title = null;
      if (fd.Main.toLowerCase() !== (main && main.toLowerCase())) {
        main = fd.Main;
        title = (<h3>{fd.Main}</h3>);
      }
      return (
        <Wrapper key={fd.id}>
          {title}
          <InfoBtn onClick={() => browserHistory.push(`/database/view/${fd.id}`)} title="View Detail">
            <FontAwesome name="info-circle" />
          </InfoBtn>
          <Button onClick={() => this.selectFood(fd)} key={fd.id}>
            {fd.Sub}
          </Button>
          <Badge>{fd.maxMacro}</Badge>
        </Wrapper>
      );
    });
    return (
      <div>
        {list}
      </div>
    );
  }
}

FoodsList.propTypes = {
  searchedFoods: PropTypes.array,
  retainedFoods: PropTypes.array,
  retainFood: PropTypes.func
};

/** Map state to props */
const mapStateToProps = ({ mealplanner }) => ({
  searchedFoods: mealplanner.searchedFoods.rows,
  retainedFoods: mealplanner.retainedFoods
});

const mapDispatchToProps = (dispatch) => ({
  retainFood: (food) => dispatch(retainFood(food))
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodsList);
