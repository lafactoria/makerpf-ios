//*************************************************************
//	File: PFGamePuzzle.js 
//	PFGamePuzzle: game puzzle
//*************************************************************

function PFGamePuzzle(){
	
	//=====================================================
	// VARIABLES
	//=====================================================
	var items;
	var end = false;
	var num = 0;
	var numPages;
	var actualPage;
	var newXML;
	var puzzleListen;
	var images;
	var preload;
	var offsetx, offsety;
	var newx, newy;
	var i;
		
	var baseGame;

	this.load = load;
	this.show = show;

	//======================================================================
	// LOAD GAME
	//======================================================================
	function load(game,folder){
		newXML = new PFXMLPuzzle();
		newXML.load(game,folder);

		items		 = new Array(newXML.items.length);
		puzzleListen = new PFGamePuzzleListen();
		PFSound.load('end','game/sounds/ok.mp3');
		PFSound.load('puzzle','game/'+folder+'/sounds/puzzle.mp3');
	}
	//=======================================================================			
	// SHOW GAME : It is a create, not a show
	//=======================================================================
	function show(game,folder,direction,containerAux,containerAnt){	
		baseGame = new PFBaseGame();
		baseGame.create(this,game,folder,containerAux, containerAnt);
	}
	
	//=======================================================================
	// BUILD PRELOAD MANIFEST
	//=======================================================================
	this.buildPreloadManifest = buildPreloadManifest
	function buildPreloadManifest(itemsManifest,game){
		for ( i=0; i<items.length; i++){
			itemsManifest.push(newXML.items[i].getSrc());
		}
		//itemsManifest.push(newXML.background.getSrc());
		return itemsManifest;
	}
	
	//=======================================================================
	// ON ADD MENU : Here we add the custom menu things for this specific game
	//=======================================================================
	this.onAddMenu = onAddMenu;
	function onAddMenu(){}	
	
	//=======================================================================
	// ON SHOW GAME
	//=======================================================================
	this.onShowGame = onShowGame;
	function onShowGame(){
		//var background = new Bitmap(newXML.background.getSrc());
		//baseGame.containerBase.addChild(background);
				
		images = new Array(items.length);

		for (i = 0; i < items.length; i++){
			images[i] 		 = new Image();
			images[i].src    = newXML.items[i].getSrc();
			images[i].i 	 = i;
			if(newXML.items[i].getSrc().charAt( newXML.items[i].getSrc().length-1 ) != "/"){
				images[i].onload = 	loadBitmap;
			}else{
				loadText(i);
			}
		}	
	}
	
	//=======================================================================
	// ON START GAME
	//=======================================================================
	this.onStartGame = onStartGame;
	function onStartGame(){
		
	}	
	//=======================================================================
	// LOAD TEXTS
	//=======================================================================    
	function loadText(event){
		i = event;
		
		var bm = new PFBaseItem(newXML.items[i],i);
		
	
		items[i] = bm.getText();
		var currentItem = items[i];
		
		newx				= parseInt(newXML.items[i].getX());
		newy				= parseInt(newXML.items[i].getY());
		currentItem.x	  	= newx;
		currentItem.y	  	= newy;
					
		newXML.items[i].setOffsetX(offsetx);
		newXML.items[i].setOffsetY(offsety);
		baseGame.highcontainer.addChild(items[i]);
		
		//TODO: FIX THIS!!!!!!!!
		items[i].onPress = function(){onTouch(i,game);};       
                       (function(target) {
                               puzzleListen.onLoad(i,baseGame.getGame(),newXML,items,baseGame.getFolder());
                               target.onPress = function(evt) {
                               		   i = evt.target.i;
                                       if(end==false && baseGame.isGameActive() && !newXML.items[i].getMarked()){
                                               baseGame.highcontainer.removeChild(items[i]);
                                               baseGame.highcontainer.addChild(items[i]);
                                               puzzleListen.onTouch(i,baseGame.getGame(),newXML);
                                               var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};
                                               evt.onMouseMove = function(ev) {
                                                       puzzleListen.onMouseMove(ev,target,offset);
                                               }
                                               evt.onMouseUp = function(ev){
                                                       puzzleListen.onMouseUp(target,newXML,i,baseGame.getGame(),items,baseGame.containerBase,baseGame.highcontainer);
                                                       checkEndGame(newXML,baseGame.getGame(),baseGame.getFolder());
                                               }
                                       }
                               }
               })(items[i]);	
	};
	//=======================================================================
	// LOAD BITMAPS
	//=======================================================================
	function loadBitmap(event){
		i = event.target.i;
		
		var bm = new PFBaseItem(newXML.items[i],i);
		
	
		items[i] = new Bitmap(images[i]);	
		items[i].i = i;
		
		var currentItem = items[i];
	
		if(newXML.items[i].getScale() != 1000)
		{
			var scaleFactor = newXML.items[i].getScale()/1000;
			currentItem.scaleX = scaleFactor;
			currentItem.scaleY = scaleFactor;
		}

		offsetx				= parseInt(currentItem.image.width)/2;
		offsety				= parseInt(currentItem.image.height)/2;
		newx				= parseInt(newXML.items[i].getX());
		newy				= parseInt(newXML.items[i].getY());
		currentItem.regX 	= offsetx;
		currentItem.regY	= offsety;
		currentItem.x	  	= newx;
		currentItem.y	  	= newy;
					
		newXML.items[i].setOffsetX(offsetx);
		newXML.items[i].setOffsetY(offsety);
		baseGame.highcontainer.addChild(items[i]);
		
		//TODO: FIX THIS!!!!!!!!
		items[i].onPress = function(){onTouch(i,game);};       
                       (function(target) {
                               puzzleListen.onLoad(i,baseGame.getGame(),newXML,items,baseGame.getFolder());
                               target.onPress = function(evt) {
                               		   i = evt.target.i;
                                       if(end==false && baseGame.isGameActive() && !newXML.items[i].getMarked()){
                                               baseGame.highcontainer.removeChild(items[i]);
                                               baseGame.highcontainer.addChild(items[i]);
                                               puzzleListen.onTouch(i,baseGame.getGame(),newXML);
                                               var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};
                                               evt.onMouseMove = function(ev) {
                                                       puzzleListen.onMouseMove(ev,target,offset);
                                               }
                                               evt.onMouseUp = function(ev){
                                                       puzzleListen.onMouseUp(target,newXML,i,baseGame.getGame(),items,baseGame.containerBase,baseGame.highcontainer);
                                                       checkEndGame(newXML,baseGame.getGame(),baseGame.getFolder());
                                               }
                                       }
                               }
               })(items[i]);	
	};
	
	//=======================================================================
	// Scale: load scale animation
	//=======================================================================
	function Scale(target){
		Tween.get(target).to({scaleX:parseFloat(1)},500).play(Tween.get(target).to({scaleY:parseFloat(1)},500));
	}
	
	//=======================================================================
	// CONTROLS :
	//=======================================================================
	function checkEndGame(xml,game,folder){
		end = true;	
		for(i = 0; i< items.length; i++){
			if(newXML.items[i].getMarked() != true){
				end = false;
			}
		}
		if(end==true){
			baseGame.endGame(newXML.endGame);
		}
	}
	//=======================================================================
	// CLEAR SOUNDS
	//=======================================================================
	this.onClearSounds = onClearSounds;
    function onClearSounds(){
		PFSound.unload("puzzle");
    }
}
