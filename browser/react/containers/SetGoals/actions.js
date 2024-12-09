import { SAVE_GOALS } from './constants';

export const saveGoals = ({ trainingGoals, restingGoals }) => ({ type: SAVE_GOALS, trainingGoals, restingGoals });
