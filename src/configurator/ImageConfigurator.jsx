import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Slider from "react-slick";

import LoadImageFromURL from "../components/LoadImageFromURL"
import { SlickPrevArrow, SlickNextArrow } from "../components/SlickSliderArrows";
import { ConfiguratorContext } from '../contexts/Configurator';


class ImageConfigurator extends Component {

    ratio = 1.5;

    static contextType = ConfiguratorContext;

    constructor(props) {
        super(props);
        const { containerOffsetHeight, containerOffsetWidth } = this.getContainerDimenstions();
        
        this.state = {
            images: [
                "https://i.ibb.co/7CnPYHV/70c40127-3e61-fe0b-4526-7a8578f232e7.png",
                "https://i.ibb.co/2WT0yZv/82286b9a-1d94-7ad5-ae20-0b94e7697aa0.png",
                "https://i.ibb.co/YjYppvn/5a2d9c2f-f5fa-99df-e71b-b14f178d8ba7.png",
            ],
            selectedImages: [
                "https://productcustomiserimagestorage.s3.eu-central-1.amazonaws.com/fe6eb34f-0aaa-d885-7821-7696aefc506f.png",
                "https://i.ibb.co/7CnPYHV/70c40127-3e61-fe0b-4526-7a8578f232e7.png",
                "https://i.ibb.co/2WT0yZv/82286b9a-1d94-7ad5-ae20-0b94e7697aa0.png"
            ],
            showCanvas: false,
            containerOffsetHeight,
            containerOffsetWidth,
        }
    }

    getContainerDimenstions = () => {
        let containerOffsetWidth = document.querySelector('.custom_container_creator').offsetWidth;
        let containerOffsetHeight = document.querySelector('.custom_container_creator').offsetHeight;
        let currentRatio = containerOffsetWidth/containerOffsetHeight;

        if(currentRatio > this.ratio) {
            containerOffsetWidth = this.ratio * containerOffsetHeight;
        } else if(currentRatio < (this.ratio - 0.1)) {
            containerOffsetWidth = Math.min(containerOffsetWidth,containerOffsetHeight);
            containerOffsetHeight = containerOffsetWidth / this.ratio;
        }
        return { containerOffsetHeight, containerOffsetWidth };
    }

    updateDimensions = () => {
        const { containerOffsetHeight, containerOffsetWidth } = this.getContainerDimenstions();
        this.setState({ containerOffsetWidth, containerOffsetHeight });
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        console.log("componentDidMount called");

        // forcing browser to load all images
        let images = this.context.productData && this.context.productData.images ? this.context.productData.images: [];
        images.forEach((picture) => {
            const img = new Image();
            img.src = picture.url;
        });

        // let that = this;
        // setTimeout(() => {
        //     that.setState({selectedImages: that.state.images});
        //     // calling_slick();
        // }, 3000);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    // componentDidMount() {
    //     let that = this;
    //     setTimeout(() => {
    //         that.setState({showCanvas: true});
    //     }, 3000);
    // }

    render() {
        // console.log('rendering...');

        const { selectedImages, containerOffsetWidth, containerOffsetHeight } = this.state;
        const { productData } = this.context;

        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            // arrows: true,
            nextArrow: <SlickNextArrow />,
            prevArrow: <SlickPrevArrow />
        };

        /**
         * create n number of divs per views (top/side/inner etc). They all will go inside the slider
         */
        return (
            <Slider {...settings}>
                {
                    productData.view.map( (view, index) => {
                        return <div key={`view-${index}`}>
                                <Stage width={containerOffsetWidth} height={containerOffsetHeight}>
                                    {
                                        selectedImages.map(src => {
                                            return (
                                                <Layer key={src}>
                                                    <LoadImageFromURL src={src} containerOffsetWidth={containerOffsetWidth} containerOffsetHeight={containerOffsetHeight} />
                                                </Layer>
                                            )
                                        })
                                    }
                                </Stage>
                            </div>
                    })
                }
            </Slider>
        );
    }
}

export default ImageConfigurator;
