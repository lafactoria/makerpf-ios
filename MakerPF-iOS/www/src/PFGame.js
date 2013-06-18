//*************************************************************
//	File: PFGame.js 
//	PFGame: Create menu's button game  
//*************************************************************

function PFGame(srcMenu, type, game){
	
	//=====================================================
	// VARIABLES
	//=====================================================
	this.srcMenu 	= srcMenu;
	this.type 		= type;
	this.game 		= game;
	
	//=====================================================
	// GETS
	//=====================================================
	this.getSrcMenu = getSrcMenu;
	this.getType 	= getType;
	this.getGame 	= getGame;
	
	function getSrcMenu(){	return this.srcMenu;	}
	function getType(){		return this.type;		}
	function getGame(){		return this.game;		}
	
}