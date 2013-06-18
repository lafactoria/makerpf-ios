//*****************************************************
// File: PFXMLExplore.js 
// PFXMLExplore: Read Explore XML
//*****************************************************/

var PFXMLExplore = PFXMLParser.extend(function(){
   	this.superc.call(this);	
});

	//=====================================================
	// LOAD ITEMS
	//=====================================================				
	PFXMLExplore.prototype.loadItems = function(xmlDoc,folder){		
		x = xmlDoc.getElementsByTagName("item");	
		var itemsExplore = new Array();		for  (i = 0; i < x.length; i++){			var srcSound = this.SelectSoundXML(x[i].getElementsByTagName("sounds"));
				
			PFItemExplore.prototype = new PFItem(x[i].attributes.getNamedItem("src").nodeValue,
												x[i].attributes.getNamedItem("x").nodeValue,
												x[i].attributes.getNamedItem("y").nodeValue,
												x[i].attributes.getNamedItem("scale").nodeValue,
												x[i].attributes.getNamedItem("rotation").nodeValue, folder);
			
			
			var textItem = this.SelectTextXML(x[i].getElementsByTagName("texts"));
						itemsExplore.push	( new PFItemExplore (	x[i].attributes.getNamedItem("action").nodeValue,
														x[i].attributes.getNamedItem("actionLoops").nodeValue,
														x[i].attributes.getNamedItem("run").nodeValue, srcSound,folder,
														textItem,
														x[i].attributes.getNamedItem("rgb").nodeValue));		}			
		return itemsExplore;
	}	
	
	//=====================================================
	// LOAD CUSTOM
	//=====================================================					
	PFXMLExplore.prototype.loadCustom = function(xmlDoc, folder){ }

	//=====================================================
	// HAS END GAME
	//=====================================================		
	PFXMLExplore.prototype.hasEndGame = function(){ return false; }
	