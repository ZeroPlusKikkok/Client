import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

render(
  <App />,
  document.getElementById('root'),
  //document.querySelector('#root'),
);

if (module && module.hot) {
  module.hot.accept();
}
