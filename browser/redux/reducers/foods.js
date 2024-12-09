import { SEARCH_FOOD, SEARCH_FOOD_SUCCESS } from 'containers/Foods/constants';

const initialState = {
  rows: [],
  count: 0,
  query: '',
  offset: 0
};

const foodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_FOOD:
      return state;

    case SEARCH_FOOD_SUCCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default foodsReducer;
