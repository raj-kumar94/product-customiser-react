import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSlider from './components/slider/ProductSlider';
import ConfiguratorOptions from './components/options/ConfiguratorOptions';
import GridsConfigurator from './components/grid/GridsConfigurator';
import * as serviceWorker from './serviceWorker';
import ConfiguratorContextProvider from './contexts/Configurator';

const CUSTOMISER_SLIDER_SECTION = document.getElementById('customiser-slider-section');
const CUSTOMISER_OPTIONS_SECTION = document.getElementById('customiser-options-section');
const CUSTOMISER_GRIDS_SECTION = document.getElementById('viewGrid');


const ProductSliderPortal = () => ReactDOM.createPortal(<ProductSlider />, CUSTOMISER_SLIDER_SECTION);
const ConfiguratorOptionsPortal = () => ReactDOM.createPortal(<ConfiguratorOptions />, CUSTOMISER_OPTIONS_SECTION);
const GridsConfiguratorPortal = () => ReactDOM.createPortal(<GridsConfigurator />, CUSTOMISER_GRIDS_SECTION);
class Container extends React.Component {
  render() {
    return <>
    <ConfiguratorContextProvider>
      <ProductSliderPortal />
      <ConfiguratorOptionsPortal />
      <GridsConfiguratorPortal />
    </ConfiguratorContextProvider>
    </>
  }
}


ReactDOM.render(
  <React.StrictMode>
    <Container />
  </React.StrictMode>,
  document.getElementById('customiser-options-section')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
