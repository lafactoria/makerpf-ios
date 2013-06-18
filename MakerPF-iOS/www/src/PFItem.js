//*************************************************************
//	File: PFItem.js 
//	PFItem: create common item properties
//*************************************************************

function PFItem(src,x,y,scale,rotation,folder){

	//=====================================================
	// VARIABLES
	//=====================================================
	if(folder==""){
		this.src = "game/images/"+src;
	}else{
		this.src = "game/"+folder+"/images/"+src;
	}
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.rotation = rotation;
	this.folder = folder;
	
	this.getSrc = getSrc;
	this.getX = getX;
	this.getY = getY;
	this.setX = setX;
	this.setY = setY;
	this.getScale = getScale;
	this.getRotation = getRotation;
	this.getRotation = getRotation;
	this.getFolder = getFolder;
	this.setSrc = setSrc;
}
//=====================================================
// GETS
//=====================================================
function getX() {
	return this.x;
}
function getY() {
	return this.y;
}
function getSrc() {
	return this.src;
}
function getScale() {
	return this.scale;
}
function getRotation() {
	return this.rotation;
}
function getFolder(){
	return this.folder;
}
//=====================================================
// SETS
//=====================================================
function setX(value) {
	this.x=value;
}
function setY(value) {
	this.y=value;
}
function setSrc(newSrc){
	this.src = newSrc;
}