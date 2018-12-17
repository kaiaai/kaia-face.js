# kaia-face.js
Animated robot face to convey various emotional expressions, control gaze direction.

## Live Demo
- [Sample app](https://kaia.ai/view-app/5a0556a554d7fc08c068f3b7)
- Sample app [source code](https://github.com/kaiaai/sample-apps/tree/master/face-animation)

## Use in Browser
```js
<script src="kaia-face.min.js"></script>
const face = new Face({face_width:100,face_height:100});
face.setGazeSpeed('default', 100, 'linear');  // default eye movement speed

face.setExpression('wow');
face.setGazeDirection(0.4, 0.5); // look left: range 0...1, 0.5, 0.5 is center 
// ... some time later
face.setExpression('bored'); // change expression
face.unsetGazeDirection(); // stare ahead
````

## API
### Create
Creates face object and sets its size.
```js
const face = new Face({face_width:100, face_height:100});
````
### Expression Control
Sets displayed expression. There are 32 expressions implemented and available, see below.
```js
// List of implemented expressions
const expressions = ['annoyed', 'anxious', 'apologetic', 'awkward', 'blinking', 'bored', 'crying',
  'default', 'determined', 'embarrased', 'evil', 'excited', 'exhausted', 'flustered', 'furious',
  'giggle', 'happy', 'in-love', 'mischievous', 'realized-something', 'sad', 'sassy', 'scared',
  'shocked', 'snoozing', 'starstruck', 'stuck-up', 'thinking', 'tired', 'upset', 'winking', 'wow'];

face.setExpression('wow');
// ... some time later
face.setExpression('bored'); // change expression
````

### Gaze Direction Control
Set gaze direction as follows:
```js
// set gaze speed for 'wow' expression; usable speed ranges ~10...100
face.setGazeSpeed('wow', 50, 'linear');
// Make eyes move to (0.4, 0.5)
face.setGazeDirection(0.4, 0.5); // x, y range 0...1.0, where (0.5, 0.5) is center
// ... later
face.unsetGazeDirection(); // stare ahead, at (0.5 0.5)
````

### Animations
Besides eyes being able to change gaze direction, eyes can be animated.
```js
const animations = ['wink', 'widen', 'eye-roll', 'tear-drop', 'blinking', 'fluctuating',
  'fluctuating-upper', 'twitching-lower', 'snoozing'];

// 'wow' expression will use 'widen' animation for eyes
face.setAnimation('wow', 'widen', {enabled:true});
face.playAnimation(); // manually trigger eye animation in current expression
face.unsetAnimation('wow', true); // clear animations previously set for 'wow'

// Advanced animation control examples
// You can use '*' to set animation to all expressions at once
face.setAnimation('*', 'wink', {enabled:true, duration:200, easing:'ease-out', scaleY:0.3,
  elements:['left-eye']}); // one-shot
face.setAnimation('*', 'widen', {enabled:true, duration:600, easing:'ease-in', scaleY:1.5,
  scaleX:1.5, elements:['left-eye']}); // one-shot
face.setAnimation('*', 'eye-roll', {enabled:true, radius:0.3, duration:500,
  elements:['left-eye', 'right-eye'], easing:linear}); // one-shot

face.setAnimation('*', 'tear-drop', {enabled:true, elements:['left-eye'],
  'average-delay':2000, duration:500, easing:'ease-out', stroke:'blue', 'color':'cyan',
   random:false}); // continuous
face.setAnimation("*","blinking",{enabled:true,'average-delay':3000,scaleY:0.2,
  duration:100,elements:["left-eye","right-eye"],"easing":"ease-in-out"}); // continuous
face.setAnimation("*","fluctuating",{enabled:true,elements:["right-eye"],
  "average-delay":1000,duration:800,easing:'ease-in-out',scaleY:0.5,scaleX:2.0}); // continuous  
face.setAnimation("*","fluctuating-upper",{enabled:true,elements:["right-eye"],
    "average-delay":3000,duration:600,easing:"ease-out",top:0.8}); // continuous
face.setAnimation("*","twitching-lower",{enabled:true,elements:["left-eye","right-eye"],
  "average-delay":3000,duration:500,left:0.3,easing:"ease-in"}); // continuous
face.setAnimation("*","snoozing",{enabled:true,elements:["right-eye"],
  "average-delay":2000,duration:3000,easing:'ease-out',left:-0.3,top:-0.3,
  "font-size":40,color:'cyan',random:false}); // continuous
face.unsetAnimation('*', true);
````

### Animation Effects
Eye movement style can be modified by enabling animation effects.
```js
const animationEffects = ['swoosh', 'road-runner', 'splat', 'jelly', 'bounce'];

// Make eyes bounce as gaze direction changes when 'wow' expression is displayed
face.setAnimationEffect('wow', 'bounce', {enabled:true});
face.unsetAnimationEffect('wow', true); // clear eye animation effects associated with 'wow'

// Advanced control
face.setAnimationEffect("*","swoosh",{enabled:true,elements:["right-eye","left-eye"],
  speed:30,'tail-speed':60,'tail-dampent':2.0});
face.setAnimationEffect("default","road-runner",{enabled:true,elements:["left-eye"],
  speed:40,jump:0.7,'jump-restitution':0.1});
face.setAnimationEffect("default","splat",{enabled:true,elements:["right-eye"],
  speed:20,mass:0.4,dampent:0.5});
face.setAnimationEffect("*","jelly",{enabled:true,elements:["right-eye"],
  speed:20,dampent:1.0});
face.setAnimationEffect("*","bounce",{enabled:true,elements:["left-eye"],
  speed:50,dampent:0.1});
face.setAnimationEffect("default-synonym","bounce",{enabled:true});  
face.setAnimationEffect("default-synonym","jelly",{enabled:true});
````
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
