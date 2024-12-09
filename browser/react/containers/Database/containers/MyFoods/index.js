import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Icon from 'components/Icon';
import Container from 'components/Container';
import FadeInOut from 'components/FadeInOut';
import { getUserCreatedFoods, deleteUserCreatedFoods } from 'containers/Database/actions';
import { Row, FoodCol, IconCol, MacroWrapper, MacroCol } from './styled';

/** Display the foods created by the user */
export class MyFoods extends React.Component {
  static propTypes = {
    getUserCreatedFoods: PropTypes.func,
    deleteUserCreatedFoods: PropTypes.func,
    userCreated: PropTypes.object
  };

  componentWillMount() {
    this.props.getUserCreatedFoods();
  }

  render() {
    const { userCreated } = this.props;
    return (
      <Container title="My Foods">
        <Row>
          <IconCol><strong>Delete</strong></IconCol>
          <FoodCol><strong>Description</strong></FoodCol>
          <MacroWrapper>
            <MacroCol><strong>Calories</strong></MacroCol>
            <MacroCol><strong>Protein</strong></MacroCol>
            <MacroCol><strong>Carbohydrates</strong></MacroCol>
            <MacroCol><strong>Fat</strong></MacroCol>
          </MacroWrapper>
        </Row>
        <FadeInOut>
          {userCreated.list.map((food) => (
            <Row key={food.id}>
              <IconCol>
                <Icon icon="cross" fill="#f00" onClick={() => this.props.deleteUserCreatedFoods(food.id)} />
              </IconCol>
              <FoodCol>
                <Link to={`/database/view/${food.id}`}>{food.longname}</Link>
              </FoodCol>
              <MacroWrapper>
                <MacroCol>{food.Calories}</MacroCol>
                <MacroCol>{food.Protein}</MacroCol>
                <MacroCol>{food.Carbohydrates}</MacroCol>
                <MacroCol>{food.Fat}</MacroCol>
              </MacroWrapper>
            </Row>
          ))}
        </FadeInOut>
      </Container>
    );
  }
}

const mapStateToProps = ({ database }) => ({
  userCreated: database.userCreated
});

const mapDispatchToProps = (dispatch) => ({
  getUserCreatedFoods: () => dispatch(getUserCreatedFoods()),
  deleteUserCreatedFoods: (id) => dispatch(deleteUserCreatedFoods(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFoods);
