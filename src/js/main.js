  function	checkBrowserSupport()
 {

		window.requestAnimationFrame = (function()
		{
				return	window.requestAnimationFrame       		||
							window.webkitRequestAnimationFrame 	||
							window.mozRequestAnimationFrame    	||
							window.oRequestAnimationFrame      	||
							window.msRequestAnimationFrame;

		})();

		window.cancelAnimationFrame = (function()
		{
				return	window.cancelAnimationFrame       				||
							window.webkitCancelAnimationFrame 			||
							window.mozCancelAnimationFrame    			||
							window.oCancelAnimationFrame      				||
							window.msCancelAnimationFrame 					||
							window.cancelRequestAnimationFrame       	||
							window.webkitCancelRequestAnimationFrame 	||
							window.mozCancelRequestAnimationFrame    	||
							window.oCancelRequestAnimationFrame      	||
							window.msCancelRequestAnimationFrame;

		})();

		function isCanvasSupported()
		{
					var elem = document.createElement('canvas');
					return !!(elem.getContext && elem.getContext('2d'));
		}

		if (	!isCanvasSupported()	||	!window.cancelAnimationFrame  	|| 		!window.requestAnimationFrame	)
		{
					return false;
		}
		 return true;
 }



 function Face(settings) {
	var	THAT	=	this;

	if( checkBrowserSupport() === false ) {
			console.log( "Please use a modern browser" );
			throw new Error('Please use a modern browser');
			//return {"failFace":true};
	}

	 this.settings 		= {};

	 this.canvas 		= null;
	 this.expressions	= [];
	 this.synonyms 	= [];
	 if (settings) {
			this.settings =	Helpers.extend( this.defaults , settings  );
	 } else
			this.settings =	JSON.parse( JSON.stringify(this.defaults) );

	 this.current		= {
					expression : false,
					gaze			: {
						x : THAT.settings.gaze.x	,
						y : THAT.settings.gaze.y	,
						_previous : {
							x : THAT.settings.gaze.x	,
							y : THAT.settings.gaze.y
						}
					}
	 };

	this.loadingComponents	=	[];
	this._tttt = Date.now();
	this._init();








  this.settings.expressionTransitions.speed = 200;
  this.settings.expressionTransitions.duration = 100; // works



  // Manually de-duplicate identical string vars
  var happyBackground = "img/happy/background-min.png";

  this.defineExpression(
									"annoyed",
									{
										"elements" : [

															{ "name" : "background"	,	"image"	:happyBackground 					,"static"  : true		},
															{ "name" : "left-eye" 		,	"image"	:"img/annoyed/left-eye.png"						,"pupil_x": 122			,"pupil_y": 198.5		,"static" : false	},
															{ "name" : "right-eye" 		,	"image"	:"img/annoyed/right-eye.png"						,"pupil_x": 112			,"pupil_y": 236		,"static" : false	}

										] ,
										"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"anxious",
									{
										"elements":[
															{ "name" : "background"	,	"image"	:happyBackground 					,"static"  : true		},
															{ "name" : "left-eye" 		,	"image"	:"img/anxious/left-eye.png"							,"pupil_x": 122			,"pupil_y": 244.5		,"static" : false	},
															{ "name" : "right-eye" 		,	"image"	:"img/anxious/right-eye.png"						,"pupil_x": 122			,"pupil_y": 244.5		,"static" : false	}

										],
										"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"apologetic",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 				,"static"  : true		},
															{ "name" : "left-eye" 		,		"image"	:"img/apologetic/left-eye.png"						,"pupil_x": 122			,"pupil_y": 310		,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/apologetic/right-eye.png"					,"pupil_x": 122			,"pupil_y": 310		,"static" : false	}

										],
										"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"awkward",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 					,"static"  : true	},
															{ "name" : "left-eye" 		,		"image"	:"img/awkward/left-eye.png"						,"pupil_x": 156			,"pupil_y": 211		,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/awkward/right-eye.png"						,"pupil_x": 156			,"pupil_y": 211		,"static" : false	}

										],
										"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"blinking",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:"img/blinking/background.png" 					,"static"  : true	},
															{ "name" : "left-eye" 		,		"image"	:"img/blinking/left-eye.png"							,"pupil_x": 112.5			,"pupil_y": 16.5		,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/blinking/right-eye.png"						,"pupil_x": 112.5			,"pupil_y": 16.5		,"static" : false	}

										],
										"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"bored",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 						,"static"  : true															},
															{ "name" : "left-eye" 		,		"image"	:"img/bored/left-eye.png"							,"pupil_x": 116.5			,"pupil_y": 157	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/bored/right-eye.png"							,"pupil_x": 116.5			,"pupil_y": 314	,"static" : false	},
										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"crying",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:"img/crying/background-min.png" 						,"static"  : true															},
															{ "name" : "left-eye" 		,		"image"	:"img/crying/left-eye.png"							,"pupil_x": 91.5			,"pupil_y": 196.5	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/crying/right-eye-crying.png"					,"pupil_x": 91.5			,"pupil_y": 196.5	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"default",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:"img/default/background.png" 					,"static"  : true	},
															{ "name" : "left-eye" 		,		"image"	:"img/default/left-eye.png"							,"pupil_x": 83.5			,"pupil_y": 83.5	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/default/right-eye.png"						,"pupil_x": 83.5			,"pupil_y": 83.5	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"determined",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 				,"static"  : true	},
															{ "name" : "left-eye" 		,		"image"	:"img/determined/left-eye.png"					,"pupil_x": 112 			,"pupil_y": 206.5	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/determined/right-eye.png"					,"pupil_x": 112			,"pupil_y": 206.5	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"embarrased",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:"img/embarrased/background-min.png" 				,"static"  : true	},
															{ "name" : "left-eye" 		,		"image"	:"img/embarrased/left-eye.png"					,"pupil_x": 116.5 			,"pupil_y": 232.5	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/embarrased/right-eye.png"					,"pupil_x": 116.5 			,"pupil_y": 232.5	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"evil",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:"img/evil/background-min.png" 							,"static"  : true	},
															{ "name" : "left-eye" 		,		"image"	:"img/evil/left-eye.png"								,"pupil_x": 224.5 			,"pupil_y": 190.5	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/evil/right-eye.png"								,"pupil_x": 224.5 			,"pupil_y": 190.5	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"excited",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 					,"static"  : true	},
															{ "name" : "left-eye" 		,		"image"	:"img/excited/left-eye.png"							,"pupil_x": 199 				,"pupil_y": 258	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/excited/right-eye.png"						,"pupil_x": 199 				,"pupil_y": 258	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"exhausted",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:"img/exhausted/background-min.png" 				,"static"  : true	},
															{ "name" : "left-eye" 		,		"image"	:"img/exhausted/left-eye.png"						,"pupil_x": 116.5 		,"pupil_y": 105.5	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/exhausted/right-eye.png"					,"pupil_x": 116.5 		,"pupil_y": 105.5	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"flustered",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 					,"static"  	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/flustered/left-eye.png"						,"pupil_x"	: 169.5		,"pupil_y": 198	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/flustered/right-eye.png"						,"pupil_x"	: 169.5 		,"pupil_y": 198	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"furious",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:"img/furious/background-min.png" 					,"static"  : true	},
															{ "name" : "left-eye" 		,		"image"	:"img/furious/left-eye.png"							,"pupil_x": 91				,"pupil_y": 196		,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/furious/right-eye.png"						,"pupil_x": 91 			,"pupil_y": 196		,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"giggle",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 						,"static"  	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/giggle/left-eye.png"							,"pupil_x"	: 122		,"pupil_y": 88		,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/giggle/right-eye.png"							,"pupil_x"	: 122		,"pupil_y": 88		,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"happy",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 						,"static"  : true	},
															{ "name" : "left-eye" 		,		"image"	:"img/happy/left-eye.png"							,"pupil_x": 207			,"pupil_y": 96		,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/happy/right-eye.png"							,"pupil_x": 207 			,"pupil_y": 96		,"static" : false	}

										],
										"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"in-love",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:"img/in-love/background-min.png" 					,"static"  : true	},
															{ "name" : "left-eye" 		,		"image"	:"img/in-love/left-eye.png"							,"pupil_x": 251			,"pupil_y": 214.5	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/in-love/right-eye.png"						,"pupil_x": 251 			,"pupil_y": 214.5	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"mischievous",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 				,"static"  : true	},
															{ "name" : "left-eye" 		,		"image"	:"img/mischievous/left-eye.png"					,"pupil_x": 121			,"pupil_y": 274.5	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/mischievous/right-eye.png"					,"pupil_x": 121			,"pupil_y": 274.5	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"realized-something",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:"img/realized-something/background-min.png" 	,"static"  : true	},
															{ "name" : "left-eye" 		,		"image"	:"img/realized-something/left-eye.png"			,"pupil_x": 167.5 		,"pupil_y": 299.5	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/realized-something/right-eye.png"		,"pupil_x": 167.5 		,"pupil_y": 299.5	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"sad",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:"img/sad/background-min.png" 							,"static"  	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/sad/left-eye.png"								,"pupil_x"	: 91.5 		,"pupil_y": 196.5	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/sad/right-eye.png"								,"pupil_x"	: 91.5 		,"pupil_y": 196.5	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"sassy",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 						,"static"   	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/sassy/left-eye.png"							,"pupil_x"	: 97.5			,"pupil_y": 179.5	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/sassy/right-eye.png"							,"pupil_x"	: 97.5 			,"pupil_y": 179.5	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"scared",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 						,"static"  	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/scared/left-eye.png"							,"pupil_x"	: 197.5			,"pupil_y": 197.5	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/scared/right-eye.png"							,"pupil_x"	: 197.5			,"pupil_y": 197.5	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"shocked",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 					,"static"  	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/shocked/left-eye.png"						,"pupil_x"	: 91			,"pupil_y": 243	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/shocked/right-eye.png"						,"pupil_x"	: 91			,"pupil_y": 243	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"snoozing",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 					,"static"  	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/snoozing/left-eye.png"						,"pupil_x"	: 207		,"pupil_y": 96	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/snoozing/right-eye.png"						,"pupil_x"	: 207		,"pupil_y": 96	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"starstruck",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 				,"static"  	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/starstruck/left-eye.png"						,"pupil_x"	: 255.5 		,"pupil_y": 365	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/starstruck/right-eye.png"					,"pupil_x"	: 255 		,"pupil_y": 481	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"stuck-up",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 					,"static"  	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/stuck-up/left-eye.png"						,"pupil_x"	: 209			,"pupil_y": 99	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/stuck-up/right-eye.png"						,"pupil_x"	: 209 		,"pupil_y": 99	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"thinking",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 					,"static"  	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/thinking/left-eye.png"						,"pupil_x"	: 91.5 		,"pupil_y": 122	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/thinking/right-eye.png"						,"pupil_x"	: 91.5 		,"pupil_y": 364	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"tired",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 						,"static"  	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/tired/left-eye.png"								,"pupil_x"	: 91.5 		,"pupil_y": 122	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/tired/right-eye.png"							,"pupil_x"	: 91.5 		,"pupil_y": 122	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"upset",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 						,"static"  	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/upset/left-eye.png"							,"pupil_x"	: 186			,"pupil_y": 71	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/upset/right-eye.png"							,"pupil_x"	: 186			,"pupil_y": 71	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"winking",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 					,"static"  	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/winking/left-eye.png"							,"pupil_x"	: 91.5 		,"pupil_y": 243.5	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/winking/right-eye.png"						,"pupil_x"	: 206.5		,"pupil_y": 95.5	,"static" : false	}

										],"gaze-base": 0.5
									}

	);
	this.defineExpression(
									"wow",
									{
										"elements":[
															{ "name" : "background"	,		"image"	:happyBackground 						,"static"  	: true	},
															{ "name" : "left-eye" 		,		"image"	:"img/wow/left-eye.png"								,"pupil_x"	: 92			,"pupil_y": 261	,"static" : false	},
															{ "name" : "right-eye" 		,		"image"	:"img/wow/right-eye.png"							,"pupil_x"	: 92 			,"pupil_y": 261	,"static" : false	}

										],"gaze-base": 0.5
									}

	);














 }

 Face.prototype.defaults = {

	"boundTo"		: "body"		,
	"face_width"	: 1000		,
	"face_height"	: 1000		,
	"gaze"	: {
			"x"			: 0.5 ,
			"y"			: 0.5
	},
	"expressionTransitions" : {

			"duration"		: 500
	}

 };





 Face.prototype._init 						= function()
 {
	var 	face 						=	this								,
			expressions 			=	face.settings.expressions ,
			v 							=	0									,
			newExpr															,
			newCanvas														;

			face.current.gaze.x	=  face.settings.gaze.x		;
			face.current.gaze.y	=  face.settings.gaze.y		;



			if( !face.canvas )
			{

					if( !document.getElementById( "face-canvas" ) )
					{

							newCanvas = document.createElement( "canvas" );
							newCanvas.setAttribute( "id"		, "face-canvas" 					);
							newCanvas.setAttribute( "width"	, face.settings.face_width  	);
							newCanvas.setAttribute( "height"	, face.settings.face_height 	);

							document.querySelector( face.settings.boundTo ).appendChild( newCanvas );

							face.canvas = new fabric.StaticCanvas(	newCanvas	 , { renderOnAddRemove: false , stateful: false , selection : false });

					}else
					{
							document.getElementById( "face-canvas" ).setAttribute( "width"	, face.settings.face_width  	);
							document.getElementById( "face-canvas" ).setAttribute( "height"	, face.settings.face_height 	);
							face.canvas = new fabric.StaticCanvas(	'face-canvas'	 , { renderOnAddRemove	: false , stateful	: false , selection : false  } );
					}

			}


 };



 Face.prototype._destroy  				= function()
 {
	var 	face 	= 	this ,
			canv = document.getElementById( "face-canvas" );

			if( face.canvas )
			{
				face.canvas.dispose();
			}
			if( canv )
			{
				canv.parentNode.removeChild( canv );
			}
			this.expressions 	= 	null;
			this.synonyms	=	null;
			this.settings		=	null;
			this.loadingComponents	= null;
			this.canvas			=	null;
			this._tttt 			= 	null;
 };


 Face.prototype._createExpression 	= function( expressionParams )
 {
	var	face		=	this,
			exists	=	this._getExpression( expressionParams.name ),
			inherits;

			if( exists )
			{
						if( face.current.expression === exists.name ){ face.current.expression = "" ;}
						exists.destroy();
						inherits		=	{
										"_Face" 			: face
						};
						return	new Expression(	inherits	,	expressionParams );
			}else
			{
						inherits		=	{
										"_Face" 			: face
						};
						return	new Expression(	inherits	,	expressionParams );
			}

 };

  Face.prototype._addExpression 	= function( Expression )
 {
	var	face		=	this;
			face.expressions.push( 	Expression 	);

 };

 Face.prototype._parseExpressions 	= function( callback  )
 {
			if( !callback ){ return false; }

	var	exprs = 	this.expressions ,
			len	=	exprs.length,
			m		=	0,
			cal	= null;

			for(	var m = exprs.length - 1; m >= 0; m-- )
			{
					cal = callback( exprs[ m ] , m );
					if( cal	===	false ){	break;	}
			}
			return cal;
 };



 Face.prototype._getExpression 	= function( expressionName )
 {
			var	face	= 	this;
			var	eexx	=	false;


			for( var z = 0; z < face.synonyms.length; z++ )
			{
					for( var r = 0; r < face.synonyms[ z ].expressionSynonyms.length; r++ )
					{
							if( expressionName === face.synonyms[ z ].expressionSynonyms[ r ] )
							{
											expressionName	=	face.synonyms[ z ].expressionName ;
							}
					}
			}



									this._parseExpressions(
															function( expr )
															{
																					if( expr.name === expressionName ){	eexx	=	expr; return false;}
															}
									);

			return eexx;

 };





  Face.prototype._switchExpression 	= function( nextExpression )
 {

	var	face						= this;
	var   dur 						= face.settings.expressionTransitions.duration,dure;
	var	prepareToAnimate 	= [];

	var	nextExprObj 			= face._getExpression( nextExpression );
	var	currentExprObj 		= face._getExpression( face.current.expression );

			if(  currentExprObj  )
			{

					for( var m  = 0; m < currentExprObj.expressionElements.length; m++ )
					{
							if( currentExprObj.expressionElements[ m ].name === "background" )
							{
									currentExprObj.expressionElements[ m ].to_params.opacity = 1 ;
									face.canvas.sendToBack(	currentExprObj.expressionElements[ m ].UI_elem	);
							}
							else
							{
									currentExprObj.expressionElements[ m ].to_params.opacity = 0 ;
									face.canvas.bringToFront(	currentExprObj.expressionElements[ m ].UI_elem	);
							}



							currentExprObj.expressionElements[ m ].to_params.left 		= currentExprObj.expressionElements[ m ].params.left 		;
							currentExprObj.expressionElements[ m ].to_params.top 		= currentExprObj.expressionElements[ m ].params.top 		;
							currentExprObj.expressionElements[ m ].to_params.width 	= currentExprObj.expressionElements[ m ].params.width 	;
							currentExprObj.expressionElements[ m ].to_params.height 	= currentExprObj.expressionElements[ m ].params.height	;
					}

			}

			for( var m  = 0; m < nextExprObj.expressionElements.length; m++ )
			{
					nextExprObj.expressionElements[ m ].params.opacity = 0;
					nextExprObj.expressionElements[ m ].draw( face.canvas );
					nextExprObj.expressionElements[ m ].params.opacity = 1;

							if( nextExprObj.expressionElements[ m ].name === "background" )
							{
									face.canvas.bringToFront(	nextExprObj.expressionElements[ m ].UI_elem	);
							}else
							{
									face.canvas.bringToFront(	nextExprObj.expressionElements[ m ].UI_elem	);
							}

					if(  currentExprObj  ){

							var	sameElement = currentExprObj.getExpressionElement(  nextExprObj.expressionElements[ m ].name  );
							if( sameElement	)
							{

								sameElement.to_params.left 		= nextExprObj.expressionElements[ m ].params.left 		;
								sameElement.to_params.top 		= nextExprObj.expressionElements[ m ].params.top 		;
								sameElement.to_params.width 		= nextExprObj.expressionElements[ m ].params.width 	;
								sameElement.to_params.height 	= nextExprObj.expressionElements[ m ].params.height	;


								nextExprObj.expressionElements[ m ].UI_elem.left			=	sameElement.UI_elem.left;
								nextExprObj.expressionElements[ m ].UI_elem.top			=	sameElement.UI_elem.top;
								nextExprObj.expressionElements[ m ].UI_elem.width		=	sameElement.UI_elem.width;
								nextExprObj.expressionElements[ m ].UI_elem.height		=	sameElement.UI_elem.height;
								nextExprObj.expressionElements[ m ].UI_elem.setCoords();

							}
					}
			}
			face._stopAllAnimate();


			if(  nextExprObj  && nextExprObj.expressionElements.length > 0 )
			{

					nextExprObj.parseExpressionElements(
																	function(el , indexKey )
																	{
																		if( el )
																		{
																				duration = face.settings.expressionTransitions.duration ;
																				face.transitionIsRunning = true;
																				el.animate("GoToDefault" , null , null , null , { duration : duration	, onComplete : function(){face.transitionIsRunning = false;}		});
																		}
																	}
																);
			}
			if(  currentExprObj && currentExprObj.expressionElements.length > 0  )
			{

					currentExprObj.parseExpressionElements(
																				function( el , indexKey )
																				{
																					if( el ){
																									el.animate("GoToTarget" , el.to_params	  , null , null , {
																																	duration 		: face.settings.expressionTransitions.duration ,
																																	onComplete 	: function()
																																	{
																																			el.UI_elem.left		=	el.params.left;
																																			el.UI_elem.top		=	el.params.top;
																																			el.UI_elem.width		=	el.params.width;
																																			el.UI_elem.height	=	el.params.height;
																																			el.UI_elem.setCoords();
																																			el.clear();
																																	}
																																});
																					}
																				}
																			);
			}



 };


 Face.prototype._switchGaze 	= function()
 {

	var	face							= this;
	var	currentExprObj 			= face._getExpression( face.current.expression );

			face._parseExpressions(
															function( Expr )
															{
																				Expr.parseExpressionElements( function( ExprEl ){

																											 ExprEl.updateParamsByGaze();

																				} );
															}

			);


			if(  currentExprObj  )
			{

				var 	a = face.current.gaze.x - face.current.gaze._previous.x;
				var 	b = face.current.gaze.y - face.current.gaze._previous.y;

				var 	d 				= Math.sqrt( a*a + b*b );
				var	speed 		= currentExprObj.settings["gaze-speed"].value * currentExprObj.settings["gaze-speed"].multiplier;
				var	mult			=	10000;
				var	dur 			= (d/speed ) * mult;
				var	easing		=	currentExprObj.settings["gaze-speed"].easing;

					currentExprObj.parseExpressionElements(
						function( ExprEl )
						{
							if( !ExprEl.settings.static )
							{
								if( 		currentExprObj.settings[ "animation-effect" ].name &&
                	ExprEl.animationEffectModule[  currentExprObj.settings[ "animation-effect" ].name ] &&
                  Helpers.isInArray(ExprEl.name,ExprEl.animationEffectModule[  currentExprObj.settings[ "animation-effect" ].name ].elements) &&
                  ExprEl.animationEffectModule[  currentExprObj.settings[ "animation-effect" ].name ].enabled
								)
								{
									ExprEl.animate( currentExprObj.settings[ "animation-effect" ].name , null , null , null , { duration : dur , easing : easing	});
								}
								else{	ExprEl.animate("GoToDefault" , null , null , null , { duration : dur , easing : easing	});	}
							}
						}
					);
			}

 };



  Face.prototype._startAnimate 	= function()
 {
	var	face							= this;
	var	currentExprObj 			= face._getExpression( face.current.expression );

			if( currentExprObj.settings.animation.name  )
			{

					face._stopAllAnimate(	currentExprObj.settings.animation.name		);

					currentExprObj.parseExpressionElements( function( ExprEl ){

						if( !ExprEl.animationModule[ currentExprObj.settings.animation.name	 ].enabled )
						{
								console.log("animation "+currentExprObj.settings.animation.name +" is not enabled for this expression '"+currentExprObj.name +"'");
								return false;
						}
						ExprEl.animate( 		currentExprObj.settings.animation.name		, null , null , null , null 	);


					} );

			}

 };

 Face.prototype._stopAnimate 	= function()
 {

	var	face							= this;
	var	currentExprObj 			= face._getExpression( face.current.expression );

			if( currentExprObj.settings.animation.name )
			{
					currentExprObj.parseExpressionElements( function( ExprEl ){

												for( var m in ExprEl.animateInProgress )
												{
														ExprEl.animateInProgress[ m ] = false;
												}
					} );

			}

 };


   Face.prototype._renderer 	= function()
 {
		var	face	=	this;
		var	r		= {
							start	:	function()
							{
												var 	_t_ = Date.now();
												if( face.rendererIsRunning )
												{
														return true;
												}
												function updateFrames()
												{
													if( Date.now() - _t_ > 10 )
													{
															face.canvas.renderAll();
															_t_ = Date.now();
													}
													if( face.rendererIsRunning  )
													{
															face.rendererIsRunning	=	true;
															fabric.util.requestAnimFrame( updateFrames	,	 face.canvas );
													}
												}
												face.rendererIsRunning 	=	true;
												updateFrames();
							},
							stop	:	function()
							{
												face.rendererIsRunning	=	false;
							}
		};
		return r;
 };




  Face.prototype._stopAllAnimate 	= function(  exeption	 )
 {
	var	face	= this;
			this._parseExpressions(
												function( Expr )
												{
															Expr.parseExpressionElements( function( ExprEl )
															{
																					for( var m in ExprEl.animateInProgress )
																					{
																						if( exeption  )
																						{
																							if( m != exeption )
																							{
																								ExprEl.animateInProgress[ m ] = false;
																							}
																						}
																						else
																						{
																							ExprEl.animateInProgress[ m ] = false;
																						}
																					}
															});
												}
			);
 };
