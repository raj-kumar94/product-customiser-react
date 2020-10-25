Demo: https://raj-kumar94.github.io/product-customiser-react/

# Steps:

1. Clone the rep
2. cd repo
3. `npm install`
4. `npm start`

open the link `http:localhost:3000`

# Layout

Currently app is divided in 3 parts: 

1. Product view/slider images
2. Select options/ Swatch elements
3. Grid views (to show views in Grid format)

# Using product data

Shopify's Product data + configuration data gets converted into `configObject`, `sliderImages`, and `currentLayerColors`

check file `utils/generatedConfigDummyData.json` to see the dummy data.

- `sliderImages` is the 2D array of images to be displayed on the screen
- `currentLayerColors` is object containing layers and their selected color
- `configObject` contains all the info related to the configurator data

TODO:

- Improve Swatch UI
- Add Accordion
- Add hidden input fields to be part of the form
