/*
 * REDUX STORE CONFIG
 */

import { createStore, applyMiddleware } from 'redux';
import { fetchFoodRecord } from 'containers/FoodRecord/actions';
import { getCalories } from 'containers/Home/actions';
import { getUser } from 'containers/User/actions';
import { exchangeTokenForUser } from 'containers/Login/actions';
import createSagaMiddleware from 'redux-saga';
import moment from 'moment';

import rootSaga from './rootSaga';
import reducer from './reducers';

/** the application state */

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  // sagaMiddleware,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

/** the user's identification */
export const token = localStorage.getItem('token');

if (token) {
  store.dispatch(fetchFoodRecord(moment(new Date()).format('YYYY-MM-DD'), token));
  store.dispatch(exchangeTokenForUser());
  // store.dispatch(getCalories(new Date()));
}

export default store;
