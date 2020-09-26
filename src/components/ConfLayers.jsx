import React, { Component } from 'react';
import { ConfiguratorContext } from "../contexts/Configurator";
import SwatchOptions from "./SwatchOptions";

class ConfLayers extends Component {

    static contextType = ConfiguratorContext;

    render() {

        const { productData } = this.context;
        const configurations = productData.product.configuration;
        
        return (
            <div className="prod-custom-accordion-wrapper">
                {
                configurations.layer.map( (layer, index) => {
                    return <SwatchOptions key={`layer-${index}`} tabIndex={index} layer={layer} />
                })
                }
            </div>
        )
    }
}

export default ConfLayers;