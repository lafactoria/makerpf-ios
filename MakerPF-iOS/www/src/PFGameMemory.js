//*************************************************************
//	File: PFGameMemory.js 
//	PFGameMemory: game memory
//*************************************************************

var PFGameMemory = function(){
	
	//=====================================================
	// VARIABLES
	//=====================================================
	var numItems;
	var redCard;
	var items;
	var itemsCard;
	var itemsGame;
	var bgCard;
	var Ids;
	var posicionsRandom;
	var click	 = 0;
	var selected = 0;
	var game;
	var folder;
	var end	= false;
	var memoryListen;
	var wait = 0;
	var images;
	var card;
	var num	= 0;
	var offsetx, offsety;
	var newx, newy;
	var i,j;
	
	var newXML;
	var themeXML;

	this.load = load;
	this.show = show;

	var baseGame;
	
	//=======================================================================			
	// LOAD
	//=======================================================================
	function load(game,folder){		
		
		newXML = new PFXMLMemory();
		newXML.load(game,folder);	
		themeXML = new PFThemeXML();
		themeXML.getCardPositions(newXML.nItems);
		
		numItems	 = themeXML.cardPositions.length;
		chooseItems();
		calculateRandomPositions();
		items 		 = new Array(newXML.items.length);
		itemsGame 	 = newXML.items;
		itemsCard 	 = new Array(newXML.items.length);
		bgCard 		 = new Array(newXML.items.length);
		memoryListen = new PFGameMemoryListen;
		PFSound.load('tick','game/sounds/boto.mp3');
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
			itemsManifest.push(newXML.items[i].getSrc());
		}
		//itemsManifest.push(newXML.background.getSrc());
		itemsManifest.push("game/" + baseGame.getFolder() +"/images/under_card.png");
		itemsManifest.push(newXML.redCard);
		
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
		
		//var background = new Bitmap(newXML.background.getSrc());
		//baseGame.containerBase.addChild(background);
		
		images  = new Array(items.length);
		card 	= new Array(items.length);

		for (var i = 0; i < posicionsRandom.length; i++){
			if(newXML.items[i].getSrc().charAt( newXML.items[i].getSrc().length-1 ) != "/"){
				images[i] 			= new Image();
				images[i].src 		= newXML.items[i].getSrc();
				images[i]. i 		= i;
				images[i].onload = 	loadBitmap;
			}else{
				loadText(i);
			}
		}
		
		for (var i = 0; i < posicionsRandom.length; i++){
			card[i] 		= new Image();
			card[i].src 	= newXML.redCard;
			card[i].i 		= i;
			card[i].onload 	= loadCard;
			//soundManager.createSound("sound"+i,xml.getItems(game)[i].getSound());
		}
	}
	
	//=======================================================================
	// ON START GAME
	//=======================================================================
	this.onStartGame = onStartGame;
	function onStartGame(){
		
	}		
		
	//=======================================================================			
	// chooseItems: 
	//=======================================================================
	function chooseItems(){
		Ids=new Array(numItems);
		for(i=0;i<(numItems/2);i++){
			Ids[i]=Math.floor(Math.random()*(numItems+1));
			if(Ids[i]==0){
				Ids[i]=1;
			}
		}
		for(i=0; i<(numItems/2); i++){
			for(j=0; j<(numItems/2); j++){
				if(i!=j){
					if(Ids[i]==Ids[j]){
						chooseItems(numItems);
					}
				}
			}
		}
		for(i=0;i<(numItems/2);i++){
			Ids[i+(numItems/2)]=Ids[i];
		}
	}
	//======================================================================
	// loadBitmaps: load and show all items images (white + image)
	//======================================================================
	function loadText(event){
		var i = event;
		
		bgCard[i] 				= new Bitmap("game/" + baseGame.getFolder() + "/images/under_card.png");
		bgCard[i].x 			= posicionsRandom[i][0];
		bgCard[i].y 			= posicionsRandom[i][1];
		bgCard[i].defaultScaleX = 1;
		bgCard[i].defaultScaleY = 1;
		bgCard[i].alpha			= 0;
		
		var bm = new PFBaseItem(newXML.items[i],i);
		items[i] = bm.getText();
		if (newXML.items[i].getScale()!=1000){
			var scaleFactor = newXML.items[i].getScale()/1000;
			items[i].scaleX = scaleFactor;
			items[i].scaleY = scaleFactor;
		}
	
		//ox = bgCard[i].image.width/2; 
		//oy = bgCard[i].image.width/2;	
		ox = 115;	//TODO: Fix it to use the real image (the previous code doesn't work cause it's not in the onload event)
		oy = 115;	//TODO: Fix it to use the real image (the previous code doesn't work cause it's not in the onload event)
		if(newXML.items[i].getScale()==1000){
			ox = (930/1000)*115;
			oy = ox;
		}
		items[i].getChildAt(0).lineWidth = 160;
		var itemText = items[i].getChildAt(0);
		var sep = itemText.getMeasuredWidth()/2;
		if(sep > 80){
			sep = 80;
		}
		1
		var sepY = itemText.getMeasuredLineHeight()/2 * ( itemText.getMeasuredWidth()/160) -itemText.getMeasuredLineHeight()/2;

		if(newXML.items[i].getScale()==1000){
			newx			= posicionsRandom[i][0] + ox - sep;
			newy			= posicionsRandom[i][1] + oy - sepY;
		}else{
			newx			= posicionsRandom[i][0] + ox - sep;
			newy			= posicionsRandom[i][1] + oy - sepY;
		}
		
		
		
		items[i].x 		= newx;
		items[i].y 		= newy;
		items[i].alpha 	= 0;

		items[i].scaleX 		= 1;
		items[i].scaleY 		= 1;
		items[i].defaultScaleX 	= 1;
		items[i].defaultScaleY 	= 1;
						
		baseGame.containerBase.addChild(bgCard[i]);	
		baseGame.containerBase.addChild(items[i]);	
	}
	//======================================================================
	// loadBitmaps: load and show all items images (white + image)
	//======================================================================
	function loadBitmap(event){				
		
		var i = event.target.i;

		bgCard[i] 				= new Bitmap("game/" + baseGame.getFolder() + "/images/under_card.png");
		bgCard[i].x 			= posicionsRandom[i][0];
		bgCard[i].y 			= posicionsRandom[i][1];
		bgCard[i].defaultScaleX = 1;
		bgCard[i].defaultScaleY = 1;
		bgCard[i].alpha			= 0;
		
		items[i] = new Bitmap(images[i]);
		if (newXML.items[i].getScale()!=1000){
			var scaleFactor = newXML.items[i].getScale()/1000;
			items[i].scaleX = scaleFactor;
			items[i].scaleY = scaleFactor;
		}
	
		//ox = bgCard[i].image.width/2; 
		//oy = bgCard[i].image.width/2;	
		ox = 115;	//TODO: Fix it to use the real image (the previous code doesn't work cause it's not in the onload event)
		oy = 115;	//TODO: Fix it to use the real image (the previous code doesn't work cause it's not in the onload event)
		if(newXML.items[i].getScale()==1000){
			ox = (930/1000)*115;
			oy = ox;
		}
			
		
		offsetx			= parseInt(items[i].image.width)/2;
		offsety			= parseInt(items[i].image.height)/2;
		items[i].regX 	= offsetx;
		items[i].regY 	= offsety;
	
		if(newXML.items[i].getScale()==1000){
			newx			= posicionsRandom[i][0] + ox + 7;
			newy			= posicionsRandom[i][1] + oy + 7;
		}else{
			newx			= posicionsRandom[i][0] + ox;
			newy			= posicionsRandom[i][1] + oy;
		}
		items[i].x 		= newx;
		items[i].y 		= newy;
		items[i].alpha 	= 0;

		scaleFactor 			= getImageScale(items[i].image.width,items[i].image.height,ox*2 - 20);
		items[i].scaleX 		= scaleFactor;
		items[i].scaleY 		= scaleFactor;
		items[i].defaultScaleX 	= scaleFactor;
		items[i].defaultScaleY 	= scaleFactor;
						
		baseGame.containerBase.addChild(bgCard[i]);	
		baseGame.containerBase.addChild(items[i]);			
	}
	
	//=====================================================
	// loadBitmaps: load card back (red)
	//=====================================================
	function loadCard(event){
		var i = event.target.i;
		
		itemsCard[i] = new Bitmap(card[i]);
		if (newXML.items[i].getScale()!=1000){
			var scaleFactor 	= newXML.items[i].getScale()/1000;
			itemsCard[i].scaleX = scaleFactor;
			itemsCard[i].scaleY = scaleFactor;
		}

		itemsCard[i].defaultScaleX = itemsCard[i].scaleX;
		itemsCard[i].defaultScaleY = itemsCard[i].scaleX;
		
		offsetx				= itemsCard[i].image.width/2;
		offsety				= itemsCard[i].image.height/2;
		itemsCard[i].regX 	= offsetx;
		itemsCard[i].regY 	= offsety;
		newx				= posicionsRandom[i][0] + offsetx;
		newy				= posicionsRandom[i][1] + offsety;
		
		itemsCard[i].x				= newx;
		itemsCard[i].y				= newy;
		itemsCard[i].defaultScaleX 	= 1;
		itemsCard[i].defaultScaleY 	= 1;

		baseGame.containerBase.addChild(itemsCard[i]);		
		itemsCard[i].name 		= itemsGame[i].getId();
		itemsCard[i].i 			= i;
		itemsCard[i].onPress 	= onTouchRedCard;
	}
	
	//=====================================================
	// onTouchRedCard : 
	//=====================================================
	function onTouchRedCard(event){
		
		if(baseGame.isGameActive()){
			var i 		= event.target.i;
			var game 	= baseGame.getGame();
			var folder 	= baseGame.getFolder();	
			
			if(wait == 0){
				if(itemsGame[i].getMarked()==false){
					if(click == 0){
						click				= 1;
						selected			= i;
						PFSound.play('tick');
						memoryListen.onTouch(i,newXML,items, baseGame.getFolder());
						itemsCard[i].alpha	= 0;
						bgCard[i].alpha		= 1;
						items[i].alpha		= 1;
						
					}else{
						if(click==1 & selected!=i){
							PFSound.play('tick');
							memoryListen.onTouch(i,newXML,items,baseGame.getFolder());
							itemsCard[i].alpha	= 0;
							items[i].alpha		= 1;
							bgCard[i].alpha		= 1;
							if(itemsCard[i].name != itemsCard[selected].name){
								wait=1;
								Tween.get(items[i]).wait(1000).call(function(){hideCard(i,baseGame.getGame(),baseGame.getFolder())});
							}else{
								var itSound = newXML.items[i].getSound();
								if(itSound != ""){
									//soundManager.play("sound"+i);
								}
								itemsCard[i].alpha			= 0;
								itemsCard[selected].alpha	= 0;
								bgCard[i].alpha				= 1;
								itemsGame[i].setMarked(true);
								itemsGame[selected].setMarked(true);
								checkEndGame(baseGame.getFolder());
							}
							click = 0;
						}
					}	
				}
			}
		}
	}
		
	//=======================================================
	// hideCard: 
	//=======================================================
	function hideCard(i,game,folder){
		memoryListen.onTouchHide(i,newXML,items,folder);
		memoryListen.onTouchHide(selected,newXML,items,folder);
		items[i].alpha				= 0;
		items[selected].alpha		= 0;
		bgCard[i].alpha				= 0;
		bgCard[selected].alpha		= 0;
		itemsCard[i].alpha			= 1;
		itemsCard[selected].alpha	= 1;
		wait						= 0;
	}
	
	//=======================================================
	// calculateRandomPositions: where items will be hidden
	//=======================================================
	function calculateRandomPositions(){
		posicionsRandom	= new Array(themeXML.cardPositions.length);
		for(i=0;i<posicionsRandom.length;i++){
			posicionsRandom[i] = themeXML.cardPositions[i];
		}
		var i=posicionsRandom.length;
		while(i--){
			var j			   = Math.floor( Math.random() * (i+1) );
			var tmp			   = posicionsRandom[i];
			posicionsRandom[i] = posicionsRandom[j];
			posicionsRandom[j] = tmp;
		}
	}

	//=====================================================
	// checkEndGame: evaluate if game is ended
	//=====================================================
	function checkEndGame(folder){
		var win = true;
		for(i=0; i<numItems; i++){
			if(itemsGame[i].getMarked()==false){
				win=false;
			}
		}
		if(win == true){
			end = true;
			baseGame.endGame(newXML.endGame);
		}
	}
	
	//=====================================================
	// CLEAR SOUNDS 
	//=====================================================		
	this.onClearSounds = onClearSounds;
    function onClearSounds(){
        for(i=0; i<items.length; i++){
            PFSound.unload("sound"+i);
        }
        PFSound.unload('tick');
    }
}
