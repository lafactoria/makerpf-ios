//*************************************************************
//	File: PFGameTouchListen.js 
//	PFGameTouchListen: game listen and touch
//*************************************************************/

var PFGameTouchListen = function(){
	
	//=====================================================
	// VARIABLES
	//=====================================================
	var items;
	var newXML;
	var touchListenListen;
	var usedItems;
	var numUsed;
	var itemRandom;
	var images;		
	var num		= 0;
	var fiJoc	= false;
	var offsetx, offsety;
	var newx, newy;
	var i;
	var gameGlob;
	
	this.load = load;
	this.show = show;
	
	var baseGame;	
	
	//=======================================================================			
	// LOAD
	//======================================================================
	function load(game,folder){		
		
		newXML = new PFXMLListenTouch();
		newXML.load(game,folder);

		PFSound.load('end','game/sounds/ok.mp3');
		items 			  = new Array(newXML.items.length);
		touchListenListen = new PFGameTouchListenListen();
		gameGlob 	= game;
	}
	
	//=======================================================================			
	// SHOW GAME : It is a create, not a show
	//=======================================================================
	function show(game,folder,direction,containerAux,containerAnt){	
		baseGame = new PFBaseGame();
		baseGame.create(this,game,folder,containerAux, containerAnt);
	}
	
	//=====================================================
	// BUILD PRELOAD MANIFEST
	//=====================================================
	this.buildPreloadManifest = buildPreloadManifest
	function buildPreloadManifest(itemsManifest,game){		
		//itemsManifest.push(newXML.background.getSrc());
		for ( i=0; i<items.length; i++){
			itemsManifest.push(newXML.items[i].getSrc());
		}		
		return itemsManifest;
	}	
	
	//=====================================================
	// ON ADD MENU
	//=====================================================
	this.onAddMenu = onAddMenu;
	function onAddMenu(){
	}
	
	//=======================================================================
	// ON SHOW GAME
	//=======================================================================
	this.onShowGame = onShowGame;
	function onShowGame(){		
		//var background = new Bitmap(newXML.background.getSrc());
		//baseGame.containerBase.addChild(background);
		
		images = new Array(items.length);
		
		for (i = 0; i < items.length; i++){
			if(newXML.items[i].getSrc().charAt( newXML.items[i].getSrc().length-1 ) != "/"){
				images[i] 		= new Image();
				images[i].src 	= newXML.items[i].getSrc();
				images[i].i 	= i;
				images[i].onload = loadBitmaps; //Load the bitmaps
			}else{
				loadText(i);
			}
			PFSound.load("sound"+i,newXML.items[i].getSound());
		}
		
		/* Select which animal we've to touch */
		usedItems 	= new Array(items.length);
		numUsed  	= 0;
		
		itemRandom 	= Math.floor(Math.random()*newXML.items.length);
		touchListenListen.setActual(itemRandom);	
		
		var repeatButton = new Bitmap("game/images/bt_so.png");
		repeatButton.x 	 = 80;
		repeatButton.y 	 = 20;
		baseGame.containerNav.addChild(repeatButton);
		repeatButton.onPress = repeat	
	}
	
	//=======================================================================
	// ON START GAME
	//=======================================================================
	this.onStartGame = onStartGame;
	function onStartGame(){
		touchListenListen.playSound(itemRandom,baseGame.getGame(),newXML);		
	}		
	
	//=====================================================
	// repeat: repeat sound
	//=====================================================
	function repeat(){
		touchListenListen.repeatSound();
	}
	//=====================================================
	// loadText: load and show all items images 
	//=====================================================
	function loadText(evt){
		i = evt;
		var game = baseGame.getGame();
		var folder = baseGame.getFolder();
		var bm = new PFBaseItem(newXML.items[i],i);
		items[i] = bm.getText();
		
		var scaleFactor = 1;
		if (newXML.items[i].getScale()!=1000){
			scaleFactor = newXML.items[i].getScale()/1000;
			items[i].scaleX = scaleFactor;
			items[i].scaleY = scaleFactor;
		}
		items[i].defaultScaleX = items[i].scaleX;
		items[i].defaultScaleY = items[i].scaleX;
			
		newx			= parseInt(newXML.items[i].getX());
		newy			= parseInt(newXML.items[i].getY());
		
		items[i].x	  	= newx;
		items[i].y	  	= newy;
		newXML.items[i].setOffsetX(offsetx);
		newXML.items[i].setOffsetY(offsety);
		
		items[i].rotation	=  newXML.items[i].getRotation();
		items[i].defaultRotation	=  newXML.items[i].getRotation();
		
		baseGame.containerBase.addChild(items[i]);
		items[i].i = i;
		items[i].onPress = onTouch;	
	}
	//=====================================================
	// loadBitmaps: load and show all items images 
	//=====================================================
	function loadBitmaps(evt){
		i = evt.target.i;
		var game = baseGame.getGame();
		var folder = baseGame.getFolder();
		items[i] = new Bitmap(images[i]);
		
		var scaleFactor = 1;
		if (newXML.items[i].getScale()!=1000){
			scaleFactor = newXML.items[i].getScale()/1000;
			items[i].scaleX = scaleFactor;
			items[i].scaleY = scaleFactor;
		}
		items[i].defaultScaleX = items[i].scaleX;
		items[i].defaultScaleY = items[i].scaleX;
			
		offsetx			= (parseInt(items[i].image.width)/2);
		offsety			= (parseInt(items[i].image.height)/2);
		newx			= parseInt(newXML.items[i].getX());
		newy			= parseInt(newXML.items[i].getY());
		items[i].regX 	= offsetx;
		items[i].regY 	= offsety;
		items[i].x	  	= newx;
		items[i].y	  	= newy;
		newXML.items[i].setOffsetX(offsetx);
		newXML.items[i].setOffsetY(offsety);
		
		items[i].rotation	=  newXML.items[i].getRotation();
		items[i].defaultRotation	=  newXML.items[i].getRotation();
		
		baseGame.containerBase.addChild(items[i]);
		items[i].i = i;
		items[i].onPress = onTouch;	
	}
	
	//================================================================================================
	// onTouch: evaluate if items it's OK, in afirmative case call animation and next item to click
	//================================================================================================
	function onTouch(evt){
		i 			= evt.target.i;
		var game 	= baseGame.getGame();
		var folder	= baseGame.getFolder();
		
		//----------------------------
		// item clicked correct
		//----------------------------
		if (i==itemRandom){					
			usedItems[numUsed] = itemRandom;
			//--------------------------------
			// not all items appeared
			//--------------------------------
			if (numUsed<(items.length-1)){	
				touchListenListen.onTouch(i,game,newXML,items,folder);
				do{
					itemRandom = Math.floor(Math.random()*newXML.items.length);
				}while(controlRepetit(itemRandom)==true);
				numUsed++;
				touchListenListen.setActual(itemRandom);
				touchListenListen.playSound(itemRandom,game,newXML);
			}else{
				touchListenListen.onTouch(i,game,newXML,items,folder);
				fiJoc = true;
				Tween.get(containerPrincipal).wait(100).call(function(){
					baseGame.endGame(newXML.endGame);
				});
			}
		}
	}	
	
	//==========================================================================
	// controlRepetit: evaluate if this item is already used (appeared before)
	//==========================================================================
	function controlRepetit(itemR){
		var repetit = false;
		for(i=0;i<=numUsed;i++){
			if(usedItems[i]==itemR){ repetit = true; }
		}
		return repetit;
	}
	
	//=====================================================
	// CLEAR SOUNDS
	//=====================================================		
	this.onClearSounds = onClearSounds;
    function onClearSounds(){
		for(i=0;i<items.length;i++){
            PFSound.unload("sound"+i);
        }      
    }
    function clearSounds(){
        for(i=0;i<items.length;i++){
            PFSound.unload("sound"+i);
        }
        PFSound.unload('end');
    }	
}