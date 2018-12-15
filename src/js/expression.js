 "use strict";

  function Expression(  constructorProperties ,  settings )
 {
		this.settings 					= null;
		this._Face						= "";
		this.name						= null;
		this.expressionElements	= [];

		Helpers.extend(	 	this		,		constructorProperties 	);

		 if( settings )
		{
			this.settings =	Helpers.extend( 	JSON.parse(	JSON.stringify( this.defaults ) 	)	, settings   );

		}else
		{
			this.settings =	JSON.parse( JSON.stringify( this.defaults ) );
		}

		this.init();

		return this;
 }

 Expression.prototype.defaults = {

	"elements"				: []		,
	"gaze-base"  			: 0.25	,
	"gaze-speed"			: {

						"multiplier"			: 1		,
						"value" 				: 20		,
						"easing"				: "linear"

	},
	"animation"			: {

						"name"				: 	""
	},
	"animation-effect"	: {

						"name"				:	""
	}

 };


 Expression.prototype.init			=	function()
 {
	var	expr	=this;
	var	elems =	this.settings.elements ,
			v;

			for( 	v  = 0; v <	elems.length; v++ )
			{
				(function( el ){

					expr.expressionElements.push( 	expr.createExpressionElement( el )		);

				})( elems[ v ] );
			}

			this.name = this.settings.name;
 };


 Expression.prototype.destroy		=	function()
 {
			this.parseExpressionElements(
												function( expressionElement )
												{
																expressionElement.destroy();
												}
			);
			this.expressionElements	=	[];
			var Ex =	this;
			Ex._Face._parseExpressions(function( expr , k ){

																if( expr === Ex ){

																			Ex._Face.expressions.splice( k , 1 );
																			return false;
																}
			});

 };



 Expression.prototype.draw			=	function()
 {
			this.parseExpressionElements(
														function( expressionElement )
														{
																expressionElement.draw();
														}
			);
 };


 Expression.prototype.clear		=	function()
 {
			this.parseExpressionElements(
														function( expressionElement )
														{
																expressionElement.clear();
														}
			);
 };


 Expression.prototype.createExpressionElement 	= function( props )
 {
	var	Expression	=	this,
			inherits		=	{
										"_Face" 			: Expression._Face	,
										"_Expression"	: Expression
			};

			return	new ExpressionElement( inherits	,	props );
 };



  Expression.prototype.getExpressionElement 		= function( name )
 {
	var	exEl = false;

			this.parseExpressionElements( 	function( el , index ){

																							if( el.name === name )
																							{
																								exEl	=	 el;
																								return false;
																							}

														} );
	return	exEl;
 };


 Expression.prototype.parseExpressionElements	 	= function( callback  )
 {
			if( !callback ){ return false; }

	var	els 	= 	this.expressionElements ,
			len	=	els.length,
			m		=	0,
			cal	= 	null;

			for(	var m = els.length - 1; m >= 0; m-- )
			{
				cal	=	callback( els[ m ] , m );
				if( cal	===	false ){	break;	}
			}

			return cal;
 };
