//*************************************************************
//	File: PFGameDrag.js 
//	PFGameDrag: game drag
//*************************************************************

function PFGameDrag(){

	//======================================================================			
	// VARIABLES
	//======================================================================
	var items;
	var newXML;
	var dragListen;
	var containerSup;
	var containerBase;
	var images;
	var num=0;
	var offsetx, offsety;
	var newx, newy;
	var i;

	this.load = load;
	this.show = show;
	
	var baseGame;
	
	//======================================================================			
	// LOAD
	//======================================================================
	function load(game,folder){
		newXML = new PFXMLDrag();
		newXML.load(game,folder);
		
		items		= new Array(newXML.items.length);
		dragListen 	= new PFGameDragListen();
	}
	//======================================================================			
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
			if(newXML.items[i].getSrc().charAt( newXML.items[i].getSrc().length-1 ) != "/"){
				itemsManifest.push(newXML.items[i].getSrc());				
			}
		}
		itemsManifest.push("game/images/drag_zone.png");
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

		var dragZone = new Bitmap("game/images/drag_zone.png");
		dragZone.y = 768 - dragZone.image.height;
		baseGame.containerBase.addChild(dragZone);
		
		images=new Array(items.length);
        
        for (i = 0; i < items.length; i++){
			if(newXML.items[i].getSrc().charAt( newXML.items[i].getSrc().length-1 ) != "/"){
				images[i] 			= new Image();
				images[i].src 		= newXML.items[i].getSrc();
				images[i]. i 		= i;
				images[i].onload = 	loadBitmap;
			}else{
				loadText(i);
			}
			if(newXML.items[i].getSound()!=""){
				PFSound.load("sound"+i,newXML.items[i].getSound());
			}
		}		
	}
	
	//=======================================================================
	// ON START GAME
	//=======================================================================
	this.onStartGame = onStartGame;
	function onStartGame(){
		
	}
	
	//=====================================================
	// loadText
	//=====================================================
	function loadText(evt){
		i = evt;
		var game  	= baseGame.getGame();
		var folder 	= baseGame.getFolder();

		var bm = new PFBaseItem(newXML.items[i],i);
		items[i] = bm.getText();
		
		items[i].i 	= i;
	
		items[i].scaleX			= 1;
		items[i].scaleY			= 1;
		items[i].defaultScaleX 	= 1;
		items[i].defaultScaleY	= 1;			

		newx	= parseInt(newXML.items[i].getX());
		newy	= parseInt(newXML.items[i].getY());
		
		items[i].x		= newx;
		items[i].y		= newy;
		items[i].i		= i;
		newXML.items[i].setOffsetX(0);
		newXML.items[i].setOffsetY(0);
		baseGame.containerBase.addChild(items[i]);
		
		(function(target) {
			
			items[i].onPress = function(evt){				
				if(baseGame.isGameActive()){
					var i = evt.target.i;
					dragListen.onTouch(i,game,newXML);				
				
					var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};
					evt.onMouseMove = function(ev) {
						dragListen.onMouseMove(ev,target,newXML,i,game,offset,0);	//Call drag&drop
					}
					evt.onMouseUp = function(ev){
						dragListen.onMouseUp(target,newXML,i,game,1);
					}
				}
			};
		})(items[i]);
	}
	//=====================================================
	// loadBitmaps: load and show all items images 
	//=====================================================
	function loadBitmap(evt){
		
		i = evt.target.i;
		var game  	= baseGame.getGame();
		var folder 	= baseGame.getFolder();

		items[i] 	= new Bitmap(images[i]);
		items[i].i 	= i;
		

		var scaleFactor 		= getImageScale(items[i].image.width,items[i].image.height,100);
		items[i].scaleX			= scaleFactor;
		items[i].scaleY			= scaleFactor;
		items[i].defaultScaleX 	= scaleFactor;
		items[i].defaultScaleY	= scaleFactor;			

		
		offsetx	= parseInt(items[i].image.width)/2;
		offsety	= parseInt(items[i].image.height)/2;
		newx	= parseInt(newXML.items[i].getX());
		newy	= parseInt(newXML.items[i].getY());
		
		items[i].regX 	= offsetx;
		items[i].regY 	= offsety;
		items[i].x		= newx;
		items[i].y		= newy;
		items[i].i		= i;
		newXML.items[i].setOffsetX(offsetx);
		newXML.items[i].setOffsetY(offsety);
		baseGame.containerBase.addChild(items[i]);
		
		(function(target) {
			
			items[i].onPress = function(evt){				
				if(baseGame.isGameActive()){
					var i = evt.target.i;
					dragListen.onTouch(i,game,newXML);				
				
					var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};
					evt.onMouseMove = function(ev) {
						dragListen.onMouseMove(ev,target,newXML,i,game,offset,1);	//Call drag&drop
					}
					evt.onMouseUp = function(ev){
						dragListen.onMouseUp(target,newXML,i,game,scaleFactor);
					}
				}
			};
		})(items[i]);
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
}