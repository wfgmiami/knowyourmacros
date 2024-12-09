import { combineReducers } from 'redux';

import home from './home';
import rootReducer from './root';
import foodrecord from './foodrecord';
import mealplanner from './mealplanner';
import shoppinglist from './shoppinglist';
import meals from './meals';
import fpdietgenerator from './fpdietgenerator';

export default combineReducers({
  home,
  foodrecord,
  mealplanner,
  root: rootReducer,
  shoppinglist,
  meals,
  fpdietgenerator
});

