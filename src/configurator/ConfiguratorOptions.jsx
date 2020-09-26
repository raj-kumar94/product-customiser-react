import React, { Component } from 'react';
// import ConfiguratorContextProvider from '../contexts/Configurator';
import ConfLayers from "../components/ConfLayers";

class ConfiguratorOptions extends Component {
    render() {
        return (
            // <ConfiguratorContextProvider>
            <div>
                <h1>Options here</h1>
                <ConfLayers />
            </div>
            // </ConfiguratorContextProvider>
        )
    }
}

export default ConfiguratorOptions
