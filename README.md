# kaia-face.js
Animated robot face to convey various emotional expressions, control gaze direction.

## Use in Browser
```js
<script src="kaia-face.min.js"></script>
const faceSize = Math.min(window.innerWidth, window.innerHeight);
const face = new Face({face_width:faceSize,face_height:faceSize});
face.setGazeSpeed('default', 10000, 'linear');  // default eye movement speed

face.setExpression('wow');
face.setGazeDirection(0.4, 0.5); // look left: range 0...1, 0.5, 0.5 is center 
// ... some time later
face.setExpression('bored'); // change expression
face.unsetGazeDirection(); // stare ahead
````

## API
### Synonyms
A shortcut to add new expressions without much work. Take an expression that is not implemented and map it to one of existing expressions.
```js
face.setExpression('amazed'); // error: 'amazed' expression is not available
face.addSynonyms('wow', 'amazed'); // define 'amazed' expression to simply use 'wow'
face.setExpression('amazed'); // no error
````
API use is as follows:
```js
face.addSynonyms('wow', 'wow-synonym'); // add a single synonym to an existing expression
face.addSynonyms('annoyed', ['annoyed-synonym']); // add multiple synonims to an existing expression
````

## Build
````bash
npm install gulp-cli -g
git clone https://github.com/kaiaai/kaia-face.js
cd kaia-face.js
npm install
gulp
# wait a couple of minutes
ls dist
````
