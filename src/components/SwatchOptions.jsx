import React, { Component } from 'react'

export class SwatchOptions extends Component {
    render() {

        const tabIndex = this.props.tabIndex || 0;
        const layer = this.props.layer;

        return (
            <div className="prod-custom-accordion-wrapper">
                <div className="main-accordion" data-layer={layer.layer_obj.title}>
                    <h1 className="prod-accordion-title">{layer.layer_obj.title}<span className="level-one-icon icon-plus"></span><span
                        className="level-one-icon icon-minus"></span><span className="subtitle-block"
                            style={{ visibility: "visible" }}>Farbe: Bordeaux</span></h1>
                    <div className="prod-accordion-content" name="dropdown_custom_5f0bf602961bfa8879f72f5b"
                        id="dropdown_custom_5f0bf602961bfa8879f72f5b" data-layer-id="5f0bf602961bfa8879f72f5b"
                        style={{ display: 'none' }}>
                        <div className="swatch_options">

                            {/* repetitive block */}
                            <div className="swatch clearfix" data-option-index="0">
                                <input id="5f0bf663961bfa8879f72fb1" type="radio"
                                    name="option-0" aria-label="Blau" tabIndex={tabIndex} value="Blau" />
                                <div tabIndex={tabIndex} value="Blau" data-value="Blau" data-id="5f0b589c961bfa8879f72f51"
                                    data-layer-id="5f0bf602961bfa8879f72f5b" data-property-id="5f0bf663961bfa8879f72fb1"
                                    className="swatch-element color outOfStock">
                                    <label data-image="https://productcustomiserimagestorage.s3.eu-central-1.amazonaws.com/91891eaf-3c17-e536-3bda-b2af562f97da.png"
                                        htmlFor={"5f0bf663961bfa8879f72fb1"}
                                        style={{ background: "url('https://productcustomiserimagestorage.s3.eu-central-1.amazonaws.com/91891eaf-3c17-e536-3bda-b2af562f97da.png')", backgroundPosition: "center" }}
                                    >
                                        <img className="crossed-out"
                                            src="//cdn.shopify.com/s/files/1/0306/8693/7223/t/62/assets/soldout.png?v=1203348852561544404"
                                            aria-label="sold out" alt="sold out"
                                        />
                                    </label>
                                </div>
                                <input id="5f0bf66c961bfa8879f72fb2" type="radio" name="option-0" aria-label="Bordeaux" tabIndex={tabIndex}
                                    value="Bordeaux" />
                            </div>
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
