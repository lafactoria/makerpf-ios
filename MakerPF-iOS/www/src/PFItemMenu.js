//*************************************************************
//	File: PFItemMenu.js 
//	PFItemMenu: create particular item properties
//*************************************************************

function PFItemMenu(id,game,type){

	//=====================================================
	// VARIABLES
	//=====================================================	
	this.id = id;
	this.game = game;
	this.type = type;
	
	this.getId = getId;
	this.getGame = getGame;
	this.getType = getType;

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
}