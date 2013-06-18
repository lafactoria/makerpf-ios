//*****************************************************
// PFGameQuiz: Load and execute "QuizGapsGame"
//*****************************************************/

var PFGameQuizGaps = function(){
	//Variables
	var items;
	var xml;
	var numQuestion;
	var numOkAnswers;
	var txtQuestion;
	var txtAnswers;
	var txtPopUp;
	var questionImage;
	var questionText;
	var questionSound;
	var bNextQuestion;
	var bPopUp;
	var repeatQuestion;
	var type;
	var level;
	var answerInput;
	var isPopupActive;
	var activeQuestionImage;
	var activeQuestionText;
	var activeRepeatQuestion;
	var containerPopUp;
	var i;
	var containerText;
	
	var resultPopup;
		
	var bgPopUpBitmap;
	
	var newXML;
	
	//Functions declaration
	this.load = load;
	this.show = show;
	
	var baseGame;
	
	//=======================================================================			
	// LOAD
	//=======================================================================
	function load(game,folder){
		newXML = new PFXMLQuizText;
		newXML.load(game,folder);	
		
		xml 					= new PFAction();
		xml.LoadItems(game,folder);
		items					= new Array();
		numQuestion 			= 0;
		numOkAnswers 			= 0;
		isPopupActive 			= false;
		activeQuestionText 		= false;
		activeQuestionImage 	= false;
		activeRepeatQuestion 	= false;
		level 					= xml.getLevel();
		myI 					= 0;
		PFSound.load('tick','game/sounds/boto.mp3');		
	}
	
	//=======================================================================			
	// SHOW GAME
	//=======================================================================
	function show(game,folder,direction,containerAux,containerAnt){
		
		baseGame = new PFBaseGame();
		baseGame.create(this,game,folder,containerAux, containerAnt);		
	}	
		
	//=======================================================================
	// BUILD PRELOAD MANIFEST
	//=======================================================================
	this.buildPreloadManifest = buildPreloadManifest
	function buildPreloadManifest(itemsManifest,game){
		
		/*for(var j = 0; j < imgSources.length; j++){		
			itemsManifest.push(xml.getItems(game)[numQuestion].getStates());
		}*/					
				
		//itemsManifest.push(newXML.background.getSrc());
		itemsManifest.push("game/images/nextQuestion.png");
		itemsManifest.push("game/images/popup_arrow.png");
		itemsManifest.push("game/images/input.png");
		itemsManifest.push("game/images/bt_so.png");
		return itemsManifest;
	}		
	
	//=======================================================================
	// ON ADD MENU : Here we add the custom menu things for this specific game
	//=======================================================================
	this.onAddMenu = onAddMenu;
	function onAddMenu(){
		repeatQuestion = new Bitmap("game/images/bt_so.png");	
		repeatQuestion.x = 80;
		repeatQuestion.y = 20;
		activeRepeatQuestion = true;
		baseGame.containerNav.addChild(repeatQuestion);
		
		/* Button Next Question*/
		bNextQuestion = new Bitmap("game/images/nextQuestion.png");
		bNextQuestion.x = 464;
		bNextQuestion.y = 690;
		baseGame.containerNav.addChild(bNextQuestion);						
	}
	
	//=======================================================================
	// ON SHOW GAME
	//=======================================================================
	this.onShowGame = onShowGame;
	function onShowGame(){
		
		containerText = new Container();
		containerPopUp = new Container();
		containerPopUp.alpha = 0;
		
		//var background = new Bitmap(newXML.background.getSrc());
		//baseGame.containerBase.addChild(background);	
		baseGame.containerBase.addChild(containerText);	
		
		resultPopup = new PFQuizResult(this);		
		baseGame.containerNav.addChild(resultPopup.getContainer());
		
		/* QUESTION */	
		bNextQuestion.onPress = function(){
			if(!isPopupActive && baseGame.isGameActive()){
				if(level == "1"){		//easy
					answerInput = "";
					for(i=0;i<newXML.items[numQuestion].getAnswer().length;i++){
						answerInput += document.getElementById("inputAnswer"+i).value;
					}
				}else{					//hard
					answerInput = document.getElementById("inputAnswer").value;
				}
				if(!isPopupActive && answerInput!=""){ 
					var element 	= document.getElementById('inputDiv');	//Delete input
					element.parentNode.removeChild(element);
					
					isPopupActive = true;
					resultPopup.showCorrection(baseGame.getGame(),baseGame.getFolder(),controlResult(baseGame.getGame()));
					PFSound.play('tick');
				}
			}
		};
	}
	
	//=======================================================================
	// ON START GAME
	//=======================================================================
	this.onStartGame = onStartGame;
	function onStartGame(){
		showQuestion();
	}		
	
	//=======================================================================
	// SHOW QUESTION
	//=======================================================================
	function showQuestion(){
		printInput		(baseGame.getGame());
		selectQuestion	(baseGame.getGame(), baseGame.getFolder());
	}		
	
	//=====================================================	
	// NEXT QUESTION
	//=====================================================	
	this.nextQuestion = nextQuestion;
	function nextQuestion(){
		if ((numQuestion+1)<newXML.items.length){		//next question or end game
			isPopupActive = false;
			numQuestion++;		
			cleanPage(baseGame.getGame(),baseGame.getFolder());
			showQuestion();			
		}else{
			baseGame.endGameResult(this, numOkAnswers, newXML.items.length);	
		}		
	}	
	
	//=======================================================================
	// PRINT INPUT : load HTML input type=text
	//=======================================================================
	function printInput(game){
		/* Add input text box */
		if (level=="1"){	//easy -> multiple gaps
			document.getElementById('aux').innerHTML += "<div id='inputDiv' style='position:relative;top:-240px;'>";
			document.getElementById('inputDiv').innerHTML += "<form id='ans' name='ans'>";
			var j = 0;
			for(i = 0; i<newXML.items[numQuestion].getAnswer().length; i++){
				j++;	
				
				if(j<newXML.items[numQuestion].getAnswer().length){ 
					document.getElementById('ans').innerHTML += "<input id='inputAnswer"+i+"' type='text' value='' style='background-image: url(game/images/input.png); background-position: 0 -1px; border-style: none;   font-size: xx-large;    height: 91px;    width: 360px; padding-left: 25px; padding-right:25px;' maxlength='1' onKeyup='autotab(this, document.ans.inputAnswer"+j+")'/>";
				}else{
					document.getElementById('ans').innerHTML += "<input id='inputAnswer"+i+"' type='text' value='' style='background-image: url(game/images/input.png); background-position: 0 -1px; border-style: none;   font-size: xx-large;    height: 91px;    width: 360px;padding-left: 25px; padding-right:25px;' maxlength='1' />";
				}
			}
			document.getElementById('inputDiv').innerHTML 	+= "</form>";
			document.getElementById('aux').innerHTML 		+= "</div>";
		}else{			//hard -> only one line
			document.getElementById('aux').innerHTML += "<div id='inputDiv' style='position:relative;top:-240px;'><input id='inputAnswer' type='text' value='' style='background-image: url(game/images/input.png); background-position: 0 -1px; border-style: none;   font-size: xx-large;    height: 91px;    width: 360px;padding-left: 25px; padding-right:25px;'/></div>";
		}
	}
		
	//=======================================================================
	// SELECT QUESTION : load question; select wich type must be loaded
	//=======================================================================
	function selectQuestion(game,folder){
		myI++;
		var states = newXML.items[numQuestion].getStates();
		
		repeatQuestion.alpha = 0;
		
		for (i=0; i<states.length; i++){
						
			if(states[i] != null){
			
				type 	= states[i].getType();
				var src = states[i].getSrc();
	
				var posX = "50";
				var posY = "80";
				
				switch(type){	//which type of question
					case "image":
						if(src != ""){
							setImageQuestion(game,folder,src, posX, posY);
						}
					break;
					case "sound":
						if(src != ""){
							PFSound.load('question'+myI,'game/'+folder+'/sounds/'+lang+'/'+src);
							playSoundQuestion(myI,game,folder,src);
							repeatQuestion.alpha = 1;
						}
					break;
					case "text":
						if(src != ""){
							writeQuestion(game,src, "500", posY);
						}
					break;		
				}
			}
		}
	}
	

	//=======================================================================			
	// WRITE QUESTION
	//=======================================================================	
	function writeQuestion(game,src, x, y){				
		var states = newXML.items[numQuestion].getStates();		
		var srcImg = states[0].getSrc();
		
		if(srcImg != ""){	multiLineText(src, "36px Helvetica", "rgb(" + newXML.items[numQuestion].getRgb().replace(/-/g,",") + ")", 500,90,20,30);		}
		else			{	multiLineText(src, "36px Helvetica", "rgb(" + newXML.items[numQuestion].getRgb().replace(/-/g,",") + ")", 50,90,50,30);		}
		activeQuestionText = true;		
	}
	
	//=====================================================
	// SET IMAGE QUESTION
	//=====================================================
	function setImageQuestion(game,folder, src, x, y){
		questionImage = new Bitmap("game/" + folder + "/images/" + src);
		questionImage.image.onload 	= function(){
			var scale = getImageScale(questionImage.image.width,questionImage.image.height,438);
			questionImage.scaleX 	= scale;
			questionImage.scaleY 	= scale;
			questionImage.x 		= x;
			questionImage.y 		= y;
			activeQuestionImage 	= true;
			containerText.addChild(questionImage);
		}
	}
	
	//=====================================================
	// PLAY SOUND QUESTION
	//=====================================================
	function playSoundQuestion(i,game,folder,src){
        PFSound.play('question'+i);
		repeatQuestion.onPress 	= function(){ 
			PFSound.play('question'+i); 
		}		
	}
			
	//=======================================================================
	// CONTROL RESULT : evaluate if answers are OK; all answers must be ok 
	//=======================================================================
	function controlResult(game){
		var answerXML = newXML.items[numQuestion].getAnswer();
		var ok=false;
		if ( answerInput.toLowerCase() == answerXML.toLowerCase() ){
			ok = true;
			numOkAnswers++;
		}		
		return ok;
	}
	
	//=======================================================================
	// CLEAN PAGE: delete all question infortmation showed
	//=======================================================================
	function cleanPage(game,folder){	

		if (activeQuestionText){
			containerText.removeChild(questionText);
			activeQuestionText = false;
		}
		if (activeQuestionImage){
			containerText.removeChild(questionImage);
			activeQuestionImage = false;
		}
		if(activeRepeatQuestion){
			containerText.removeChild(repeatQuestion);
			activeRepeatQuestion = false;
		}
		containerText.removeAllChildren();
	}
	
	//=======================================================================
	// MULTILINE TEXT
	//=======================================================================
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
			questionOffset+= separation;
			containerText.addChild(txtQuestion);				
		}
	}	

	//=======================================================================
	// CLEAR SOUNDS 
	//=======================================================================		
	this.onClearSounds = onClearSounds;
    function onClearSounds(){

		//FIXME: Create an abstract function in baseGame called clearPage (only needed for html elements)
		var element = document.getElementById('inputDiv');	//Delete input
		if(element != null)
	    	element.parentNode.removeChild(element);	
    	
        for(i=0;i<items.length;i++){
            PFSound.unload("question"+i);
        }
        PFSound.unload('tick');
    }
}
