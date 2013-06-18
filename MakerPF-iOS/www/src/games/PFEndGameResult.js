//*************************************************************
//	File: PFEndGameResult.js 
//	PFEndGameResult: Create and show popUp with resuts 
// 	of end game screen 
//*************************************************************
var PFEndGameResult = function(){

	//=====================================================
	// VARIABLES
	//=====================================================	
	var endGameListener;
	
	//=====================================================
	// ON END GAME SCREEN FINISHED 
	//=====================================================
	this.show = show;
	function show(listener, game, folder, ok, total, container){
		
		var g = new Graphics();
		g.beginFill(Graphics.getRGB(0,0,0));
		g.drawRect(0,0,1024, 768); 
		
		var s 	= new Shape(g);
		s.alpha = 0;
		
		endGameListener = listener;
				
		bgPopUpBitmap = new Bitmap("game/images/bg_popup_green_final.png");
		var offsetx = (parseInt(bgPopUpBitmap.image.width)/2);
		var offsety = (parseInt(bgPopUpBitmap.image.height)/2);
		if(offsetx == 0){
			bgPopUpBitmap.regX = 250;
			bgPopUpBitmap.regY = 150;				
		}else{
			bgPopUpBitmap.regX = offsetx;
			bgPopUpBitmap.regY = offsety;
		}
		
		bgPopUpBitmap.x = 512;
		bgPopUpBitmap.y = 384;
		
		var containerPopUp = new Container();		
		containerPopUp.addChild(s);
		containerPopUp.addChild(bgPopUpBitmap);		
		
		container.addChild(containerPopUp);
		
		
		txtPopUp = new Text("          "+ok+"/"+total, "57px Helvetica", "#ffffff");
		txtPopUp.x = 310;	
		txtPopUp.y = 330;
		bgPopUpBitmap.onPress = function(){ onEndGameScreenFinished(); };
		containerPopUp.addChild(txtPopUp);
		Tween.get(containerPopUp).to({alpha:1},600);
		Tween.get(s).to({alpha:0.5},600);
	}	
	
	//=====================================================
	// SHOW 
	//=====================================================
	this.onClearSounds = onClearSounds;
	function onClearSounds(){	
	}	
	
	//=====================================================
	// ON END GAME SCREEN FINISHED 
	//=====================================================
	function onEndGameScreenFinished(){
		endGameListener.onEndGameScreenFinished();
	}
	
}