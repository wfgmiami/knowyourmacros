import Database from 'containers/Database';
import AddRoutes from './containers/Add/routes';
import MyFoodsRoutes from './containers/MyFoods/routes';
import ViewFoodRoutes from './containers/ViewFood/routes';

/** @type {{ path: string, indexRoute: {component: React.Component}, childRoutes: Array }} */
const routes = {
  path: 'database',
  indexRoute: {
    component: Database,
  },
  childRoutes: [
    AddRoutes,
    MyFoodsRoutes,
    ViewFoodRoutes
  ]
};

export default routes;
