//*************************************************************
//	File: PFItemMemory.js 
//	PFItemMemory: create particular item properties
//*************************************************************

function PFItemMemory(id,action,actionLoops,run,sound,folder,text,rgb){
	
	//=====================================================
	// VARIABLES
	//=====================================================
	if(sound==""){
		this.sound ="";
	}else{
		this.sound = "game/"+folder+"/sounds/"+sound;
	}
	this.marked 		= false;
	this.id 			= id;
	this.action 		= action;
	this.actionLoops 	= actionLoops;
	this.run			= run;
	this.getAction		= getAction;
	this.getActionLoops = getActionLoops;
	this.getRun 		= getRun;
	this.getSound 		= getSound;
	this.getId 			= getId;
	this.setMarked 		= setMarked;
	this.getMarked 		= getMarked;
	this.text 			= text;
	this.rgb 			= rgb;
	this.getText 		= getText;
	this.getRgb			= getRgb;
	
	//=====================================================
	// GETS
	//=====================================================
	function getMarked(){
		return this.marked;
	}
	function getId(){
		return this.id;
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
}