import React, { Component } from 'react'
import ProductSlider from "../components/ProductSlider";
import ImageConfigurator from "./ImageConfigurator";
import ConfiguratorContextProvider from '../contexts/Configurator';

export class ProductConfigurator extends Component {
    render() {
        return (
            // <ConfiguratorContextProvider>
                // <ImageConfigurator />
                <ProductSlider />
            // </ConfiguratorContextProvider>
        )
    }
}

export default ProductConfigurator
