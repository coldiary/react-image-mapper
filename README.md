# react-image-mapper

React Component to highlight interactive zones in images


## Demo & Examples

Live demo: [coldiary.github.io/react-image-mapper](http://coldiary.github.io/react-image-mapper/)

To build the example locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

## Installation

The easiest way to use react-image-mapper is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-image-mapper.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-image-mapper --save
```


## Usage

Import the component as you normally do, and add it wherever you like in your JSX views as below:

```javascript
// ES5 require
var ImageMapper = require('react-image-mapper');

// ES6 import
import ImageMapper from 'react-image-mapper';

<ImageMapper src={IMAGE_URL} map={AREAS_MAP}/>
```

### Properties

|Props|type|Description|default|
|---|---|---|---|
|**src**|*string*|Image source url| **required**|
|**map**|*string*|Mapping description| `{ name: generated, areas: [ ] }`<br/>(see below) |
|**fillColor**|*string*|Fill color of the highlighted zone|`rgba(255, 255, 255, 0.5)`|
|**strokeColor**|*string*|Border color of the highlighted zone|`rgba(0, 0, 0, 0.5)`|
|**lineWidth**|*number*|Border thickness of the highlighted zone|`1`|
|**width**|*number*|Image width|`Displayed width`|
|**height**|*number*|Image height|`Displayed height`|
|**active**|*bool*|Enable/Disable highlighting|`true`|
|**imgWidth**|*number*|Original image width|`null`|

|Props callbacks|Called on|signature|
|---|---|---|
|**onLoad**|Image loading and canvas initialization completed|`(): void`|
|**onMouseEnter**|Hovering a zone in image|`(area: obj, index: num, event): void`|
|**onMouseLeave**|Leaving a zone in image|`(area: obj, index: num, event): void`|
|**onMouseMove**|Moving mouse on a zone in image|`(area: obj, index: num, event): void`|
|**onClick**|Click on a zone in image|`(area: obj, index: num, event): void`|
|**onImageClick**|Click outside of a zone in image|`(event): void`|
|**onImageMouseMove**|Moving mouse on the image itself|`(event): void`|

Map is an object describing highlighted areas in the image.

Its structure is similar to the HTML syntax of mapping:

- **map**: (*object*) Object to describe highlighted zones
	- **name**: (*string*) Name of the map, used to bind to the image.
	- **areas**: (*array*) Array of **area objects**
		- **area**: (*object*) Shaped like below :

|Property| type|Description|
|---|:---:|---|
|**_id**|*string*|Uniquely identify an area. Index in array is used if this value is not provided.|
|**shape**|*string*|Either `rect`, `circle` or `poly`|
|**coords**|*array of number*|Coordinates delimiting the zone according to the specified shape: <ul><li>**rect**: `top-left-X`,`top-left-Y`,`bottom-right-X`,`bottom-right-Y`</li><li>**circle**: `center-X`,`center-Y`,`radius`</li><li>**poly**: Every point in the polygon path as `point-X`,`point-Y`,...</li></ul>|
|**href**|*string*|Target link for a click in the zone (note that if you provide a onClick prop, `href` will be prevented)|

When received from an event handler, an area is extended with the following properties:

|Property| type|Description|
|---|:---:|---|
|**scaledCoords**|*array of number*|Scaled coordinates (see [Dynamic Scaling](#dynamic-scaling) below)|
|**center**|*array of number*|Coordinates positionning the center or centroid of the area: `[X, Y]`|

## Dynamic scaling
When a parent component updates the **width** prop on `<ImageMapper>`, the area coordinates also have to be scaled. This can be accomplied by specifying both the new **width** and a constant **imgWidth**. **imgWidth** is the width of the original image. `<ImageMapper>` will calculate the new coordinates for each area. For example:
```javascript
/* assume that image is actually 1500px wide */

// this will be a 1:1 scale, areas will be 3x bigger than they should be
<ImageMapper width={500} />

// this will be the same 1:1 scale, same problem with areas being too big
<ImageMapper width={500} imgWidth={500} />

// this will scale the areas to 1/3rd, they will now fit the 500px image on the screen
<ImageMapper width={500} imgWidth={1500} />
```

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).


### Notes & Contributions

This a component is still a work in progress.

If you encounter a bug of some kind, feel free to report the issue.

If you'd like to improve this code or ask/advise for any improvement, feel free to comment it as well.


## License

Distributed with an MIT License. See LICENSE.txt for more details

Copyright (c) 2017 Coldiary.
