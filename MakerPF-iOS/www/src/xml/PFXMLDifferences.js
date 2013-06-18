//*****************************************************
// File: PFXMLDifferences.js 
// PFXMLDifferences: Read Differences XML
//*****************************************************/

var PFXMLDifferences = PFXMLParser.extend(function(){
   	this.superc.call(this);	
   	this.orientation = null;
});

	//=====================================================
	// LOAD ITEMS
	//=====================================================				
	PFXMLDifferences.prototype.loadItems = function(xmlDoc,folder){			
		var itemsDifferences = new Array();
		this.orientation	= xmlDoc.getElementsByTagName("orientation")[0].attributes.getNamedItem("value").nodeValue;
		var x				= xmlDoc.getElementsByTagName("image");
		
		for  (i = 1; i < x.length+1; i++){				
			PFBackgroundDifferences.prototype	= new PFItem(x[i-1].attributes.getNamedItem("src").nodeValue,"","","","",folder);				
			itemsDifferences[i] 	= new PFBackgroundDifferences(	x[i-1].attributes.getNamedItem("id").nodeValue,
																	"",
																	"",
																	x[i-1].attributes.getNamedItem("scale").nodeValue,
																	x[i-1].attributes.getNamedItem("rgb").nodeValue);
		}
		x = xmlDoc.getElementsByTagName("item");
		for  (i = 3; i < x.length+3; i++){
			itemsDifferences[i] = new PFItem(	x[i-3].attributes.getNamedItem("src").nodeValue,
												x[i-3].attributes.getNamedItem("x").nodeValue,
												x[i-3].attributes.getNamedItem("y").nodeValue,
												x[i-3].attributes.getNamedItem("scale").nodeValue,
												x[i-3].attributes.getNamedItem("rotation").nodeValue,
												folder);
		}
		
		return itemsDifferences;
	}	
	
	//=====================================================
	// LOAD CUSTOM
	//=====================================================					
	PFXMLDifferences.prototype.loadCustom = function(xmlDoc, folder){ }

	//=====================================================
	// HAS END GAME
	//=====================================================		
	PFXMLDifferences.prototype.hasEndGame = function(){ return true; }