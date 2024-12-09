import api from 'utils/api';
import { GET_FOOD_MICRO, GET_FOOD_MICRO_SUCCESS, GET_FOOD_MICRO_FAIL } from '../../constants';

export const getFood = (id) => (dispatch) => {
  dispatch({ type: GET_FOOD_MICRO });
  return api.get(`/api/foodmicro/${id}`)
    .then(({ data }) => {
      dispatch({ type: GET_FOOD_MICRO_SUCCESS, food: data });
    })
    .catch((error) => {
      dispatch({ type: GET_FOOD_MICRO_FAIL, error });
    });
};
