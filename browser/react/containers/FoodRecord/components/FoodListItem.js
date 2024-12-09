import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CSSTransitionGroup } from 'react-transition-group';
import HeightCollapse from 'components/HeightCollapse';
import Label from 'components/Label';
import Icon from 'components/Icon';
import FontAwesome from 'react-fontawesome';
import FlexWrapper from 'components/FlexWrapper';
import { groupsObj } from 'components/foodGroups';
import { FlexW } from './styled';
import ModifyRecordForm from '../containers/ModifyRecordForm';
import { removeFoodRecordItem, confirmRecord } from '../actions';

const groups = groupsObj({ height: '1em', width: '1em' });

const Column = FlexW.extend`
  flex-direction: column;
  height: ${(props) => props.height};
  align-items: flex-end;
`;

const Wrapper = styled.div`
  cursor: initial;
`;

const SmallGray = styled.span`
  font-size: 0.7em;
  color: gray;
`;

const Trash = styled(FontAwesome)`
  cursor: pointer;
  color: #000;
  &:hover {
    color: darkred;
  }
`;

/** Food list item */
export class FoodListItem extends React.Component {
  static propTypes = {
    destroyRecord: PropTypes.func,
    confirmFoodRecord: PropTypes.func,
    food: PropTypes.object,
    date: PropTypes.object
  };

  state = {
    updating: false,
    showingQuants: false
  };

  /** Toggle updating */
  changeUpdating = () => {
    this.setState({ updating: !this.state.updating });
  }

  /** Toggle display of other quantity variations */
  toggleQuants = () => {
    this.setState({ showingQuants: !this.state.showingQuants });
  }

  destroyRecord = () => {
    const { food, date } = this.props;
    this.props.destroyRecord([food.id], date);
  }

  confirmRecord = () => {
    const { food, date } = this.props;
    this.props.confirmFoodRecord([food.id], date);
  }

  render() {
    const { food } = this.props;
    const { showingQuants } = this.state;
    const allQuants = getQuantities(food);

    const { abbrev, confirmed, Main, Sub, Quantity, Unit, foodDesc: { FdGrp_Cd } } = food;

    return (
      <Wrapper onClick={(ev) => ev.stopPropagation()}>
        <FlexWrapper align="stretch">
          <FlexWrapper align="stretch">
            <Trash name="trash" onClick={this.destroyRecord} />
            {!confirmed && (
              <span>
                &nbsp;
                <FontAwesome name="check-circle" onClick={this.confirmRecord} title="I ate this" />
              </span>
            )}
            &nbsp;
            {groups[FdGrp_Cd < 1000 ? `0${FdGrp_Cd}` : `${FdGrp_Cd}`].icon}
            <span style={{ paddingLeft: '15px' }} onClick={this.toggleQuants}>
              <Link to={`/database/view/${abbrev.id}`}>{Main}, {Sub}</Link>
            </span>
          </FlexWrapper>
          <div>
            {this.state.updating
              ? <ModifyRecordForm
                record={food}
                changeUpdating={this.changeUpdating}
              />
              : <Label
                primary
                style={{ cursor: 'pointer' }}
                onClick={this.changeUpdating}
              >
                {Quantity} {Unit}
              </Label>}
          </div>
        </FlexWrapper>
        <CSSTransitionGroup
          transitionName="collapse"
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}
        >
          {showingQuants &&
            <HeightCollapse
              key={allQuants}
              ms={100}
              height={`${allQuants.length * 1.3}rem`}
            >
              <Column height={`${allQuants.length * 1.3}rem`}>
                {allQuants.map((quantity) => (
                  <Label info key={quantity}>
                    {quantity}
                  </Label>
                )
                )}
              </Column>
            </HeightCollapse>
          }
        </CSSTransitionGroup>
        {!allQuants.length
          ? null
          : <div
            onClick={this.toggleQuants}
            style={{ cursor: 'pointer', textAlign: 'center' }}
          >
            <SmallGray>show</SmallGray>
            {' '}
            <Icon fill="gray" height="0.7rem" width="0.7rem" icon={`chevron-${showingQuants ? 'up' : 'down'}`} />
            {' '}
            <SmallGray>{showingQuants ? 'less' : 'more'}</SmallGray>
          </div>}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ root }) => ({
  date: root.date
});

const mapDispatchToProps = (dispatch) => ({
  destroyRecord: (id, date) => dispatch(removeFoodRecordItem(id, date)),
  confirmFoodRecord: (id, date) => dispatch(confirmRecord(id, date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodListItem);

/**
 * @param {{ Gr: number, abbrev: { weights: Array<{Description: string, Unit: string, Description: string, Amount: number, Gr_Wgt: number}> }}} record
 * @return {Array<string>}
 */
function getQuantities(record) {
  const grams = record.Gr;

  const quants = record.abbrev.weights.filter((weight) => weight.Description !== record.Unit && weight.Description !== 'g').map((weight) => {
    const amount = Math.round((grams / (weight.Amount * 1) / (weight.Gr_Wgt * 1)) * 10) / 10;
    return `${amount} ${weight.Description}`;
  });

  if (record.Unit !== 'g') {
    quants.push(`${grams} g`);
  }

  return quants;
}

