/**
 * Do not change any function
 * START OF IMAGE LIBRARAY
 */

var loaderEnviornmentArray = [];
var globalViewsDetailArray = [];
var globalCanvasWidth = 0, globalCanvasHeight = 0;
var productPageSlick;
var SLIDER_NAME = 'slick';
var SLICK_CONTAINER_CLASS = 'custom_container_creator';

//@todo remove refrence to this function as view is being genereated from shopify side.
function initContainerView(views_array) {
    globalViewsDetailArray = views_array;
    let view_width = $('#containerview_creator_preview').width() / 8;
    $('#containerview_creator_preview').children().width(view_width);
}

// setting up enviornment
function initEnvironment(views_array) {
    loaderEnviornmentArray = [];
    //dimensions for environment and images according to the screen size
    globalCanvasWidth = $('.product_section .nine').width();
    //     globalCanvasHeight = (globalCanvasWidth * 5)/9;
    globalCanvasHeight = (globalCanvasWidth * 7.5) / 9;

    for (let index = 0; index < views_array.length; index++) {
        let loaderEnviornment;
        let previewEnviornment;
        let viewObj = views_array[index].view_obj;
        let container_render_name = 'container_render_' + index;

        loaderEnviornment = new Konva.Stage({
            container: container_render_name,
            width: globalCanvasWidth,
            height: globalCanvasHeight,
        });

        let viewObject = {
            id: viewObj._id,
            view_title: viewObj.title,
            loaderEnviornment: loaderEnviornment,
            loaderLayers: []
        }
        loaderEnviornmentArray.push(viewObject);
    }
    $('.slick-track').height(globalCanvasHeight);
    $('#containerview_creator_preview').css('margin-bottom', (globalCanvasHeight / 5));
}

function reDrawPreview(views_array = globalViewsDetailArray) {

    let stage_width = $('.product_section .nine').width();
    let stage_height = (stage_width * 7.5) / 9;

    let container_width = $('#viewGrid').children().width();
    let scale = container_width / stage_width;

    let thumb_width = $('#containerview_creator_preview').children().width();
    let thumb_scale = thumb_width / stage_width;

    for (let index = 0; index < views_array.length; index++) {

        $('#viewGrid_thumb_' + index).empty();

        let cloned_stage = loaderEnviornmentArray[index].loaderEnviornment.clone();

        cloned_stage.setContainer("viewGrid_thumb_" + index);
        cloned_stage.width(stage_width * scale);
        cloned_stage.height(stage_height * scale);
        cloned_stage.scale({ x: scale, y: scale });
        cloned_stage.draw();

        if (display_preview === "true") {
            $('#container_preview_thumb_' + index).empty();
            let cloned_stage_copy = loaderEnviornmentArray[index].loaderEnviornment.clone();
            cloned_stage_copy.setContainer("container_preview_thumb_" + index);
            cloned_stage_copy.width(stage_width * thumb_scale);
            cloned_stage_copy.height(stage_height * thumb_scale);
            cloned_stage_copy.scale({ x: thumb_scale, y: thumb_scale });
            cloned_stage_copy.draw();
        }
    }
}


// cleanning up enviornement
function reloadEnviorment() {
    for (let items of loaderEnviornmentArray) {
        items.loaderEnviornment.clear();
        items.loaderEnviornment.clearCache();
        items.loaderEnviornment.destroy();
    }
}

// adding up layers
var loaderLayers = [];
function generateLayers(layer_id, layer_name, last_layer) {
    console.log('last layer', last_layer)
    for (let index = 0; index < loaderEnviornmentArray.length; index++) {
        let loaderEnviornmentObj = loaderEnviornmentArray[index];
        let imgLayer = new Konva.Layer();
        imgLayer.clearBeforeDraw(true);
        // adding up the layers to the loader enviornment.
        loaderEnviornmentObj.loaderEnviornment.add(imgLayer);
        //pusing up the layer object to the enviornement.
        loaderEnviornmentObj.loaderLayers.push({
            id: layer_id,
            name: layer_name,
            loader: imgLayer
        });

    }
    console.log("Layers Generated");
}

