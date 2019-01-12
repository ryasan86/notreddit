// libs
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
// firebase
import * as firebase from 'firebase';
import { config } from '../../environment/config.js';
// components
import App from './components/app.jsx';
import { store, persistor } from './reducers/index.jsx';
// css
import './index.scss';

// firebase
firebase.initializeApp(config);

render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);
