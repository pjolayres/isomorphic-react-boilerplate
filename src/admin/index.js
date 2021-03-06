import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; // TODO: Use HashRouter if BrowserRouter is not supported (in static build)
import App from './app';
import configurStore from './state/configureStore';
import './assets/sass/style.scss';

const store = configurStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
