import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import map from '../map';
import mapMicro from '../mapMicro';
import Row from './Row';
import CaloriesRow from './CaloriesRow';
import StandardTable from './StandardTable';
import { Section, BlackSpace } from '../styled';

const Wrapper = styled.div`
  background-color: #fff;
`;

/**
 * Display the nutrition information
 * @param {Object} props
 * @param {abbrevType} props.food
 * @param {Function} props.calculate100
 * @param {Function} props.calculateMicro
 * @param {Function} props.calculatePercent
 */
const NutrientTable = ({ food, calculate100, calculateMicro, calculatePercent }) => (
  <Wrapper>
    <Section className="list-group-item">
      <h3>Nutrition Facts</h3>
    </Section>
    <BlackSpace />
    <Section className="list-group-item b-border-bottom">
      <CaloriesRow
        calories={calculate100('Calories')}
        caloriesFromFat="54"
      />
    </Section>
    <Section>
      <div style={{ fontSize: '10.5pt', textAlign: 'right' }}>% Daily Value*</div>
    </Section>
    {map
      .filter((item) => food[item.key] || food.abbrevMicro[item.key])
      .map((item) => (
        <Section key={item.key}>
          <Row
            major
            nutrient={item.macro}
            amount={`${item.location ? calculateMicro(item.key) : calculate100(item.key)} ${item.unit}`}
            percent={calculatePercent(item)}
          />
          {item.sub && item.sub.filter((sub) => food[sub.key] || food.abbrevMicro[sub.key]).map((sub) => (
            <Row
              indent
              key={sub.key}
              nutrient={sub.macro}
              amount={`${sub.location ? calculateMicro(sub.key) : calculate100(sub.key)} ${sub.unit}`}
              percent={calculatePercent(sub)}
            />
          ))}
        </Section>
      )
      )}
    <BlackSpace />
    <Section>
      {mapMicro
        .filter((micro) => food.abbrevMicro[micro.key])
        .map((micro) => (
          <Row
            key={micro.key}
            nutrient={micro.name}
            percent={calculatePercent(micro)}
          />)
        )
      }
    </Section>
    <BlackSpace />
    <Section>
      * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie
      needs:
      <StandardTable />
    </Section>
  </Wrapper>
);

NutrientTable.propTypes = {
  food: PropTypes.object,
  calculate100: PropTypes.func,
  calculateMicro: PropTypes.func,
  calculatePercent: PropTypes.func
};

export default NutrientTable;
