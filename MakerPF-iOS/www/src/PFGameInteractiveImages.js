//******************************************************************
// PFGameInteractiveImages: Load and execute "InteractiveImages"
//*****************************************************************/

var PFGameInteractiveImages = function(){

	//Variables
	var items;
	var itemsMid;
	var xml;
	var interactiveImagesListen;
	var images;
	var imagesPopup;

	var containerMid;
	var preload;
	var num=0;
	var offsetx, offsety;
	var newx, newy;
	var i;
	var newMXL;
	
	//Functions declaration
	this.load = load;
	this.show = show;
	
	var baseGame;
	
	//=======================================================================			
	// LOAD
	//=======================================================================
	function load(game,folder){
		newXML = new PFXMLInteractiveImages();
		newXML.load(game,folder);	
	
		xml 		= new PFAction();
		xml.LoadItems(game,folder);
		items 		= new Array(newXML.items.length);
		itemsMid 	= new Array(newXML.items.length);		
		interactiveImagesListen = new PFGameInteractiveImagesListen();
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
		for ( i=0; i<items.length; i++){
			if(typeof(newXML.items[i]) != 'undefined'){
				itemsManifest.push(newXML.items[i].getSrc());
				if(typeof(newXML.items[i].getImage()) != 'undefined'){				
					itemsManifest.push(newXML.items[i].getImage());
				}				
			}
		}
		itemsManifest.push("game/images/bt_creditos_exit.png");
		
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
		containerMid = new Container();
		containerMid.alpha=0;				
				
		//var background = new Bitmap(xml.getBackground("game").getSrc());
		//baseGame.containerBase.addChild(background);
		
		baseGame.containerNav.addChild(containerMid);
		
		images		= new Array(items.length);
		imagesPopup	= new Array(items.length);		
		for (i = 0; i < items.length; i++){			
			images[i] = new Image();
			images[i].src = newXML.items[i].getSrc();
			imagesPopup[i] = new Image();
			var strImage = newXML.items[i].getImage();
			
			if(typeof(strImage) != 'undefined'){
				if(strImage.charAt(strImage.length-1) != "/"){
					imagesPopup[i].src = newXML.items[i].getImage();
					imagesPopup[i].i 		= i;
					imagesPopup[i].onload	= loadBitmapsMid;
				}
			}
			images[i].i 			= i;
			images[i].onload		= loadBitmapsBase;
		}	
	}

	//=======================================================================
	// ON START GAME
	//=======================================================================
	this.onStartGame = onStartGame;
	function onStartGame(){

	}	

	//=====================================================
	// loadBitmaps: load and show all items images 
	//=====================================================
	function loadBitmapsBase(evt){
		i 			= evt.target.i;
		var folder 	= baseGame.getFolder();
		var game 	= baseGame.getGame();
		items[i] 	= new Bitmap(images[i]);
		
		if (newXML.items[i].getScale()!=1000){
			var scaleFactor = newXML.items[i].getScale()/1000;
			items[i].scaleX=scaleFactor;
			items[i].scaleY=scaleFactor;
		}
		offsetx			= parseInt(items[i].image.width)/2;
		offsety			= parseInt(items[i].image.height)/2;
		newx			= parseInt(newXML.items[i].getX());
		newy			= parseInt(newXML.items[i].getY());
		items[i].regX 	= offsetx;
		items[i].regY 	= offsety;
		items[i].x 		= newx;
		items[i].y 		= newy;
		
		items[i].rotation	=  newXML.items[i].getRotation();
		
		baseGame.containerBase.addChild(items[i]);
		items[i].i = i;
		items[i].game = game;				
		items[i].onPress = callOnTouc;				
	}
	
	function callOnTouc(evt){		
		var i = evt.target.i;
		var game = evt.target.game;		
		
		if(baseGame.isGameActive()){
			interactiveImagesListen.onTouch(i,game,xml,itemsMid,containerMid,baseGame.containerBase,newXML);
		}
	}
	
	
	//=====================================================
	// loadBitmapsMid: load all popup images 
	//=====================================================
	function loadBitmapsMid(evt){		
		i 			= evt.target.i;
		var folder 	= baseGame.getFolder();
		var game 	= baseGame.getGame();
		itemsMid[i] = new Bitmap(imagesPopup[i]);
		offsetx		= parseInt(itemsMid[i].image.width)/2;
		offsety		= parseInt(itemsMid[i].image.height)/2;
		newx		= 344;
		newy		= 384;
		itemsMid[i].regX 	= offsetx;
		itemsMid[i].regY 	= offsety;
		itemsMid[i].x 		= newx;
		itemsMid[i].y 		= newy;
	}	
   	
	//=====================================================
	// CLEAR SOUNDS :
	//=====================================================		
	this.onClearSounds = onClearSounds;
    function onClearSounds(){
		for(i=0;i<items.length;i++){
            PFSound.unload('soPopup'+i);       
        }   
    }	
}