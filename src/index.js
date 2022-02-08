import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import './fonts/circe.ttf';
import './fonts/circe_bold.ttf';
import './fonts/circe_extrabold.ttf';
import './fonts/circe_light.ttf';
import './fonts/circe_extralight.ttf';
import App from './App';
import store from "./redux/store"
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

