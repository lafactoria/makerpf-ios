//*************************************************************
//	File: PFInstructions.js 
//	PFInstructions: Create and show differents kinds of  
// 	instructions on start game 
//*************************************************************
var PFEndInstruction = function(listener){
	this.loadEndInstructions = loadInstructions;
	
	//=====================================================
	// VARIABLES
	//=====================================================	
	var iterations;
	this.image 	= "";
	this.text 	= "";
	this.sound;	
	var baseGame = listener;
	this.folder;
	
	this.iterations;
	
	var defTexts 	= "texts";
	var defText 	= "text";
	var defSounds 	= "sounds";
	var defSound 	= "sound";
	var defImage 	= "image";		
	var endGameListener;
	
	var endContainer;
	
	
	//=======================================================================			
	// loadInstructions: load the instructions of a game
	//=======================================================================
	function loadInstructions(folder,listener){
		this.folder = folder;
		endGameListener	 = listener;
		if  ( window.XMLHttpRequest ){
			xmlhttp = new XMLHttpRequest();
		}else{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open("GET","game/"+folder+"/end_game.xml",false);
		xmlhttp.send();
		xmlDoc = xmlhttp.responseXML;			
		
		
		this.iterations = xmlDoc.getElementsByTagName("instruction");
		if(typeof(xmlDoc.getElementsByTagName("instruction")[0]) != 'undefined'){
			var iteration = xmlDoc.getElementsByTagName("instruction")[0];
			//----------------------------------------------
			//We have instructions
			//----------------------------------------------			
			//----------------------------------------------
			//GET TEXT
			//----------------------------------------------
			if(typeof(iteration.getElementsByTagName(defTexts)[0]) != 'undefined'){					
				var texts = iteration.getElementsByTagName(defTexts)[0];							
				if(typeof(texts.getElementsByTagName(defText)[0]) != 'undefined'){
					//text = texts.getElementsByTagName("text")[0].attributes.getNamedItem('text').nodeValue;
					var j = SelectTextXML(texts.getElementsByTagName(defText));						
					if(j != -1){						
						if(typeof(iteration.getElementsByTagName(defText)[0]) != 'undefined'){
							this.text = texts.getElementsByTagName(defText)[j].attributes.getNamedItem('text').nodeValue;					
						}
					}else{
						this.text = "";
					}
				}
			}
			//----------------------------------------------
			//GET SOUND
			//----------------------------------------------
			if(typeof(iteration.getElementsByTagName(defSounds)[0]) != 'undefined'){						
				var sounds = iteration.getElementsByTagName(defSounds)[0];					
				if(typeof(sounds.getElementsByTagName(defSound)[0]) != 'undefined'){
					var j = SelectTextXML(sounds.getElementsByTagName(defSound));					
					if(typeof(iteration.getElementsByTagName(defSound)[0]) != 'undefined'){				
						this.sound = sounds.getElementsByTagName(defSound)[j].attributes.getNamedItem('src').nodeValue;					
					}					
				}
			}
			//----------------------------------------------
			//GET IMAGE
			//----------------------------------------------	
			if(typeof(iteration.getElementsByTagName(defImage)[0]) != 'undefined'){
				this.image = iteration.getElementsByTagName(defImage)[0].attributes.getNamedItem('src').nodeValue;
			}			
		}						
	}
	
	//=====================================================
	// BUILD PRELOAD MANIFEST
	//=====================================================
	this.buildPreloadManifest = buildPreloadManifest		
	function buildPreloadManifest(itemsManifest,game){		
		if(typeof(this.image != 'undefined') && this.image != ""){
			itemsManifest.push("game/"+this.folder+"/images/" + this.image);
		}
		
		itemsManifest.push("game/images/bg_popup.png");
		itemsManifest.push("game/images/instruction_arrow.png");
		itemsManifest.push("game/images/instruction_sound.png");
		
		return itemsManifest;
	}
	
	//=====================================================
	// SHOW INSTRUCTIONS
	//=====================================================
	this.show = show;
	function show(container){
		//BLACK BACKGROUND	
		endContainer = new Container();
		
		if(this.iterations.length > 0){
		
			var g = new Graphics();
			g.beginFill(Graphics.getRGB(0,0,0));
			g.drawRect(0,0,1024, 768); 

			var s 	= new Shape(g);
			s.alpha = 0;
			endContainer.addChild(s);
			
			var bgPopUpBitmap 	= new Bitmap("game/images/bg_popup.png");
			bgPopUpBitmap.y 	= 0;		
					
			bgPopUpBitmap.image.container 		= endContainer;
			bgPopUpBitmap.image.containerMain	= container;
			bgPopUpBitmap.image.s 				= s;
			bgPopUpBitmap.image.image 			= this.image;
			bgPopUpBitmap.image.text 			= this.text;
			bgPopUpBitmap.image.sound 			= this.sound;
			bgPopUpBitmap.image.bgPopUpBitmap 	= bgPopUpBitmap;
			bgPopUpBitmap.image.folder 			= this.folder;
			bgPopUpBitmap.image.onload 			= showPopupInstructions;
			
			return true;
		}else{
			return false;
		}
	}	
	
	function showPopupInstructions(evt){
		var container 		= evt.target.container;
		var containerMain 	= evt.target.containerMain;
		var s 				= evt.target.s;
		var image 			= evt.target.image;
		var text 			= evt.target.text;
		var sound 			= evt.target.sound;
		var bgPopUpBitmap 	= evt.target.bgPopUpBitmap;
		var folder 			= evt.target.folder;
		
	
		var fletxaPopup		= new Bitmap("game/images/instruction_arrow.png");
		var soundPopup		= new Bitmap("game/images/instruction_sound.png");
		
		var scalex;
		var scaley;			
		
		var scaleImg = 0;					
		
		if(typeof(image) != 'undefined' && image != "" && typeof(text) != 'undefined' && text != ""){							
			setBgInstruction(1.125,0.9,bgPopUpBitmap,container);
			
			var imgPopup = new Bitmap("game/"+folder+"/images/"+image);
			imgPopup.image.onload = function(){
				scaleImg 		= getImageScale(imgPopup.image.width,imgPopup.image.height,314);
				imgPopup.scaleX = scaleImg;
				imgPopup.scaleY = scaleImg;
				imgPopup.x 		= (512-173-((imgPopup.image.width*scaleImg)/2));				
				imgPopup.y		= (190-((imgPopup.image.height*scaleImg)/2));
				container.addChild(imgPopup);
			}
			var txt = new Text(text, "24px Helvetica","#000000");
			txt.lineWidth = 300;
			txt.x=512;
			txt.y=50;
			container.addChild(txt);
			
			if(typeof(sound) != 'undefined' && sound != ""){
				PFSound.load('soInstructions',"game/"+folder+"/sounds/" + lang + "/" +sound);	
				PFSound.play('soInstructions');
				soundPopup.x = 510;				
				soundPopup.image.onload = function(){
					soundPopup.y 		= bgPopUpBitmap.image.height*0.9 -90;
					soundPopup.scaleX	= 0.35;
					soundPopup.scaleY 	= 0.35;
					soundPopup.onPress	= repeatPopupSound;
					container.addChild(soundPopup);			
				}
			}
			
			fletxaPopup.x = 400 + ((bgPopUpBitmap.image.width/2)*1.125);
			fletxaPopup.y = bgPopUpBitmap.image.height*0.9 -80;
		}	
		if((typeof(image) == 'undefined' || image == "") && (typeof(text) != 'undefined' && text != "")){						
			setBgInstruction(1.125,0.6,bgPopUpBitmap,container);		
			
			var txt = new Text(text, "24px Helvetica","#000000");
			txt.lineWidth 	= 500;
			txt.x			= 212;
			txt.y			= 50;
			container.addChild(txt);
			
			if(typeof(sound) != 'undefined' && sound != ""){
				PFSound.load('soInstructions',"game/"+folder+"/sounds/" + lang + "/"+sound);	
				PFSound.play('soInstructions');
				soundPopup.x = 200;
				soundPopup.image.onload = function(){
					soundPopup.y 		= bgPopUpBitmap.image.height*0.6 -90;
					soundPopup.scaleX 	= 0.35;
					soundPopup.scaleY 	= 0.35;
					soundPopup.onPress 	= repeatPopupSound;
					container.addChild(soundPopup);		
				}					
			}
			
			fletxaPopup.x = 400 + ((bgPopUpBitmap.image.width/2)*1.125);
			fletxaPopup.y = bgPopUpBitmap.image.height*0.6 -80;
		}
		if((typeof(text) == 'undefined' || text == "") && (typeof(image) != 'undefined' && image != "")){							
			//setBgInstruction(0.84,1.2,bgPopUpBitmap,container);				
			
			var imgPopup = new Bitmap("game/"+folder+"/images/"+image);
			imgPopup.image.onload = function(){
				offsetx		= imgPopup.image.width/2;
				offsety		= imgPopup.image.height/2;		
				imgPopup.x = 512 		- offsetx;
				imgPopup.y = 768*0.5 	- offsety;
				imgPopup.onPress 	= closeInstructions;
				container.addChild(imgPopup);	
			}
			
			if(typeof(sound) != 'undefined' && sound != ""){
				PFSound.load('soInstructions',"game/"+folder+"/sounds/" + lang + "/"+sound);	
				PFSound.play('soInstructions');
				soundPopup.x = 280;
				soundPopup.image.onload = function(){
					soundPopup.y 		= bgPopUpBitmap.image.height*1.2 -90;
					soundPopup.scaleX 	= 0.35;
					soundPopup.scaleY 	= 0.35;
					soundPopup.onPress	= repeatPopupSound;
					container.addChild(soundPopup);			
				}
			}
			
			fletxaPopup.x = 2000;
			fletxaPopup.y = bgPopUpBitmap.image.height*1.2 -80;

			
		}
		if((typeof(text) == 'undefined' || text == "")  && (typeof(image) == 'undefined' || image == "")){															
			if(typeof(sound) != 'undefined' && sound != ""){
				setBgInstruction(0.42,0.9,bgPopUpBitmap,container);

				PFSound.load('soInstructions',"game/"+folder+"/sounds/" + lang + "/"+sound);	
				PFSound.play('soInstructions');
				soundPopup.image.onload = function(){
					soundPopup.x 		= 512 - (soundPopup.image.width/2);
					soundPopup.y 		= bgPopUpBitmap.image.height*0.9 -300;										
					soundPopup.onPress 	= repeatPopupSound;
					container.addChild(soundPopup);			
				}
			}else{
				container.removeChild(s);
				return false;
			}
			
			fletxaPopup.x = 512 - (fletxaPopup.image.width/2);
			fletxaPopup.y = bgPopUpBitmap.image.height*0.9 -80;
		}		
		
		
		
		fletxaPopup.container 	= container;
		fletxaPopup.onPress 	= closeInstructions;		
		container.addChild(fletxaPopup);
		
		
		containerMain.alpha = 0;
		containerMain.addChild(container);
		Tween.get(containerMain).to({alpha:1},600);
		Tween.get(s).to({alpha:0.5},600);
	
	}
	//=====================================================
	// CLOSE INSTRUCTIONS
	//=====================================================
	function closeInstructions(evt){		
		onEndGameScreenFinished();		
	}
	//=====================================================
	// REPEAT POPUP SOUND
	//=====================================================
	function repeatPopupSound(){
		PFSound.play('soInstructions');
	}
	
	//=====================================================
	// SelectTextXML: Select text in correct language
	//=====================================================
	function SelectTextXML(tagText){		
		var j=0;
		if(tagText[j].attributes.getNamedItem("lang").nodeValue==lang){
			return j;
		}
		
		while(tagText[j].attributes.getNamedItem("lang").nodeValue!=lang){
			if(tagText[j].attributes.getNamedItem("lang").nodeValue==lang){
				return j;
			}
			j++;
			if(j >= tagText.length){
				break;
			}
			if(tagText[j].attributes.getNamedItem("lang").nodeValue==lang){
				return j;
			}			
		}		
		return -1;			
	}
	
	//=====================================================
	// SETS
	//=====================================================
	function setBgInstruction(scalex, scaley, bg, container){		
		bg.scaleX = scalex;
		bg.scaleY = scaley;
		bg.x = 512-((bg.image.width*scalex)/2);
		container.addChild(bg);		
	}
	//=====================================================
	// GETS
	//=====================================================
	this.getImage 	= getImage;
	this.getText 	= getText;
	this.getSound 	= getSound;

	//Functions
	function getImage() {
		return this.image;
	}
	function getText() {
		return this.text;
	}
	function getSound() {
		return this.sound;
	}
	
	//=====================================================
	// ON END GAME SCREEN FINISHED 
	//=====================================================
	function onEndGameScreenFinished(){
		endGameListener.onEndGameScreenFinished();
	}
}