// search for a layer in the enviornment;
function searchForLayer(view_id, layer_id) {

    var resultViewObject = loaderEnviornmentArray.filter(function (item) {
        return item.id == view_id;
    })[0];

    if (!resultViewObject) {
        return resultViewObject;
    }

    var result = resultViewObject.loaderLayers.filter(function (item) {
        return item.id == layer_id;
    })[0];
    return result;
}

// setting up default values
function setUpDefaults(view_id, layer_id, image_url, isLastIndex = false, enableLoader = false, loaderTimeOut) {
    // searching for layers
    let layerObj = searchForLayer(view_id, layer_id);
    if (!layerObj) {
        console.log("Layer not found in enviornment")
        return;
    }
    var imageObj = new Image();
    imageObj.onload = function () {
        var img_width = imageObj.width;
        var img_height = imageObj.height;
        var max = globalCanvasWidth;
        var ratio = (img_width > img_height ? (img_width / max) : (img_height / max));
        let image_width = img_width / ratio;
        let image_height = img_height / ratio;

        var yoda = new Konva.Image({
            x: (globalCanvasWidth - image_width) / 2, //10,
            y: (globalCanvasHeight - image_height) / 2,
            image: imageObj,
            width: image_width,
            height: image_height,
        });

        // add the shape to the handleLayer
        layerObj.loader.add(yoda);
        layerObj.loader.draw();
        reDrawPreview();

        if (isLastIndex === true && enableLoader === true) {
            let timeoutLoader = 3000;
            if (loaderTimeOut) {
                timeoutLoader = loaderTimeOut;
            }
        }

    };

    imageObj.src = image_url;
    // console.log({ isLastIndex, enableLoader, image_url });

    if (isLastIndex === true && enableLoader === true && image_url.trim() == '') {
        let timeoutLoader = 3000;
        if (loaderTimeOut) {
            timeoutLoader = loaderTimeOut;
        }
    }
}

function batchRender() {
    // console.log("Batch render");
    for (let index = 0; index < loaderEnviornmentArray.length; index++) {
        let resultViewObject = loaderEnviornmentArray[index];
        let loadersLayers = resultViewObject.loaderLayers;

        for (let index_layer = 0; index_layer < loadersLayers.length; index_layer++) {
            let layerItems = loadersLayers[index_layer].loader;
            // console.log(layerItems);
            // layerItems.loader.batchDraw(); 
            layerItems.draw()

        }

    }
}

/**
 * Do not change any function
 * END OF IMAGE LIBRARAY
 */


/////////////////////////////////////////////////////////////////////////////////

function preloadImages(urls, allImagesLoadedCallback) {
    var loadedCounter = 0;
    var toBeLoadedNumber = urls.length;
    urls.forEach(function (url) {
        preloadImage(url, function () {
            loadedCounter++;
            console.log('Images: ' + loadedCounter);
            if (loadedCounter == toBeLoadedNumber) {
                allImagesLoadedCallback();
            }
        });
    });
    function preloadImage(url, anImageLoadedCallback) {
        var img = new Image();
        img.onload = anImageLoadedCallback;
        img.src = url;
    }
}

///////////////////////////////////////////////////////////////////////////

var globalProductJsonData = {};

function getProductData() {
    //defining variable for product id
    let productData = {
        "store_url": "soule-way.myshopify.com",
        "product_id": conf_product_id
    };

    $('#configurator_loader').show();

    $.ajax({
        type: "POST",
        url: 'https://configurator.souleway.com/api/publicapi/product/id',
        data: productData,
        dataType: 'json',
        success: function (result) {
            if (result.status) {
                let productData = result.data;

                // setting up global variable for the product json store
                globalProductJsonData = productData;
                console.log("Loading up images");

                loadImageLayer(productData.product, productData.view);
                buildLayerUi(productData.product);
                preloadImages(productData.default_img_arr, function () {
                    console.log('All images were loaded for frame creation');
                    loadImagesPropsToLayers(productData.product.configuration.layer);
                    $('#configurator_loader').show();

                    preloadImages(productData.non_default_img_arr, function () {
                        console.log("Downloaded additional images");
                        // removing animation of load in the images
                        $('#configurator_loader').hide();
                        $('.shine div, #viewGrid').css("visibility", "visible");
                        $('.shine').removeClass("shine");
                    })
                });
            } else {
                alert('Some error occured, please try again');
            }
        },
        fail: function (xhr, textStatus, errorThrown) {
            alert('request failed');
        }
    });
}

