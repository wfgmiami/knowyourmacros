import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import database from './database';
import home from './home';
import foods from './foods';
import fpdietgenerator from './fpdietgenerator';
import foodrecord from './foodrecord';
import mealplanner from './mealplanner';
import meals from './meals';
import microreport from './microreport';
import rootReducer from './root';
import shoppinglist from './shoppinglist';
import signup from './signup';
import user from './user';

/**
 * Reducers to be combined
 */
export const combinedReducers = {
  database,
  home,
  fpdietgenerator,
  foods,
  foodrecord,
  form: formReducer,
  mealplanner,
  meals,
  microreport,
  root: rootReducer,
  shoppinglist,
  signup,
  user
};

export default combineReducers(combinedReducers);

