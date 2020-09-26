import React, { Component } from 'react'
import ImageConfigurator from "./ImageConfigurator";
import ConfiguratorContextProvider from '../contexts/Configurator';

export class ProductConfigurator extends Component {
    render() {
        return (
            // <ConfiguratorContextProvider>
                <ImageConfigurator />
            // </ConfiguratorContextProvider>
        )
    }
}

export default ProductConfigurator
