import { getToken } from './index';
import axios from 'axios';

import { RECEIVE_MEALS } from '../constants';

const initialState = {
  meals: []
};

export default (state = initialState, action) => {
  state = Object.assign({}, state);
  switch (action.type) {

  case RECEIVE_MEALS:
    state.meals = action.payload;
    break;

  default:
    break;
  }
  return state;
};

export const getMeals = ({ keyword, meals, postWorkout }) => dispatch => {
  return axios.get('/api/meal', { params: { token: getToken(), keyword, meals, postWorkout } })
    .then(({ data }) => dispatch({ type: RECEIVE_MEALS, payload: data }));
};

