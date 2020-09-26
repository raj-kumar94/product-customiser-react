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
        const { containerOffsetHeight, containerOffsetWidth, containerWidth, conatainerHeight } = this.getContainerDimenstions();
        
        this.state = {
            containerOffsetHeight,
            containerOffsetWidth,
            containerWidth, 
            conatainerHeight,
            slides: [],
            configObject: {}
        }
    }

    getContainerDimenstions = () => {
        let containerOffsetWidth = document.querySelector('.custom_container_creator_nine').offsetWidth-0;
        let containerOffsetHeight = document.querySelector('.custom_container_creator_nine').offsetHeight-0;
        let containerWidth = containerOffsetWidth;
        let conatainerHeight = containerOffsetHeight;

        let currentRatio = containerOffsetWidth/containerOffsetHeight;

        if(currentRatio > this.ratio) {
            containerOffsetWidth = this.ratio * containerOffsetHeight;
        } else if(currentRatio < (this.ratio - 0.1)) {
            containerOffsetWidth = Math.min(containerOffsetWidth,containerOffsetHeight);
            containerOffsetHeight = containerOffsetWidth / this.ratio;
        }
        return { containerOffsetHeight, containerOffsetWidth, containerWidth, conatainerHeight };
    }

    updateDimensions = () => {
        const { containerOffsetHeight, containerOffsetWidth } = this.getContainerDimenstions();
        this.setState({ containerOffsetWidth, containerOffsetHeight });
    };

    componentDidMount() {
        this.setState({sliderImages: this.context.sliderImages, configObject: this.context.configObject});

        window.addEventListener('resize', this.updateDimensions);
        console.log("componentDidMount called");

        // forcing browser to load all images
        let downloaded = {};
        for(let image of this.context.sliderImages) {
            for(let img_ of image) {
                const img = new Image();
                img.src = img_;
                downloaded[img_] = 1;
            }
        }

        let images = this.context.productData && this.context.productData.images ? this.context.productData.images: [];
        for(let picture of images) {
            if(downloaded[picture.url]) {
                continue;
            }
            const img = new Image();
            img.src = picture.url;
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    // componentWillMount() {
    //     this.setState({sliderImages: this.context.sliderImages, configObject: this.context.configObject});
    // }

    render() {
        // console.log('rendering...');

        const { containerOffsetWidth, containerOffsetHeight, containerWidth, conatainerHeight } = this.state;
        const { sliderImages } = this.context;
        // console.log({sliderImages});

        var settings = {
            dots: true,
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
                    sliderImages.map( (images, index) => {
                        return <div key={`views-${index}`}>
                                <Stage width={containerWidth} height={conatainerHeight}>
                                    {
                                        images.map((src, index) => {
                                            return (
                                                <Layer key={`layer-${index}`}>
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
