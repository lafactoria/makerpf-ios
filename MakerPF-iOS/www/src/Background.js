//*************************************************************
//	File: Background.js 
//	Background: Save data and properties of game's background
//*************************************************************
function Background(src,x,y,folder,scaleType){
	
	if(src!="null"){
		if(folder=="")	{ this.src="game/images/"+src;					}
		else			{ this.src = "game/"+folder+"/images/"+src;		}
	}else{
		this.src = src;
	}
	
	this.scaleType = scaleType;
	
	this.x		= x;
	this.y		= y;
	this.getSrc = getSrc;
	this.getX 	= getX;
	this.getY 	= getY;
	this.getScaleType = getScaleType;

	function getSrc() 	{ return this.src;	}
	function getX() 	{ return this.x;	}
	function getY() 	{ return this.y;	}
	function getScaleType() { return this.scaleType; }
	
}