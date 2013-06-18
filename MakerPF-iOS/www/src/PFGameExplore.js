//*************************************************************
//	File: PFGameExplore.js 
//	PFGameExplore: game explore
//*************************************************************

var PFGameExplore = function(){

	//======================================================================			
	// VARIABLES
	//======================================================================
	var items;
	var xml;
	var newXML;
	var exploreListen;
	var images;
	var containerPrincipal;
	var containerNou;
	var containerBase;
	var containerSup;
	var preloader;
	var num = 0;
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
		newXML			= new PFXMLExplore;
		newXML.load(game,folder);
				
		xml 			= new PFAction();
		xml.LoadItems(game,folder);
		items			= new Array(newXML.items.length);
		exploreListen 	= new PFGameExploreListen();
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
		for ( i=0; i<newXML.items.length; i++){
			if(newXML.items[i].getSrc().charAt( newXML.items[i].getSrc().length-1 ) != "/"){
				itemsManifest.push(newXML.items[i].getSrc());
			}
			
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
		images = new Array(items.length);       
	   
        for (i = 0; i < items.length; i++){				 
		
			var bm = new PFBaseItem(newXML.items[i],i);
			if(bm.getKind() == 1){
				items[i] = bm.getBitmap();
			}else{
				items[i] = bm.getText();
			}
			
			baseGame.containerBase.addChild(items[i]);

			items[i].onPress = function(evt){
				if(baseGame.isGameActive()){
					exploreListen.onTouch(evt.target.i,baseGame.getGame(),newXML,items,baseGame.getFolder());
				}
			};						
			if(newXML.items[i].getSound() != ""){
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
	// CLEAR SOUNDS
	//=====================================================		
	this.onClearSounds = onClearSounds;
    function onClearSounds(){
        for(i=0;i<items.length;i++){
            PFSound.unload("sound"+i);
        }
    }
}
