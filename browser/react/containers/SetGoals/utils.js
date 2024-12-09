/**
 * Calculate the carb and protein goal based on if the day is training and the goal
 * @param {boolean} training day is training day
 * @param {string} goal 'Lose Fat' or 'Gain Muscle'
 * @param {number} cGoal carb goal (g)
 * @param {number} pGoal fat goal (g)
 * @return {{ cGoal: number, pGoal: number }}
 */
const determinePCGoals = (training, goal, cGoal, pGoal) => {
  let carbs = cGoal;
  let protein = pGoal;
  if (training) {
    if (goal === 'Lose Fat') {
      carbs -= 60;
    }
    if (goal === 'Gain Muscle') {
      protein += 75;
    }
  } else {
    if (goal === 'Lose Fat') {
      carbs -= 100;
    }
    if (goal === 'Gain Muscle') {
      protein += 25;
    }
  }
  return { cGoal: carbs, pGoal: protein };
};

/**
 * Count the number of workouts (should only be 1) and meals, give the index of the workout
 * @param {Array} schedule
 * @return {{ numWorkouts: number, workoutIndex: number, numMeals: number }}
 */
const numCount = (schedule) => {
  let numWorkouts = 0;
  let workoutIndex;
  let numMeals = 0;
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i] === 'Workout') {
      numWorkouts++;
      workoutIndex = i;
    } else {
      numMeals++;
    }
  }

  return { numWorkouts, workoutIndex, numMeals };
};

/**
 * Calculat ethe goals
 * @param {Array} schedule
 * @param {{ fGoal: number }} goals
 * @param {boolean} training
 * @param {string} goal
 * @param {number} cGoali
 * @param {number} pGoali
 */
export const getGoals = (schedule, goals, training, goal, cGoali, pGoali) => {
  const { fGoal } = goals;
  const { cGoal, pGoal } = determinePCGoals(training, goal, cGoali, pGoali);

  const meals = {
    six: [40, 37, 53, 60, 44, 20],
    five: [40, 37, 53, 60, 44, 0],
    four: [44, 0, 60, 53, 40, 0],
    three: [40, 0, 53, 0, 44, 0]
  };

  const { numMeals, numWorkouts, workoutIndex } = numCount(schedule);
  let arr;
  switch (numMeals) {
    case 6:
      arr = meals.six;
      break;
    case 5:
      arr = meals.five;
      break;
    case 4:
      arr = meals.four;
      break;
    case 3:
      arr = meals.three;
      break;
    default:
      arr = meals.three;
      break;
  }

  let inc = 0;
  for (let i = 0; i < 6; i++) {
    if (numWorkouts > 0) {
      if (arr[i] === 0) {
        continue;
      }
      if (inc === workoutIndex) {
        // Swap the relative size of the post-workout meal and the largest meal
        const mSub = arr[i];
        const max = Math.max.apply(null, arr);
        const maxIndex = arr.indexOf(max);

        arr[maxIndex] = mSub;
        arr[i] = max;
      }
      inc++;
    }
  }

  const total = arr.reduce((memo, item) => memo + item, 0);
  return arr.map((size, ix) => ({
    id: ix,
    pGoal: Math.round((pGoal * size * 10) / total) / 10,
    cGoal: Math.round((cGoal * size * 10) / total) / 10,
    fGoal: Math.round((fGoal * size * 10) / total) / 10
  }));
};
