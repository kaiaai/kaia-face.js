  /** This is the API for users  **/

Face.prototype.defineModel				= function( JsonObject )	// a valid well !~formatted~! JSON
{
		if( !Helpers.checkArgs(	"defineModel" , arguments , ["object"] ) ){ return false; }

		if( JsonObject.expressions  )
		{
			for(  var c in JsonObject.expressions   )
			{
					this.defineExpression( c , JsonObject.expressions[ c ] );
			}
		}

		if( JsonObject.synonyms  )
		{
			for(  var a = 0 ; a <  JsonObject.synonyms.length ; a++   )
			{
					this.addSynonyms( JsonObject.synonyms[ a ].expression 	,	JsonObject.synonyms[ a ].synonyms  	);
			}
		}

		if( JsonObject[ "one-shot-animations" ]  )
		{
			for(   var b in JsonObject["one-shot-animations"]    )
			{
					if(  AnimationModule.prototype[ b ]				&& 		b[ 0 ] !="_"	)
					{
							Helpers.extendLeft( 	AnimationModule.prototype[ b ] 	, JsonObject["one-shot-animations"][ b ]   );
					}
					else
					{
							console.log( "Error setting one-shot-animation with name : " + b +" . This animation name does not belong to animation supported list" );
					}
			}
		}

		if( JsonObject[ "continuous-animations" ]  )
		{
			for(   var z in JsonObject["continuous-animations"]    )
			{
					if(  AnimationModule.prototype[ z ]				&& 		z[ 0 ] !="_"	)
					{
							Helpers.extendLeft( 	AnimationModule.prototype[ z ] 	, JsonObject["continuous-animations"][ z ]   );
					}
					else
					{
							console.log( "Error setting continuous-animation with name : " + z +" . This animation name does not belong to animation supported list" );
					}
			}
		}

		if( JsonObject[ "animation-effects" ]  )
		{
			for(   var d in JsonObject["animation-effects"]    )
			{
					if(  AnimationEffectModule.prototype[ d ]		&& 		d[ 0 ] !="_"	)
					{
							Helpers.extendLeft( 	AnimationEffectModule.prototype[ d ] 	, JsonObject["animation-effects"][ d ]   );
					}
					else
					{
							console.log( "Error setting animation-effect with name : " + d +" . This animation name does not belong to animation supported list" );
					}
			}
		}
};


 Face.prototype.addSynonyms		= function( expressionName , arr )
{

		if( !Helpers.checkArgs( "addSynonyms" , arguments , ["string"] )  ){ return false; }

		var	synonymArray = [] ;
		var	Exp				=	this._getExpression( expressionName );
				if( !Exp )
				{	// expression does not exist
					return false;
				}

		function	uniq(a) {
				return a.sort().filter(function(item, pos, ary) {
							return !pos || item != ary[pos - 1];
				});
		}


		for( var m = 1 ; m < arguments.length ; m ++ )
		{
					if(	 !Helpers.isArray( arguments[ m ] )	)
					{
							if( !Helpers.checkArgs( "addSynonyms" , [ arguments[ m ] ] , ["string"] )  ){ return false; }

							synonymArray.push( arguments[ m ] );
					}
					else
					if(	 Helpers.isArray( arguments[ m ] , ["array"] )	)
					{
							if( !Helpers.checkArgs( "addSynonyms" , [ arguments[ m ] ] , ["arrayOfStrings"] )  ){ return false; }

							synonymArray	=	synonymArray.concat( arguments[ m ] );
					}

		}

		// check if synonym is an expression name.

		for( var ex = 0 ;  ex < this.expressions.length ; ex++ )
		{
			for( var syn = synonymArray.length - 1; syn >= 0;  syn-- )
			{
				if( this.expressions[ ex ].name ===  synonymArray[ syn ] &&  this.expressions[ ex ].name !== Exp.name )
				{
						return false;

				}
				if( this.expressions[ ex ].name ===  synonymArray[ syn ] &&  this.expressions[ ex ].name === Exp.name )
				{
						// remove from synonyms array if it contains same 'name' as 'expressionName'
						synonymArray.splice( era , 1 );
				}
			}
		}

		// find expression in face.synonyms and add more synonyms if exists. If does not exist, create an new entry
		var	hasSynonyms = false;
		for( var faSyn = 0 ; faSyn < this.synonyms.length ; faSyn++ )
		{
				if(   this.synonyms[ faSyn ].expressionName === Exp.name	)
				{
							this.synonyms[ faSyn ].expressionSynonyms 	= 	this.synonyms[ faSyn ].expressionSynonyms.concat( synonymArray );

							this.synonyms[ faSyn ].expressionSynonyms	=	uniq( this.synonyms[ faSyn ].expressionSynonyms );

							hasSynonyms = true;
							//break;
				}
				else
				{
							for( var det = 0; det < synonymArray.length ; det++ )
							{
									for( var era = this.synonyms[ faSyn ].expressionSynonyms.length - 1;  era >= 0;  era-- )
									{

											if( 	this.synonyms[ faSyn ].expressionSynonyms[ era ]=== synonymArray[ det ]	)
											{
															this.synonyms[ faSyn ].expressionSynonyms.splice( era , 1 );
											}

									}
							}
				}
		}
		if( hasSynonyms === false )
		{
				this.synonyms.push({ expressionName : Exp.name , expressionSynonyms : uniq( synonymArray ) });
		}

		return true;
};








