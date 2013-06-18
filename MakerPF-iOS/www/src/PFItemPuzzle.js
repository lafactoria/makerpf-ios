//*************************************************************
//	File: PFItemPuzzle.js 
//	PFItemPuzzle: create particular item properties
//*************************************************************

function PFItemPuzzle(scaleActive,action,actionLoops,run,sound,finalX,finalY,folder,text,rgb){
	
	//=====================================================
	// VARIABLES
	//=====================================================
	if(sound==""){
		this.sound = "";
	}else{
		this.sound = "game/"+folder+"/sounds/"+sound;
	}
	this.marked 		= false;
	this.offsetX;
	this.offsetY;
	this.finalX 		= finalX;
	this.finalY 		= finalY;
	this.getFinalX		= getFinalX;
	this.getFinalY 		= getFinalY;
	this.scaleActive 	= scaleActive;
	this.action 		= action;
	this.actionLoops 	= actionLoops;
	this.run=run;
	this.text = text;
	this.rgb = rgb;
	
	this.getAction		= getAction;
	this.getActionLoops = getActionLoops;
	this.getRun 		= getRun;
	this.getSound 		= getSound;
	this.getScaleActive	= getScaleActive;
	this.setOffsetX 	= setOffsetX;
	this.setOffsetY 	= setOffsetY;
	this.getOffsetX 	= getOffsetX;
	this.getOffsetY 	= getOffsetY;
	this.setMarked 		= setMarked;
	this.getMarked		= getMarked;
	this.getText 		= getText;
	this.getRgb			= getRgb;
	
	//=====================================================
	// GETS
	//=====================================================
	function getMarked(){
		return this.marked;
	}
	function getScaleActive(){
		return this.scaleActive;
	}
	function getAction() {
		return this.action;
	}
	function getActionLoops() {
		return this.actionLoops;
	}
	function getRun() {
		return this.run;
	}
	function getSound() {
		return this.sound;
	}
	function getFinalX(){
		return this.finalX;
	}
	function getFinalY(){
		return this.finalY;
	}
	function getOffsetX(){
		return this.offsetX;
	}
	function getOffsetY(){
		return this.offsetY;
	}
	function getText() {
		return this.text;
	}
	function getRgb() {
		return this.rgb;
	}
	//=====================================================
	// SETS
	//=====================================================
	function setMarked(value){
		this.marked = value;
	}
	function setOffsetX(value){
		this.offsetX = value;
	}
	function setOffsetY(value){
		this.offsetY = value;
	}
}