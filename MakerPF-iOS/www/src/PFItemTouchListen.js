//*************************************************************
//	File: PFItemTouchListen.js 
//	PFItemTouchListen: create particular item properties
//*************************************************************



function PFItemTouchListen(action,actionLoops,run,sound,folder,text,rgb){
	
	//=====================================================
	// VARIABLES
	//=====================================================
	if(sound==""){
		this.sound = "";
	}else{
		this.sound = "game/"+folder+"/sounds/"+sound;
	}
		
	this.offsetX;
	this.offsetY;
	this.action			= action;
	this.actionLoops	= actionLoops;
	this.run			=run;
	this.actionRotation;
	this.actionScale;
	this.actionMove;
	this.actionJump;
	this.text = text;
	this.rgb = rgb;
	//=====================================================
	// GETS
	//=====================================================
	this.getAction = getAction;
	this.getActionLoops = getActionLoops;
	this.getRun = getRun;
	this.getSound = getSound;
	this.getActionRotation = getActionRotation;
	this.getActionScale = getActionScale;
	this.getActionJump = getActionJump;
	this.getActionMove = getActionMove;
	this.getOffsetX = getOffsetX;
	this.getOffsetY = getOffsetY;
	this.getText = getText;
	this.getRgb = getRgb;

	
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
	function getOffsetX(){
		return this.offsetX;
	}
	function getOffsetY(){
		return this.offsetY;
	}	
	function getActionRotation(){
		return this.actionRotation;
	}	
	function getActionScale(){
		return this.actionScale;
	}	
	function getActionMove(){
		return this.actionMove;
	}	
	function getActionJump(){
		return this.actionJump;
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
	this.setActionRotation	= setActionRotation;
	this.setActionScale 	= setActionScale;
	this.setActionJump		= setActionJump;
	this.setActionMove		= setActionMove;	
	this.setOffsetX 		= setOffsetX;
	this.setOffsetY 		= setOffsetY;
	
	function setOffsetX(value){
		this.offsetX = value;
	}
	function setOffsetY(value){
		this.offsetY = value;
	}
	function setActionRotation(value){
		this.actionRotation=value;
	}
	function setActionScale(value){
		this.actionScale=value;
	}
	function setActionMove(value){
		this.actionMove=value;
	}
	function setActionJump(value){
		this.actionJump=value;
	}
}