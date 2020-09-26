import React, { createContext, Component } from 'react';
import productData from "../utils/productDummyData.json";

export const ConfiguratorContext = createContext();

class ConfiguratorContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Test",
            productData: productData
        }
    }


    render() {
        return (
            <ConfiguratorContext.Provider value={{
                ...this.state
            }}>
                {this.props.children}
            </ConfiguratorContext.Provider>
        )
    }
}

export default ConfiguratorContextProvider;