// calling api for getting the data from the server.
getProductData();

function buildLayerUi(productObject) {
    productObject = productObject.configuration.layer;

    if (!productObject) {
        alert('Some error occured! Please try again');
    }

    for (let layerIndex = 0; layerIndex < productObject.length; layerIndex++) {
        let layerTempObj = productObject[layerIndex];

        if (!layerTempObj.properties) {
            continue;
        }

        let product_accordion_title = `<h1 class="prod-accordion-title">${layerTempObj.layer_obj.title}<span class="level-one-icon icon-plus"></span><span class="level-one-icon icon-minus"></span><span class="subtitle-block"></span></h1>`;
        let product_accordion_content_start = `<div class="prod-accordion-content" name="dropdown_custom_${layerTempObj._id}" id="dropdown_custom_${layerTempObj._id}" data-layer-id="${layerTempObj._id}">`;

        let propertyWrapperStart = `<div class="swatch_options"><div class="swatch clearfix" data-option-index="0">`;

        let propertyObj = layerTempObj.properties;
        let propertyBlockUi = '';
        let firstSelectedOption = false;
        let defaultSelection;
        let newIndex = layerIndex;
        for (let propertyIndex = 0; propertyIndex < propertyObj.length; propertyIndex++) {
            let propTempObj = propertyObj[propertyIndex];
            let unavailable = '';
            let swatchActive = '';

            //checking availability and selecting first available property as default
            if (propTempObj.out_of_stock) {
                unavailable += ' outOfStock';
            }
            else {
                if (!firstSelectedOption) {
                    swatchActive += ' swatch-active';
                    defaultSelection = propTempObj.property_obj.title;
                    firstSelectedOption = true;
                }
            }

            propertyBlockUi += "<input id=" + propTempObj._id + " type='radio' name='option-" + layerIndex + "' aria-label=" +
                propTempObj.property_obj.title + " tabindex='0' value=" +
                propTempObj.property_obj.title + "><div tabindex='0' value=" +
                propTempObj.property_obj.title + " data-value=" +
                propTempObj.property_obj.title + " data-id=" +
                propTempObj.property_obj._id + " data-layer-id=" +
                layerTempObj._id + " data-property-id= " +
                propTempObj._id + " class='swatch-element color" + swatchActive + unavailable + "'><label data-image=" +
                propTempObj.property_obj.icon + " for=" +
                propTempObj._id + " style=\"background: url(' " +
                propTempObj.property_obj.icon + " '); background-position: center;\"><img class='crossed-out' src='{{ 'soldout.png' | asset_url }}' aria-label='sold out' alt='sold out'></label></div>";
        }

        let main_accordion_start = `<div class="main-accordion" data-layer=${layerTempObj.layer_obj.title}>`;

        //combining all the closing div's of all the wrappers
        let divEnd = `</div><span class="subtitle-block"></span></div></div></div></div>`;

        let collapse_accordion = main_accordion_start + product_accordion_title + product_accordion_content_start + propertyWrapperStart + propertyBlockUi + divEnd;

        //adding element to the webpage 
        $('.prod-custom-accordion-wrapper').append(collapse_accordion);

        // in case no property is available for a layer
        let layer_temp = $('.prod-custom-accordion-wrapper .main-accordion').eq(layerIndex);
        if (!layer_temp.find(".swatch-active").length) {
            layer_temp.find(".swatch-element").eq(0).addClass("swatch-active");
            defaultSelection = layer_temp.find(".swatch-active").eq(0).attr("value");
        }

        //making hidden input fields
        let input_hidden = "<input type='hidden' name='properties[" + layerTempObj.layer_obj.title + "]' value='" + defaultSelection + "'>";
        $('.prod-custom-accordion-wrapper').closest('form').append(input_hidden);

        //displaying default selected property
        let subtitleIndex = layerIndex * 2;
        defaultSelection = "Farbe: " + defaultSelection;
        $('.subtitle-block').eq(subtitleIndex).text(defaultSelection);
        $('.subtitle-block').eq(subtitleIndex + 1).text(defaultSelection);
    }

    checkConfigAvailability();
}


