//*****************************************************
// PFGameFletxesValidar: Load and execute "FletxesValidate"
//*****************************************************/

var PFGameFletxesValidar = function(){

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
	var offsetx, offsety;
	var newx, newy;
	var i;
	var folderGame;
	var relations;
	var endGame = true;

	//Functions declaration
	this.load = load;
	this.show = show;
	//Functions
	/* Load the items of the game */
	function load(game,folder){
		xml = new PFAction();
		xml.LoadItems(game,folder);
		items= new Array(xml.getItems(game).length);
		fletxesListen = new PFGameFletxesValidarListen();
	}
	/* Show the game */
	function show(game,folder,direction,containerAux,containerAnt){
		
		stage.enableMouseOver();

		containerNou = containerAux;
		containerPrincipal = containerAnt;
		
		containerBase = new Container();
		containerSup = new Container();
		
		containerPrincipal.addChild(containerBase);
		containerPrincipal.addChild(containerSup);
		containerPrincipal.addChild(loadingImg);
		
		Tween.get(containerPrincipal).to({x:0},1000);
		
		//var background = new Bitmap(xml.getBackground("game").getSrc());
		//containerBase.addChild(background);
		
		images=new Array(items.length);
        relations=new Array(items.length);
        
		for(i=0;i<items.length;i++){
			eval('images['+i+'] = new Image()');
			eval('images['+i+'].src = xml.getItems(game)['+i+'].getSrc()');
			eval('images['+i+'].onload = function(){loadBitmaps('+i+',game,folder,direction);};'); //Load the bitmaps
            relations[i]=new Array(0);
			PFSound.load("sound"+i,xml.getItems(game)[i].getSound());
		}
        
        fletxesListen.setRelations(relations);
        
        folderGame = folder;
        gameAux = game;
        
		var itemsManifest= new Array();
		for ( i=0; i<items.length; i++){
			itemsManifest[i]=xml.getItems(game)[i].getSrc();
		}
		preload = new PreloadJS();
        preload.loadManifest(itemsManifest);
		preload.onComplete = handleComplete;
	}
	//=======================================================================			
	// handleComplete: wait all images loaded to execute their functions
	//=======================================================================
	function handleComplete(event) {
		containerPrincipal.removeChild(loadingImg);
		
		var backButton = new Bitmap("game/images/bt_menu.png");
		backButton.x=20;
		backButton.y=20;
		containerSup.addChild(backButton);
		backButton.onPress = goBack;
		
		var nextGameButton = new Bitmap("game/images/bt_adelante.png");
		nextGameButton.x=930;
		nextGameButton.y=20;
		containerSup.addChild(nextGameButton);
		nextGameButton.onPress = goNextGame;
		
		var backGameButton = new Bitmap("game/images/bt_enrera.png");
		backGameButton.x=870;
		backGameButton.y=20;
		containerSup.addChild(backGameButton);
		backGameButton.onPress = goBackGame;

		var validateButton = new Bitmap("game/"+folderGame+"/images/validate.png");
		validateButton.x=412;
		validateButton.y=600;
		containerBase.addChild(validateButton);	
		validateButton.onPress = function(){ 
			if(endGame){
				fletxesListen.validate(xml,gameAux);
				var statistics = fletxesListen.getStatistics();
				endingGame(statistics);
			}
		};
    }
	//=====================================================
	// endingGame: show end statistics
	//=====================================================
    function endingGame(statistics){
    	endGame=false;
    	containerPopUp = new Container();
    	containerPopUp.alpha=0;
    	containerBase.addChild(containerPopUp);
    	drawRect(0,0,1024,768,0,0,0,0,containerPopUp);
    	var bgPopUp = new Image();
		bgPopUp.src = "game/images/bg_popup.png";
		bgPopUp.onload = function(){
			var bgPopUpBitmap = new Bitmap("game/images/bg_popup.png");
			var offsetx = (parseInt(bgPopUpBitmap.image.width)/2);
			var offsety = (parseInt(bgPopUpBitmap.image.height)/2);
			bgPopUpBitmap.regX = offsetx;
			bgPopUpBitmap.regY = offsety;
			bgPopUpBitmap.x = 512;
			bgPopUpBitmap.y = 384;
			containerPopUp.addChild(bgPopUpBitmap);
			
			var size = 28;

			var txt = new Text((statistics[1])+" of "+(statistics[0])+" right "+(statistics[2]-statistics[1])+" wrong", (size)+"px Arial");
			txt.x=480;
			txt.y=392;
			txt.lineWidth = size*6-20;
			txt.textAlign = "center";
			containerPopUp.addChild(txt);

			Tween.get(containerPopUp).to({alpha:1},600);
			Tween.get(square).to({alpha:0.5},600);
		}
    }
    function drawRect(x,y,sizex,sizey,alpha,r,gr,b,containerPopUp){
		var g = new Graphics();
		g.beginFill(Graphics.getRGB(r,gr,b));
		g.drawRect(x,y,sizex,sizey);
		square = new Shape(g);
		square.alpha=alpha;
		containerPopUp.addChild(square);
	}
/* GENERIC LOGIC BUTTONS */
	function goBackGame(){
        clearSounds();
		Tween.get(containerPrincipal).to({x:1024},1000);
		containerNou.removeAllChildren();
		stage.removeChild(containerNou);
		stage.addChild(containerNou);
		containerNou.x=-1024;
		gameManager.playGame(gameManager.backGame(),1,containerPrincipal,containerNou);
	}
	function goNextGame(){
		clearSounds();
        Tween.get(containerPrincipal).to({x:-1024},1000);
		containerNou.removeAllChildren();
		stage.removeChild(containerNou);
		stage.addChild(containerNou);
		containerNou.x=1024;
		gameManager.playGame(gameManager.nextGame(),2,containerPrincipal,containerNou);
	}
	function goBack(){
		cleanGame();
		menu.load();
		menu.show();
	}
	//=====================================================
	// loadBitmaps: load and show all items images 
	//=====================================================
	function loadBitmaps(i,game,folder,direction){
		eval('items['+i+'] = new Bitmap(images['+i+'])');
		if (eval('xml.getItems(game)['+i+']').getScale()!=1000){
			var scaleFactor = eval('xml.getItems(game)['+i+']').getScale()/1000;
			eval('items['+i+'].scaleX='+ scaleFactor);
			eval('items['+i+'].scaleY='+ scaleFactor);
		}
		offsetx=(parseInt(eval('items['+i+'].image.width'))/2);
		offsety=(parseInt(eval('items['+i+'].image.height'))/2);
		newx=parseInt(eval('xml.getItems(game)['+i+'].getX()'));
		newy=parseInt(eval('xml.getItems(game)['+i+'].getY()'));
		eval('items['+i+'].regX='+ offsetx);
		eval('items['+i+'].regY='+ offsety);
		eval('items['+i+'].x=newx');
		eval('items['+i+'].y=newy');
		containerBase.addChild(eval('items['+i+']'));

		(function(target) {

			target.onPress = function(evt) {
				if(endGame){
					fletxesListen.onTouch(i,game,xml,containerBase,evt);
					evt.onMouseMove = function(ev) {
						fletxesListen.onMouseMove(ev);
					}
					evt.onMouseUp = function(ev){
						fletxesListen.onMouseUp(i,game,xml,containerBase);
					}
				}
			}
			
			target.onMouseOver = function(evt) {
				if(fletxesListen.getPressed()!=-1 && endGame){
					fletxesListen.setInto(i);
				}
			}

			target.onMouseOut = function(evt){
				if(fletxesListen.getPressed()!=-1 && endGame){
					fletxesListen.setInto(-1);
				}
			}

		})(eval('items['+i+']'));
	}
	//=====================================================
	// cleanGame: delete all game showed
	//=====================================================
	function cleanGame(){
        clearSounds();
		containerPrincipal.removeAllChildren();
		containerNou.removeAllChildren();
		stage.removeChild(containerPrincipal);
		stage.removeChild(containerNou);
	}
    function clearSounds(){
        for(i=0;i<items.length;i++){
            PFSound.unload("sound"+i);
        }
    }
}