import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';

import history from './services/history';
import GlobalStyle from './styles/global';
import { store, persistor } from '~/store';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyle />
        <Router history={history}>
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