var imageLayers = [];
function loadImageLayer(productJsonData, view_array_data) {
    if (productJsonData.configuration.layer && productJsonData.configuration.layer.length < 1) {
        return;
    }

    // @todo comment this function once the ui is done from shopify end
    // no longer needed if ui is getting generated from shopify
    initContainerView(view_array_data);

    // setting up the enviornment
    initEnvironment(view_array_data);

    let layersObjects = productJsonData.configuration.layer;
    // checking length of array and verifying if we have all of the array;
    // console.log("Layers obj : ", layersObjects);
    if (imageLayers.length != layersObjects.length) {
        // console.log("Layers not found creating new one")
        // layers are not equll generating the new layers
        for (let index = 0; index < layersObjects.length; index++) {
            let tempLayerStore = layersObjects[index];
            let last_layer = (layersObjects.length - 1 == index ? true : false);
            generateLayers(tempLayerStore._id, tempLayerStore.layer_obj.title, last_layer);
        }
    } else {
        // layers are equall proceding with operations
        // console.log("Layers are already there.");
    }

    // console.log("Loading images props to layer");
    //     loadImagesPropsToLayers(layersObjects);
}

// GET THE IMAGE URL FROM PRODUCT OBJECT
// common view is something which allow this function to put the images as per common view, 
// if you make it change then pass the unique view_id in the parameter
function getImageUrlFromProperties(layerObjectArry, layer_id, property_id, view_id, common_view = true) {

    let gettingUpTheProperties = layerObjectArry.filter(function (item) {
        return item._id == layer_id;
    })[0];

    if (!gettingUpTheProperties) {
        return '';
    }


    let propertyObjectArry = gettingUpTheProperties.properties;
    if (propertyObjectArry.length && propertyObjectArry.length == 0) {
        console.log("No properties found");
        return;
    }

    if (!propertyObjectArry) {
        return '';
    }

    let gettingUpViews = propertyObjectArry.filter(function (item) {
        return item._id == property_id;
    })[0];

    if (!gettingUpViews) {
        return '';
    }

    let viewObjectArray = gettingUpViews.views;
    if (viewObjectArray.length && viewObjectArray.length == 0) {
        console.log("No Views found");
        return;
    }

    if (!viewObjectArray) {
        return '';
    }

    let gettingUpImageObject;
    if (common_view) {
        gettingUpImageObject = viewObjectArray.filter(function (item) {
            return item.id == view_id;
        })[0];
    } else {
        gettingUpImageObject = viewObjectArray.filter(function (item) {
            return item._id == view_id;
        })[0];
    }

    if (!gettingUpImageObject) {
        return '';
    }

    //     console.log("View images are : ", gettingUpImageObject);
    if (gettingUpImageObject.image_src) {
        return gettingUpImageObject.image_src;
    } else {
        return '';
    }
}

// LOAD DEFAULT IMAGES FROM PROPERTY SELECTION ON UI
function loadImagesPropsToLayers(productJsonLayer) {

    console.log('Loading up index images ', productJsonLayer);
    for (let layerIndex = 0; layerIndex < productJsonLayer.length; layerIndex++) {
        let layerObj = productJsonLayer[layerIndex];
        // console.log('layerObj for image', layerObj);
        let layerId = layerObj._id;
        let dropDownId = $('#dropdown_custom_' + layerObj._id + ' .swatch-active');
        // console.log('Dropdown index', dropDownId);
        let layerValue = dropDownId.data('propertyId');
        let propertySelected = layerValue.trim();
        let layersArrayObj = productJsonLayer;

        for (let index = 0; index < loaderEnviornmentArray.length; index++) {
            let loaderViewObj = loaderEnviornmentArray[index];
            let imageUrl = getImageUrlFromProperties(layersArrayObj, layerId, propertySelected, loaderViewObj.id);
            var isLastIndex = layerIndex == productJsonLayer.length - 1 && index == loaderEnviornmentArray.length - 1;
            var enableLoader = isLastIndex;
            if (loaderEnviornmentArray.length - 1 == index) {
                setUpDefaults(loaderViewObj.id, layerId, imageUrl, isLastIndex, enableLoader);
            } else {
                setUpDefaults(loaderViewObj.id, layerId, imageUrl, isLastIndex, enableLoader);
            }
        }
    }

}

