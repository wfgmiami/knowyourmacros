/** @module dispatch/SetGoals */

import { all, put, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { getUserSuccess } from 'containers/User/actions';
import { SAVE_GOALS } from './constants';

/**
 * Save the user's goals to the database
 * @param {object} param0
 * @param {Array<{pGoal: number, cGoal: number, fGoal: number}>} param0.trainingGoals
 * @param {Array<{pGoal: number, cGoal: number, fGoal: number}>} param0.restingGoals
 * @async
 * @return {Promise}
 */
export const saveGoals = function* saveGoals({ trainingGoals, restingGoals }) {
  let train = trainingGoals.reduce((memo, meal) => {
    const mm = { ...memo };
    mm[meal.id] = {
      protein: meal.pGoal,
      carbs: meal.cGoal,
      fat: meal.fGoal
    };
    return mm;
  }, {});

  let rest = restingGoals.reduce((memo, meal) => {
    const mm = { ...memo };
    mm[meal.id] = {
      protein: meal.pGoal,
      carbs: meal.cGoal,
      fat: meal.fGoal
    };
    return mm;
  }, {});

  const goalTemplate = { protein: 0, carbs: 0, fat: 0 };

  for (let i = 0; i < 6; i++) {
    if (!train[i]) {
      train[i] = { ...goalTemplate };
    }
    if (!rest[i]) {
      rest[i] = { ...goalTemplate };
    }
  }

  train = Object.values(train);
  rest = Object.values(rest);

  const { data } = yield api.post('/api/goals/meals', { train, rest });
  yield put(getUserSuccess(data));
};

const setGoalsSaga = function* setGoalsSaga() {
  yield all([
    takeLatest(SAVE_GOALS, saveGoals)
  ]);
};

export default setGoalsSaga;
