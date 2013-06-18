//*****************************************************
// File: PFPortada.js 
// PFPortada: Load portada stage
//*****************************************************/

var PFPortada = function(){

	//=====================================================
	// VARIABLES
	//=====================================================
	var credits = new PFCredits();
	var items;
	var xmlCover;
	var container;
	var containerActLang;
	var containerLangList;
	var creditsButton;
	var preload;
	var textAct;
	var language;
	
	this.load			= load;
	this.show			= show;
	this.showMenu		= showMenu;
	this.showCredits	= showCredits;
	
	//=======================================================================
	// SHOW CREDITS
	//=======================================================================
	function showCredits(){
		credits.show(creditsButton);
		creditsButton.alpha=0;
	}
	
	//=======================================================================
	// SHOW MENU
	//=======================================================================
	function showMenu(){
		container.removeAllChildren();
		stage.removeChild(container);
		menu.load();
		menu.show();
	}

	//=======================================================================
	// LOAD
	//=======================================================================
	function load(){
		gameManager.setCurrentGame(10);
		xmlCover = new PFAction();
		xmlCover.ReadOptions("game/options.xml");
		xmlCover.ReadPortada("game/cover.xml");
	}

	//=======================================================================
	// SHOW
	//=======================================================================
	function show(){		
		if(xmlCover.getPortadaActive() == "false"){
			stage.removeChild(container);
			menu.load();
			menu.show();
		}else{
			var itemsPortadaManifest	= new Array();
			itemsPortadaManifest[0]		= xmlCover.getBackground("Portada").getSrc();
			itemsPortadaManifest[1] 	= xmlCover.getPlay().getSrc();
			
			preload 					= new PreloadJS();		
			preload.loadManifest		(itemsPortadaManifest);
			preload.onComplete 			= handleComplete;		
		}
	}

	//=======================================================================
	// HANDLE COMPLETE
	//=======================================================================
	function handleComplete(event) {
		showPortada();
    }

	//=======================================================================
	// SHOW PORTADA
	//=======================================================================
	function showPortada(){
		container			= new Container();
		stage.addChild(container);
		var background		= new Bitmap(xmlCover.getBackground("Portada").getSrc());
		container.addChild(background);
		container.addChild(containerActLang);
				
		var playButton		= new Bitmap(xmlCover.getPlay().getSrc());		
		playButton.image.onload = function(){						
			playButton.regX 	= parseInt(playButton.image.width/2);
			playButton.regY 	= parseInt(playButton.image.height/2);
			playButton.x 		= parseInt(xmlCover.getPlay().getX());
			playButton.y 		= parseInt(xmlCover.getPlay().getY());
			playButton.onPress	= showMenu;
			container.addChild(playButton);
		}
		
		language = new PFLanguage(container,langList);
	
		playMusic();
		
	}
	function playMusic(){
		if(musicManager.getIsPlaying() == false){
			setTimeout(function(){
				musicManager.play();
			},1000);
		}
	}
}