function dropDownChnageEvent(event) {
    let layerId = event.currentTarget.getAttribute('data-layer-id').trim();
    let propertySelected = event.currentTarget.getAttribute('data-property-id').trim();
    let layersArrayObj = globalProductJsonData.product.configuration.layer;

    //$('#configurator_loader').show();
    for (let index = 0; index < loaderEnviornmentArray.length; index++) {
        let loaderViewObj = loaderEnviornmentArray[index];
        let imageUrl = getImageUrlFromProperties(layersArrayObj, layerId, propertySelected, loaderViewObj.id);

        var isLastIndex = (index == loaderEnviornmentArray.length - 1);
        var enableLoader = false;
        setUpDefaults(loaderViewObj.id, layerId, imageUrl, isLastIndex, enableLoader, 500);
    }

    console.log("Generating preview");
}


/**************** Animation for collapsing of properties ************\
\********************************************************************/

$(".prod-custom-accordion-wrapper").click(function (e) {

    let target = $(e.target);
    let subItem = null;

    if (target.hasClass("prod-accordion-title")) {
        subItem = target.next();
    }
    else if (target.parent().hasClass("prod-accordion-title")) {
        subItem = target.parent().next();
    }

    if (subItem) {

        target = subItem.prev();

        //slideUp all elements (except target) at current depth or greater
        let depth = $(subItem).parents().length;
        let allAtDepth = $(".prod-custom-accordion-wrapper .prod-accordion-content").filter(function () {
            if ($(this).parents().length >= depth && this !== subItem.get(0)) {
                return true;
            }
        });
        $(allAtDepth).slideUp("fast");

        //slideToggle target content and adjust bottom border if necessary
        subItem.slideToggle("fast", function () {
            $(".accordion :visible:last").css("border-radius", "0 0 10px 10px");
        });

        //changing collapse sign on each click
        if (!target.hasClass('prod-acc-active')) {
            $('.prod-accordion-title').removeClass('prod-acc-active');
            target.addClass('prod-acc-active');
            $('.prod-accordion-title .subtitle-block').css("visibility", "visible");
            target.find('.subtitle-block').css("visibility", "hidden");
        }
        else {
            target.find('.subtitle-block').css("visibility", "visible");
            $('.prod-accordion-title').removeClass('prod-acc-active');
        }
    }
});


/****************Checking url to find the variant id of selected swatch************\
\**********************************************************************************/
function checkConfigAvailability() {
    let cartButtonWrapper = $(".clearfix.product_form .purchase-details").children();

    if ($(".swatch-active.outOfStock").length) {
        cartButtonWrapper.addClass("product-is-unavailable");
        cartButtonWrapper.find("button").attr("disabled", true);
        cartButtonWrapper.find(".text").text("Nicht vorrättig");
    }
    else {
        cartButtonWrapper.removeClass("product-is-unavailable");
        cartButtonWrapper.find("button").attr("disabled", false);
        cartButtonWrapper.find(".text").text("In den Warenkorb");
    }
}


/****************Swatch Element Click************\
\************************************************/

$('body').on('click', '.swatch-element', function (event) {
    // console.log("Swatch Click");
    var dataValue = $(this).attr('data-value');

    //changing property name on selecting property
    let subtitleBlock = $(this).closest('.prod-accordion-content');
    subtitleBlock.prev().add(subtitleBlock).find(".subtitle-block").text("Farbe: " + dataValue);

    //removing swatch-active class from previously selected element and adding to the current choice
    $(this).parent().find('.swatch-active').removeClass('swatch-active');
    $(this).addClass("swatch-active");

    // checking availability
    checkConfigAvailability();

    //changing values in hidden input fields
    let layer = $(this).closest('.main-accordion').data("layer");
    $("input[name='properties[" + layer + "]").val(dataValue);

    dropDownChnageEvent(event);
});


/************** In case window size changes **************\
\*********************************************************/

var rtime;
var timeout = false;
var delta = 800;

