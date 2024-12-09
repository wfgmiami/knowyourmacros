import { ADD_NAME_GROUP, ADD_NAME_GROUP_SUCCESS, ADD_NAME_GROUP_FAIL, ADD_SERVING, ADD_SERVING_SUCCESS, ADD_SERVING_FAIL, SUBMIT_NEW_FOOD, SUBMIT_NEW_FOOD_SUCCESS, SUBMIT_NEW_FOOD_FAIL, GET_USER_CREATED, GET_USER_CREATED_SUCCESS, GET_USER_CREATED_FAIL, GET_FOOD_MICRO, GET_FOOD_MICRO_SUCCESS, GET_FOOD_MICRO_FAIL } from 'containers/Database/constants';

/**
 * The initial state
 * @type {{ add: Object, userCreated: {loaded: boolean, list: Array} }}
 */
const initialState = {
  add: {},
  userCreated: {
    loaded: false,
    list: []
  },
  view: {
    food: {}
  }
};

/**
 * Database reducer
 * @param {initialState} state
 * @param {Object} action
 * @param {string} action.type
 */
const databaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NAME_GROUP:
      return state;
    case ADD_NAME_GROUP_SUCCESS:
      return {
        ...state,
        add: {
          ...state.add,
          main: action.main,
          sub: action.sub,
          group: action.group
        }
      };
    case ADD_NAME_GROUP_FAIL:
      return {
        ...state,
        add: {
          ...state.add,
          addNameGroupFail: action.error
        }
      };

    case ADD_SERVING:
      return state;
    case ADD_SERVING_SUCCESS:
      return {
        ...state,
        add: {
          ...state.add,
          servingSize: action.servingSize,
          servingDescription: action.servingDescription,
          servingWeight: action.servingWeight
        }
      };
    case ADD_SERVING_FAIL:
      return {
        ...state,
        add: {
          ...state.add,
          addServingFail: action.error
        }
      };

    case SUBMIT_NEW_FOOD:
      return state;
    case SUBMIT_NEW_FOOD_FAIL:
      return {
        ...state,
        add: {
          ...state.add,
          addMacronutrientsFail: action.error
        }
      };
    case SUBMIT_NEW_FOOD_SUCCESS:
      return initialState;

    case GET_USER_CREATED:
      return state;
    case GET_USER_CREATED_SUCCESS:
      return {
        ...state,
        userCreated: {
          list: action.foods,
          loaded: true
        }
      };
    case GET_USER_CREATED_FAIL:
      return {
        ...state,
        userCreated: {
          ...state.userCreated,
          error: action.error
        }
      };

    case GET_FOOD_MICRO:
      return state;

    case GET_FOOD_MICRO_SUCCESS:
      return {
        ...state,
        view: {
          food: action.food
        }
      };

    case GET_FOOD_MICRO_FAIL:
      return {
        ...state,
        view: {
          error: action.error
        }
      };

    default:
      return state;
  }
};

export default databaseReducer;
