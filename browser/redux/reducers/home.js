import api from 'utils/api';

import { RECEIVE_USER, RECEIVE_PROGRAMS } from '../constants';

/**
 * @param {Object} state
 * @param {{ type: string }} action
 */
const homeReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default homeReducer;

/**
 * Get the user information
 */
export const fetchUserInfo = () => (dispatch) => api
  .get('/api/user')
  .then(({ data }) => {
    dispatch({ type: RECEIVE_USER, payload: { ...data, password: null } });
  });

  /**
   * Get the user's fitness programs
   */
export const fetchPrograms = () => (dispatch) => api
  .get('/api/programs')
  .then(({ data }) => {
    dispatch({ type: RECEIVE_PROGRAMS, payload: data });
  });

