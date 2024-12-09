import lifestyleVal from './lifestyleVal';
import calDifferential from './calDifferential';

const createNutrients = ({ gender, cmheight, lifestyle, goal, wunit, weight }) => {
  let cnWeight;
  let cnGender;
  if (gender === 'Male') {
    cnGender = 5;
  } else {
    cnGender = -161;
  }
  const height = cmheight / 100;

  if (wunit === 'lbs') {
    cnWeight = weight * 0.45359237;
  } else {
    cnWeight = weight;
  }

  const cnLifestyle = lifestyleVal(lifestyle);
  const cnGoal = calDifferential(goal);

  return {
    weight: cnWeight,
    gender: cnGender,
    height,
    lifestyle: cnLifestyle,
    goal: cnGoal
  };
};

export default createNutrients;
