//*************************************************************
//	File: PFQuizResult.js 
//	PFQuizResult: Create and show end quizz game  
//*************************************************************
var PFQuizResult = function(pGameListener){

	//=====================================================
	// VARIABLES
	//=====================================================
	var gameListener = pGameListener;
	var container;
	var bgPopUpBitmap;
	
	var bgPopupBitmapOk;
	var bgPopupBitmapFail;	
	var bPopUp;
	var txtPopUp;

	create();
	
	//=====================================================
	// CREATE
	//=====================================================
	function create()
	{		
		gameListener = pGameListener;
		container 	 = new Container();
		
		//----------------------------------------------
		//Black Curtain
		//----------------------------------------------	
		var g = new Graphics();
		g.beginFill(Graphics.getRGB(0,0,0));
		g.drawRect(0,0,1024, 768); 
		
		var s 	= new Shape(g);
		s.alpha = 0.5;
		
		container.addChild(s);		
		container.alpha = 0;		
		
		bgPopupBitmapOk 	= new Bitmap("game/images/bg_popup_red.png");
		bgPopupBitmapFail 	= new Bitmap("game/images/bg_popup_green.png");	
		bgPopupBitmapFinal 	= new Bitmap("game/images/bg_popup_green_final.png");	
		
		drawImages();
	}

	//=====================================================
	// DRAW IMAGES
	//=====================================================	
	function drawImages(){
		bPopUp 		  = new Bitmap("game/images/popup_arrow.png");	
		bPopUp.x 	  = 490; 
		bPopUp.y 	  = 400;
		bPopUp.scaleX = 0.7;	
		bPopUp.scaleY = 0.7;
	}

	//=====================================================
	// SHOW CORRECTION : load PopUp with result
	//=====================================================
	this.showCorrection = showCorrection
	function showCorrection(game,folder,isOk,total){
				
		container.removeChild(bgPopUpBitmap);
		container.removeChild(txtPopUp);
		container.removeChild(bPopUp);		
		
		if (!isOk){
			bgPopUpBitmap = bgPopupBitmapOk;
		}else{
			bgPopUpBitmap = bgPopupBitmapFail;
		}
		
		var offsetx = (parseInt(bgPopUpBitmap.image.width)/2);
		var offsety = (parseInt(bgPopUpBitmap.image.height)/2);	
		bgPopUpBitmap.regX = offsetx;
		bgPopUpBitmap.regY = offsety;
		bgPopUpBitmap.x = 512;
		bgPopUpBitmap.y = 384;
		

		bgPopUpBitmap.onPress = function(){ 
			PFSound.play('tick');
			hide();
			gameListener.nextQuestion();
		};				

		container.addChild(bgPopUpBitmap);	
		
		
		Tween.get(container).to({alpha:1},600);
	}

	//=====================================================
	// HIDE
	//=====================================================	
	function hide(){
		Tween.get(container).to({alpha:0},600);
	}
	
	
	//=====================================================
	// GETs
	//=====================================================	
	this.getContainer = function() { return container; }	
	
}