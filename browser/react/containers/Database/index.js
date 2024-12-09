import React from 'react';
import { browserHistory } from 'react-router';
import Container from 'components/Container';
import Button from 'components/Button';
import Well from 'components/Well';
import { InputGroup } from 'components/FormComponents';
import Search from './containers/Search';
import Foods from './containers/Foods';

/** Database landing page */
class Database extends React.Component {
  navAddScreen = () => browserHistory.push('database/add')
  navMyFoods = () => browserHistory.push('database/my-foods')

  render() {
    return (
      <Container title="Database" subtitle="Search, Add Foods, and See Your Added Foods">
        <InputGroup>
          <Button block onClick={this.navAddScreen}>Add to the Database</Button>
          <Button block onClick={this.navMyFoods}>See my foods</Button>
        </InputGroup>
        <br />
        <br />
        <Well>
          <Search />
        </Well>
        <Foods />
      </Container>
    );
  }
}

export default Database;
