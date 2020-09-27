import React, { createContext, Component } from 'react';
// import productData from "../utils/productDummyData.json";
import productData from "../utils/productDummyData2.json";

export const ConfiguratorContext = createContext();

class ConfiguratorContextProvider extends Component {

    constructor(props) {
        super(props);

        let { configObject, sliderImages, currentLayerColors } = this.initDefaultColorConfiguration(productData);
        this.state = {
            title: "Test",
            productData: productData,
            configObject,
            sliderImages,
            currentLayerColors
        }
    }

    initDefaultColorConfiguration = (productData) => {
        console.log("initDefaultColorConfiguration:start")
        let configuration = productData.product.configuration;
        let configObject = {};
        let currentLayerColors = {}; // default color of each layer
        let defaultColor = "Blau";
        
        for(let layer of configuration.layer) {
            configObject[layer.layer_obj.title] = {}
            currentLayerColors[layer.layer_obj.title] = defaultColor;
        }


        for(let layer of configuration.layer) {
            let layerTitle = layer.layer_obj.title;
            for(let property of layer.properties) {
                let propertyName = property.property_obj.title;

                if(!configObject[layerTitle][propertyName]) {
                    configObject[layerTitle][propertyName] = {}
                }

                for(let view of property.views) {
                    let viewName = view.view_obj.title;
                    configObject[layerTitle][propertyName][viewName] = view.image_src
                }   
            }
        }

        for(let layerTitle in configObject) {
            if(defaultColor in configObject[layerTitle]) {
                //
            } else {
                // first color of layer in configObject
                currentLayerColors[layerTitle] = Object.keys(configObject[layerTitle])[0];
            }
        }

        /**
         * Generate view images
         */
        const { sliderImages } = this.generateViewImagesArr(productData, configObject, currentLayerColors);

        return { configObject, sliderImages, currentLayerColors };
    }


    /**
     * Generate view images for selected color in each layer
     */
    generateViewImagesArr = (productData, configObject, currentLayerColors) => {
        let viewsTemp = {};
        let sliderImages = [];
        for(let view of productData.view) {
            for(let layerTitle in configObject) {
                // currentLayerColors[layerTitle] = color of the layer
                let viewImage = configObject[layerTitle][currentLayerColors[layerTitle]][view.view_obj.title];
                if(viewsTemp[view.view_obj.title]) {
                   viewsTemp[view.view_obj.title].push(viewImage); 
                } else {
                    viewsTemp[view.view_obj.title] = [viewImage]; 
                }
            }
        }

        for(let view of productData.view) {
            if(view.view_obj.title in viewsTemp) {
                sliderImages.push(viewsTemp[view.view_obj.title]);
            }
        }

        return { sliderImages };
    }


    /**
     * On click of swatch, update the canvas/images
     */
    handleCurrentLayerColorChange = async (layer_title, property_title) => {
        let { currentLayerColors } = this.state;
        if(currentLayerColors[layer_title] != property_title) {
            console.log("Different");
            currentLayerColors[layer_title] = property_title;
            // this.setState({currentLayerColors});

            const { sliderImages } = this.generateViewImagesArr(this.state.productData, this.state.configObject, this.state.currentLayerColors);
            // console.log({sliderImages, currentLayerColors})
            await this.setState({
                sliderImages:sliderImages, 
                currentLayerColors: currentLayerColors
            });
            console.log("values updated");
        } else {
            console.log("Same color");
        }
    }


    render() {
        return (
            <ConfiguratorContext.Provider value={{
                ...this.state,
                handleCurrentLayerColorChange: this.handleCurrentLayerColorChange
            }}>
                {this.props.children}
            </ConfiguratorContext.Provider>
        )
    }
}

export default ConfiguratorContextProvider;
