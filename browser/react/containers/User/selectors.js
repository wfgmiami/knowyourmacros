import { createSelector } from 'reselect';

const selectUserDomain = () => (state) => state.user;

export const makeSelectUser = () => createSelector(
  selectUserDomain(),
  (substate) => substate
);
