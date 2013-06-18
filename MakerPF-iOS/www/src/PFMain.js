//*************************************************************
//	File: PFMain.js 
//	PFMain: init App
//*************************************************************

//=====================================================
// GLOBAL VARIABLES
//=====================================================
var fps;
var stage;
var gameManager;
var loadingImg = new Bitmap("game/images/loading.jpg");
var portada;
var menu;
var lang;
var isPaint;
var typeNavigation;
var musicManager;


//---------------------------
// TABLET GENERIC FUNCTIONS
//---------------------------
var PFMain = function(){
	if(playDevice == "WEB"){
		initWeb();		
	}
	if(playDevice == "IOS"){
		document.addEventListener("deviceready", initWeb, false);
	}
}

//=====================================================
// INIT IOS
//=====================================================
function initIOS(){
    document.addEventListener("active", onResume, false);
    document.addEventListener("resign", onPause, false);
	var canvas = document.getElementById("canvas");
	stage = new Stage(canvas);
	gameManager = new PFGameManager();
	musicManager = new PFMusicManager();
    shop = new PFShop();
	Ticker.addListener(window);
	Ticker.setInterval(17);
    //console.log("parent URL: "+parent.document.URL);
    var genPath = "../../";
    urlInt = "game/";
    urlExt = genPath+"Library/theme/";
    urlTheme = urlInt;
    //showShop(shop);
	//this.fps = new PFCore(maxfps).initCore();
}

//----------------------------
// WINDOW LISTENERS
//----------------------------
window.addEventListener("load",function() {
	//-------------------------
	// SET TIME OUT...
	//-------------------------
  	setTimeout(function(){
    	//-------------------------
    	// HIDE ADRESS BAR
    	//-------------------------
    	window.scrollTo(0, 1);
  	}, 0);
});

//=====================================================
// INIT WEB
//=====================================================
function initWeb(){
	var canvas		= document.getElementById("canvas");
	stage 			= new Stage(canvas);	
	gameManager 	= new PFGameManager();
	musicManager	= new PFMusicManager();
	portada 		= new PFPortada();
	menu 			= new PFMenu();
	Ticker.addListener(window);
	Ticker.setInterval(17);
	showPortada(portada);	
}

//=====================================================
// showPortada: start Portada stage
//=====================================================
function showPortada(){
	if (Touch.isSupported()) { Touch.enable(stage); }
	portada.load();
	portada.show();
}

//=====================================================
// TICK: update code in each frame
//=====================================================
function tick() {	
	//---------------------------
	// UPDATE FOR PAINT GAME
	//---------------------------
	if(isPaint){
		if (isMouseDown && !isElementDown) {
			var pt 			= new Point(stage.mouseX, stage.mouseY);
			var midPoint	= new Point(oldX + pt.x>>1, oldY+pt.y>>1);
			currentShape.graphics.moveTo(midPoint.x, midPoint.y);
			currentShape.graphics.curveTo(oldX, oldY, oldMidX, oldMidY);
			currentShape.updateCache("source-over");
			
			oldX 	= pt.x;
			oldY 	= pt.y;
			oldMidX = midPoint.x;
			oldMidY = midPoint.y;
		}
	}
	
	stage.update();
}