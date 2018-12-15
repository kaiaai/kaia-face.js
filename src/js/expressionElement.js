 "use strict";

 function ExpressionElement( constructorProperties , settings )
 {
		var SELF = this;

		this.settings 		= "";
		this.name			= null;
		this.UI_elem		= null;
		this._Face			= "";
		this._Expression 	= "";
		this.params		= {

				left		: null,
				top		: null,
				width		: null,
				height	: null,
				opacity	: null
		};
		this.to_params	= {

				left		: null,
				top		: null,
				width		: null,
				height	: null,
				opacity	: null
		};
		this.isLoading  				= false;
		this.forceStop					= false;		//	used also in  	forceStop
		this._onload					= false;

		this.forceStopProgress		= {};		// used also in  animationModule.js
		this.animateInProgress 	= {};		// used also in 	main.js   and  animationModule.js


		Helpers.extend( 		this			,		constructorProperties 	);

		 if( settings )
		{
			SELF.settings =	Helpers.extend( JSON.parse(	JSON.stringify( this.defaults ) 	) , settings  );

		}else
		{
			SELF.settings =	JSON.parse( JSON.stringify( this.defaults ) );
		}

		if( typeof AnimationModule != 'undefined'		)
		{
					this.animationModule 			=	new AnimationModule();
		}else
		{
					this.animationModule 			=	false;
		}

		if( typeof AnimationEffectModule != 'undefined'		 )
		{
					this.animationEffectModule 	=	new AnimationEffectModule();
		}else
		{
					this.animationEffectModule 	=	false;
		}

		SELF.init();




		return this;
 }


 ExpressionElement.prototype.defaults = {

	"name"			: ""		,
	"static"			: true	,
	"resizeBase"	: 1284	,
	"image" 	 	: null		,
	"pupil_x"	 	: null		,
	"pupil_y"	 	: null		,
	"animation"	: {

						"name"				: 	""
	},
	"animation-effect"	: {

						"name"				:	""
	}
 };



 ExpressionElement.prototype.init 				= function()
 {

 		var	ExprElem 				=	this							,
				settings					= 	ExprElem.settings	,
				imgPath					=	settings.image	;

				ExprElem.name	=	settings.name			;

		if( imgPath	 ){


				fabric.Image.fromURL( imgPath , function( img ) {

						if( settings.resizeBase	)
						{
								img.width  					= Helpers.resizeBasedOn(	ExprElem._Face.settings.face_width	,	settings.resizeBase , img.width				);
								img.height 				= Helpers.resizeBasedOn(	ExprElem._Face.settings.face_width	,	settings.resizeBase , img.height			);
								settings._pupil_x 	= Helpers.resizeBasedOn(	ExprElem._Face.settings.face_width	,	settings.resizeBase , settings.pupil_x	);
								settings._pupil_y 	= Helpers.resizeBasedOn(	ExprElem._Face.settings.face_width	,	settings.resizeBase , settings.pupil_y	);

						}else
						{
								img.width  					= 	img.width;
								img.height 				= 	img.height;
								settings._pupil_x 	=	settings.pupil_x;
								settings._pupil_y 	=	settings.pupil_y;
						}
						ExprElem.params.left		= ExprElem._Face.settings.face_width	/	2;
						ExprElem.params.top		= ExprElem._Face.settings.face_height	/	2;
						ExprElem.params.width	= img.width;
						ExprElem.params.height	= img.height;

						ExprElem.UI_elem = img;

						img.set(
									{	opacity	:	0				,
										originX	:	"center"		,
										originY	:	"center"
									}
						);

						ExprElem.updateParamsByGaze();

						ExprElem.isLoading = false;

						if( ExprElem._onload )
						{
								ExprElem._onload( ExprElem );
						}

						//var sss = Math.floor(Math.random() * 9)*1000 + 1;
						//setTimeout(function(){





						for( var j  = 0 ; j < ExprElem._Face.loadingComponents.length; j++ )
						{
								if( ExprElem._Face.loadingComponents[ j ] === ExprElem )
								{

										ExprElem._Face.loadingComponents.splice( j , 1 );
								}
						}
						if(		ExprElem._Face.loadingComponents.length	=== 0 	&& 	ExprElem._Face.hasOwnProperty("onload")		)
						{
										ExprElem._Face.onload(	ExprElem._Face	);
						}




						//},sss);




				});


		ExprElem.isLoading = true;

		ExprElem._Face.loadingComponents.push( ExprElem );

		}

 };


 ExpressionElement.prototype.destroy 						= function()
 {
		var 	ExprElm = this;

		this.clear();
		this.forceStop = true;
		for( var u in this.forceStopProgress )
		{
				 this.forceStopProgress[ u ] = true;
		}
		for( var u in this.animateInProgress )
		{
				 this.animateInProgress[ u ] = false;
		}
		this.UI_elem = null;
		this._Expression.parseExpressionElements(

					function(el,k){
											if( el === ExprElm )
											{
												ExprElm._Expression.expressionElements.splice( k , 1 );
											}
					}

		);
 };


 ExpressionElement.prototype.draw 							= function()
 {
  		var 	t 	= 	this.params.top,
				l	= 	this.params.left,
				w	=	this.params.width,
				h	=	this.params.height,
				o	=	this.params.opacity;

		this.UI_elem.set(
									{
										left 		: l 	,
										top 		: t 	,
										width 	: w 	,
										height 	: h 	,
										opacity 	: o
									}
		);

		this._Face.canvas.add( this.UI_elem );

		if( this.name === "background" ||  this.name === "face-background" )
		{
			this._Face.canvas.sendToBack(	this.UI_elem	);
		}

 };


 ExpressionElement.prototype.clear						= function()
 {
		this.UI_elem.remove();
 };


 ExpressionElement.prototype.updateParamsByGaze 	= function()
 {

 	var	ExprElem 	=	this							,
			Face			=	ExprElem._Face			,
			Expression	=	ExprElem._Expression	,
			gaze			=	face.current.gaze		,
			XPUPIL											,
			YPUPIL											;

		if ( ExprElem.settings.hasOwnProperty("static") && ExprElem.settings.static === true  )
		{
				return	false;
		}

		if ( ExprElem.name.toLowerCase() === "left-eye" )
		{
				XPUPIL 		= gaze.x 	- 	Expression.settings["gaze-base"]/2;
		}
		else
		if ( ExprElem.name.toLowerCase() === "right-eye" )
		{
				XPUPIL		= gaze.x 	+ 	Expression.settings["gaze-base"]/2;
		}

		YPUPIL				= gaze.y;

		ExprElem.params.left	=  face.canvas.width	 *  XPUPIL  + ExprElem.params.width	/2  	- 	ExprElem.settings._pupil_x;
		ExprElem.params.top	=  face.canvas.height	 *  YPUPIL  + ExprElem.params.height	/2 	- 	ExprElem.settings._pupil_y;


 };


 ExpressionElement.prototype.animate 					= function( animationName , properties , animationSettings , startAfter , callbacks )
 {

			if( !fabric.util.ease.linear )
			{
					fabric.util.ease.linear = function(t, b, c, d) { return c*t/d + b; };
			}

 	var	ExprElem 			=	this;

	var	DefaultCallbacks	=	{

				"duration" 		: 	1000,
				"abort"			:	 function(){
															return ExprElem.forceStop;
				},
				"onComplete"	:	function(){	ExprElem.isAnimating = false;	},
				"delayOnEnd"	:	0,
				"easing"			:	false																											//easeInQuad		easeOutQuad		easeInOutQuad
			};

			if( callbacks )
			{

					DefaultCallbacks.duration				=	callbacks.duration 	|| 	1000;
					if(	callbacks.onChange	)
					{
						DefaultCallbacks.onChange			=	callbacks.onChange;		// if set callbacks.onChange , it should be   false.
					}
					DefaultCallbacks.easing					=	fabric.util.ease[ callbacks.easing ]	 	||	false;
					if(	callbacks.onComplete	)
					{
						DefaultCallbacks.onComplete		=	function(){	ExprElem.isAnimating = false;  callbacks.onComplete();	};
					}
			}

																		ExprElem._Face._renderer().start();	// !!!!! start !

	switch ( animationName ) {

		case "GoToTarget"			:

														ExprElem.UI_elem.animate( properties ,	DefaultCallbacks );
			break;
		case "GoToDefault"			:
												var 	t 	= 	ExprElem.params.top,
														l	= 	ExprElem.params.left,
														w	=	ExprElem.params.width,
														h	=	ExprElem.params.height,
														o	=	ExprElem.params.opacity;

														ExprElem.UI_elem.animate(
																									{
																										left 		: l 	,
																										top 		: t 	,
																										width 	: w 	,
																										height 	: h 	,
																										opacity	: o
																									} ,
																									DefaultCallbacks
																		);

			break;
		/**
							Animations Here
		**/
		case "blinking" 				:
													if( ExprElem.animationModule 			){	ExprElem.animationModule._animationRunner(	"blinking"				,	ExprElem	);	}
			break;
		case "fluctuating" 			:
													if( ExprElem.animationModule 			){	ExprElem.animationModule._animationRunner(	"fluctuating"			,	ExprElem	);	}
			break;
		case "fluctuating-upper" 	:
													if( ExprElem.animationModule 			){	ExprElem.animationModule._animationRunner(	"fluctuating-upper"	,	ExprElem	);	}
			break;
		case "twitching-lower"		:
													if( ExprElem.animationModule			){	ExprElem.animationModule._animationRunner(	"twitching-lower"		,	ExprElem	);	}
			break;
		case "tear-drop" 			:
													if( ExprElem.animationModule 			){	ExprElem.animationModule._animationRunner(	"tear-drop"				,	ExprElem	);	}
			break;
		case "snoozing"				:
													if( ExprElem.animationModule			){	ExprElem.animationModule._animationRunner(	"snoozing"				,	ExprElem	);	}
			break;
		case "wink"					:
													if( ExprElem.animationModule 			){	ExprElem.animationModule._animationRunner(	"wink"					,	ExprElem	);	}
			break;
		case "widen" 					:
													if( ExprElem.animationModule 			){	ExprElem.animationModule._animationRunner(	"widen"					,	ExprElem	);	}
			break;
		case "eye-roll" 				:
													if( ExprElem.animationModule 			){	ExprElem.animationModule._animationRunner(	"eye-roll"				,	ExprElem	);	}
			break;
		/**
							Animation Effects Here
		**/
		case "bounce" 				:
													if( ExprElem.animationEffectModule 	){	ExprElem.animationEffectModule._animationRunner(	"bounce"		,	ExprElem	);	}
			break;
		case "jelly" 					:
													if( ExprElem.animationEffectModule 	){	ExprElem.animationEffectModule._animationRunner(	"jelly"			,	ExprElem	);	}
			break;
		case "splat" 					:
													if( ExprElem.animationEffectModule 	){	ExprElem.animationEffectModule._animationRunner(	"splat"			,	ExprElem	);	}
			break;
		case "swoosh" 				:
													if( ExprElem.animationEffectModule 	){	ExprElem.animationEffectModule._animationRunner(	"swoosh"		,	ExprElem	);	}
			break;
		case "road-runner" 			:
													if( ExprElem.animationEffectModule 	){	ExprElem.animationEffectModule._animationRunner(	"road-runner"	,	ExprElem	);	}
			break;
	}


 };
