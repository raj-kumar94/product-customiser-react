import React, { Component } from 'react'
import { ConfiguratorContext } from '../contexts/Configurator';


function SwatchOptionProperties(props) {
    const tabIndex = props.tabIndex || 0;
    const property = props.property;

    return (
        <div className="swatch clearfix" data-option-index="0">
            <input id={property._id} type="radio" name="option-0" aria-label={property.property_obj.title} tabIndex={tabIndex} value={property.property_obj.title} />
            <div tabIndex={tabIndex} data-property_title={property.property_obj.title} data-layer_title={props.layer_title} data-id={property._id}
                data-layer-id="5f0bf602961bfa8879f72f5b" data-property-id={property._id}
                className="swatch-element color outOfStock" onClick={props.handleSwatchClick}>
                <label data-image={property.property_obj.icon}
                    htmlFor={property._id}
                    style={{ background: `url(${property.property_obj.icon})`, backgroundPosition: "center" }}>
                    <img className="crossed-out"
                        src="https//cdn.shopify.com/s/files/1/0306/8693/7223/t/62/assets/soldout.png?v=1203348852561544404"
                        aria-label="sold out" alt="sold out"/>
                </label>
            </div>
            <input id="5f0bf66c961bfa8879f72fb2" type="radio" name="option-0" aria-label="Bordeaux" tabIndex={tabIndex} value="Bordeaux" />
        </div>
    )
}


export class SwatchOptions extends Component {

    static contextType = ConfiguratorContext;

    handleSwatchClick = (event) => {
        const layer_title = event.currentTarget.dataset.layer_title;
        const property_title = event.currentTarget.dataset.property_title;
        console.log({layer_title, property_title});
        this.context.handleCurrentLayerColorChange(layer_title, property_title);
    }

    render() {

        const tabIndex = this.props.tabIndex || 0;
        const layer = this.props.layer;

        return (
            <div className="prod-custom-accordion-wrapper">
                <div className="main-accordion" data-layer={layer.layer_obj.title}>
                    <h1 className="prod-accordion-title">{layer.layer_obj.title}<span className="level-one-icon icon-plus"></span><span
                        className="level-one-icon icon-minus"></span><span className="subtitle-block"
                            style={{ visibility: "visible" }}>Farbe: Bordeaux</span></h1>
                    <div className="prod-accordion-content" name={`dropdown_custom_${layer.layer_obj._od}`}
                        id={`dropdown_custom_${layer.layer_obj._od}`} data-layer-id={layer.layer_obj._od}
                        style={{ display: 'block' }}>
                        <div className="swatch_options">

                            {/* repetitive block */}
                            {
                                layer.properties.map( (property, index) => {
                                    return <SwatchOptionProperties key={`SwatchOptionProperties-${index}`} tabIndex={tabIndex} layer_title={layer.layer_obj.title} property={property} handleSwatchClick={this.handleSwatchClick} />
                                })
                            }

                            {/* end repetitive block */}

                            <span className="subtitle-block">Farbe: Bordeaux</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SwatchOptions
