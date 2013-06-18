//*************************************************************
//	File: PFGameQuiz.js 
//	PFGameQuiz: game quiz
//*************************************************************

var PFGameQuiz = function(){

	//=====================================================
	// VARIABLES
	//=====================================================
	var items;
	var newXML;
	var numQuestion;
	var numOkAnswers;
	var txtQuestion;
	var txtAnswers;
	var imgAnswers;
	var txtPopUp;
	var answerBgs;
	var checkBoxes;		
	var checks;
	var bNextQuestion;
	var bPopUp;
	var isPopupActive;
	var quizImage;
	var i;
	var bgPopUpBitmap;
	var containerPopUp;	
	var containerPregunta;
	var resultPopup;
	
	var baseGame;
	
	repeatQuestion = null;	

	this.load = load;
	this.show = show;
	
	//======================================================================			
	// LOAD
	//======================================================================
	function load(game,folder){
		
		newXML = new PFXMLQuiz();
		newXML.load(game,folder);
		
		items= new Array(newXML.items.length);
		numQuestion = 0;
		numOkAnswers = 0;
		isPopupActive = false;
		PFSound.load('tick','game/sounds/boto.mp3');	
	}
	
	//=======================================================================			
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
		
		var imgSources = newXML.items[numQuestion].getAnswers();		
		for(var j = 0; j < imgSources.length; j++){		
			itemsManifest[1+j] = "game/" + baseGame.getFolder() + "/images/" + newXML.items[numQuestion].getAnswers()[j].getImage();
		}					
				
		//itemsManifest.push(newXML.background.getSrc());
		itemsManifest.push("game/images/nextQuestion.png");
		return itemsManifest;
	}		
	
	//============================================================================
	// ON ADD MENU : Here we add the custom menu things for this specific game
	//============================================================================
	this.onAddMenu = onAddMenu;
	function onAddMenu(){
		repeatQuestion 		 = new Bitmap("game/images/bt_so.png");	
		repeatQuestion.x 	 = 80;
		repeatQuestion.y 	 = 20;
		activeRepeatQuestion = true;
		baseGame.containerNav.addChild(repeatQuestion);		
		
		bNextQuestion = new Bitmap("game/images/nextQuestion.png");
		bNextQuestion.x = 464;
		bNextQuestion.y = 690;
		baseGame.containerNav.addChild(bNextQuestion);			
	}
	
    //=====================================================
	// ON SHOW GAME
	//=====================================================
	this.onShowGame = onShowGame;
	function onShowGame(){

		//var background = new Bitmap(newXML.background.getSrc());
		//baseGame.containerBase.addChild(background);

		containerPopUp 			= new Container();
		containerPopUp.alpha 	= 0;		
		containerPregunta 		= new Container();
				
		baseGame.containerBase.addChild(containerPregunta);
		baseGame.containerBase.addChild(containerPopUp);

		resultPopup = new PFQuizResult(this);		
		baseGame.containerNav.addChild(resultPopup.getContainer());
		
		//---------------------------------
		// Next question button
		//---------------------------------
		bNextQuestion.onPress = function(){ 
			if(controlMarked(baseGame.getGame()) && !isPopupActive && baseGame.isGameActive()){ 
				//------------------------------------
				// Activate if some answer is marked
				//------------------------------------
				isPopupActive = true;
				resultPopup.showCorrection(baseGame.getGame(),baseGame.getFolder(),controlResult(baseGame.getGame()));
				PFSound.play('tick');
			}
		};			
				
		//------------------------------------
		// Image question
		//------------------------------------
		showQuestion(baseGame.getGame(),baseGame.getFolder());		
	}	
	
	//=======================================================================
	// ON START GAME
	//=======================================================================
	this.onStartGame = onStartGame;
	function onStartGame(){
		playSound(baseGame.getGame(),baseGame.getFolder());	
	}	
	
	//=====================================================
	// goNextQuestion: write next question with checkboxes
	//=====================================================
	function showQuestion(game,folder){
		containerPregunta.removeAllChildren();
		setImageQuestion(game,folder);
		writeQuestion(game);
		writeAnswers(game,folder);
	}
	
	//=====================================================	
	// NEXT QUESTION
	//=====================================================	
	this.nextQuestion = nextQuestion;
	function nextQuestion(){
		//------------------------------------
		// next question or end game
		//------------------------------------
		if ((numQuestion+1)<newXML.items.length){
			isPopupActive = false;
			cleanPage(baseGame.getGame());	
			numQuestion++;				
			showQuestion(baseGame.getGame(),baseGame.getFolder());
			playSound(baseGame.getGame(),baseGame.getFolder());	
		}else{
			baseGame.endGameResult(this, numOkAnswers, newXML.items.length);	
		}		
	}
	
	//=====================================================	
	// setImageQuestion: set image related with question
	//=====================================================
	function setImageQuestion(game,folder){		

		if(newXML.items[numQuestion].getImage()!= ""){		

			quizImage = new Bitmap("game/" + folder + "/images/" + newXML.items[numQuestion].getImage());
			quizImage.image.onload = function()
			{			
				var scale = getImageScale(quizImage.image.width,quizImage.image.height,173);			
				quizImage.scaleX = scale;
				quizImage.scaleY = scale;	
			
				quizImage.x = 800;
				quizImage.y = 90;
				baseGame.containerBase.addChild(quizImage);	
			}
		}
	}

	function truncate(n) {
		return Math[n > 0 ? "floor" : "ceil"](n);
	}
	
	//=====================================================
	// MULTILINE TEXT
	//=====================================================		
	function multiLineText(text,font, color, x, y, characters, separation){
		var questionOffset = 0;
		var words = text.split(" ");				
		var maxCharsPerLine = characters;		
		
		var nWord = 0;
		
		while(nWord < words.length){
			var textLine = "";			
			while(textLine.length < maxCharsPerLine && nWord < words.length){				
				textLine += words[nWord] + " ";
				nWord++;				
			}	
			txtQuestion = new Text(textLine, font, color);
			txtQuestion.textBaseline = "top"; 
			txtQuestion.x = x;
			txtQuestion.y = y + questionOffset;
			questionOffset += separation;
			containerPregunta.addChild(txtQuestion);				
		}
	}
	//=====================================================
	// PLAY SOUND: 
	//=====================================================	
	function playSound(game,folder){
		
		if(newXML.items[numQuestion].getSound() == ""){
			repeatQuestion.alpha = 0;
		}
		else{
			repeatQuestion.alpha = 1;
			PFSound.load('question' + numQuestion,'game/'+folder+'/sounds/'+newXML.items[numQuestion].getSound());	
			PFSound.play('question' + numQuestion);
			repeatQuestion.onPress = function(){ 
				PFSound.play('question'+numQuestion); 
			};
		}
	}

	//=====================================================
	// WRITE QUESTION
	//=====================================================			
	function writeQuestion(game){	
		multiLineText(newXML.items[numQuestion].getQuestion(),"30px Helvetica", "rgb(" + newXML.items[numQuestion].getRgb().replace(/-/g,",") + ")",40,90,45,30 );		
	}

	//=====================================================
	// WRITE ANSWERS
	//=====================================================
	function writeAnswers(game,folder){
		var posInitY = 300;
		txtAnswers 	= new Array(newXML.items[numQuestion].getAnswers().length);
		imgAnswers 	= new Array(newXML.items[numQuestion].getAnswers().length);
		checkBoxes 	= new Array(newXML.items[numQuestion].getAnswers().length);
		answerBgs 	= new Array(newXML.items[numQuestion].getAnswers().length);
		checks 		= new Array(newXML.items[numQuestion].getAnswers().length);
		
		for (i=0; i<newXML.items[numQuestion].getAnswers().length; i++){
			
			if((i+1)%2 == 0){
				var posInitX = 520;
			}else{
				var posInitX = 40;
			}			
			
			checks[i] = new Bitmap("game/images/tick.png");
			checks[i].x = posInitX+18;
			checks[i].y = posInitY-12;
			checks[i].alpha = 0;
			newXML.items[numQuestion].getAnswers()[i].setActive(false);
			answerBgs[i] = new Bitmap("game/images/answer.png");			
			answerBgs[i].x = posInitX;
			answerBgs[i].y = posInitY-30;			
			containerPregunta.addChild(answerBgs[i]);
			
			checkBoxes[i] = new Bitmap("game/images/checkbox.png");
			checkBoxes[i].x = posInitX + 15;
			checkBoxes[i].y = posInitY - 15;
			checkBoxes[i].i	= i;
			checkBoxes[i].onPress = function(event){ 
				if(!isPopupActive && baseGame.isGameActive()){
					changeCheck(event.target.i,game); 
					PFSound.play("tick"); 
				}
			};
			
			if(newXML.items[numQuestion].getAnswers()[i].getImage() != ""){
				multiLineText(newXML.items[numQuestion].getAnswers()[i].getAnswer(),"26px Helvetica", "#1F1E21",posInitX+165,posInitY-8,15,30 );
			}else{
				multiLineText(newXML.items[numQuestion].getAnswers()[i].getAnswer(),"26px Helvetica", "#1F1E21",posInitX+50,posInitY-8,30,30 );
			}
			
			var imgSource = newXML.items[numQuestion].getAnswers()[i].getImage();
			if(imgSource != ""){
				
				var myImage = new Image();
				myImage.src = "game/" + folder + "/images/" +  imgSource;	
				myImage.posInitX = posInitX;			
				myImage.posInitY = posInitY;
				
				myImage.onload = function(event){				
				
					var scale = 0;			
					var t = event.target;
					var item = new Bitmap(event.target);
					scale = getImageScale(item.image.width, item.image.height,104);					
					item.scaleX = scale;
					item.scaleY = scale;
				
					item.x = t.posInitX + 50;			
					item.y = t.posInitY + (70 - (item.image.height*scale))/2;
					containerPregunta.addChild(item);
				}
			}
			
			if((i+1)%2 == 0){
				posInitY = posInitY+127;
			}
			
			containerPregunta.addChild(checkBoxes[i]);
			containerPregunta.addChild(checks[i]);
		}
	}
	
	//=====================================================
	// Play sound question : Controls of ticks 
	//=====================================================	
	function changeCheck(n,game){
		var state = newXML.items[numQuestion].getAnswers()[n].getActive();
		if(state){
			checks[n].alpha = 0;
			newXML.items[numQuestion].getAnswers()[n].setActive(false);
		}else{
			checks[n].alpha = 1;
			newXML.items[numQuestion].getAnswers()[n].setActive(true);
		}	
	}	
	
	//=====================================================
	// cleanPage: delete all question infortmation showed
	//=====================================================
	function cleanPage(game){
		baseGame.containerBase.removeChild(quizImage);
		baseGame.containerBase.removeChild(txtQuestion);
		
		for (i=0; i<newXML.items[numQuestion].getAnswers().length; i++){
			baseGame.containerBase.removeChild(txtAnswers[i]);
			baseGame.containerBase.removeChild(checkBoxes[i]);
			baseGame.containerBase.removeChild(checks[i]);
			newXML.items[numQuestion].getAnswers()[i].setActive(false);
		}
	}
	
	//======================================================================
	// controlResult: evaluate if answers are OK; all answers must be ok 
	//======================================================================
	function controlResult(game){
		numOkAnswers++;
		for (i=0; i<newXML.items[numQuestion].getAnswers().length; i++){
			if(newXML.items[numQuestion].getAnswers()[i].getActive() != newXML.items[numQuestion].getAnswers()[i].getOk()){
				numOkAnswers--;				
				return false;
			}			
		}
		return true;
	}
	
	//====================================================
	// controlMarked: evaluate if somecheckbox is marked
	//====================================================
	function controlMarked(game){
		var ok = false;
		for (i=0; i<newXML.items[numQuestion].getAnswers().length; i++){
			if(newXML.items[numQuestion].getAnswers()[i].getActive() == true){
				ok = true;
			}			
		}
		return ok;
	}
	
	//=====================================================
	// CLEAR SOUNDS
	//=====================================================		
	this.onClearSounds = onClearSounds;
    function onClearSounds(){
        for(i=0;i<items.length;i++){
            PFSound.unload("sound"+i);
        }
        PFSound.unload('tick');
    }	
}