import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import Container from 'components/Container';
import ListGroup from 'components/ListGroup';
import Badge from 'components/Badge';
import { getList } from './actions';
import { makeList, convertWeight } from './list-logic';

/** The shopping list */
export class List extends React.Component {
  /** Validate prop types */
  static propTypes = {
    getList: PropTypes.func,
    list: PropTypes.array
  };

  /** Setup the component */
  constructor(props) {
    super();
    props.getList(new Date());
  }

  /** Today */
  startDate = moment().format('dddd, D MMMM Y');
  /** One week from startDate */
  endDate = moment().add(6, 'days').format('dddd, D MMMM Y');

  render() {
    const { list } = this.props;
    if (!list) return null;
    const renderList = makeList(list);
    return (
      <Container title="Shopping List" subtitle={`${this.startDate} - ${this.endDate}`}>
        {Object.keys(renderList).map((group) => (
          <div key={group}>
            <h4>{group}</h4>
            <ListGroup>
              {renderList[group].map((record) => (
                <div key={record.id}>
                  <Link to={`/database/view/${record.abbrev.id}`}>
                    {record.abbrev.longname}
                  </Link>
                  <Badge>{convertWeight(record)}</Badge>
                </div>))
              }
            </ListGroup>
          </div>))
        }
      </Container>
    );
  }
}

/** Map state to props */
const mapStateToProps = ({ shoppinglist }) => ({
  list: shoppinglist.list
});

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  getList: (date) => dispatch(getList(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
