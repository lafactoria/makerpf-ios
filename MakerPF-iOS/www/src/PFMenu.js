//*****************************************************
// File: PFMenu.js 
// PFMenu: Load and execute Main Menu
//*****************************************************/

var PFMenu = function(){
	
	//=====================================================
	// VARIABLES
	//=====================================================
	var itemsMenu;
	var xmlMenu;
	var games;
	var container;
	var preload;
	var offsetx, offsety;
	var newx, newy;
	var i;
	var random;	
	
	this.load 		= load;
	this.show 		= show;
	this.onTouch 	= onTouch;
	this.loadGame 	= loadGame;
	
	//=======================================================================			
	// LOAD
	//=======================================================================	
	function load(){
		//musicManager.play();
		gameManager.setCurrentGame(20);
		xmlMenu 	= new PFAction();
		xmlMenu.ReadMenu("game/menu.xml");
		xmlMenu.ReadOptions("game/options.xml");
		itemsMenu 	= new Array(xmlMenu.getItemsMenu().length);
	}
	
	//=======================================================================================			
	// controlRandom: Check if this item is already loaded
	//=======================================================================================
	function controlRandom (random,value,length){
		for(j=0;j<length;j++){
			if(random[j] == value){
				return false;
			}		
		}
		return true;
	}

	//=======================================================================			
	// SHOW
	//=======================================================================	
	function show(){
		var itemsMenuManifest = new Array();
		for ( i=0; i<itemsMenu.length; i++){
			itemsMenuManifest[i] = xmlMenu.getItemsMenu()[i].getSrc();
		}
		if(xmlMenu.getBackground("Menu").getSrc()!="null"){
			itemsMenuManifest[itemsMenuManifest.length] = xmlMenu.getBackground("Menu").getSrc();
		}
		
		if(xmlMenu.getMenuActive() == "false"){
			container = new Container();
			stage.addChild(container);
			onTouch(0);
		}else{		
			preload = new PreloadJS();		
			preload.loadManifest(itemsMenuManifest);
			preload.onComplete = handleComplete;
		}
	}
	
	//=======================================================================			
	// HANDLE COMPLETE
	//=======================================================================		
	function handleComplete(event) {
		showMenu();
    }
	
	//=======================================================================			
	// SHOW MENU
	//=======================================================================		
	function showMenu(){
		
		container = new Container();
		stage.addChild(container);
		
		if(xmlMenu.getBackground("Menu").getSrc()!="null"){
			var background = new Bitmap(xmlMenu.getBackground("Menu").getSrc());
			container.addChild(background);
		}

		var backButton		= new Bitmap("game/images/bt_enrera.png");
		container.addChild(backButton);
		backButton.onPress	= showPortada;
		
		games = new Array(itemsMenu.length);		
		
		switch (typeNavigation){
			case "menu-random":
				random = new Array(itemsMenu.length);
				//-----------------------
				// Choose random order
				//-----------------------
				for(i=0;i<itemsMenu.length;i++){
					do{
						valueRandom = Math.floor(Math.random()*itemsMenu.length);
					}while(!controlRandom (random,valueRandom,itemsMenu.length));
					random[i] = valueRandom;
				}
				//----------------
				// insert games
				//----------------
				for ( i=0; i<itemsMenu.length; i++){
					games[i] = new PFGame(xmlMenu.getItemsMenu()[random[i]].getSrc(),xmlMenu.getItemsMenu()[random[i]].getType(),xmlMenu.getItemsMenu()[random[i]].getGame());
				}
				break;					
			default:
				for ( i=0; i<itemsMenu.length; i++){
					games[i] = new PFGame(xmlMenu.getItemsMenu()[i].getSrc(),xmlMenu.getItemsMenu()[i].getType(),xmlMenu.getItemsMenu()[i].getGame());
				}
 		}		
		
		for ( i=0; i<itemsMenu.length; i++){
			itemsMenu[i] 		= new Bitmap(games[i].getSrcMenu());			
			itemsMenu[i].image.i = i;
			itemsMenu[i].image.onload = showImage;
		}		
		
		if(typeNavigation == 1){
			onTouch(0);
		}else if(typeNavigation == 2){
			var firstGame = Math.floor(Math.random()*itemsMenu.length);					
			onTouch(firstGame);
		}	
	
		playMusic();
		
	}
	function playMusic(){
		if(musicManager.getIsPlaying() == false){
			setTimeout(function(){
				musicManager.play();
			},1000);
		}
	}
	function showImage(evt){
		var i = evt.target.i;		
		offsetx				= (parseInt(itemsMenu[i].image.width)/2);
		offsety				= (parseInt(itemsMenu[i].image.height)/2);
		itemsMenu[i].regX	= offsetx;
		itemsMenu[i].regY	= offsety;
		newx=parseInt(xmlMenu.getItemsMenu()[i].getX());
		newy=parseInt(xmlMenu.getItemsMenu()[i].getY());
		itemsMenu[i].x		= newx;
		itemsMenu[i].y		= newy;			
		eval('itemsMenu['+i+'].onPress = function(){onTouch('+i+');};');
		container.addChild(itemsMenu[i]);
					
		var scaleFactor				= xmlMenu.getItemsMenu()[i].getScale()/1000;
		itemsMenu[i].scaleX			= scaleFactor;
		itemsMenu[i].scaleY			= scaleFactor;
		itemsMenu[i].defaultScaleX	= itemsMenu[i].scaleX;
		itemsMenu[i].defaultScaleY	= itemsMenu[i].scaleY;			
		itemsMenu[i].rotation		= xmlMenu.getItemsMenu()[i].getRotation();
	}
	
	//=======================================================================			
	// SHOW PORTADA
	//=======================================================================	
	function showPortada(){
		container.removeAllChildren();
		stage.removeChild(container);
		portada.load();
		portada.show();
	}
	//=======================================================================			
	// onTouch: Delete menu and Load the selected game 
	//=======================================================================
	function onTouch(i){
		container.removeAllChildren();
		var containerAux = new Container();
		stage.addChild(containerAux);
		loadGame(i,containerAux,container);
	}
	
	//=======================================================================			
	// LOAD GAME
	//=======================================================================	
	function loadGame(i,containerAux,container){
		gameManager.setGames();
		gameManager.playGame(i,0,containerAux,container);
	}
}