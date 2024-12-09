import { UPDATE_ACCOUNT_INFO, UPDATE_ACCOUNT_INFO_SUCCESS, UPDATE_ACCOUNT_INFO_FAIL } from 'containers/Signup/constants';

/** Initial state */
const initialState = {

};

/**
 * Signup reducer
 * @param {Object} state
 * @param {{ type: string }} action
 */
const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACCOUNT_INFO:
      return state;
    case UPDATE_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        ...action.accountInfo
      };
    case UPDATE_ACCOUNT_INFO_FAIL:
      return {
        ...state,
        errors: action.errors
      };
    default:
      return state;
  }
};

export default signupReducer;
