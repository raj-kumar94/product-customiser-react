import React, { Component } from 'react'
// import Slider from "react-slick";
import ImageConfigurator from "../ImageConfigurator";
import { SlickNextArrow, SlickPrevArrow } from './SlickSliderArrows';

class ProductSlider extends Component {

    state = {
        sliderSettings: {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            // arrows: true,
            nextArrow: <SlickNextArrow />,
            prevArrow: <SlickPrevArrow />
        }
    }

    render() {
        const settings = this.state.sliderSettings;
        return (
            // using content of ImageConfigurator in here is not working
            // so, I'm using Slider inside ImageConfigurator component conditionally
            // <Slider {...settings}>
            <ImageConfigurator settings={settings} />
            // </Slider>
        )
    }
}

export default ProductSlider;
