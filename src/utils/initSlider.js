var SLICK_CONTAINER_CLASS = 'custom_container_creator';
var SLIDER_NAME = 'slick';

export const calling_slick = () => {
    if(window.$) {
        let productPageSlick = window.$('.' + SLICK_CONTAINER_CLASS).slick({
            dots: false,
            arrows: true,
            prevArrow: '<button class="slide-arrow prev-arrow arrow-left"><span class="icon-left-arrow"></span></button>',
            nextArrow: '<button class="slide-arrow next-arrow arrow-right"><span class="icon-right-arrow"></span></button>',
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            cssEase: 'ease',
            easing: 'linear',
            edgeFriction: 0.15,
            swipe: true,
            touchMove: true,
            infinite: true,
        });
    }
}