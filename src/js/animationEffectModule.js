 "use strict";

 function AnimationEffectModule()
 {
		return this;
 }



 AnimationEffectModule.prototype._animationRunner = function( animationEffectName , ExprElem )
 {

			if( !this[ animationEffectName ] ){	console.log( animationEffectName +" is not a part of `AnimationEffectModule` Constructor");		}

			var	SELF						=	this;
			var	animSettings 			= 	this[ animationEffectName ];
			var	animationMethod	=	false;
			var	steps	 					= 	[];



			if(		animationEffectName	=== "bounce"  )
			{
					animationMethod = function ()
					{


									if( ExprElem.animationEffectModule.bounce_forces[	0	]	){ ExprElem.animationEffectModule.bounce_forces[	0	].STOP = true; }

									function drawBounce( current )
									{
											if( current.left 	){	ExprElem.UI_elem.left 		= current.left; 	}
											if( current.top 	){	ExprElem.UI_elem.top	 	= current.top; 	}
									}

									var 	BY_USER = {
																SPEED		:	-SELF[ animationEffectName ].speed	,
																DAMPENT	: 	-SELF[ animationEffectName ].dampent
									};
									var	bounce;
											bounce  =	new	 _SPRING (
																					{	top	: ExprElem.UI_elem.top 	,	left	:	ExprElem.UI_elem.left 		} ,
																					{ 	top 	: ExprElem.params.top  		,	left	:	ExprElem.params.left			} ,
																					drawBounce ,
																					{ stiffness : BY_USER.SPEED , damping	:	BY_USER.DAMPENT 	} ,
																					null
															);

											bounce.animate();

									ExprElem.animationEffectModule.bounce_forces	=	[	bounce	 ];

					};
			}
			else if(		animationEffectName	=== "jelly"  )
			{
					animationMethod = function ()
					{

									if( ExprElem.animationEffectModule.jelly_forces[0]	){ExprElem.animationEffectModule.jelly_forces[	0	].STOP=true;}
									if( ExprElem.animationEffectModule.jelly_forces[1]	){ExprElem.animationEffectModule.jelly_forces[	1	].STOP=true;}

											ExprElem.UI_elem.originX = "center";
											ExprElem.UI_elem.originY = "center";

											ExprElem.UI_elem.left	 = 	ExprElem.params.left ;
											ExprElem.UI_elem.top	 = 	ExprElem.params.top ;

											function jellyRender(	current	)
											{
												if(	current.W	){ ExprElem.UI_elem.scaleX	=		current.W;	}
												if(	current.H	){ ExprElem.UI_elem.scaleY	=		current.H;	}
												if( current.l 	){	ExprElem.UI_elem.left 		= 		current.l; 	}
												if( current.t 	){	ExprElem.UI_elem.top	 	=		current.t; 	}

											}
											var 	BY_USER = {
																		SPEED		:	-SELF[ animationEffectName ].speed	,
																		DAMPENT	: 	-SELF[ animationEffectName ].dampent
											};
											var	scaleW , scaleH;

													scaleW		= 	new _SPRING(	{	W	:	0.1	} 	,
																								{	W	:	1		}  ,
																									jellyRender 	,
																								{ stiffness : BY_USER.SPEED 			, damping : BY_USER.DAMPENT		, mass : 0.2 } ,
																																	null
																	);
													scaleH	 	= 	new _SPRING(	{	H	:	0.1		} 	,
																								{ 	H	: 	1			}  ,
																									jellyRender ,
																								{ stiffness : (50*BY_USER.SPEED)/60 , damping : BY_USER.DAMPENT/2 , mass : 0.2 } ,
																																	null
																	);

											scaleW.animate();
											scaleH.animate();


										ExprElem.animationEffectModule.jelly_forces	=	[	scaleW	,	scaleH ];

					};
			}
			else	if(		animationEffectName	=== "splat"  	)
			{
					animationMethod = function ()
					{

									if( ExprElem.animationEffectModule.splat_forces[0]	){	ExprElem.animationEffectModule.splat_forces[	0	].STOP=true;	}
									if( ExprElem.animationEffectModule.splat_forces[1]	){	ExprElem.animationEffectModule.splat_forces[	1	].STOP=true;	}


									ExprElem.UI_elem.left 		=	0;
									ExprElem.UI_elem.width 	=	ExprElem.params.width ;
									ExprElem.UI_elem.height 	=	ExprElem.params.height ;
									ExprElem.UI_elem.scaleX	=	1;
									ExprElem.UI_elem.scaleY	=	1;
									ExprElem.UI_elem.top	 	=	ExprElem.params.top;
									ExprElem.UI_elem.setCoords();
									ExprElem._Face.canvas.renderAll();


									ExprElem.UI_elem.originX = "center";
									ExprElem.UI_elem.originY = "center";

									var 	come,compress;

									function comeRender( current )
									{
											if( current.position.x )
											{
													ExprElem.UI_elem.left = current.position.x;
											}
											if( come.enviroment.limits.right.hitted === 1	&& 	ExprElem.UI_elem.left  !=	ExprElem.params.left	)
											{
													ExprElem.UI_elem.animate({left:ExprElem.params.left},{duration:400});
											}
									}
									function compressRender( csa )
									{

											ExprElem.UI_elem.scaleX	=	csa.m/ExprElem.UI_elem.width ;
											ExprElem.UI_elem.scaleY  =	1/ExprElem.UI_elem.scaleX ;
									}

									var 	BY_USER = {
																		SPEED		:	 SELF[ animationEffectName ].speed ,
																		DAMPENT	: 	-SELF[ animationEffectName ].dampent	,
																		MASS			:  	 SELF[ animationEffectName ].mass
									};

									var	Area		=	ExprElem.UI_elem.width*ExprElem.UI_elem.height;
									var	Ks			=	ExprElem.UI_elem.width;

											come 	= 	new 	_NEWTON({rho:0.30},comeRender);

											come.current.position.x 				=	0;
											come.current.velocity.x 				=	BY_USER.SPEED ;
											come.current.velocity.y 				=	0;
											come.mass 								=	0.1;
											come.restitution 							= -0.4;
											come.enviroment.limits.right.x 		=	ExprElem.params.left	+	10;
											come.enviroment.limits.left.x 		=	-10000;

											come.animate();

											compress 		= new	_SPRING(
																							{} ,
																							{} ,
																							compressRender ,
																							{ stiffness : -35 , damping : BY_USER.DAMPENT  , mass : BY_USER.MASS }	,
																							null
																	);

											come.enviroment.limits.right.onHit = function(a,v)
											{
													compress.start.m			=	ExprElem.UI_elem.width-(a.current.velocity.x*a.current.velocity.x);
													compress.end.m			=	Ks	;

													compress.current.m 		=	compress.start.m;
													compress.current.am 	=	a.current.accel.x;
													compress.current.vm 	=	a.current.velocity.x;
													compress.animate();

													come.STOP	= true;
											};

											ExprElem.animationEffectModule.splat_forces = [ come , compress ];

					};
			}
			else	if(		animationEffectName	=== "swoosh"  )
			{
					animationMethod = function ()
					{

									if( ExprElem.animationEffectModule.swoosh_forces[0]	){	ExprElem.animationEffectModule.swoosh_forces[	0	].STOP=true;	}
									if( ExprElem.animationEffectModule.swoosh_forces[1]	){	ExprElem.animationEffectModule.swoosh_forces[	1	].STOP=true;	}

									ExprElem.UI_elem.left 		= 0;
									ExprElem.UI_elem.scaleX	= 1;
									ExprElem.UI_elem.top	 	= ExprElem.params.top;
									ExprElem.UI_elem.width 	= ExprElem.params.width;
									ExprElem.UI_elem.height	= ExprElem.params.height;
									ExprElem.UI_elem.setCoords();
									ExprElem._Face.canvas.renderAll();

									ExprElem.UI_elem.originX = "center";
									ExprElem.UI_elem.originY = "center";

									var	scale , move;

									function swooshRender( current )
									{
											var	distance	=	current.position.x	-	10000000;

											ExprElem.UI_elem.left		=	distance/2;

											ExprElem.UI_elem.scaleX	=	(distance+ExprElem.params.width)/ExprElem.params.width;

									}

									function tail( current )
									{
											ExprElem.UI_elem.scaleX 	= 	current.sc;

											var	distance						=	( current.sc*ExprElem.params.width ) - ExprElem.params.width;

											ExprElem.UI_elem.left		=	ExprElem.params.left	-	distance/2;

									}

									var 	BY_USER = {
																		SPEED				:	 SELF[ animationEffectName ].speed	,
																		TAIL_SPEED		:  	-SELF[ animationEffectName ][ 	"tail-speed" 		]	,
																		TAIL_DAMPENT	:  	-SELF[ animationEffectName ][ 	"tail-dampent" 	]
										};


										move 	= 	new 		_NEWTON(	{	rho	:	0.30	,	ag	:	0	}	,	swooshRender	);

										move.current.position.y 					=	ExprElem.params.top;
										//move.current.position.x 					=	10000000;
										move.current.position.x 					=	-ExprElem.params.width/2	+	10000000;
										move.current.velocity.x 					=	BY_USER.SPEED ;
										move.current.velocity.y 					=	0;
										move.mass 									= 	0.1;
										move.restitution 							= 	0;

										move.enviroment.limits.right.x			=	ExprElem.params.left	+	10000000;
										move.enviroment.limits.left.x			=	-10000;
										move.animate();


										scale  			= 	new _SPRING(
																					{	} 	,
																					{	}	,
																					 tail 					,
																					{ stiffness : BY_USER.TAIL_SPEED  , damping : BY_USER.TAIL_DAMPENT 	, mass : 0.2 } ,
																					null
																);


										var	TAIL_LENGTH	=	(ExprElem.params.left+ExprElem.params.width)/ExprElem.params.width;

										move.enviroment.limits.right.onHit	= function(a,v){

													move.STOP 					= 	true;

													scale.start.sc  			=	TAIL_LENGTH;
													scale.end.sc  				= 	1;
													scale.current.sc 			=	TAIL_LENGTH;
													scale.current.vsc 	= 	0;

													scale.animate();


										};



									ExprElem.animationEffectModule.swoosh_forces	=	[	move	,	scale ];

					};
			}
			else	if(		animationEffectName	=== "road-runner"  )
			{
					animationMethod = function ()
					{

									if( ExprElem.animationEffectModule[	"road-runner_forces"	][	0	]	){	ExprElem.animationEffectModule[	"road-runner_forces"	][	0	].STOP=true;	}
									if( ExprElem.animationEffectModule[	"road-runner_forces"	][	1	]	){	ExprElem.animationEffectModule[	"road-runner_forces"	][	1	].STOP=true;	}


									ExprElem.UI_elem.top	 			= ExprElem.params.top;
									ExprElem.UI_elem.left				= ExprElem.params.left-200;
									//ExprElem.UI_elem.skewX			= 30;
									ExprElem.UI_elem.setCoords();

									ExprElem.UI_elem.originX = "center";
									ExprElem.UI_elem.originY = "center";

									var	maxSkewX	=	30;

									var	run,jump;

									function runRender(	current	)
									{
											if(	current.position )
											{
													if(		current.position.x	)
													{
																ExprElem.UI_elem.left 		=	current.position.x -200;
																ExprElem.UI_elem.skewX 	=	(current.velocity.x*maxSkewX)/20;
													}
													if(		current.position.y	)
													{
																ExprElem.UI_elem.top 		=	current.position.y ;
													}
													if( run.enviroment.limits.right.hitted === 1 && 	ExprElem.UI_elem.skewX !=0	)
													{
																ExprElem.UI_elem.animate({skewX:0},{duration:100});
													}
											}
									}

									function jumpRender(	current	)
									{
											if(	current.position )
											{
													if(		current.position.y	)
													{
															ExprElem.UI_elem.top 		=	current.position.y ;
															if( jump.enviroment.limits.bottom.hitted === 1			)
															{
																	jump.STOP = true;
															}
													}
											}
									}

									var 	BY_USER = {
																		SPEED						:	 SELF[ animationEffectName ].speed	,
																		JUMP							: 	 SELF[ animationEffectName ].jump	,
																		JUMP_RESTITUTION		:  	-SELF[ animationEffectName ]["jump-restitution"]
									};

										run 	= 	new 		_NEWTON(	{	rho	:	0.30	,	ag	:	0	}	,	runRender	);

										run.current.position.y 				=	ExprElem.params.top;
										run.current.position.x 				=	1;
										run.current.velocity.x 				=	BY_USER.SPEED;
										run.current.velocity.y 				=	0;
										run.mass 								= 	0.1;
										run.restitution 						= -0.3;

										run.enviroment.limits.right.x 	= ExprElem.params.left+200;
										run.enviroment.limits.left.x 		= 0;
										run.animate();
										run.enviroment.limits.right.onHit = function(a,v){


												run.STOP = true;
										};

										jump	= 	new 		_NEWTON(	{	rho	:	1.30	, ag	:	0.4	,	cd	:	0.1	}	,	jumpRender	);
										jump.current.position.y 				=	ExprElem.params.top;
										jump.current.velocity.y 				=	-20;
										jump.current.velocity.x 				=	0;
										jump.restitution 							=	BY_USER.JUMP_RESTITUTION;
										jump.mass 								=	15.5;

										jump.enviroment.limits.top.y 		=	ExprElem.params.top - BY_USER.JUMP*ExprElem.params.width;
										jump.enviroment.limits.bottom.y 	=	ExprElem.params.top;
										jump.enviroment.limits.top.onHit	=	function(a,v){
												jump.restitution 							= 0;
										};

										var	_Attt	=	Date.now();
										var	Arequest;
										var	WAIT	=	1000;
										function Atimer(){

											if( !jump.STOP )
											{
														if( (Date.now() - _Attt) >  WAIT	)
														{
																_Attt = Date.now();

																	jump.animate();

																	window.cancelAnimationFrame(Arequest);
																	Arequest 	= undefined;
																	return;
														}
											}else{
														window.cancelAnimationFrame(Arequest);
														Arequest 	= undefined;
														return;
											}
											Arequest = requestAnimationFrame( Atimer );
										}

										Atimer();

										ExprElem.animationEffectModule[	"road-runner_forces"	]	=	[	run	,	jump ];
					};
			}


			function RUN ()
			{

					if( !ExprElem.animationEffectModule[ animationEffectName ].enabled ){ return false; }

					if( Helpers.isInArray( ExprElem.name , ExprElem.animationEffectModule[ animationEffectName ].elements	) )
					{
							if( !animationMethod ){ return false; }

							animationMethod();
					}

					var	repeat 			= false	,
							repeatTime 	= 0;

					return {r:repeat,t:repeatTime};
			}

			RUN();



 };

 AnimationEffectModule.prototype.bounce_forces	=	[];
 AnimationEffectModule.prototype.bounce 			=
 {
				"enabled"				: false								,
				"elements"				: ["left-eye","right-eye"]		,
 				"speed" 					: 30 		,
 				"dampent" 				: 1
 };

 AnimationEffectModule.prototype.jelly_forces	=	[];
 AnimationEffectModule.prototype.jelly 			=
 {
 				"enabled"				: false	,
				"elements"				: ["left-eye","right-eye"]		,
 				"speed" 					: 60 		,
 				"dampent" 				: 2
 };


 AnimationEffectModule.prototype.splat_forces =	[];
 AnimationEffectModule.prototype.splat 			=
 {
 				"enabled"				: false	,
				"elements"				: ["left-eye","right-eye"]		,
 				"speed" 					: 20 		,
 				"mass" 					: 0.1 		,
 				"dampent" 				: 1.5
 };


 AnimationEffectModule.prototype.swoosh_forces 	=	[];
 AnimationEffectModule.prototype.swoosh			=
 {
 				"enabled"				: false	,
				"elements"				: ["left-eye","right-eye"]		,
 				"speed" 					: 30 		,
				"tail-speed"			: 30		,
				"tail-dampent"		: 4.0
 };

 AnimationEffectModule.prototype[ "road-runner_forces" ] 	=	[];
 AnimationEffectModule.prototype[ "road-runner" ] 				=
 {
 				"enabled"				: false	,
				"elements"				: ["left-eye","right-eye"]		,
 				"speed" 					: 30 		,
 				"jump"	 				: 1	 	,
				"jump-restitution"	: 0.1
 };








