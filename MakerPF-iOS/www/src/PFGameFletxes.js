//*****************************************************
// PFGameFletxes: Load and execute "Fletxes"
//*****************************************************/

var PFGameFletxes = function(){

	//Variables
	var items;
	var xml;
	var fletxesListen;
	var images;
	var containerPrincipal;
	var containerNou;
	var preload;
	var num=0;
	var containerBase;
	var containerSup;
	var end=false;
	var offsetx, offsety;
	var newx, newy;
	var i;
	var newXML;
	
	//Functions declaration
	this.load = load;
	this.show = show;
	
	var baseGame;
	
	//======================================================================
	// LOAD GAME
	//======================================================================
	function load(game,folder){
		newXML = new PFXMLArrows;
		newXML.load(game,folder);
	
		xml 			= new PFAction();
		xml.LoadItems(game,folder);		
		//items			= new Array(xml.getItems(game).length);
		items			= new Array(newXML.items.length);		
		fletxesListen 	= new PFGameFletxesListen();
		PFSound.load('tick','game/sounds/boto.mp3');
	}
	
	//=======================================================================			
	// SHOW GAME
	//======================================================================
	function show(game,folder,direction,containerAux,containerAnt){
		
		baseGame = new PFBaseGame();
		baseGame.create(this,game,folder,containerAux, containerAnt);		
	}
	
	//=====================================================
	// BUILD PRELOAD MANIFEST
	//=====================================================
	this.buildPreloadManifest = buildPreloadManifest
	function buildPreloadManifest(itemsManifest,game){
		for ( i=0; i<items.length; i++){
			itemsManifest.push(newXML.items[i].getSrc());
		}
		//itemsManifest.push(newXML.background.getSrc());
		return itemsManifest;
	}	
	
	//=====================================================
	// ON ADD MENU
	//=====================================================
	this.onAddMenu = onAddMenu;
	function onAddMenu(){}
    
    //=====================================================
	// ON SHOW GAME
	//=====================================================
	this.onShowGame = onShowGame;
	function onShowGame(){
		
		stage.enableMouseOver();
		
		//var background = new Bitmap(newXML.background.getSrc());
		//baseGame.containerBase.addChild(background);
		
		images=new Array(items.length);

		for(i=0;i<items.length;i++){
			if(newXML.items[i].getSrc().charAt( newXML.items[i].getSrc().length-1 ) != "/"){
				images[i] 			= new Image();
				images[i].src 		= newXML.items[i].getSrc();
				images[i].i			= i;
				images[i].onload 	= loadBitmap;
			}else{
				loadText(i);
			}
			//PFSound.load("sound"+i,xml.getItems(game)[i].getSound());
		}
	}
	//=======================================================================
	// ON START GAME
	//=======================================================================
	this.onStartGame = onStartGame;
	function onStartGame(){
		
	}	

	//=====================================================
	// loadText: load and show all items images 
	//=====================================================
	function loadText(event){
		
		var i 		= event;
		var game 	= baseGame.getGame();
		var folder 	= baseGame.getFolder();
		
		var bm = new PFBaseItem(newXML.items[i],i);
		items[i] = bm.getText();
		
		if (newXML.items[i].getScale() != 1000){
			var scaleFactor = newXML.items[i].getScale()/1000;
			items[i].scaleX = scaleFactor;
			items[i].scaleY = scaleFactor;
		}
		items[i].defaultScaleX = items[i].scaleX;
		items[i].defaultScaleY = items[i].scaleY;
		
		newx			= parseInt(newXML.items[i].getX());
		newy			= parseInt(newXML.items[i].getY());
		items[i].x 		= newx;
		items[i].y 		= newy;
		//console.log(items[i]);
		items[i].rotation	=  newXML.items[i].getRotation();
		
		baseGame.containerBase.addChild(items[i]);

		(function(target) {

			target.onPress = function(evt) {
				if(baseGame.isGameActive()){
					fletxesListen.onTouch(i,game,newXML,baseGame.containerBase,evt);
					evt.onMouseMove = function(ev) {
						fletxesListen.onMouseMove(ev);
					}
					evt.onMouseUp = function(ev){
						fletxesListen.onMouseUp(i,game,newXML,baseGame.containerBase);
						if(fletxesListen.getFinish()){
							baseGame.endGame(newXML.endGame);
							end=true;
						}
					}
				}
			}
			
			target.onMouseOver = function(evt) {
				if(fletxesListen.getPressed() != -1 && baseGame.isGameActive()){
					fletxesListen.setInto(i);
				}
			}

			target.onMouseOut = function(evt){
				if(fletxesListen.getPressed() != -1 && baseGame.isGameActive()){
					fletxesListen.setInto(-1);
				}
			}

		})(items[i]);
	}
	
	//=====================================================
	// loadBitmaps: load and show all items images 
	//=====================================================
	function loadBitmap(event){
		
		var i 		= event.target.i;
		var game 	= baseGame.getGame();
		var folder 	= baseGame.getFolder();
		
		items[i] = new Bitmap(images[i]);
		if (newXML.items[i].getScale() != 1000){
			var scaleFactor = newXML.items[i].getScale()/1000;
			items[i].scaleX = scaleFactor;
			items[i].scaleY = scaleFactor;
		}
		items[i].defaultScaleX = items[i].scaleX;
		items[i].defaultScaleY = items[i].scaleY;
		
		offsetx 		= parseInt(items[i].image.width)/2;
		offsety 		= parseInt(items[i].image.height)/2;
		newx			= parseInt(newXML.items[i].getX());
		newy			= parseInt(newXML.items[i].getY());
		items[i].regX	= offsetx;
		items[i].regY	= offsety;
		items[i].x 		= newx;
		items[i].y 		= newy;
		
		items[i].rotation	=  newXML.items[i].getRotation();
		
		baseGame.containerBase.addChild(items[i]);

		(function(target) {

			target.onPress = function(evt) {
				if(baseGame.isGameActive()){
					fletxesListen.onTouch(i,game,newXML,baseGame.containerBase,evt);
					evt.onMouseMove = function(ev) {
						fletxesListen.onMouseMove(ev);
					}
					evt.onMouseUp = function(ev){
						fletxesListen.onMouseUp(i,game,newXML,baseGame.containerBase);
						if(fletxesListen.getFinish()){
							baseGame.endGame(newXML.endGame);
							end=true;
						}
					}
				}
			}
			
			target.onMouseOver = function(evt) {
				if(fletxesListen.getPressed() != -1 && baseGame.isGameActive()){
					fletxesListen.setInto(i);
				}
			}

			target.onMouseOut = function(evt){
				if(fletxesListen.getPressed() != -1 && baseGame.isGameActive()){
					fletxesListen.setInto(-1);
				}
			}

		})(items[i]);
	}


	//=====================================================
	// CLEAR SOUNDS :
	//=====================================================		
	this.onClearSounds = onClearSounds;
    function onClearSounds(){
        /*for(i=0;i<items.length;i++){
            soundManager.unload("sound"+i);
        	soundManager.destroySound("sound"+i);
        }*/        
        PFSound.unload("tick");
    }
}