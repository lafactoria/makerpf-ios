//*****************************************************
// File: PFXMLPuzzle.js 
// PFXMLPuzzle: Read Puzzle XML
//*****************************************************/

var PFXMLPuzzle = PFXMLParser.extend(function(){
   	this.superc.call(this);	
});

	//=====================================================
	// LOAD ITEMS
	//=====================================================				
	PFXMLPuzzle.prototype.loadItems = function(xmlDoc,folder){			
		x = xmlDoc.getElementsByTagName("item");
		itemsPuzzle = new Array();		
		
		for  (var i = 0; i < x.length; i++){
			var srcSound = this.SelectSoundXML(x[i].getElementsByTagName("sounds"));

				PFItemPuzzle.prototype = new PFItem(x[i].attributes.getNamedItem("src").nodeValue,
													x[i].attributes.getNamedItem("x").nodeValue,
													x[i].attributes.getNamedItem("y").nodeValue,
													x[i].attributes.getNamedItem("scale").nodeValue,
													x[i].attributes.getNamedItem("rotation").nodeValue,folder);
				
				var textItem = this.SelectTextXML(x[i].getElementsByTagName("texts"));
				
				itemsPuzzle.push( new PFItemPuzzle(	x[i].attributes.getNamedItem("scaleActive").nodeValue,
													x[i].attributes.getNamedItem("action").nodeValue,
													x[i].attributes.getNamedItem("actionLoops").nodeValue,
													x[i].attributes.getNamedItem("run").nodeValue,
													x[i].attributes.getNamedItem("sound").nodeValue,
													x[i].attributes.getNamedItem("finalX").nodeValue,
													x[i].attributes.getNamedItem("finalY").nodeValue,folder,
													textItem,
													x[i].attributes.getNamedItem("rgb").nodeValue));	
		}				
		return itemsPuzzle;
	}	
					
	//=====================================================
	// OTHER FUNCTIONS
	//=====================================================					
	PFXMLPuzzle.prototype.loadCustom = function(xmlDoc, folder){	}	
	PFXMLPuzzle.prototype.hasEndGame = function(){ return true; }