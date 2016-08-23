import React from 'react'
import { render } from 'react-dom'
import 'jquery'
import Root from './js/containers/Root'
import configureStore from './js/store/configureStore';

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('container')
);
