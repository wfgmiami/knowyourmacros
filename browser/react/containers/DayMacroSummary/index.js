import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from 'utils/multiStageForm';
import calculateDayMacros from 'containers/FoodRecord/utils/calculateDayMacros';
import ReactHighcharts from 'react-highcharts';
import { Left, Right, Wrapper } from './styled';
import pieData from './pieData';

/**
 * Display the nutrient and amount
 * @param {Object} props
 * @param {React.Component} props.children
 * @param {number} props.number
 */
const Row = ({ children, number }) => (
  <div>
    <strong>{children}:</strong> {number}
  </div>
);

Row.propTypes = {
  children: PropTypes.node,
  number: PropTypes.string
};

/**
 * Display the macronutrients for the day
 * @param {Object} props
 * @param {Array<foodrecordType>} props.foodrecord
 */
export const DayMacroSummary = ({ foodrecord }) => {
  const { raw, percentCals } = calculateDayMacros(foodrecord);

  return (
    <Wrapper>
      <Form.Consumer>
        {(value) => console.log(value)}
      </Form.Consumer>
      <Left>
        <Row number={`${raw.calories}`}>Calories</Row>
        <Row number={`${raw.protein} g`}>Protein</Row>
        <Row number={`${raw.carbs} g`}>Carbs</Row>
        <Row number={`${raw.fat} g`}>Fat</Row>
      </Left>
      <Right>
        {raw.calories
          ? <strong>Percent Calories:</strong>
          : null
        }
        {percentCals.calories
          ? (
            <div style={{ height: '120px', maxWidth: '120px', margin: 'auto' }}>
              <ReactHighcharts config={pieData(raw)} />
            </div>
          )
          : null
        }
      </Right>
    </Wrapper>
  );
};

DayMacroSummary.propTypes = {
  foodrecord: PropTypes.array
};

/** Map state to props */
const mapStateToProps = ({ foodrecord }) => ({ foodrecord: foodrecord.record });

export default connect(mapStateToProps)(DayMacroSummary);
