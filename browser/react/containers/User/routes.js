import User from './index';
import UpdateAccountInfo from './containers/UpdateAccountInfo';

const routes = {
  path: 'profile',
  component: User,
  childRoutes: [
    {
      path: 'update',
      component: UpdateAccountInfo
    }
  ]
};

export default routes;
