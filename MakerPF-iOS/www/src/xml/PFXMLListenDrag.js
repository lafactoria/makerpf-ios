//*****************************************************
// File: PFXMLListenDrag.js 
// PFXMLListenDrag: Read ListenDrag XML
//*****************************************************/

var PFXMLListenDrag = PFXMLParser.extend(function(){
   	this.superc.call(this);	
});

	//=====================================================
	// LOAD ITEMS
	//=====================================================				
	PFXMLListenDrag.prototype.loadItems = function(xmlDoc,folder){		
		x 				= xmlDoc.getElementsByTagName("item");	
		var itemsDrag 	= new Array();
				for  (i = 0; i < x.length; i++){			var srcSound = this.SelectSoundXML(x[i].getElementsByTagName("sounds"));
				
			PFItemListenDrag.prototype = new PFItem(x[i].attributes.getNamedItem("src").nodeValue,
													x[i].attributes.getNamedItem("x").nodeValue,
													x[i].attributes.getNamedItem("y").nodeValue,
													x[i].attributes.getNamedItem("scale").nodeValue,
													x[i].attributes.getNamedItem("rotation").nodeValue,folder);
			
			var textItem = this.SelectTextXML(x[i].getElementsByTagName("texts"));
						itemsDrag.push(new PFItemListenDrag(	x[i].attributes.getNamedItem("scaleActive").nodeValue,
													x[i].attributes.getNamedItem("action").nodeValue,
													x[i].attributes.getNamedItem("actionLoops").nodeValue,
													x[i].attributes.getNamedItem("run").nodeValue,srcSound,folder,0,
													textItem,
													x[i].attributes.getNamedItem("rgb").nodeValue));			}			
		return itemsDrag;
	}	
	
	//=====================================================
	// OTHERS
	//=====================================================					
	PFXMLListenDrag.prototype.loadCustom = function(xmlDoc, folder){ }
	PFXMLListenDrag.prototype.hasEndGame = function(){ return false; }