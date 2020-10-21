# Gravity library :rocket:

gravity is a library to animate DOM elements as soon as they enter the window and are visible to the user. This library is similar and is inspired by [Wow.js](http://wowjs.uk "Wow.js")

## Instalation

via npm: `npm install gravity-library`
via yarn: `yarn add gravity-library`

## Usage

Add gravity.js, and gravity.js or another CSS animation library if you prefer
```html
<link rel="stylesheet" href="css/gravity.css">
...
<script src="js/gravity.js"></script>
```
#### Using in html

gravity has by default an instantiated object for its use, directly in the html you can activate the animations using the class name gravity
```html
<div class="gravity"> This will be revealed </div>
```
You can control the animation time and other options by the following attributes on the element:
- **data-gravity-animation:** Name of the animation or keyframes to use
- **data-gravity-duration:** Animation time, in milliseconds
- **data-gravity-delay:** Animation delay, in milliseconds
- **data-gravity-in:** Distance in pixels required to start the reveal (relative to the top and bottom of the viewport), the element will not be revealed until the top of the viewport is beyond what is set

#### Using with Javascript

Using javascript you can instantiate a new object of the Gravity Class
```javascript
var revealed = new Gravity(element, removeClassName);
revealed.ready(options);
```

| Parameter | Description | Type |
| ------------ | ------------ | ------------ |
| *element* | CSS selector, of the elements to animate. | string |
| *removeClassName* | If true, the class name passed to the element parameter will be removed once the animation starts. In case of having passed an id, the class name that is exactly equal to the id will be eliminated | boolean |
| *options* | Animation options: animation, duration, delay and offset | object |

#### Deafult options

If the animation parameters are not configured, through the data-gravity-* attributes or the options parameter, the following default values will be taken

| Option | Description | Default |
| ------------ | ------------ | ------------ |
| animation | Name of the animation or keyframes to use | upward |
| duration | Animation time, in milliseconds | 700 |
| delay | Animation delay, in milliseconds | 50 |
| offset | Distance in pixels required to start the reveal (relative to the top and bottom of the viewport) | It is not an absolute value, it will always be one fifth of the height of the user's viewport |


The configuration values will have a certain order of importance, the value of the data-gravity attributes will always be taken first and if they do not exist, those of the options parameter will be taken. Finally obviously the default values

------------

###### *Thanks for using Gravity*
