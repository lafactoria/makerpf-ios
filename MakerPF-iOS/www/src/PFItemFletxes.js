//*************************************************************
//	File: PFItemFastDragParent.js 
//	PFItemFastDragParent: create particular item properties
//*************************************************************

function PFItemFletxes(relations,type,parent,sound,folder,id,group,state,numRel,text,rgb){

	//=====================================================
	// VARIABLES
	//=====================================================
	if(sound==""){
		this.sound ="";
	}else{
		this.sound = "game/"+folder+"/sounds/"+sound;
	}
	this.type = type;
	this.parent = parent;
	this.relations = relations;
	this.id = id;
	this.group = group;
	this.state = state;
	this.numRel= numRel;
	this.text = text;
	this.rgb = rgb;
	
	this.getRelations = getRelations;
	this.getSound = getSound;
	this.getId = getId;
	this.getGroup = getGroup;
	this.getType = getType;
	this.getParent = getParent;
	this.getState = getState;
	this.setState = setState;
	this.getNumRelations = getNumRelations;
	this.setNumRelations = setNumRelations;
	this.getText = getText;
	this.getRgb = getRgb;
	
	//=====================================================
	// GETS
	//=====================================================
	function getRelations() {
		return this.relations;
	}
	function getSound() {
		return this.sound;
	}
	function getId(){
		return this.id;
	}
	function getGroup(){
		return this.group;
	}
	function getType(){
		return this.type;
	}
	function getParent(){
		return this.parent;
	}
	function getState(){
		return this.state;
	}
	function getNumRelations(){	
		//---------------------------------
		// parent always false
		//---------------------------------
		
		return this.numRel;
	}
	function getText(){
		return this.text;
	}
	function getRgb (){
		return this.rgb;
	}
	//=====================================================
	// SETS
	//=====================================================
	function setState(s){
		//---------------------------------
		// parent always false
		//---------------------------------
		this.state=s;
	}
	function setNumRelations(n){	
		//---------------------------------
		// parent always false
		//---------------------------------
		this.numRel=n;
	}
	
}
