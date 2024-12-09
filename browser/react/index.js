import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { browserHistory, Router } from 'react-router';
import theme from 'theme/index';
import { Provider } from 'react-redux';
import store from '../redux/store';
import routes from './routes';
import './global-styles';

/** The main application */
export const App = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={browserHistory} routes={routes} />
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(App, document.getElementById('app'));
