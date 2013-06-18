//*************************************************************
//	File: PFGamePaint.js 
//	PFGamePaint: paint game
//*************************************************************/

var PFGamePaint = function(){

	//=====================================================
	// VARIABLES
	//=====================================================
	var foreground;
	var fScaleType;
	var newXML;
	var themeXML;
	//var storage = new PFStorage();	//for mobile devices
	var image;
	var s;
	var containerPaint;
	var containerNav;
	var containerForeground;
	var containerPrincipal;
	var containerNou;
	var containerBase;
	var isTakePhoto;
	var preload;
	var activeBrush;
	var colorR 		= 49;
	var colorG 		= 182;
	var colorB 		= 234;
	var thickness 	= 50;
	var colors;
	var rgbs;
	var brushes;
	var sizes;
	
	this.load = load;
	this.show = show;
	
	var baseGame;
	
	//=======================================================================			
	// LOAD
	//======================================================================
	function load(game,folder){
		newXML 			= new PFXMLPaint;
		newXML.load(game,folder);
		themeXML		= new PFThemeXML;
		themeXML.getPaint();
		
		foreground 		= newXML.foreground;
		fScaleType		= newXML.fScaleType;
		isTakePhoto 	= false;
		isMouseDown 	= false;
		isElementDown 	= false;
        isPaint 		= true;
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
		for(var i = 0; i < themeXML.colors.length; i++){
			itemsManifest.push(themeXML.colors[i].getSrc());
		}
		for(var i = 0; i < themeXML.brushSizes.length; i++){
			itemsManifest.push(themeXML.brushSizes[i].getSrc());
		}
		itemsManifest.push(themeXML.brushBg);
			
		if(foreground!="null"){
			itemsManifest.push("game/"+baseGame.getFolder()+"/images/"+foreground);			
		}
		
		return itemsManifest;
	}	
	
	//=====================================================
	// ON ADD MENU
	//=====================================================
	this.onAddMenu = onAddMenu;
	function onAddMenu(){
		loadColorPalette(baseGame.getFolder());
		loadBrushes		(baseGame.getFolder());
		loadBin			(baseGame.getFolder());
		//loadCamera		(baseGame.getFolder());		
	}
	
	//=======================================================================
	// ON SHOW GAME
	//=======================================================================
	this.onShowGame = onShowGame;
	function onShowGame(){
		//---------------------------------
		//Paint Container
		//---------------------------------
		containerPaint 		= new Container();		
		//---------------------------------
		//Foreground Container
		//---------------------------------
		containerForeground = new Container();		

		//var background = new Bitmap(newXML.background.getSrc());
		//baseGame.containerBase.addChild(background);
						
		baseGame.containerBase.addChild(containerPaint);
		baseGame.containerBase.addChild(containerForeground);			
				

		
		if(foreground!="null"){
			var foregroundImage = new Bitmap("game/"+baseGame.getFolder()+"/images/"+foreground);
			
			switch(fScaleType){
				case "scalefitwidth":
					var currentWidth 	= parseInt(foregroundImage.image.width);
					var newScaleX		= 1024/currentWidth;
					foregroundImage.scaleX 	= newScaleX;				
					foregroundImage.regY		= 0.5;
					foregroundImage.y 			= 384 - (foregroundImage.image.height*newScaleX)/2;				
					break;
				case "scalefitheight":
					var currentHeight 	= parseInt(foregroundImage.image.height);
					var newScaleY		= 768/currentHeight;
					foregroundImage.scaleY 		= newScaleY;
					foregroundImage.regX		= 0.5;
					
					foregroundImage.x 			= 512 - (foregroundImage.image.width*newScaleY)/2;				
					break;
				case "scalefit":
					var currentWidth 	= parseInt(foregroundImage.image.width);
					var newScaleX		= 1024/currentWidth;			
					var currentHeight 	= parseInt(foregroundImage.image.height);
					var newScaleY		= 768/currentHeight;
					
					var currScale = 1;
					if(newScaleX > newScaleY){
						currScale = newScaleY;										
					}else{
						currScale = newScaleX;					
					}		
					
					foregroundImage.scaleX = currScale;
					foregroundImage.scaleY = currScale;
						
					foregroundImage.regX	= 0.5;
					
					foregroundImage.x 		= 512 - (foregroundImage.image.width*currScale)/2;
					
					foregroundImage.regY	= 0.5;
					foregroundImage.y 		= 384 - (foregroundImage.image.height*currScale)/2;
					
					break;
				case "scalefill":
					var currentWidth 	= parseInt(foregroundImage.image.width);
					var newScaleX		= 1024/currentWidth;
					foregroundImage.scaleX	= newScaleX;
					var currentHeight 	= parseInt(foregroundImage.image.height);
					var newScaleY		= 768/currentHeight;
					foregroundImage.scaleY = newScaleY;
					break;
				case "noscale":
					foregroundImage.regX	= 0.5;					
					foregroundImage.x 		= 512 - (foregroundImage.image.width)/2;
					
					foregroundImage.regY	= 0.5;
					foregroundImage.y 		= 384 - (foregroundImage.image.height)/2;
					break;
			}
			
			
			foregroundImage.x=0;
			foregroundImage.y=0;
			containerForeground.addChild(foregroundImage);	
		}	
		
		//---------------------------------
		//activate screen mouse listeners
		//---------------------------------
		onTouch();	
	}	
	
	//=======================================================================
	// ON START GAME
	//=======================================================================
	this.onStartGame = onStartGame;
	function onStartGame(){
		
	}	
	
	//=======================================================================
	// PAINT MENU THINGS
	//=======================================================================
	function loadColorPalette(folder){
		var palette = new Bitmap(themeXML.colorsBottom);
		palette.x		= themeXML.colorsBottomX;
		palette.y		= themeXML.colorsBottomY;
		palette.onPress = function(){ isElementDown = true; };
		baseGame.containerNav.addChild(palette);
		loadColors(folder);
	}
	//=======================================================================
	// LOAD COLORS
	//=======================================================================	
	function loadColors(folder){
		colors = new Array(themeXML.colors.length);
		rgbs = new Array(themeXML.colors.length);
		for(var i = 0; i < themeXML.colors.length; i++){
			colors[i] 		= new Bitmap(themeXML.colors[i].getSrc());
			colors[i].x 	= parseInt(themeXML.colors[i].getX());
			colors[i].y 	= parseInt(themeXML.colors[i].getY());
			baseGame.containerNav.addChild(colors[i]);
			rgbs[i] = themeXML.colors[i].getRgb();	
			colors[i].i = i;
			colors[i].onPress = changeColor;
		}
	}
	//=======================================================================
	// CHANGE COLOR
	//=======================================================================	
	function changeColor(evt){
		var i = evt.target.i;
		isElementDown 	= true;
		colorR 			= parseInt(rgbs[i][0]);
		colorG 			= parseInt(rgbs[i][1]);
		colorB 			= parseInt(rgbs[i][2]);
	}
	//=======================================================================
	// LOAD BRUSHES
	//=======================================================================
	function loadBrushes(folder){
		//---------------------------------
		//Selectable brushes
		//---------------------------------
		var bgBrush = new Bitmap(themeXML.brushBg);
		bgBrush.x	= themeXML.brushBgX;
		bgBrush.y	= themeXML.brushBgY;
		bgBrush.onPress = function(){ isElementDown = true; };
		baseGame.containerNav.addChild(bgBrush);
		
		brushes = new Array(themeXML.brushSizes.length);
		sizes = new Array(themeXML.brushSizes.length);
		for(var i = 0; i < themeXML.brushSizes.length; i++){
			brushes[i] = new Bitmap(themeXML.brushSizes[i].getSrc());
			brushes[i].x = themeXML.brushSizes[i].getX();
			brushes[i].y = themeXML.brushSizes[i].getY();
			baseGame.containerNav.addChild(brushes[i]);
			sizes[i] =	themeXML.brushSizes[i].getThickness();
			brushes[i].i = i;
			brushes[i].src = themeXML.brushSizes[i].getSrc();
			brushes[i].onPress = changeBrush;
		}
		
		//---------------------------------
		//Active brush
		//---------------------------------
		activeBrush 	= new Bitmap(brushes[1].src);
		activeBrush.x	= 26;
		activeBrush.y	= 388;
		baseGame.containerNav.addChild(activeBrush);
	}
	
	//=======================================================================
	// CHANGE BRUSH
	//=======================================================================	
	function changeBrush(evt){
		var i = evt.target.i;
		var src = evt.target.src;
		isElementDown = true;
		baseGame.containerNav.removeChild(activeBrush);
		
		thickness = sizes[i];
		activeBrush	= new Bitmap(src);
		
		switch (i){
			case 2:
				activeBrush.x	= 20;
				activeBrush.y	= 381;	
				baseGame.containerNav.addChild(activeBrush);
			break;
			case 1:
				activeBrush.x	= 26;
				activeBrush.y	= 388;
				baseGame.containerNav.addChild(activeBrush);
			break;
			case 0:
				activeBrush.x	= 33;
				activeBrush.y	= 395;
				baseGame.containerNav.addChild(activeBrush);
			break;
		}
	}
	
	//===================================================
	// loadCamera: Load reset paint button
	//===================================================
	function loadBin(folder){
		var bin = new Bitmap("game/images/paint-bin.png");
		bin.x 	= 950;
		bin.y	= 100;
		baseGame.containerNav.addChild(bin);
		bin.onPress = cleanPaint;
	}
	//===================================================
	// cleanPaint: Delete all we've painted
	//===================================================
	function cleanPaint(){
		isElementDown = true;
		containerPaint.removeAllChildren();
	}
	//===================================================
	// loadCamera: Load screenshot button
	//===================================================
	function loadCamera(folder){
		var camera 	= new Bitmap("game/images/camera.png");
		camera.x	= 900;
		camera.y	= 100;
		baseGame.containerNav.addChild(camera);
		camera.onPress = screenshot;
	} 
	
	//=====================================================================
	// screenshot: Take a screenshot; adapted for every device 
	//=====================================================================
	function screenshot(){
		isElementDown = true;
		baseGame.hideNav();	//Clean buttons temporary to take screenshot correctly 
		stage.update();

		if (!isTakePhoto){
			var myDraw = document.getElementById("canvas");
			var draw = myDraw.toDataURL("image/png");
		
		if(playDevice == "WEB"){
			window.open (draw, "_blank");
		}
		if(playDevice == "IOS"){
			storage.save("IOS");	//Call mobile devices plugins to take and save screenshots
		}
		if(playDevice == "ANDROID"){
			storage.save("ANDROID");	//Call mobile devices plugins to take and save screenshots
			sleep(1000); /* Only for Android devices */	
		}
			
			isTakePhoto=true;
		}
		
		baseGame.showNav();
	}
	
	/* Interaction to paint */
	//===================================================
	// handleMouseDown: Activete screen mouse listeners
	//===================================================
	function onTouch(){
		stage.autoClear 	= true;
        stage.onMouseDown 	= handleMouseDown;
        stage.onMouseUp 	= handleMouseUp;
        stage.update();
		Ticker.addListener(window);
	}
	
	/* Mouse Listeners*/
	//============================================================================================
	// handleMouseDown: Turn on booleans to start to paint, and select type of brush and color
	//============================================================================================
	function handleMouseDown() {
		if(baseGame.isGameActive()){			
			isMouseDown = true;
			s = new Shape();
			s.cache(0,0,stage.canvas.width,stage.canvas.height);
			oldX = stage.mouseX;
			oldY = stage.mouseY;
			oldMidX = stage.mouseX;
			oldMidY = stage.mouseY;
			var g = s.graphics;
			g.setStrokeStyle(thickness + 1, 'round', 'round');
			var color = Graphics.getRGB(colorR,colorG,colorB);
			g.beginStroke(color);
			containerPaint.addChild(s);
			currentShape = s;
		}
	}
	//=======================================================================
	// handleMouseUp: Turn off booleans to stop to paint, and clean caché
	//=======================================================================
	function handleMouseUp() {
		if(baseGame.isGameActive()){
			if(s!=undefined){
				s.graphics.clear();
			}
			isMouseDown = false;
			isElementDown = false;
			isTakePhoto = false;
		}
	}
	
	//=====================================================
	// CLEAR SOUNDS
	//=====================================================		
	this.onClearSounds = onClearSounds;
    function onClearSounds(){
    }	
}