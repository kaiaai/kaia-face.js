/** some helper functions out of the box**/

var Helpers  ={

	checkArgs	: function( funcName , args , argTypes , values ){

						var error = null,message = funcName + " Argument Type Error : ";
						args_loop:
						for( var q = 0;q< args.length; q++ )
						{
							if( argTypes[ q ] ){

								if( argTypes[ q ] === "number"	){
										if( !this.isNumeric( args[q] )	)
										{
											error = message + args[ q ] + " must be number ";
											break;
										}
								}
								if( argTypes[ q ] === "string" ){
										if( !this.isString( args[q] ) )
										{
											error = message + args[ q ] + " must be string ";
											break;
										}
								}
								if( argTypes[ q ] === "object" ){
										if( !this.isObject( args[q] ) )
										{
											error = message + args[ q ] + " must be valid object ";
											break;
										}
								}
								if( argTypes[ q ] === "array" ){
										if( !this.isArray( args[q] ) )
										{
											error = message + args[ q ] + " must be array ";
											break;
										}
								}
								if( argTypes[ q ] === "arrayOfStrings" ){
										if( !this.isArray( args[q] ) )
										{
											error = message + args[ q ] + " must be array of strings";
											break;
										}
										for( var j = 0; j < args[ q ].length; j++ )
										{
											if( 	!this.isString( args[ q ][ j ] )		)
											{
												error = message + args[ q ][ j ] + " must be string";
												break args_loop;
											}
										}
								}
								if( argTypes[ q ] === "arrayOfNumbers" ){
										if( !this.isArray( args[q] ) )
										{
											error = message + args[ q ] + " must be array ";
											break;
										}
										for( var j = 0; j < args[ q ].length; j++ )
										{
											if( 	!this.isNumeric( args[ q ][ j ] )		)
											{
												error = message + args[ q ][ j ] + " must be number";
												break args_loop;
											}
										}
								}
							}
							if( values && values[ q ]  ){

									if( this.isArray(values[ q ])  && ( argTypes[ q ] === "string"	||  argTypes[ q ] === "number" ) )
									{
												var found = false;
												for( var d = 0; d < values[q].length; d++ )
												{
														if( args[ q ] === values[ q ][ d ] ){ found=true; }

												}
												if( !found )
												{
															error = message + args[ q ] + " must be one of the following values " + values[ q ];
															break;
												}
									}
									if( this.isObject(values[ q ])  	)
									{
												if( argTypes[ q ] === "number" )
												{
													var min,max;
													if( !values[ q ].Vmin 	&&	values[ q ].Vmin  != 0 		){ min = "none";  		}else{ 	min = values[ q ].Vmin; 							}
													if( !values[ q ].Vmax 	&&	values[ q ].Vmax != 0	 	){ max  = "none";	 	}else{ 	max  = "none";  max = values[ q ].Vmax;	}
													if( min!="none"	&&  args[ q ] < values[ q ].Vmin 	)
													{
															error = message + args[ q ] + " must be bigger or equal  to " + values[ q ].Vmin +" Limits : Min " + min + " , Max : " + max;
															break;
													}
													if( max!="none" 	&&  args[ q ] > values[ q ].Vmax  	)
													{
															error = message + args[ q ] + " must be smaller or equal to " + values[ q ].Vmax +" Limits : Min " + min + " , Max : " + max;
															break;
													}
												}
									}

							}
						}

						if( error ){ console.log(error); return false; }
						return true;

	},
	isObject		: function(val) {
						if (val === null) { return false;}
						return ( (typeof val === 'function') || (typeof val === 'object') );
	},
	isNumeric	: function( obj ) {
						return !this.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},
	isArray		: function( obj ) {
						return Object.prototype.toString.call(obj) === "[object Array]";
	},
	isString 		: function (obj) {
						return (Object.prototype.toString.call(obj) === '[object String]');
	},
	isInArray	: function( obj , arr	){

						var 	i = arr.length;
								while ( i-- ) {
									if (	arr[ i ] === obj	) {
											return true;
									}
								}
						return false;

	},
	randomInt	: function(	min	,	max	)
	{
						var	min 	= 	min 	|| 0;
						var	max	=	max 	|| 10;

						return Math.floor(Math.random()*(max-min+1)+min);
	},
	extend		: function (){
						for(var i=1; i<arguments.length; i++)
							for(var key in arguments[i])
								if(arguments[i].hasOwnProperty(key)) {
									if (typeof arguments[0][key] === 'object' &&
										typeof arguments[i][key] === 'object'){
												this.extend(arguments[0][key], arguments[i][key]);
									}
									else{
												arguments[0][key] = arguments[i][key];
									}
								}
						return arguments[0];
	},
	extendLeft : function (){
						for(var i=1; i<arguments.length; i++)
							for(var key in arguments[i])
								if(arguments[i].hasOwnProperty(key)) {
									if (typeof arguments[0][key] === 'object' &&
										typeof arguments[i][key] === 'object'){
											this.extend(arguments[0][key], arguments[i][key]);
									}
									//--else
									if( arguments[0].hasOwnProperty(key) )
									{
											arguments[0][key] = arguments[i][key];
									}
							}
						return arguments[0];
	},
	resizeBasedOn: function ( newBase , base , numb ){

							return ( numb*newBase ) / base;

	},
	waitTime		:	function(	mlsecs	,	callback	)
	{
								var	_ttt = Date.now();

								function timer()
								{

									if( (Date.now() - _ttt) >  mlsecs	)
									{
											_ttt = Date.now();
											if(callback)
											{
												callback();
											}
											return;
									}
									window.cancelAnimationFrame(request);
									request 	= undefined;
									repeat	=	false;
									return;

									//request = requestAnimationFrame( timer );
								}
								timer();
	}
};
