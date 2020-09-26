import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductConfigurator from './configurator/ProductConfigurator';
import ConfiguratorOptions from './configurator/ConfiguratorOptions';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ProductConfigurator />
  </React.StrictMode>,
  document.getElementById('customiser-slider-section')
);

ReactDOM.render(
  <React.StrictMode>
    <ConfiguratorOptions />
  </React.StrictMode>,
  document.getElementById('customiser-options-section')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