Face.prototype.defineExpression 		= function( str , JsonObject )
{
		if( !Helpers.checkArgs( "defineExpression" , arguments , ["string","object"])  ){ return false; }

		var	face								= this;
				JsonObject.name 			= str;

		var 	m 			=	face._createExpression( JsonObject );
				if(	m	)  {
								face._addExpression(	m	);

								if( JsonObject["continuous-animation"] 	)
								{
										face.setAnimation(	JsonObject.name , JsonObject["continuous-animation"].name	,	JsonObject["continuous-animation"]	)	;
								}
								if(  JsonObject["one-shot-animation"]	)
								{
										face.setAnimation(	JsonObject.name , JsonObject["one-shot-animation"].name		,	JsonObject["one-shot-animation"]	)	;
								}
								if( JsonObject["animation-effect"] 	)
								{
										face.setAnimationEffect(	JsonObject.name , JsonObject["animation-effect"].name	,	JsonObject["animation-effect"]			)	;
								}
				}

};


Face.prototype.setExpression			= function( str ){

		var 	face 		= this;

		if( !Helpers.checkArgs( "setExpression" , arguments , ["string"] )   ){ return false; }

		var	Exp			=	this._getExpression( str );

		if( !Exp ){ console.log( "this expression name or a synonym : "+str+" has not been defined. use defineExpression to define a new expression");return false; }

		if( this.current.expression === Exp.name ){	return false;	}

		if( this.transitionIsRunning === true ){	console.log("another transition is in progress.Please wait to end");return false;	}

		this._switchExpression(  Exp.name  );

		this.current.expression = Exp.name;

		return true;

};


Face.prototype.setGazeDirection		= function( x , y ){

		if( !Helpers.checkArgs("setGazeDirection",arguments,["number","number"],[{Vmin:0,Vmax:1},{Vmin:0,Vmax:1}]) ){return false;}

		var 	face = this;
				face.current.gaze._previous.x = face.current.gaze.x;
				face.current.gaze._previous.y = face.current.gaze.y;
				face.current.gaze.x	=	x;
				face.current.gaze.y	=	1-y;

				face._switchGaze();

};


Face.prototype.unsetGazeDirection	= function(){

		var	face = this;
				face.current.gaze._previous.x = face.current.gaze.x;
				face.current.gaze._previous.y = face.current.gaze.y;
				face.current.gaze.x	=	face.settings.gaze.x;
				face.current.gaze.y	=	face.settings.gaze.y;

				face._switchGaze();
};


Face.prototype.setGazeSpeed				= function( exprStr , n , easyStr )
{
		if( !Helpers.checkArgs("setGazeSpeed",arguments,["string","number","string"],[false,false,["linear","ease-in","ease-out","ease-in-out"]]) 	)
		{
			return false;
		}
		var 	Exp		=	this._getExpression( exprStr ) ;
		var	match	=	{ "ease-in" : "easeInQuad"	,"ease-out" :	"easeOutQuad" ,	"ease-in-out"	: "easeInOutQuad" , "linear":"linear"} ;

		if( 	exprStr !=="*" 	&&  	!Exp 		){ console.log( "this expression name : "+exprStr+" has not been defined. use defineExpression to define a new expression");return false; }


		if( exprStr === "*" )
		{
				for( var k  = 0; k <  this.expressions.length; k++ )
				{
						this.expressions[ k ].settings[ "gaze-speed" ].multiplier = n;
						this.expressions[ k ].settings[ "gaze-speed" ].easing = match[ easyStr.toLowerCase()  ] ;
				}
		}
		else
		{
				Exp.settings[ "gaze-speed" ].multiplier = n;
				Exp.settings[ "gaze-speed" ].easing = match[ easyStr.toLowerCase()  ] ;

		}


	//	if( 	!Exp	){ console.log( "this expression name : "+exprStr+" has not been defined. use defineExpression to define a new expression");return false; }

	//	Exp[ "settings" ][ "gaze-speed" ] [ "multiplier" 	] = n;
	//	Exp[ "settings" ][ "gaze-speed" ] [ "easing" 		] = match[ easyStr.toLowerCase()  ] ;

		return true;
};



















