 "use strict";

 function AnimationModule()
 {
		return this;
 }

 AnimationModule.prototype._animateInSteps	= function( steps )
 {
		function AnimStep( step , stepIndex )
		{
				var ic = {
								onChange 		: 	step.callBacks.onChange,
								onComplete 	: 	function()
														{

																	if(  stepIndex + 1< steps.length	)
																	{
																			setTimeout(function(){
																												AnimStep(  steps[ stepIndex + 1 ] , stepIndex + 1 );
																			},step.delayOnEnd);
																	}
																	step.callBacks.onComplete();
														},
								abort				:	step.callBacks.abort		,
								duration			:	step.callBacks.duration	,
								easing			:	fabric.util.ease[	step.callBacks.easing	]
				};
				step.element.animate( step.props , ic );

		}
		AnimStep( steps[ 0 ] , 0 );
 };

 AnimationModule.prototype._stepsTotalDuration	= function( steps )
 {
		var	dur 	= 0;
		var 	i 		= steps.length;
				while ( i-- ) {
					dur += steps [ i ].callBacks.duration;
				}
		return dur;
 };

 AnimationModule.prototype._animationRunner = function( animationName , ExprElem )
 {

		if( !this[ animationName ] ){	console.log( animationName +" is not a part of `AnimationModule` Constructor");		}

		var	SELF						=	this;
		var	animSettings 			= 	this[ animationName ];
		var	animationMethod	=	false;
		var	steps	 					= 	[];
		var	DefaultCallbacks		=	{

					"duration" 		: 	animSettings.duration	||	1000	,
					"abort"			:	function(){
																return ExprElem.forceStop	||	ExprElem.forceStopProgress[	animationName	];
					},
					"onComplete"	:	function(){	ExprElem.isAnimating = false;	},
					"delayOnEnd"	:	0,
					"easing"			:	animSettings.easing	||	false
				};

			if(		animationName	=== "blinking"  )
			{
					animationMethod = function ()
					{
							animSettings 							= 	SELF[ animationName ];
							DefaultCallbacks.duration 	= 	SELF[ animationName ].duration;
							DefaultCallbacks.easing 		= 	SELF[ animationName ].easing;
							steps = [

										{ element : ExprElem.UI_elem , props : { scaleY	:	animSettings.scaleY	}	, delayOnEnd : "" , callBacks : 	DefaultCallbacks 	},
										{ element : ExprElem.UI_elem , props : { scaleY	:	1  								} 	, delayOnEnd : "" , callBacks :	DefaultCallbacks 	}
							] ;
							SELF._animateInSteps(	steps 	);
					};
			}
			else	if(		animationName	=== "fluctuating"  	)
			{
					animationMethod = function ()
					{
							animSettings 						  	=	SELF[ animationName ];
							DefaultCallbacks.duration 	=	SELF[ animationName ].duration;
							DefaultCallbacks.easing 		= 	SELF[ animationName ].easing;
							steps = [

										{ element : ExprElem.UI_elem , props : { scaleX : animSettings.scaleX, scaleY	:	animSettings.scaleY	} 	, delayOnEnd : "" , callBacks :	DefaultCallbacks 	},
										{ element : ExprElem.UI_elem , props : { scaleX : 1								, scaleY	:	1								}  , delayOnEnd : "" , callBacks :	DefaultCallbacks 	}
							];
							SELF._animateInSteps(	steps 	);
					};
			}
			else	if(		animationName	=== "fluctuating-upper"  	)
			{
					animationMethod = function ()
					{
							animSettings 							= 	SELF[ animationName ];
							DefaultCallbacks.duration 	= 	SELF[ animationName ].duration;
							DefaultCallbacks.easing 		= 	SELF[ animationName ].easing;
							steps = [

										{ element : ExprElem.UI_elem , props : { top 	: ExprElem.params.top - ExprElem.params.height*animSettings.top	, height	:	ExprElem.params.height+ExprElem.params.height*animSettings.top*2	}	, delayOnEnd : "" , callBacks : 	DefaultCallbacks 	},
										{ element : ExprElem.UI_elem , props : { top 	: ExprElem.params.top 																			, height	:	ExprElem.params.height	} 	, delayOnEnd : "" , callBacks :	DefaultCallbacks 	},

							];
							SELF._animateInSteps(	steps 	);
					};
			}
			else	if(		animationName	=== "twitching-lower"  	)
			{
					animationMethod = function ()
					{
							animSettings 							= 	SELF[ animationName ];
							DefaultCallbacks.duration 	= 	SELF[ animationName ].duration;
							DefaultCallbacks.easing 		= 	SELF[ animationName ].easing;
							steps = [

										{ element : ExprElem.UI_elem , props : { top 	: ExprElem.params.top + ExprElem.params.height*animSettings.bottom	, height	:	ExprElem.params.height+ExprElem.params.height*animSettings.bottom*2	}	, delayOnEnd : "" , callBacks : 	DefaultCallbacks 	},
										{ element : ExprElem.UI_elem , props : { top 	: ExprElem.params.top 																					, height	:	ExprElem.params.height } 	, delayOnEnd : "" , callBacks :	DefaultCallbacks 	},

							];
							SELF._animateInSteps(	steps 	);
					};
			}
			else	if(		animationName	=== "wink"  	)
			{
					animationMethod = function ()
					{
							animSettings 							= 	SELF[ animationName ];
							DefaultCallbacks.duration 	=  SELF[ animationName ].duration;
							DefaultCallbacks.easing 		= 	SELF[ animationName ].easing;
							steps = [

											{ element : ExprElem.UI_elem , props : {  scaleY	:	animSettings.scaleY	}	, delayOnEnd : "" , callBacks : 	DefaultCallbacks 	},
											{ element : ExprElem.UI_elem , props : {  scaleY	:	1								} 	, delayOnEnd : "" , callBacks :	DefaultCallbacks 	}
							];
							SELF._animateInSteps(	steps 	);
					};
			}
			else	if(		animationName	=== "widen"  )
			{

					animationMethod = function ()
					{
							animSettings 								= 	SELF[ animationName ];
							DefaultCallbacks.duration 		= 	SELF[ animationName ].duration;
							DefaultCallbacks.easing 			= 	SELF[ animationName ].easing;
							steps = [

										{ element : ExprElem.UI_elem , props : {  scaleX	:	animSettings.scaleX	, 	scaleY	:	animSettings.scaleY	}	, delayOnEnd : "" , callBacks : 	DefaultCallbacks 					},
										{ element : ExprElem.UI_elem , props : {  scaleX	:	1								,	scaleY	:	1								} 	, delayOnEnd : "" , callBacks :	DefaultCallbacks 					}
							];
							SELF._animateInSteps(	steps 	);
					};
			}
			else	if(		animationName	=== "eye-roll"  )
			{
					animationMethod = function ()
					{

											animSettings 							= 	SELF[ animationName ];
											DefaultCallbacks.duration 	= 	SELF[ animationName ].duration;
											DefaultCallbacks.easing 	= 	SELF[ animationName ].easing;

												function circularMove( element , startAngle , endAngle , d , cx , cy , radius )
												{
													var OB = {
																el					: element				,
																startAngle		: startAngle			,
																endAngle	 	: endAngle	|| false	,
																dAngle			: d						,
																circleCenter	: { x : cx , y : cy }	,
																radius			: radius					,
																currentAngle	: startAngle			,
																animate			: function(){

																							fabric.util.animate({
																														startValue	: 	OB.startAngle					,
																														endValue	: 	OB.endAngle					,
																														duration		:	animSettings.duration	,
																														onChange	:	function( angle )
																														{

																																OB.moveEye( angle );
																														},
																														easing	: fabric.util.ease[	DefaultCallbacks.easing		]
																							});
																},
																moveEye		: function( Cangle ){

																							var Cangle = fabric.util.degreesToRadians(Cangle);

																							var x 	= 	this.circleCenter.x + this.radius * Math.cos(Cangle);
																							var y		=  this.circleCenter.y + this.radius * Math.sin(Cangle);
																							this.el.left 	= 	x;
																							this.el.top 	= 	y;
																}
													};
													return OB;
												}

												var	rad				=	animSettings.radius*ExprElem.params.height;

												var 	elemMove 		= 	circularMove( ExprElem.UI_elem 	, 90 , 450 , 1 , ExprElem.params.left , ExprElem.params.top - rad , rad );

														elemMove.animate();

					};

			}
			else	if(		animationName	=== "snoozing"  )
			{

					animationMethod	=	function()
					{
											animSettings 							= 	SELF[ animationName ];
											DefaultCallbacks.duration 	= 	SELF[ animationName ].duration;
											DefaultCallbacks.easing 		= 	SELF[ animationName ].easing;

											//if(  ExprElem.name!="right-eye" ){return false;}

											var RelativeTop	=	ExprElem.UI_elem.top - ExprElem.UI_elem.height/2	+( animSettings.top*ExprElem.UI_elem.height );
											var RelativeLeft 	=	ExprElem.UI_elem.left - ExprElem.UI_elem.width/2	+( animSettings.left*ExprElem.UI_elem.width );

											if( animSettings.random )
											{
												var 	distances 		= [5,10,-15,15,-2,4,13,2,6,9,20,-10,-20,-5];
												var 	rand  			= Helpers.randomInt(0,distances.length);
														RelativeTop	+= distances[ rand ];
														RelativeLeft 	+= distances[ rand ];
											}


											var Stext = new fabric.Text('Z', {
																left			: RelativeLeft,
																top			: RelativeTop,
																opacity 		: 0.3 ,
																fontSize		: animSettings["font-size"],
																fontWeight : 800,
																fill				: animSettings.color
											});
											ExprElem._Face.canvas.add( Stext ) ;

											Stext.animate(
												{
													left 			: ExprElem._Face.canvas.width*0.8,
													top			: 0,
													opacity		: 1,
													fontSize		: 50
												},
												{
													duration			:	animSettings.duration	,
													easing			: 	fabric.util.ease[	DefaultCallbacks.easing		]	,
													onComplete 	: 	function(){ Stext.remove(); }
												}
											);
					};
			}
			else	if(		animationName	=== "tear-drop"  )
			{
					var   R = -1;

					animationMethod	=	function()
					{
											animSettings 							= 	SELF[ animationName ];
											DefaultCallbacks.duration 	= 	SELF[ animationName ].duration;
											DefaultCallbacks.easing 		= 	SELF[ animationName ].easing;

											var	tearPos		=	{
																			x	:	ExprElem.UI_elem.left	,
																			y	:	ExprElem.UI_elem.top
											};

											if( animSettings.random )
											{
											R *= -1;
											var	RR = Math.floor( 0.5 - Math.random() );

												tearPos.x	=	 ExprElem.UI_elem.left + RR*R*Helpers.randomInt(1,ExprElem.params.width/2);


												tearPos.y	=	ExprElem.UI_elem.top +  Helpers.randomInt(1,ExprElem.params.height/2);
											}

											var 	tearDrop	= 	new fabric.Path('M 6 1 c -2 3 -5 5 -5 9 0 7 10 7 10 0 0 -4 -3 -6 -5 -9z', {

														stroke			: animSettings.stroke,
														strokeWidth	: 0.5,
														fill					:  animSettings.color,
														originX			: 'center',
														originY			: 'center',
														top				: tearPos.y,
														left				: tearPos.x,
														scaleX			: 0.5,
														scaleY			: 0.5

											});

											ExprElem._Face.canvas.add(			tearDrop			);


											tearDrop.animate(
																{
																	top				:	ExprElem._Face.canvas.height + ExprElem.UI_elem.height	,
																	scaleY			:	30,
																	scaleX			:	10
																},
																{
																	duration			:	animSettings.duration 	,
																	easing			: 	fabric.util.ease[	DefaultCallbacks.easing		]	,
																	onComplete	:	function(){ tearDrop.remove(); }
																}
											);


					};

			}

		function RUN ()
		{
				if( !ExprElem.animationModule[ animationName ].enabled ){ 	ExprElem.animateInProgress[ animationName ] = false;		return false; }

				if( Helpers.isInArray( ExprElem.name , ExprElem.animationModule[ animationName ].elements	) )
				{
						if( !animationMethod ){ 		ExprElem.animateInProgress[ animationName ] = false;	return false; }

						ExprElem.animateInProgress[ animationName ] = true;

						animationMethod();
				}

				var 	repeat 			= false	,
						repeatTime 	= 0;

				if(	typeof SELF[ animationName ][ "average-delay" ] != 'undefined'	)
				{
						repeat		=	true;
						repeatTime	=  SELF[ animationName ][ "average-delay" ];
						if(repeatTime<0)
						{
								repeatTime	=	0;
						}
				}
				if( steps.length > 0		&& 	repeat === true )
				{
						repeatTime	+=	SELF._stepsTotalDuration( steps ) ;
				}

				if(	repeat === false )
				{
							var 	tas = SELF._stepsTotalDuration( steps ) ;
									setTimeout(function()
									{
																		ExprElem.animateInProgress[ animationName ] = false;
									}	,	tas	);
				}

				return {r:repeat,t:repeatTime};
		}

		/** Don't allow to run the same animation while it is already running	**/
		if(	 ExprElem.animateInProgress[ animationName ] )
		{
				return false;
		}

		var rsa	= RUN();

		var	_ttt;
		var	request;

		function timer(){

			if( ExprElem.animateInProgress[ animationName ]	  )		//repeat continuous only if animateInProgress === true
			{
						if( (Date.now() - _ttt) >  rsa.t	)
						{
								_ttt = Date.now();
								rsa = RUN();
						}
			}else{
						window.cancelAnimationFrame(request);
						request 	= undefined;
						return;
			}
			request = requestAnimationFrame( timer );
		}

		if( rsa && rsa.r )
		{
				_ttt = Date.now();
				timer();
		}


 };

