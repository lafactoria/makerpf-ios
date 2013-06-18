//*****************************************************
// File: PFXMLQuizText.js 
// PFXMLQuizText: Read QuizzText XML
//*****************************************************/

var PFXMLQuizText = PFXMLParser.extend(function(){
   	this.superc.call(this);	
});

	//=====================================================
	// LOAD ITEMS
	//=====================================================				
	PFXMLQuizText.prototype.loadItems = function(xmlDoc,folder){		
		x = xmlDoc.getElementsByTagName("parent");			
		var itemsQuizText = new Array();
		for  (i = 0; i < x.length; i++){					
			var states = new Array(3);
			//---------------
			// IMAGE
			//---------------
			states[0] = new PFItemQuizGapsQuestionState(	"image",
															x[i].attributes.getNamedItem("src").nodeValue,
															x[i].attributes.getNamedItem("x").nodeValue,
															x[i].attributes.getNamedItem("y").nodeValue);			
			//---------------
			// SOUND
			//---------------
			var soundState 	 = this.SelectSoundXML(x[i].getElementsByTagName("sounds"));
			states[1] = new PFItemQuizGapsQuestionState(	"sound",
															soundState,
															x[i].attributes.getNamedItem("x").nodeValue,
															x[i].attributes.getNamedItem("y").nodeValue);
			//---------------
			// TEXT
			//---------------
			var textState = this.SelectTextXML(x[i].getElementsByTagName("texts"));
			states[2] = new PFItemQuizGapsQuestionState(	"text", 
															textState, 
															x[i].attributes.getNamedItem("x").nodeValue,
															x[i].attributes.getNamedItem("y").nodeValue);
															
			var rgb = x[i].attributes.getNamedItem("rgb").nodeValue;	
							
			itemsQuizText.push(new PFItemQuizGapsQuestion (states, x[i].getElementsByTagName("item")[0].attributes.getNamedItem("answer").nodeValue,rgb));
		}				
		return itemsQuizText;
	}	
		
	//=====================================================
	// LOAD CUSTOM
	//=====================================================					
	PFXMLQuizText.prototype.loadCustom = function(xmlDoc, folder){ }

	//=====================================================
	// HAS END GAME
	//=====================================================		
	PFXMLQuizText.prototype.hasEndGame = function(){ return true; }