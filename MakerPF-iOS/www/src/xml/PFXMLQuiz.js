//*****************************************************
// File: PFXMLQuiz.js 
// PFXMLQuiz: Read Quizz XML
//*****************************************************/

var PFXMLQuiz = PFXMLParser.extend(function(){
   	this.superc.call(this);	
});

	//=====================================================
	// LOAD ITEMS
	//=====================================================				
	PFXMLQuiz.prototype.loadItems = function(xmlDoc,folder){		
		x = xmlDoc.getElementsByTagName("parent");	
		var itemsQuiz = new Array();		for  (i = 0; i < x.length; i++){

			var img = x[i].attributes.getNamedItem("src").nodeValue;				
			var rgb = x[i].attributes.getNamedItem("rgb").nodeValue;							
			var question = this.SelectTextXML(x[i].getElementsByTagName("texts"));				
			var sound 	 = this.SelectSoundXML(x[i].getElementsByTagName("sounds"));

			var tagAnswer = x[i].getElementsByTagName("item");				
			var answers = new Array(tagAnswer.length);				
			for (j=0; j<tagAnswer.length;j++){		
				var answer = this.SelectTextXML(tagAnswer[j].getElementsByTagName("texts"));				answers[j] = new PFItemQuizAnswer (answer,					tagAnswer[j].getElementsByTagName("isCorrect")[0].childNodes[0].nodeValue,					tagAnswer[j].attributes.getNamedItem("src").nodeValue				);								}								itemsQuiz.push (new PFItemQuizQuestion(question, img, sound, answers,rgb) );
		}				
		return itemsQuiz;
	}	

	
	//=====================================================
	// LOAD CUSTOM
	//=====================================================					
	PFXMLQuiz.prototype.loadCustom = function(xmlDoc, folder){ }

	//=====================================================
	// HAS END GAME
	//=====================================================		
	PFXMLQuiz.prototype.hasEndGame = function(){ return true; }