Face.prototype.setAnimationEffect		= function( exprStr , effectName  , settings )
{

		if( !Helpers.checkArgs( "setAnimationEffect" , arguments , ["string","string","object"],[false,[ "bounce","splat"	,"road-runner","swoosh","jelly"],false] ) 	)
		{
			return false;
		}

		var 	Expression	=	this._getExpression( exprStr );

		if( exprStr !=="*" 	&&  !Expression 	){ console.log( "this expression name : "+exprStr+" has not been defined. use defineExpression to define a new expression");return false; }

		var errorMessage	=	"problem setting animation Effect "+effectName+" . Effect maybe is not a part of library effects";


		if( exprStr === "*" )
		{
			for( var k  = 0; k <  this.expressions.length; k++ )
			{
				this.expressions[ k ].settings["animation-effect"].name = effectName;

				MergeIt( this.expressions[ k ] , settings );
			}
		}
		else
		{
				Expression.settings["animation-effect"].name = effectName;

				MergeIt( Expression , settings );
		}

		function MergeIt( Expression , settings )
		{

				Expression.parseExpressionElements(
																	function( ExprEl ){

																			ExprEl.settings[ 	"animation-effect" 	].name = JSON.stringify( Expression.settings[ "animation-effect" ].name );

																			var	effectDefaults		=	ExprEl.animationEffectModule[		Expression.settings[ "animation-effect" ].name		];
																			var	copyDefaults		=	JSON.parse( 	JSON.stringify( effectDefaults )		);
																			ExprEl.animationEffectModule[		Expression.settings[ "animation-effect" ].name		]	=	copyDefaults;
																			Helpers.extendLeft( 	copyDefaults 	, settings   );

																	}
																);
		}



};

Face.prototype.unsetAnimationEffect	= function( exprStr  , removeSettings )
{
		if( !Helpers.checkArgs( "unsetAnimationEffect" 	, arguments , ["string"] ) 	)
		{
			return false;
		}
		var 	Expression	=	this._getExpression( exprStr );

		if( exprStr !=="*" 	&& 	!Expression 	){ console.log( "this expression name : "+exprStr+" has not been defined. use defineExpression to define a new expression");return false; }

		if( exprStr === "*" )
		{
			for( var k  = 0; k <  this.expressions.length; k++ )
			{
				resetParameters( this.expressions[ k ] , this.expressions[ k ].settings[	"animation-effect"	].name );

				this.expressions[ k ].settings[	"animation-effect"	].name	=	this.expressions[ k ].defaults[ "animation-effect" ].name 	;

				passToElements(	 this.expressions[ k ]  );

			}
		}
		else
		{
				resetParameters( Expression , Expression.settings[	"animation-effect"	].name );

				Expression.settings[	"animation-effect"	].name	=	Expression.defaults[ "animation-effect" ].name 	;

				passToElements(	 Expression  );
		}


		function passToElements(	 Expression	){

							Expression.parseExpressionElements(

									function( ExprEl ){

											ExprEl.settings[ 	"animation-effect" 	].name = 	Expression.defaults[ "animation-effect" ].name 	;

									}

							);

		}

		function resetParameters( Expression , effectName )
		{
							Expression.parseExpressionElements(
																				function( ExprEl )
																				{
																								if( ExprEl.animationEffectModule[ 		effectName	]	)
																								{

																										var		forces	=	ExprEl.animationEffectModule[ 	effectName+"_forces"	];
																													for( var b = 0; b < forces.length; b++ )
																													{
																															forces[ b ].STOP = true;

																													}

																													setTimeout(function(){
																															ExprEl.UI_elem.left		= ExprEl.params.left;
																															ExprEl.UI_elem.top		= ExprEl.params.top;
																															ExprEl.UI_elem.width	= ExprEl.params.width;
																															ExprEl.UI_elem.height	= ExprEl.params.height;
																															ExprEl.UI_elem.scaleX	= 1;
																															ExprEl.UI_elem.scaleY	= 1;
																															ExprEl.UI_elem.angle	= 0;
																															ExprEl.UI_elem.skewX	= 0;
																													},20);

																										if( 	removeSettings	)
																										{
																											delete	ExprEl.animationEffectModule[ 	effectName	];
																										}
																								}

																				}
																			);
		}



};















