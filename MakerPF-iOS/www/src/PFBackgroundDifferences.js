//*************************************************************
//	File: PFBackgroundDifferences.js 
//	PFBackgroundDifferences: create particular item properties
//*************************************************************

function PFBackgroundDifferences(id,game,type,scaleType,rgb){

	//=====================================================
	// VARIABLES
	//=====================================================	
	this.id 		= id;
	this.game 		= game;
	this.type 		= type;
	this.scaleType 	= scaleType;
	this.rgb 		= rgb;
	
	this.getId			= getId;
	this.getGame 		= getGame;
	this.getType 		= getType;
	this.getScaleType	= getScaleType;
	this.getRgb			= getRgb;

	//=====================================================
	// GETS
	//=====================================================	
	function getId() {
		return this.id;
	}
	function getGame() {
		return this.game;
	}
	function getType() {
		return this.type;
	}
	function getScaleType(){
		return this.scaleType;
	}
	function getRgb(){
		return this.rgb;
	}
}