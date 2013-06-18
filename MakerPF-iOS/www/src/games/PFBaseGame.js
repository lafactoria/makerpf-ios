//*************************************************************
//	File: PFBaseGeneric.js 
//	PFBaseGeneric: Create a generic containers with common 
//	game properties
//*************************************************************
var PFBaseGame = function(){
	
	//=====================================================
	// VARIABLES
	//=====================================================	
	this.containerNou 			= null;
	this.containerPrincipal		= null;
	
	this.containerBase			= null;
	this.highContainer			= null;
	this.containerNav			= null;
	this.containerInstructions 	= null;
	
	var end = false;
	var gameListener = null;
	
	var containerPrincipalLocal;
	var containerNouLocal;	
	
	var game;
	var folder;
	var isGameActive = false;
	
	var self;
	
	var instructions = null;
	var endGameVar = null;
	
	var newXML 		= null;
	var background 	= null;
	var mlMenu		= null;
	
	var hasBg = true;
	
	
	//=====================================================
	// hasBackground
	//=====================================================	
	this.hasBackground = hasBackground;
	function hasBackground(has){
		hasBg = has;
	}
	
	//=====================================================
	// CREATE
	//=====================================================	
	this.create = create;
	function create(pListener,pGame,pFolder,pContainerAux,pContainerAnt){
	
		xmlMenu 	= new PFAction();
		xmlMenu.ReadOptions("game/options.xml");
		
		self 				 = this;		
		gameListener 		 = pListener;
		game 				 = pGame;
		folder 				 = pFolder
		
		containerNou    	 = pContainerAux;
		containerPrincipal   = pContainerAnt;
		
		instructions 		= new PFInstructions(this);
		instructions.loadInstructions(folder);
		
		this.containerBase 			= new Container();
		this.highcontainer 			= new Container();
		this.containerNav 			= new Container();
		this.containerInstructions 	= new Container();
				
		newXML			= new PFXMLParser;
		newXML.load(game,folder);
		
		var rgb = newXML.backgroundRgb;
		var g = new Graphics();
		g.beginFill(Graphics.getRGB(rgb[0],rgb[1],rgb[2]));
		g.drawRect(0,0,1024,768);
		var s = new Shape(g);
			s.x = 0;
			s.y = 0;
		containerPrincipal.addChild(s);

		containerPrincipal.addChild(this.containerBase);
		containerPrincipal.addChild(this.highcontainer);
		containerPrincipal.addChild(this.containerNav);
		containerPrincipal.addChild(this.containerInstructions);
		containerPrincipal.addChild(loadingImg);
		loadingImg.x = -1;		
		
		var bgSrc = newXML.background.getSrc();
		if(bgSrc.charAt( bgSrc.length-1 ) != "/"){
			background = new Bitmap(bgSrc);
		}
		
		Tween.get(containerPrincipal).to({x:0},1000);

		var preload = new PreloadJS();
        preload.loadManifest(buildPreloadManifest());
		preload.onComplete = onResourcesLoaded;
	}

	//=====================================================
	// BUILD PRELOAD MANIFEST
	//=====================================================	
	function buildPreloadManifest(){
		var preloadManifest = new Array();	
		preloadManifest.push("game/images/bt_menu.png");
		preloadManifest.push("game/images/bt_adelante.png");
		preloadManifest.push("game/images/bt_enrera.png");	
		
		var bgSrc = newXML.background.getSrc();
		if(bgSrc.charAt( bgSrc.length-1 ) != "/"){
			preloadManifest.push(bgSrc);
		}
		
		return instructions.buildPreloadManifest(gameListener.buildPreloadManifest(preloadManifest,game),game);
	}
	
	//=====================================================
	// ON RESOURCES LOADED
	//=====================================================	
	function onResourcesLoaded(){
		self.addMenu();	
		if(hasBg){
			var bgSrc = newXML.background.getSrc();
			if(bgSrc.charAt( bgSrc.length-1 ) != "/"){
				self.drawBackground();
			}	
		}
		gameListener.onShowGame();	
		if(!instructions.show(self.containerInstructions)){
			onStartGame();
		}
		
	}
	//=====================================================
	// ADD MENU
	//=====================================================	
	this.addMenu = addMenu;
	function addMenu(){				
		containerPrincipal.removeChild(loadingImg);
		if (xmlMenu.getMenuActive() != "false"){
			var homeBt 	= new Bitmap("game/images/bt_menu.png");
			homeBt.x	= 20;
			homeBt.y	= 20;
			this.containerNav.addChild(homeBt);
			homeBt.onPress = goHome;
		}
		
		if(xmlMenu.getMenuActive() == "false"){
			var nextGameButton 	= new Bitmap("game/images/bt_adelante.png");
			nextGameButton.x	= 930;
			nextGameButton.y	= 20;
			this.containerNav.addChild(nextGameButton);
			nextGameButton.onPress = goNextGame;
			
			var backGameButton 	= new Bitmap("game/images/bt_enrera.png");
			backGameButton.x	= 870;
			backGameButton.y	= 20;
			this.containerNav.addChild(backGameButton);
			backGameButton.onPress = goBackGame;
		}
		
		gameListener.onAddMenu();
	}
	
	//=====================================================
	// START GAME
	//=====================================================	
	this.onStartGame = onStartGame;
	function onStartGame(){
		isGameActive = true;
		gameListener.onStartGame();	
	}
	
	//=====================================================
	// END GAME
	//=====================================================
	this.endGame 		= endGame;
	this.endGameResult 	= endGameResult;
		
	function endGame(pEndGame){
		var endInstructions = new PFEndInstruction(this);
		endInstructions.loadEndInstructions(folder,self);
		endInstructions.show(self.containerInstructions);
		/*isGameActive = false;
		endGameVar = new PFEndGame();
		endGameVar.show(self,pEndGame,folder,this.containerNav);*/
	}
	
	function endGameResult(xml, ok, total){
		isGameActive = false;		
		endGameVar = new PFEndGameResult();
		endGameVar.show(self,game,folder,ok,total,this.containerNav);
	}	
	
	//=====================================================
	// DRAW BACKGROUND
	//=====================================================
	this.drawBackground = drawBackground;
	function drawBackground(){			
		var scaleType = newXML.background.getScaleType();
		
		switch(scaleType){
			case "scalefitwidth":
				var currentWidth 	= parseInt(background.image.width);
				var newScaleX		= 1024/currentWidth;
				background.scaleX 	= newScaleX;				
				background.scaleY 	= newScaleX;				
				background.regY		= 0.5;
				background.y 		= 384 - (background.image.height*newScaleX)/2;				
				break;
			case "scalefitheight":
				var currentHeight 	= parseInt(background.image.height);
				var newScaleY		= 768/currentHeight;
				background.scaleY = newScaleY;
				background.scaleX = newScaleY;
				background.regX		= 0.5;
				background.x 		= 512 - (background.image.width*newScaleY)/2;
				break;
			case "scalefit":
				var currentWidth 	= parseInt(background.image.width);
				var newScaleX		= 1024/currentWidth;			
				var currentHeight 	= parseInt(background.image.height);
				var newScaleY		= 768/currentHeight;
				
				var currScale = 1;
				if(newScaleX > newScaleY){
					currScale = newScaleY;										
				}else{
					currScale = newScaleX;					
				}		
				
				background.scaleX = currScale;
				background.scaleY = currScale;
					
				background.regX		= 0.5;
				background.x 		= 512 - (background.image.width*currScale)/2;
				background.regY		= 0.5;
				background.y 		= 384 - (background.image.height*currScale)/2;
				
				break;
			case "scalefill":
				var currentWidth 	= parseInt(background.image.width);
				var newScaleX		= 1024/currentWidth;
				background.scaleX = newScaleX;
				var currentHeight 	= parseInt(background.image.height);
				var newScaleY		= 768/currentHeight;
				background.scaleY = newScaleY;
				break;
			case "noscale":
				background.regX		= 0.5;
				background.x 		= 512 - (background.image.width)/2;
				background.regY		= 0.5;
				background.y 		= 384 - (background.image.height)/2;
				break;
		}
		
		
		this.containerBase.addChild(background);
	}
	//=====================================================
	// ON END GAME SCREEN FINISHED : Listener called when PFEndGame ends showing the screen
	//=====================================================
	this.onEndGameScreenFinished = onEndGameScreenFinished;			
	function onEndGameScreenFinished(){
		if(typeNavigation != 0 || xmlMenu.getMenuActive() == "false"){
			end=false;
			goNextGame();
		}
		else{
			goHome();
		}
	}
		
	//=====================================================
	// GENERIC Controls
	//=====================================================
	function changeGame(){
		clearSounds();
		containerNou.removeAllChildren();
		stage.removeChild(containerNou);
		stage.addChild(containerNou);
	}
	
	function goBackGame(){		
		if(!gameManager.isFirstGame()){
			if(end==false){				
				Tween.get(containerPrincipal).to({x:1024},1000);
				setTimeout(function(){
					containerNou.removeAllChildren();
				},1000);
				changeGame();
				containerNou.x=-1024;				
				gameManager.playGame(gameManager.backGame(),1,containerPrincipal,containerNou);
			}
		}else{		
			goToPortada();
		}
	}
	function goNextGame(){			
		var ng = gameManager.nextGame();
		
		if(xmlMenu.getMenuActive() == "false"){			
			if(end==false){				
				Tween.get(containerPrincipal).to({x:-1024},1000);
				setTimeout(function(){
					containerNou.removeAllChildren();
				},1000);
				changeGame();
				containerNou.x=1024;				
				gameManager.playGame(ng,2,containerPrincipal,containerNou);
			}
		}else{
			if(ng == 0 && typeNavigation == 1){
				goToPortada();
				
			}else{
				if(end==false){				
					Tween.get(containerPrincipal).to({x:-1024},1000);
					setTimeout(function(){
						containerNou.removeAllChildren();
					},1000);
					changeGame();
					containerNou.x=1024;				
					gameManager.playGame(ng,2,containerPrincipal,containerNou);
				}
			}
		}
	}
	//=====================================================
	// GO HOME
	//=====================================================		
	function goHome(){		//Main Menu
		if(typeNavigation == 0){
			if(end==false){
				cleanGame();
				menu.load();
				menu.show();
			}
		}else{
			goToPortada();
		}
	}
	//=====================================================
	// GOT TO PORTADA
	//=====================================================		
	function goToPortada(){
		cleanGame();
		gameManager.showPortada(containerPrincipal);
	}
	
	//=====================================================
	// CLEAN GAME: delete all game showed
	//=====================================================	
	function cleanGame(){
        clearSounds();
        containerPrincipal.removeAllChildren();
		containerNou.removeAllChildren();
		stage.removeChild(containerPrincipal);
		stage.removeChild(containerNou);
	}
	
	//=====================================================
	// CLEAR SOUNDS
	//=====================================================		
    function clearSounds(){
    	if(endGameVar 	!= null)	endGameVar	.onClearSounds();
    	if(gameListener != null)	gameListener.onClearSounds();
    }	
    
	//=====================================================
	// GETS
	//=====================================================    
    this.getGame   		= function()		{ return game	};	
    this.getFolder 		= function()	  	{ return folder	};	
    
    this.isGameActive  	= function() 	 	{ return isGameActive; }
    this.setGameActive 	= function(value) 	{ isGameActive = value;}
    
    this.showNav		= function() 		{ containerPrincipal.addChild(this.containerNav); 		}    
    this.hideNav		= function() 		{ containerPrincipal.removeChild(this.containerNav); 	}
    
}