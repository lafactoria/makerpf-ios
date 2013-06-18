//*************************************************************
//	File: PFItemColor.js 
//	PFItemColor: create particular item properties
//*************************************************************

function PFItemPaint(src,rgb,x,y,isColor,thickness){

	//=====================================================
	// VARIABLES
	//=====================================================
	if(isColor){
		this.src		= "theme/images/paint/colors/" + src;
	}else{
		this.src		= "theme/images/paint/" + src;
	}
	this.rgb 		= rgb;
	this.x			= x;
	this.y 			= y;
	this.thickness 	= thickness;
	
	this.getSrc		= getSrc;	
	this.getRgb		= getRgb;
	this.getX		= getX;
	this.getY		= getY;
	this.getThickness = getThickness;

	//=====================================================
	// GETS
	//=====================================================	
	function getSrc() {
		return this.src;
	}
	function getX() {
		return this.x;
	}
	function getY() {
		return this.y;
	}
	function getRgb(){
		return this.rgb.split("-");
	}
	function getThickness(){
		return parseInt(this.thickness);
	}
}