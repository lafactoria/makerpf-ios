//*************************************************************
//	File: PFGameFindMe.js 
//	PFGameFindMe: game find me
//*************************************************************/

function PFGameFindMe(){
	
	//======================================================================			
	// VARIABLES
	//======================================================================
	var items;
	var newXML;
	var imgEmpty;
	var images;
	var itemRandom;
	var nRows;
	var nCols;
	var matrix;
	var matrixDimension;
	var numLost;
	var srcLost;
	var endGame = false;
	var level;
	var containerMatrix;
	var num = 0;
	var newx, newy;
	var i, j;
	var start = false;
	var takenPositions;
	
	
	this.load = load;
	this.show = show;
	
	var itemDown = null;
	
	var baseGame;
	
	//======================================================================			
	// LOAD
	//======================================================================
	function load(game,folder){

		newXML = new PFXMLFindMe();
		newXML.load(game,folder);
		
		level 	= newXML.level;
		getValuesLevel();
		items	= new Array(matrixDimension+1);
		createItemsGame(game,newXML);
		PFSound.load('tick','game/sounds/boto.mp3');
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
		for ( i=0; i<newXML.numLostItems; i++){
			itemsManifest.push(newXML.items[i].getSrc());

		}
		//itemsManifest.push(newXML.background.getSrc());
		itemsManifest.push("game/images/empty.png");
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
		var bg2 = new Bitmap(newXML.background.getSrc());		
		//baseGame.containerBase.addChild(background);
		
		containerMatrix = new Container();
		
		baseGame.containerBase.addChild(containerMatrix);
		
		// blur and desaturate the background image:		
		bg2.cache(0,615,1024,615);
		
		baseGame.containerBase.addChild(bg2);
		
		images = new Array(matrixDimension+1);
		
		/*Dragable empty matrix*/
		imgEmpty 		= new Bitmap("game/images/empty.png");
		imgEmpty.x		= 0; imgEmpty.y=0;
		imgEmpty.scaleX	= 1024; 
		imgEmpty.scaleY	= 768;
		containerMatrix.addChild(imgEmpty);
		imgEmpty.onPress = emptyDrag;
		
		var k=0;
		for (var i = 0; i < nRows; i++){	// load matrix bitmaps
			for (var j = 0; j < nCols; j++){	
				if(matrix[i][j].getSrc().charAt( matrix[i][j].getSrc().length-1 ) != "/" && matrix[i][j].getSrc().substr(matrix[i][j].getSrc().length - 4) != "null" ){
					images[k] 		= new Image();
					images[k].src 	= matrix[i][j].getSrc();
					images[k].id 	= matrix[i][j].getId();
					images[k].i 	= i;
					images[k].j 	= j;
					images[k].k 	= k;								
					images[k].onload = loadBitmapMatrix;
				}else{
					loadTextMatrix(i,j,k, matrix[i][j].getId());
				}
				k++;
			}
		}	//Paint Down Element Background
		
		/*Lost Item Down*/
		numLost = 0;	//Init lost Items
		srcLost = newXML.items[itemRandom[numLost]].getId();
		if(newXML.items[itemRandom[numLost]].getSrc().charAt( newXML.items[itemRandom[numLost]].getSrc().length-1 ) != "/" &&
								newXML.items[itemRandom[numLost]].getSrc().substr(newXML.items[itemRandom[numLost]].getSrc().length - 4) != "null" ){
			images[k] = new Image();
			images[k].src = newXML.items[itemRandom[numLost]].getSrc();
			images[k].onload = function(){
				loadBitmapDown(itemRandom[numLost],baseGame.getGame(),k);
			};
		}else{
			loadTextDown(itemRandom[numLost],baseGame.getGame(),k,baseGame.getFolder(),newXML.items[itemRandom[numLost]].getId());
		}
		var num=0;

		var itemsManifest= new Array(nRows);
		for ( i=0; i<nRows; i++){
				itemsManifest[num]=matrix[i][0].getSrc();
				num++;
		}
	}

	//=======================================================================
	// ON START GAME
	//=======================================================================
	this.onStartGame = onStartGame;
	function onStartGame(){
		
	}	
	
	
	//======================================================================
	// controlRepeatPos: evaluate that if position in matrix is already taken
	//======================================================================
	function controlRepeatPos(randi,randj, pos){
		var found = false;
		if(randi == 0 && (randj == 0 || randj == 8 || randj == 9)){
			found = true;
		}
		for(var i = 0; i <takenPositions.length; i++){
			if(takenPositions[i][0] == randi && takenPositions[i][1] == randj){
				found = true;
			}
		}
		return found;		
	}
		
	//=======================================================================================			
	// createItemsGame: create game; elements of matrix (positions) and items will be lost
	//=======================================================================================
	function createItemsGame(game){
		//----------------------------------------------
		//Dimension the matrix
		//----------------------------------------------
		matrix = new Array (nRows);
		for (i=0;i<nRows;i++){	
			matrix[i] = new Array (nCols); 	
		}
		
		takenPositions = new Array(newXML.numLostItems);
		
		//----------------------------------------------
		//Fill the matrix
		//----------------------------------------------
		
		itemRandom = new Array(newXML.numLostItems);
		for(i=0;i<newXML.numLostItems;i++){
			do{
				//----------------------------------------------
				//Select which items will be lost
				//----------------------------------------------				
				itemRandom[i] = Math.floor(Math.random()*newXML.items.length);				
			}while(controlRepeat(itemRandom,i)==true && i>0);
			
			newXML.items[itemRandom[i]].setState(0);				
			var randI = 0;
			var randJ = 0;
			
			do{
				randI = Math.floor(Math.random()*(nRows-1));				
				randJ = Math.floor(Math.random()*(nCols-1));				
			}while(controlRepeatPos(randI,randJ,i) == true);					
			
			takenPositions[i] = [randI,randJ,itemRandom[i]];			
		}		
		
		
		//----------------------------------------------
		//Create matrix with all items, random elements
		//----------------------------------------------
			
		var itemMatrix = 0;
		var countRandItems = 0;
		for(var i=0;i<nRows;i++){
			for(var j=0;j<nCols;j++){
				do{
					itemMatrix = Math.floor(Math.random()*newXML.items.length);
				}while(controlRepeat2(itemMatrix,game) == true);
	
				PFItemFindMe.prototype = new PFItem(newXML.items[itemMatrix].getSrc(), 0, 0, newXML.items[itemMatrix].getScale(), newXML.items[itemMatrix].getRotation(),"");
				
				if(newXML.items[itemMatrix].getState() == 1){
					matrix[i][j] = new PFItemFindMe(	newXML.items[itemMatrix].getAction(), 
														newXML.items[itemMatrix].getActionLoops(), 
														newXML.items[itemMatrix].getRun(), 
														newXML.items[itemMatrix].getSound(), 
														"", 
														newXML.items[itemMatrix].getId(), 
														1, i, j,
														newXML.items[itemMatrix].getText(),
														newXML.items[itemMatrix].getRgb());
				}
				
				matrix[i][j].setSrc(newXML.items[itemMatrix].getSrc());	
				
				if(i == nRows-1 && j == nCols-1){
					for(c=0;c<newXML.numLostItems;c++){
						matrix[takenPositions[c][0]][takenPositions[c][1]] = new PFItemFindMe(newXML.items[takenPositions[c][2]].getAction(), newXML.items[takenPositions[c][2]].getActionLoops(), newXML.items[takenPositions[c][2]].getRun(), newXML.items[takenPositions[c][2]].getSound(), "", newXML.items[takenPositions[c][2]].getId(), -1, takenPositions[c][0], takenPositions[c][1],
						newXML.items[takenPositions[c][2]].getText(),
						newXML.items[takenPositions[c][2]].getRgb());
						matrix[takenPositions[c][0]][takenPositions[c][1]].setSrc(newXML.items[takenPositions[c][2]].getSrc());
					}
				}
			}
		}
	}

    //============================================================		
	// emptyDrag: Paint Down background for image d to find
	//============================================================	
	function emptyDrag(){
		(function(target) {
			imgEmpty.onPress = function(evt) {
				if (!endGame && baseGame.isGameActive()){
					var offset = {x:containerMatrix.x-evt.stageX, y:containerMatrix.y-evt.stageY};
					evt.onMouseMove = function(ev) {
						if (!endGame){
							switch(level){
								//----------------------------------------------
								//MEDIUM LEVEL
								//----------------------------------------------
								case "1":
									if (ev.stageX+offset.x < 0 && ev.stageX+offset.x > (-495)){ containerMatrix.x = ev.stageX+offset.x; }
									if (ev.stageY+offset.y < 0 && ev.stageY+offset.y > (-905)){ containerMatrix.y = ev.stageY+offset.y; }
								break;
								//----------------------------------------------
								//HARD LEVEL
								//----------------------------------------------
								case "2":
									if (ev.stageX+offset.x < 0 && ev.stageX+offset.x > (-1595)){ containerMatrix.x = ev.stageX+offset.x; }
									if (ev.stageY+offset.y < 0 && ev.stageY+offset.y > (-2000)){ containerMatrix.y = ev.stageY+offset.y; }
								break;
							}
						}
					}
				}
			}
		})(eval(imgEmpty));
		//})(imgEmpty);
	}
	
	//=============================================================
	// getValuesLevel: matrix dimensioned according to the level
	//=============================================================
	function getValuesLevel(){
		switch(level){
			case "0":
				//----------------------------------------------
				//EASY LEVEL
				//----------------------------------------------
				nRows = 6;
				nCols = 10;
			break;
			case "1":
				//----------------------------------------------
				//MEDIUM LEVEL
				//----------------------------------------------
				nRows = 15;
				nCols = 15;
			break;
			case "2":	//hard
				//----------------------------------------------
				//HARD LEVEL
				//----------------------------------------------
				nRows = 26;
				nCols = 26;
			break;
		}
		matrixDimension = nCols*nRows;
	}
	//============================================
	// loadTextDown: show down item to search
	//============================================
	function loadTextDown(i,game,k,folder,id){	
		if(itemDown != null){			
			baseGame.containerBase.removeChild(itemDown);			
		}
		var bm = new PFBaseItem(newXML.items[id-1],id-1);
		itemDown = bm.getText();		
		
		itemDown.scaleX	= 1;
		itemDown.scaleY	= 1;
		itemDown.x		= 1024/2 - 75 ;
		itemDown.y		= 680 	 + 15;
		baseGame.containerBase.addChild(itemDown);
		itemDown.alpha = 0;
		Tween.get(itemDown).to({alpha:1},400);
		
	}
	//============================================
	// loadBitmapDown: show down item to search
	//============================================
	function loadBitmapDown(i,game,k,folder){		
		if(itemDown != null){			
			baseGame.containerBase.removeChild(itemDown);			
		}
		itemDown 		= new Bitmap(images[k]);
		
		scaleFactor 	= getImageScale(itemDown.image.width,itemDown.image.height, 180 );
		itemDown.scaleX	= scaleFactor;
		itemDown.scaleY	= scaleFactor;
		itemDown.x		= 1024/2 - (itemDown.image.width/2*scaleFactor) ;
		itemDown.y		= 680 	 - (itemDown.image.height/2*scaleFactor);
		baseGame.containerBase.addChild(itemDown);
		itemDown.alpha = 0;
		Tween.get(itemDown).to({alpha:1},400);
		
	}
	//=========================================================
	// loadTextMatrix: show matrix, with all elements painted
	//=========================================================
	function loadTextMatrix(i,j,k,id){
		var id 		= id;
		var posRow 	= i;
		var posCol 	= j;
		var k 		= k;
		var game 	= baseGame.getGame();
		var folder 	= baseGame.getFolder();
		
		var bm = new PFBaseItem(newXML.items[id-1],id-1);
		items[k] = bm.getText();
		items[k].scaleX = 0.6;
		items[k].scaleY = 0.6;
		items[k].defaultScaleX = 0.6;
		items[k].defaultScaleY = 0.6;
				
		newx=posCol*100+10; 
		newy=posRow*100+55; 
		
		items[k].x = newx;
		items[k].y = newy;		

		containerMatrix.addChild(items[k]);
		(function(target) {
			items[k].onPress = function(evt) {
				if (!endGame && baseGame.isGameActive()){
					var offset = {x:containerMatrix.x-evt.stageX, y:containerMatrix.y-evt.stageY};
					evt.onMouseMove = function(ev) {
						if (!endGame){
							switch(level){		//Active Drag&Drop
								case "1":
									//----------------------------------------------
									//MEDIUM LEVEL
									//----------------------------------------------
									if (ev.stageX+offset.x < 0 && ev.stageX+offset.x > (-495)){ containerMatrix.x = ev.stageX+offset.x; }
									if (ev.stageY+offset.y < 0 && ev.stageY+offset.y > (-905)){ containerMatrix.y = ev.stageY+offset.y; }
									
								break;
								case "2":
									//----------------------------------------------
									//HARD LEVEL
									//----------------------------------------------
									if (ev.stageX+offset.x < 0 && ev.stageX+offset.x > (-1595)){ containerMatrix.x = ev.stageX+offset.x; }
									if (ev.stageY+offset.y < 0 && ev.stageY+offset.y > (-2000)){ containerMatrix.y = ev.stageY+offset.y; }
								break;
							}
						}
					}
					onTouch(posRow,posCol,game,folder,k,0);	//Item clicked call idle
				}
			}
		})(i);
	}
	//=========================================================
	// loadBitmapDown: show matrix, with all elements painted
	//=========================================================
	function loadBitmapMatrix(event){
		var id 		= event.target.id;
		var posRow 	= event.target.i;
		var posCol 	= event.target.j;
		var k 		= event.target.k;
		var game 	= baseGame.getGame();
		var folder 	= baseGame.getFolder();
			
		items[k] = new Bitmap(images[k]);
		
		scaleFactor = getImageScale(items[k].image.width,items[k].image.height, 80 );
		items[k].scaleX = scaleFactor;
		items[k].scaleY = scaleFactor;
		items[k].defaultScaleX = scaleFactor;
		items[k].defaultScaleY = scaleFactor;
		
		items[k].regX = (items[k].image.width/2);
		items[k].regY = (items[k].image.height/2);
				
		newx=posCol*100+55; 
		newy=posRow*100+55; 
		
		items[k].x = newx;
		items[k].y = newy;		

		containerMatrix.addChild(items[k]);
		(function(target) {
			items[k].onPress = function(evt) {
				if (!endGame && baseGame.isGameActive()){
					var offset = {x:containerMatrix.x-evt.stageX, y:containerMatrix.y-evt.stageY};
					evt.onMouseMove = function(ev) {
						if (!endGame){
							switch(level){		//Active Drag&Drop
								case "1":
									//----------------------------------------------
									//MEDIUM LEVEL
									//----------------------------------------------
									if (ev.stageX+offset.x < 0 && ev.stageX+offset.x > (-495)){ containerMatrix.x = ev.stageX+offset.x; }
									if (ev.stageY+offset.y < 0 && ev.stageY+offset.y > (-905)){ containerMatrix.y = ev.stageY+offset.y; }
									
								break;
								case "2":
									//----------------------------------------------
									//HARD LEVEL
									//----------------------------------------------
									if (ev.stageX+offset.x < 0 && ev.stageX+offset.x > (-1595)){ containerMatrix.x = ev.stageX+offset.x; }
									if (ev.stageY+offset.y < 0 && ev.stageY+offset.y > (-2000)){ containerMatrix.y = ev.stageY+offset.y; }
								break;
							}
						}
					}
					onTouch(posRow,posCol,game,folder,k,1);	//Item clicked call idle
				}
			}
		})(i);
	}
	
	//=================================================
	// onTouch: validate if item clicked is item lost
	//=================================================
	function onTouch(posRow,posCol,game,folder,k,kind){
		if(baseGame.isGameActive()){
			if(matrix[posRow][posCol].getId() == srcLost){				
				if(kind == 1){
					var scaleFactor 	= getImageScale(items[k].image.width,items[k].image.height, 80 );
					Tween.get(items[k])	.to({scaleX:scaleFactor*1.5,scaleY:scaleFactor*1.5},200).to({scaleX:scaleFactor,scaleY:scaleFactor},200);
				}
				Tween.get(items[k]) .to({rotation:360},400);
				
				PFSound.play('tick');
				if (numLost<=itemRandom.length) { numLost++; }
				if(numLost==itemRandom.length){
					endGame=true;
					//finalGame(folder);
					baseGame.endGame(newXML.endGame);
				}else{
					Tween.get(itemDown).to({alpha:0},400).call(function(){					
						srcLost = newXML.items[itemRandom[numLost]].getId();
						if(newXML.items[itemRandom[numLost]].getSrc().charAt( newXML.items[itemRandom[numLost]].getSrc().length-1 ) != "/" &&
								newXML.items[itemRandom[numLost]].getSrc().substr(newXML.items[itemRandom[numLost]].getSrc().length - 4) != "null" ){
							images[matrixDimension].src 	 = newXML.items[itemRandom[numLost]].getSrc();
							images[matrixDimension].onload = function(){	loadBitmapDown(itemRandom[numLost],game,matrixDimension,folder);};
						}else{
							loadTextDown(itemRandom[numLost],game,matrixDimension,folder,newXML.items[itemRandom[numLost]].getId());
						}
					});
				}
			}
		}
	}

	//=============================================================
	// controlRepeat: evaluate that if item is already a lostItem 
	//=============================================================
	function controlRepeat(aControl,num){
		var repetit = false;
		for(i=0;i<num;i++){
			if(aControl[i]==aControl[num]){ repetit = true; }
		}
		return repetit;
	}
	//======================================================================
	// controlRepeat2: evaluate that if this lostItem is already in matrix
	//======================================================================
	function controlRepeat2(aControl,game){
		var repetit = false;
		if(newXML.items[aControl].getState()<1){ 
			repetit = true;
		}
		return repetit;
	}
	
	//=====================================================
	// CLEAR SOUNDS
	//=====================================================
	this.onClearSounds = onClearSounds;
    function onClearSounds(){
        PFSound.unload('tick');
   }
}