function _NEWTON( enviromentSettings , callback )
 {
	var	enviromentSettingsDefaults =
	{
		cd 	:	0.47	,  	// Dimensionless
		rho 	: 	1.22	, 	// kg / m^3
		ag 	: 	1.81	  	// m / s^2
	};

	this.enviroment	= {

			rho		:		enviromentSettingsDefaults.rho		,
			cd			:		enviromentSettingsDefaults.cd		,
			ag			:		enviromentSettingsDefaults.ag		,
			limits 	:		{
									left 		: {x:0,y:0,hitted:0,onHit:function(s,h){}	},
									top 		: {x:0,y:0,hitted:0,onHit:function(s,h){}	},
									bottom 	: {x:0,y:10000,hitted:0,onHit:function(s,h){}	},
									right		: {x:10000,y:0,hitted:0,onHit:function(s,h){}	}
			}
	};
	if( enviromentSettings.ag	|| enviromentSettings.ag	===	0	)
	{
				this.enviroment.ag		=	enviromentSettings.ag		;

	}
	if( enviromentSettings.cd		)
	{
				this.enviroment.cd		=	enviromentSettings.cd		;
	}
	if( enviromentSettings.rho	)
	{
				this.enviroment.rho		=	enviromentSettings.rho	;
	}

	this.mass			=	0.2;
	this.restitution	=	 -0.7;
	this.a				= 10*10/10000;
	this.callback	   	= callback || false;
	this.current		=
	{
		F						:	{	x	:	0	,	y	:	0	}	,
		position				:	{	x	:	0	,	y	:	0	}	,
		velocity				:	{	x	:	0	,	y	:	0	}	,
		accel					:	{	x	:	0	,	y	:	0	}
	};
	this.STOP 			= false;
 }