Face.prototype.setAnimation				= function( exprStr , animationName , settings ){

		if( !Helpers.checkArgs( "setAnimation" 	, arguments , ["string","string","object"] ,[false,[ "blinking","fluctuating"	,"fluctuating-upper","twitching-lower","tear-drop","snoozing","wink","widen"	,"eye-roll"],false] ) 	)
		{
			return false;
		}

		var 	Expression	=	this._getExpression( exprStr );

		if( exprStr !=="*" && 	!Expression 	){ console.log( "this expression name : "+exprStr+" has not been defined. use defineExpression to define a new expression");return false; }

		var errorMessage = "problem setting animation "+animationName+". Animation maybe is not a part of library continuous or one-shot animations";

		if( settings && settings.easing )
		{
			if( !Helpers.checkArgs(	"setAnimation"	,	[	settings.easing	],["string"]	,	[ ["linear","ease-in","ease-out","ease-in-out"] ] ) 	)
			{
				return false;
			}
			var	 	match				=	{ "ease-in" : "easeInQuad"	,"ease-out" :	"easeOutQuad" ,	"ease-in-out"	: "easeInOutQuad" , "linear":"linear"};
						settings.easing	= match[ settings.easing.toLowerCase()  ] ;
		}

		if( exprStr === "*" )
		{
			for( var k  = 0; k <  this.expressions.length; k++ )
			{
				this.expressions[ k ].settings.animation.name 	=  animationName;

				MergeIt( this.expressions[ k ] , settings );
			}
		}
		else
		{
				Expression.settings.animation.name 	= 	animationName;

				MergeIt( Expression , settings );

		}

		function MergeIt( Expression , settings )
		{

				Expression.parseExpressionElements(
																	function( ExprEl ){

																			ExprEl.settings.animation.name = Expression.settings.animation.name;

																			var	effectDefaults		=	ExprEl.animationModule[		Expression.settings.animation.name		];
																			var	copyDefaults		=	JSON.parse( 	JSON.stringify( effectDefaults )		);
																			ExprEl.animationModule[		Expression.settings.animation.name		]	=	copyDefaults;
																			Helpers.extendLeft( 	copyDefaults 	, settings   );

																	}
																);
		}

};

Face.prototype.unsetAnimation			= function( exprStr , removeSettings )
{
		if( !Helpers.checkArgs( "unsetAnimation" 	, arguments , ["string"] ) 	)
		{
			return false;
		}

		this._stopAnimate();

		var 	Expression	=	this._getExpression( exprStr );

		if( exprStr !=="*" && 	!Expression 	){ console.log( "this expression name : "+exprStr+" has not been defined. use defineExpression to define a new expression");return false; }
		if( exprStr === "*" )
		{
			for( var k  = 0; k <  this.expressions.length; k++ )
			{

				resetParameters( this.expressions[ k ] , this.expressions[ k ].settings.animation.name );

				this.expressions[ k ].settings.animation.name	=	this.expressions[ k ].defaults.animation.name ;

				passToElements(	 this.expressions[ k ]	);
			}
		}
		else
		{
				resetParameters( Expression , Expression.settings.animation.name );

				Expression.settings.animation.name	=	Expression.defaults.animation.name 	;

				passToElements(	 Expression	);
		}

		function resetParameters( Expression , animationName )
		{
							Expression.parseExpressionElements(
																				function( ExprEl )
																				{
																								if( removeSettings	&&	ExprEl.animationModule[ 		animationName	]	)
																								{
																										delete	ExprEl.animationModule[ 	animationName	];
																								}
																				}
																			);
		}

		function passToElements(	 Expression	){

							Expression.parseExpressionElements(

									function( ExprEl ){

											ExprEl.settings.animation.name = 	Expression.defaults.animation.name ;

									}

							);

		}



};



















Face.prototype.playAnimation				= function()
{
		this._startAnimate();
};

Face.prototype.stopAnimation				= function()
{
		this._stopAnimate();
};
