//*******************************************************************
//	File: PFItemQuizGapsQuestionState.js 
//	PFItemQuizGapsQuestionState: create particular item properties
//*******************************************************************

function PFItemQuizGapsQuestionState(type, src, x, y){
	//=====================================================
	// VARIABLES
	//=====================================================
	this.type	= type;
	this.src	= src;
	this.x		= x;
	this.y		= y;
	
	//=====================================================
	// GETS
	//=====================================================
	this.getSrc		= getSrc;
	this.getType	= getType;
	this.getX		= getX;
	this.getY		= getY;
	
	function getSrc(){
		return this.src;
	}
	function getType(){
		return this.type;
	}
	function getY(){
		return this.y;
	}
	function getX(){
		return this.x;
	}
}