_NEWTON.prototype.update 		= function()
{
		var frameRate 	= 1/40; // Seconds
		var frameDelay 	= frameRate * 1000; // ms
		var loopTimer 	= false;

		var	SELF 	=	this;

        var	Fx 	= -0.5 * SELF.enviroment.cd 	* SELF.a * SELF.enviroment.rho * SELF.current.velocity.x * SELF.current.velocity.x * SELF.current.velocity.x / Math.abs(	SELF.current.velocity.x	);
        var	Fy 	= -0.5 * SELF.enviroment.cd 	* SELF.a * SELF.enviroment.rho * SELF.current.velocity.y * SELF.current.velocity.y * SELF.current.velocity.y / Math.abs(	SELF.current.velocity.y	);

				Fx 	= (isNaN(Fx) ? 0 : Fx);
				Fy 	= (isNaN(Fy) ? 0 : Fy);

		SELF.current.F.x			=	Fx;
		SELF.current.F.y			=	Fy;

		SELF.current.accel.x 	= Fx / SELF.mass;
        SELF.current.accel.y 	= SELF.enviroment.ag + (Fy / SELF.mass);

        SELF.current.velocity.x += SELF.current.accel.x	*	frameRate;
        SELF.current.velocity.y += SELF.current.accel.y	*	frameRate;

        SELF.current.position.x += SELF.current.velocity.x*frameRate*100;
        SELF.current.position.y += SELF.current.velocity.y*frameRate*100;

    // Handle collisions

	if ( 	SELF.current.position.y >= SELF.enviroment.limits.bottom.y )
	{
				SELF.current.velocity.y 	*= 	SELF.restitution;
				SELF.current.position.y 	= 		SELF.enviroment.limits.bottom.y ;

				SELF.enviroment.limits.bottom.hitted++;
				SELF.enviroment.limits.bottom.onHit( SELF , SELF.enviroment.limits.bottom.hitted );
	}
	if ( 	SELF.current.position.x >= SELF.enviroment.limits.right.x )
	{
				SELF.current.velocity.x *= 		SELF.restitution;//- SELF.radius;
				SELF.current.position.x 	= 		SELF.enviroment.limits.right.x;

				SELF.enviroment.limits.right.hitted++;
				SELF.enviroment.limits.right.onHit( SELF , SELF.enviroment.limits.right.hitted );

	}
	if ( 	SELF.current.position.x <= SELF.enviroment.limits.left.x )
	{
				SELF.current.velocity.x 	*= 	SELF.restitution;
				SELF.current.position.x 	= 		SELF.enviroment.limits.left.x;

				SELF.enviroment.limits.left.hitted++;
				SELF.enviroment.limits.left.onHit( SELF , SELF.enviroment.limits.left.hitted );

	}
    if (	SELF.current.position.y <= SELF.enviroment.limits.top.y 	 )
	{
				SELF.current.velocity.y *= SELF.restitution;
				SELF.current.position.y = SELF.enviroment.limits.top.y;

				SELF.enviroment.limits.top.hitted++;
				SELF.enviroment.limits.top.onHit( SELF , SELF.enviroment.limits.top.hitted );
    }


 };