$(window).resize(function () {


    if ($('.slick-list canvas').length) {
        let width = $('.product_section .nine').width();
        //     let height = (width * 5)/9;
        let height = (width * 7.5) / 9;
        $('.slick-list .konvajs-content').add('canvas').width(width).height(height);
    }
    $('#containerview_creator_preview').children().width('12.5%');

    let stage_width = $('.slick-list').width();
    //   let stage_height = (stage_width * 5)/9;
    let stage_height = (stage_width * 7.5) / 9;

    globalCanvasWidth = stage_width;
    globalCanvasHeight = stage_height;

    $('.slick-track').height(globalCanvasHeight);

    //var scale = containerWidth / stageWidth;
    let container_width = $('#containerview_creator_preview').children().width();
    let scale = container_width / stage_width;

    let viewGrid_container_width = $('#viewGrid').children().width();
    let viewGrid_scale = viewGrid_container_width / stage_width;

    $('#containerview_creator_preview').children().find('*').width(scale * stage_width).height(scale * stage_height);
    $('#viewGrid').children().find('*').width(viewGrid_scale * stage_width).height(viewGrid_scale * stage_height);

    $('#containerview_creator_preview').css('margin-bottom', (globalCanvasHeight / 5));

    console.log("Redrawing object");

    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

// loading up all layers again
// @todo check the comment and add the classes as per instruction
function LoadUpAllLayers(productData) {
    loadImageLayer(productData.product, productData.view);
    buildLayerUi(productData.product);
    loadImagesPropsToLayers(productData.product.configuration.layer);

    // remove shine class to the renderer area.
    $('#configurator_loader').hide();
    $("div[id^='container_render_']").removeClass('shine');
}

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
      
        $("div[id^='container_render_']").addClass('shine');
        // add shine class to the rendere area
        $('#configurator_loader').show();
        reloadEnviorment();
        loadImageLayer(globalProductJsonData.product, globalProductJsonData.view);
        loadImagesPropsToLayers(globalProductJsonData.product.configuration.layer);
        
      
        $('#configurator_loader').hide();
        $("div[id^='container_render_']").removeClass('shine');
      
    }
}



/************** for flickity slide selection **************\
\**********************************************************/

$('#containerview_creator_preview').on('click', 'div', function (e) {
    e.stopPropagation();
    let index = $(this).parent().index();

    if (typeof index !== "number") {
        return;
    }

    if (SLIDER_NAME === 'flickity') {
        let flkty = Flickity.data('.js-product-gallery');
        flkty.select(index);
    } else if ('slick') {
        $('.' + SLICK_CONTAINER_CLASS).slick('slickGoTo', index);
    } else {
        return;
    }

    $('#containerview_creator_preview').children().css("opacity", "0.5");
    $(this).parent().css("opacity", "1");

});


function selectCurrentPreview(index) {
    let flick_elements = $('#containerview_creator_preview').children();
    flick_elements.css("opacity", "0.5");
    flick_elements.eq(index).css("opacity", "1");
}


/**
 Next and previous button event handling for flickity slider
**/
$('#containerview_creator').on('click', '.flickity-prev-next-button', function () {
    let flkty = Flickity.data('.js-product-gallery');
    let index = flkty.selectedIndex;
    selectCurrentPreview(index);
});


/**
 Next and previous button event handling for slick slider
**/
$('.custom_container_creator').on('click', '.next-arrow, .prev-arrow', function () {
    var index = $('.custom_container_creator').slick('slickCurrentSlide');
    selectCurrentPreview(index);
});


/*================ Custom Add To Cart Btn ================*/
$(document).ready(function ($) {
    $('.custom-add-cart-configurator').click(function (e) {
        e.preventDefault();

        var $addToCartForm = $(e.currentTarget).closest('form');
        var serializedFormData = $addToCartForm.serialize();

        $.ajax({
            url: '/cart/add.js',
            dataType: 'json',
            cache: false,
            type: 'post',
            data: serializedFormData,
            success: function (itemData) {
                console.log(itemData);
                document.location.href = '/cart';
            },
            error: function (error) {
                console.log(error);
            }
        });

    });
    calling_slick();
});

// function calling_slick(){
//   $('.custom_container_creator').slick({
//     "adaptiveHeight": true,
//     "wrapAround": "true",
//     "cellAlign": "left",
//     "draggable": draggable,
//     "contain": true,
//     "imagesLoaded": true,
//     "lazyLoad": 2,
//     "pageDots": false,
//     "prevNextButtons": prevNextButtons,
//     "autoPlay": autoplay ? 6000 : false,
//     "dragThreshold": 10,
//     "arrowShape": arrowSize
//   });
// }

function calling_slick() {
    productPageSlick = $('.' + SLICK_CONTAINER_CLASS).slick({
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