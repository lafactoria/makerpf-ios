//*************************************************************
//	File: PFEndGame.js 
//	PFEndGame: Create and show final game screen 
//*************************************************************
var PFEndGame = function(){

	//=====================================================
	// VARIABLES
	//=====================================================	
	var endGameListener;
	var container;
	
	PFSound.load('end','game/sounds/ok.mp3');		

	//=====================================================
	// SHOW 
	//=====================================================
	this.show = show;
	function show(listener, pEndGame , folder, baseContainer){		
		endGameListener = listener;
		container = new Container();		
		
		//Black cuirtain		
		var g = new Graphics();
		g.beginFill(Graphics.getRGB(0,0,0));
		g.drawRect(0,0,1024, 768); 
		var s = new Shape(g);
		s.alpha = 0.5;
		
		container.addChild(s);		
		container.alpha = 0;		
		
		var endScreen = new Bitmap(pEndGame.getSrc());
		endScreen.image.onload = function(){
			
			offsetx		= endScreen.image.width/2;
			offsety		= endScreen.image.height/2;		
			endScreen.x = 512 		- offsetx;
			endScreen.y = 768*0.5 	- offsety;
			
			container.addChild(endScreen);
			
			baseContainer.addChild(container);	
			Tween.get(container).wait(1200).to({alpha:1},1000).wait(2000).to({alpha:0},1000).call(function(){
				onEndGameScreenFinished(); 
			});			
			PFSound.play('end');
		}
	}
	
		
	//=====================================================
	// SHOW 
	//=====================================================
	this.onClearSounds = onClearSounds;
	function onClearSounds(){
		PFSound.unload('end');
	}
	
	//=====================================================
	// ON END GAME SCREEN FINISHED 
	//=====================================================
	function onEndGameScreenFinished(){
		endGameListener.onEndGameScreenFinished();
	}
	
}
