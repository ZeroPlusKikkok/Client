import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

render(
  <App />,
  document.getElementById('root'),
  //document.querySelector('#root'),
);

if (module && module.hot) {
  module.hot.accept();
}
