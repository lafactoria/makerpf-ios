//*************************************************************
//	File: PFGameManager.js 
//	PFGameManager: Singleton file
//*************************************************************

var PFGameManager = function(){

	//=======================================================================================			
	// VARIABLES
	//=======================================================================================
	var currentLanguage;
	var currentGame;
	var nextGame = 0;
	var backGame = 0;
	var gameList;
	var menuType;
	var games;
	var gamePlayed;
	var i;
	var isFirst = true;
	
	var numGames;
	var random;
 
	//=======================================================================================			
	// getInstance: Get the instance of the Singleton class
	//=======================================================================================
	var getInstance = function() {
		if (!Singleton.singletonInstance) { 
			Singleton.singletonInstance = createInstance();
		}
		return Singleton.singletonInstance;
	}

	
	//--------------------------------------------
	// Create an instance of the Singleton class
	//--------------------------------------------
	var createInstance = function() {
		//---------------------------------------------------------
		// Here, you return all public methods and variables
		//---------------------------------------------------------	
		return {
			setLanguage : function(language) {
				currentLanguage = language;
				return this.currentLanguage();
			},
			setGames : function() {
				var xmlMenu = new PFAction();
				xmlMenu.ReadMenu("game/menu.xml");
				var itemsMenu = new Array(xmlMenu.getItemsMenu().length);
				numGames = itemsMenu.length;
				games = new Array(itemsMenu.length);
				for ( i=0; i<itemsMenu.length; i++){
					games[i] = new PFGame(xmlMenu.getItemsMenu()[i].getSrc(),xmlMenu.getItemsMenu()[i].getType(),xmlMenu.getItemsMenu()[i].getGame());
				}
			},
			currentLanguage : function() {
				return currentLanguage;
			},
			
			//=======================================================================			
			// PLAY GAME
			//=======================================================================				
			playGame : function(i,direction,containerAux,containerAnt) {							
				currentGame=i;					
				if(typeNavigation == 1){
					if(i<games.length-1){
						nextGame=i+1;
					}else{
						nextGame=0;
					}
					if(i==0){
						backGame=games.length-1;
					}else{
						backGame=i-1;
					}
				}
			
				var game 	= games[i].getType();
				var folder 	= games[i].getGame();
						
				switch(game){
					case "explore":
						gamePlayed = new PFGameExplore();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "drag":
						gamePlayed = new PFGameDrag();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "memory":
						gamePlayed = new PFGameMemory();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "puzzle":
						gamePlayed = new PFGamePuzzle();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "fillthegaps":
						gamePlayed = new PFGamePuzzle();
						gamePlayed.load("puzzle",folder);
						gamePlayed.show("puzzle",folder,direction,containerAux,containerAnt);
					break;					
					case "findme":
						gamePlayed = new PFGameFindMe();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "listenandtouch":
						gamePlayed = new PFGameTouchListen();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "listenanddrag":
						gamePlayed = new PFGameListenDrag();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "fastdrag":
						gamePlayed = new PFFastDrag();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "paint":
						paintState = true;
						gamePlayed = new PFGamePaint();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "differences":
						gamePlayed = new PFGameDifferences();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "interactiveimages":
						gamePlayed = new PFGameInteractiveImages();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "quiz":
						gamePlayed = new PFGameQuiz();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "quiztext":
						gamePlayed = new PFGameQuizGaps();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "arrows":
						gamePlayed = new PFGameFletxes();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "dragtocontainers":
						gamePlayed = new PFGameDragAllIn();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
					case "arrowsvalidate":
						gamePlayed = new PFGameFletxesValidar();
						gamePlayed.load(game,folder);
						gamePlayed.show(game,folder,direction,containerAux,containerAnt);
					break;
				}
			},
			setCurrentGame : function(game) {
				currentGame = game;
			},
			currentGame : function() {
				return currentGame;
			},
			//=======================================================================			
			// NEXT GAME
			//=======================================================================
			nextGame : function() {	
				var xmlMenu = new PFAction();
				xmlMenu.ReadOptions("game/options.xml");
				isFirst = false;
				nextGame = currentGame;
				if(xmlMenu.getMenuActive() == "false"){
						if(currentGame<games.length-1){
							nextGame=currentGame+1;
						}else{
							nextGame=0;
							//go to portada
						}					
				}else{
					if(typeNavigation == 1){
						if(currentGame<games.length-1){
							nextGame=currentGame+1;
						}else{
							nextGame=0;
							//go to portada
						}					
					}else if(typeNavigation == 2){						
						while(nextGame == currentGame){						
							nextGame=Math.floor(Math.random()*numGames);						
						}					
					}
				}
				return nextGame;
			},
			//=======================================================================			
			// BAKC GAME
			//=======================================================================
			backGame : function() {		
				var xmlMenu = new PFAction();
				xmlMenu.ReadOptions("game/options.xml");
				if(xmlMenu.getMenuActive() == "false"){
					if(currentGame == 0){
						backGame=games.length-1;
					}
					else{
						backGame=currentGame-1;
					}
				}
						
				return backGame;
				
				/*backGame = currentGame;				
				if(typeNavigation == 1){					
					if(currentGame==0){
						backGame=games.length-1;
					}else{
						backGame=currentGame-1;
					}
					if(backGame == 0){
						isFirst = true;
					}
				}else if(typeNavigation == 2){											
					while(backGame == currentGame){						
						backGame=Math.floor(Math.random()*numGames);						
					}										
				}
				return backGame;*/
			},
			
			//=======================================================================			
			// IS FIRST GAME
			//=======================================================================
			isFirstGame : function(){
				return isFirst;
			},
			setGamesList : function(list) {
				gameList = list;
				return this.gameList();
			},
			gameList : function() {
				return gameList;
			},
			setMenuType : function(type) {
				menuType = type;
				return this.menuType();
			},
			menuType : function() {
				return menuType;
			},
			
			//=======================================================================			
			// SHOW PORTADA
			//=======================================================================	
			showPortada : function(container){
				isFirst = true;
				container.removeAllChildren();
				stage.removeChild(container);
				portada.load();
				portada.show();
			}
		}
	}
	return getInstance();
}