/** Default settings for all animations **/
/** These can be overwritten for each  **/
/** element of each expression			  **/

 AnimationModule.prototype.blinking 	=
 {
 				"enabled"				: true								,
				"elements"				: ["left-eye","right-eye"]		,
 				"average-delay" 		: 1000 								,
 				"duration" 				: 200 								,
 				"easing" 				: "linear" 							,
 				"scaleY" 				: 0.1
 };

 AnimationModule.prototype.fluctuating 	=
 {
 				"enabled"				: true								,
				"elements"				: ["left-eye","right-eye"]		,
 				"average-delay" 		: 1000 								,
 				"duration" 				: 200 								,
 				"easing" 				: "linear" 							,
 				"scaleY" 				: 1.5 									,
 				"scaleX" 				: 1.5
 };

 AnimationModule.prototype[ "fluctuating-upper" ]	=
 {
 				"enabled"				: true								,
				"elements"				: ["left-eye","right-eye"]		,
 				"average-delay" 		: 1000 								,
 				"duration" 				: 200 								,
 				"easing" 				: "linear" 							,
 				"top" 					: 0.2
 };

 AnimationModule.prototype[ "twitching-lower"	] 	=
 {
 				"enabled"				: true								,
				"elements"				: ["left-eye","right-eye"]		,
 				"average-delay" 		: 1000 								,
 				"duration" 				: 50									,
 				"easing" 				: "linear" 							,
 				"bottom" 				: 0.1
 };

 AnimationModule.prototype[ "tear-drop"  ] 	=
 {
 				"enabled"				: true								,
				"elements"				: ["left-eye","right-eye"]		,
 				"average-delay" 		: 1000 								,
 				"duration" 				: 2000 								,
 				"easing" 				: "linear" 							,
 				"stroke"					: "cyan" 							,
 				"color"					: "blue" 								,
 				"random"				: true
 };

 AnimationModule.prototype.snoozing 	=
 {
 				"enabled"				: true								,
				"elements"				: ["right-eye"]						,
 				"average-delay" 		: 1000								,
 				"duration" 				: 3000 								,
 				"easing" 				: "linear" 							,
 				"left" 					: -0.3 								,
 				"top"						: -0.3 								,
 				"font-size"				:	40									,
 				"color"					:	"cyan"							,
 				"random"				:	true
 };

 AnimationModule.prototype.wink 	=
 {
 				"enabled"				: true								,
				"elements"				: ["left-eye","right-eye"]		,
 				"duration" 				: 200 								,
 				"easing" 				: "linear" 							,
 				"scaleY" 				: 0.5
 };

 AnimationModule.prototype.widen 	=
 {
 				"enabled"				: true								,
				"elements"				: ["left-eye","right-eye"]		,
 				"duration" 				: 200									,
 				"easing" 				: "linear" 							,
 				"scaleY" 				: 1.5 									,
 				"scaleX" 				: 1.5
 };

 AnimationModule.prototype[ "eye-roll" 	] 	=
 {
 				"enabled"				: true								,
				"elements"				: ["left-eye","right-eye"]		,
 				"duration" 				: 1000 								,
 				"easing" 				: "linear" 							,
 				"radius" 				: 0.3
 };
