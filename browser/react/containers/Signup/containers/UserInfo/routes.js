import UserInfo from './index';
import Gender from './containers/Gender';
import Birthdate from './containers/Birthdate';
import ActivityLevel from './containers/ActivityLevel';
import AccountInfo from './containers/AccountInfo';
import Goal from './containers/Goal';
import Height from './containers/Height';
import Weight from './containers/Weight';
import Units from './containers/Units';

/** @type {{ path: string, component: React.Component }} */
const routes = {
  path: 'user-info',
  component: UserInfo,
  childRoutes: [
    {
      path: 'gender',
      component: Gender
    },
    {
      path: 'goal',
      component: Goal
    },
    {
      path: 'birthdate',
      component: Birthdate
    },
    {
      path: 'activity-level',
      component: ActivityLevel
    },
    {
      path: 'units',
      component: Units
    },
    {
      path: 'weight',
      component: Weight
    },
    {
      path: 'height',
      component: Height
    },
    {
      path: 'account-info',
      component: AccountInfo
    }
  ]
};

export default routes;
