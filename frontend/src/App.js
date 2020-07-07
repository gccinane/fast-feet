import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';

import history from './services/history';
import GlobalStyle from './styles/global';
import store from '~/store';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
