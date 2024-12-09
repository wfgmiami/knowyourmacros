import React from 'react';
import FlexWrapper from 'components/FlexWrapper';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from 'components/Text';

const Row = styled(FlexWrapper)`
  border-top: ${(props) => (props.noBorder ? 'none' : '1px solid #dedede')};
`;

const Col = styled.div`
  flex: ${(props) => (props.flex ? props.flex : 1)};
  text-align: ${(props) => (props.align ? props.align : 'left')};
  padding-left: 1em;
`;

const Info = ({ title, cal2000, cal2500 }) => (
  <Row>
    <Col><Text>{title}</Text></Col>
    <Col><Text color="copyGray">Less than</Text></Col>
    <Col><Text color="darkBlue">{cal2000}</Text></Col>
    <Col><Text color="darkBlue">{cal2500}</Text></Col>
  </Row>
);

Info.propTypes = {
  title: PropTypes.string,
  cal2000: PropTypes.string,
  cal2500: PropTypes.string,
}

/** Table with no props that shows max values based on 2000 and 2500 calorie diets */
const StandardTable = () => (
  <div>
    <Row noBorder>
      <Col flex="2" />
      <Col flex="2" align="center"><strong>Calories:</strong></Col>
    </Row>
    <Row noBorder>
      <Col flex="2" />
      <Col><strong>2,000</strong></Col>
      <Col><strong>2,500</strong></Col>
    </Row>
    <Info title="Total Fat" cal2000="65 g" cal2500="80 g" />
    <Info title="Sat Fat" cal2000="20 g" cal2500="25 g" />
    <Info title="Cholesterol" cal2000="300 mg" cal2500="300 mg" />
    <Info title="Sodium" cal2000="2,400 mg" cal2500="2,400 mg" />
    <Info title="Carbohydrate" cal2000="300 g" cal2500="375 g" />
    <Info title="Dietary Fiber" cal2000="25 g" cal2500="30 g" />
  </div>
);

export default StandardTable;