_NEWTON.prototype.draw 		= function(){

	this.callback( this.current );

 };

_NEWTON.prototype.animate 	= function()
 {
	var	NewtonMoveInstance = this;

	function Anim(){

		NewtonMoveInstance.update();
		NewtonMoveInstance.draw();

		if( NewtonMoveInstance.STOP === false )
		{
				requestAnimationFrame(  Anim );
		}
	}
	Anim();

 };


















 function _SPRING( start , end , callback ,  settings  , onComplete)
 {

 	this.current 	   = {};
	if( start && end )
	{
			for( var s in start )
			{
				if( 	!end[ s ] 	&& 	end[ s ]	!==	0 	)
				{
						console.log("properties must have both and end points");
						return false;

				}else
				{
						this.current[ s ] 			= start[ s ];
						this.current[ "v" + s ] 	= 0;
				}
			}
	}

	this.callback	   	= callback;
	this.onComplete	= onComplete || false;
	this.start		  	= start;
	this.end			   	= end;

	this.last			   	= {};
	this.STOP		    = false;
	this.settings		=
	{

		mass				 	: settings.mass 			|| 	0.1,				//values	0.1		-	5
		stiffness 			: settings.stiffness 		||	-30,				//values	1-100
		frameRate			: settings.frameRate	||	16,
		damping		    : settings.damping 		||	-0.97				//values	0-10

	};

	if( this.settings.mass < 0.1 	){ /*console.log( "mass can receive values from 0.1 to 5. Smaller	number converted to 0.1 		"); */	this.settings.mass 		= 0.1;		}
	if( this.settings.mass > 5	 	){ /*console.log( "mass can receive values from 0.1 to 5. Higher	number converted to 5 		"); */	this.settings.mass 		= 5;			}

	var stifDamp = Math.abs( this.settings.stiffness );

	if( stifDamp < 1 		){ 	/*console.log( "stiffness can receive values from -1 to -100. Smaller	number converted to -1 		");*/ 	this.settings.stiffness 	= -1;			}
	if( stifDamp > 100 	){ 	/*console.log( "stiffness can receive values from -1 to -100. Higher	number converted to -100  	");*/ 	this.settings.stiffness 	= -100;		}

	var abDamp = Math.abs( this.settings.damping );

	if( abDamp < 1 		){ 	/*console.log( "damping can receive values from -1 to -10. Smaller	number converted to -1 	 	");*/ 	this.settings.damping 	= -1;			}
	if( abDamp	> 10 		){ 	/*console.log( "damping can receive values from -1 to -10. Higher	number converted to -10  		");*/ 	this.settings.damping 	= -10;		}
 }



