import React from 'react';
import Well from 'components/Well';
import Container from 'components/Container';
import H1 from 'components/H1';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

const P = styled.p`
  line-height: 1.5em;
`;

/** About Section */
const AboutSection = () => (
  <Container>
    <Well>
      <H1 centered>Why You Should Track Your Macronutrients </H1>
      <Wrapper>
        <P>
          If you're trying to lose "The Last 10 Pounds" and you've been struggling for a long time, you need to change your diet to take control. When you know your macronutrients, you determine your fitness. If you're eating without understanding macronutrients, you're flying blind.
        </P>
        <P>
        The tools offered on this website will help give you an understanding of how much protein, carbohydrates, and fat are in your food. It may surprise you to learn which foods are high in different macronutrients.
        </P>
        <P>
          Losing or gaining weight is an energy (read "calorie") equation, but whether that weight is muscle or fat is a function of exercise and correct amounts of macronutrients. There is no point in losing weight if most of it comes from lean body mass.
        </P>
      </Wrapper>
    </Well>
  </Container>
);

export default AboutSection;
