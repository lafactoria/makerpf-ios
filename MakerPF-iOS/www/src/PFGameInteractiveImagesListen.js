var PFGameInteractiveImagesListen = function(){
	//Variables
	var popup=false;
	var container;
	var num;
	var itemsPopup;
	var xmlAux;
	var gameAux;
	var square;
	var containerB;
	var newXML;
	
	//Functions declaration
	this.onTouch=onTouch;
	
	//Functions
	function onTouch(i,game,xml,itemsMid,containerMid,containerBase,newX){
		if(!popup){
			//soundsP=sounds;							
			containerB=containerBase;
			container=containerMid;
			itemsPopup=itemsMid;
			xmlAux=xml;			
			gameAux=game;
			num=i;
			newXML=newX;
			if(!openPopup()){
			}else{
				popup=true;
				drawRect(0,0,1024,768,0,0,0,0);
				creaPopup(1);
			}			
		}
	}
	//=======================================================================			
	// CREA POPUP
	//=======================================================================	
	function creaPopup(anim){
		//PLAY THE SOUND ASSOCIED WITH THE SPRITE			
		var itSound = newXML.items[num].getSound();					
		if(itSound != ""){
			PFSound.load('soPopup'+num,itSound);	
			PFSound.play('soPopup'+num);
		}
		
		var bgPopUp = new Image();
		bgPopUp.src = "game/images/bg_popup.png";
		bgPopUp.onload = function(){
			var bgPopUpBitmap = new Bitmap("game/images/bg_popup.png");
			bgPopUpBitmap.image.onload = function(){
				var bgScale;
			
				var offsetx = (parseInt(bgPopUpBitmap.image.width)/2);
				var offsety = (parseInt(bgPopUpBitmap.image.height)/2);
				bgPopUpBitmap.regX = offsetx;
				bgPopUpBitmap.regY = offsety;
				bgPopUpBitmap.x = 512;
				bgPopUpBitmap.y = 384;
			}
			
			var txt = new Text(newXML.items[num].getText(), "24px Helvetica");
			
			if(typeof itemsPopup[num] != "undefined"){
				txt.lineWidth = 350;
			}else{
				txt.lineWidth = 480;
			}
			
			var backButton = new Bitmap("game/images/bt_creditos_exit.png");					
			var nextGameButton = new Bitmap("game/images/bt_adelante.png");
			var backGameButton = new Bitmap("game/images/bt_enrera.png");
			
			var scaleImg;	
			
			if(typeof itemsPopup[num] != "undefined" && newXML.items[num].getText() != "" ){
				bgPopUpBitmap.scaleX = 1.50;
				bgPopUpBitmap.scaleY = 1.1;
				
				backButton.x=890;
				backButton.y=180;
				
				nextGameButton.x=890;
				nextGameButton.y=525;
				
				backGameButton.x=75;
				backGameButton.y=525;
					
				scaleImg = getImageScale2(itemsPopup[num].image.width,itemsPopup[num].image.height,424,320);			
				itemsPopup[num].scaleX = scaleImg;
				itemsPopup[num].scaleY = scaleImg;
				
				itemsPopup[num].x = 512;

				itemsPopup[num].regY = 0;
				itemsPopup[num].y = 300;
				
				txt.x=90;
				txt.y=212;
				container.addChild(bgPopUpBitmap);	
				container.addChild(itemsPopup[num]);
				
			}else if(typeof itemsPopup[num] != "undefined" && newXML.items[num].getText() == "" ){
				bgPopUpBitmap.scaleX = 1;
				bgPopUpBitmap.scaleY = 1.45;
				
				backButton.x=746;
				backButton.y=115;
				
				nextGameButton.x=746;
				nextGameButton.y=585;	
				
				backGameButton.x=220;
				backGameButton.y=585;
				
				scaleImg = getImageScale(itemsPopup[num].image.width,itemsPopup[num].image.height,560);			
				itemsPopup[num].scaleX = scaleImg;
				itemsPopup[num].scaleY = scaleImg;
				
				itemsPopup[num].x = 512;
				//itemsPopup[num].y = 50;
				
				container.addChild(bgPopUpBitmap);	
				container.addChild(itemsPopup[num]);
			}else{
				bgPopUpBitmap.scaleX = 1;
				bgPopUpBitmap.scaleY = 1;
				
				backButton.x=746;
				backButton.y=197;
				
				nextGameButton.x=746;
				nextGameButton.y=500;
				
				backGameButton.x=220;
				backGameButton.y=500;
				
				txt.x=230;
				txt.y=225;
				container.addChild(bgPopUpBitmap);	
			}
			
						
			
			
			container.addChild(txt);
			
			
			container.addChild(backButton);
			backButton.onPress = endPopup;		
		
			if(itemsPopup.length > 1){
				container.addChild(nextGameButton);
				nextGameButton.onPress = goNextPopup;			
				
				container.addChild(backGameButton);
				backGameButton.onPress = goBackPopup;
			}
			switch(anim){
				case 1:
					Tween.get(container).to({alpha:1},600);
					Tween.get(square).to({alpha:0.5},600);
				break;
				case 2:
					Tween.get(container).to({x:0},600);
				break;
			}
		}
	}
	
	function drawRect(x,y,sizex,sizey,alpha,r,gr,b){
		var g = new Graphics();
		g.beginFill(Graphics.getRGB(r,gr,b));
		g.drawRect(x,y,sizex,sizey);
		square = new Shape(g);
		square.alpha=alpha;
		containerB.addChild(square);
	}
	
	function goNextPopup(){
		if((num+1)<=(itemsPopup.length-1)){
			num++;
		}else{
			num=0;
		}		
		
		if(!openPopup()){						
		}else{
			Tween.get(container).to({x:1024},600).call(function(){container.removeAllChildren(); container.x=-1024; creaPopup(2);});
		}
	}
	
	
	
	function goBackPopup(){
		if((num-1)>=0){
			num--;
		}else{
			num=(itemsPopup.length-1);
		}
		if(!openPopup()){	
		}else{
			Tween.get(container).to({x:-1024},600).call(function(){container.removeAllChildren(); container.x=1024; creaPopup(2);});
		}
	}
	
	function openPopup(){			
		if( (newXML.items[num].getText() == "" || typeof(newXML.items[num].getText())== 'undefined') &&
			(newXML.items[num].getSound() == "" || typeof(newXML.items[num].getSound())== 'undefined') &&
			(itemsPopup[num] == "" || typeof(itemsPopup[num])== 'undefined')
		){		
			return false;	
		}else{
			return true;
		}
	}
	
	function endPopup(){
		Tween.get(square).to({alpha:0},600).call(function(){containerB.removeChild(square);});
		Tween.get(container).to({alpha:0},600).call(function(){container.removeAllChildren(); popup=false;});
	}
}