_SPRING.prototype.draw 		= function(){

	this.callback( this.current );

 };

_SPRING.prototype.update 		= function(){

	 for( var m in this.end )
	 {
			var 	spring 					=	 	this.settings.stiffness * ( (this.current[ m ]  - this.end[ m ] ));
			var 	damper					=		this.settings.damping * ( this.current["v"+m]);
				this.current["a"+m] 	= 		( spring + damper ) / this.settings.mass;
				this.current["v"+m] 		+= 	this.current["a"+m] * (this.settings.frameRate/1000);
				this.current[ m ] 			+= 	this.current["v"+m] * (this.settings.frameRate/1000);

				if(	this.current[ m ]+3 > this.end[ m ] && this.onHit )
				{
							this.onHit(  this.current );
				}
				if(	 Math.abs( this.current["v"+m] ) < 0.0001 )
				{
						if( this.onComplete)
						{
							  this.onComplete();
						}
						this.STOP = true;
				}
				this.last[ m ]						=		this.current[ m ];
	 }

 };

_SPRING.prototype.animate 	= function()
 {
	var	_SPRINGInstance = this;

	function Anim(){

		_SPRINGInstance.update();
		_SPRINGInstance.draw();

		if( _SPRINGInstance.STOP === false )
		{
				requestAnimationFrame(  Anim );
		}
	}
	Anim();

 };
