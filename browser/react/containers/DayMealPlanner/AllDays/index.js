import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import Day from '../Day';

/** The shopping list */
export class AllDays extends React.Component {
  /** Validate prop types */
  static propTypes = {
    shoppinglist: PropTypes.array,
    date: PropTypes.object,
    confirmWeek: PropTypes.func
  };

  /** Component state */
  state = {
    confirmAll: false
  };

  /** Confirm all meals */
  confirmAll = () => {
    this.props.confirmWeek(this.props.shoppinglist, this.props.date);
    this.setState({ confirmAll: true });
  }

  /** Display */
  render() {
    const { date, shoppinglist } = this.props;
    const followingDay = (numDays) => date.add(numDays, 'days').format('YYYY-MM-DD');
    return (
      <div>
        <CSSTransitionGroup
          transitionName="fade"
          transitionAppear
          transitionAppearTimeout={100}
          transitionLeaveTimeout={100}
          transitionEnterTimeout={100}
        >
          {
            shoppinglist.map((day, ix) => (day &&
              <Day day={ix} key={ix} index={ix} isConfirmed={this.state.confirmAll} date={followingDay(ix)} />
            ))
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}


/** Map state to props */
const mapStateToProps = ({ shoppinglist, root }) => ({
  shoppinglist: shoppinglist.shoppinglist,
  date: root.date
});

export default connect(mapStateToProps)(AllDays);
