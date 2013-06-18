//*****************************************************
// File: PFXMLInteractiveImages.js 
// PFXMLInteractiveImages: Read Interactive XML
//*****************************************************/

var PFXMLInteractiveImages = PFXMLParser.extend(function(){
   	this.superc.call(this);	
});

	//=====================================================
	// LOAD ITEMS
	//=====================================================				
	PFXMLInteractiveImages.prototype.loadItems = function(xmlDoc,folder){		
		var itemsInteractiveImages = new Array();
		var num	= 0;
		var x2;
		x 		= xmlDoc.getElementsByTagName("parent");			
		for  (i = 0; i < x.length; i++){				
			PFItemInteractiveImages.prototype = new PFItem(x[i].attributes.getNamedItem("src").nodeValue,
																	x[i].attributes.getNamedItem("x").nodeValue,
																	x[i].attributes.getNamedItem("y").nodeValue,
																	x[i].attributes.getNamedItem("scale").nodeValue,
																	x[i].attributes.getNamedItem("rotation").nodeValue,
																	folder);
			var srcText="";	
			var srcSound = "";				
			if(typeof(x[i].getElementsByTagName("item")) != 'undefined'){
				x2 = x[i].getElementsByTagName("item");
					
				var relations = new Array(x[i].getElementsByTagName("item").length);
					
				for(n=0;n<relations.length;n++){						
					var srcSound	= this.SelectSoundXML(x2[n].getElementsByTagName("sounds"));
					var srcText		= this.SelectTextXML(x2[n].getElementsByTagName("texts"));					
					var srcDetail	= "";
					if(typeof(x2[n].attributes.getNamedItem("src")) != 'undefined'){						
						srcDetail = x2[n].attributes.getNamedItem("src").nodeValue;								
					}					
				}								
			}				
			itemsInteractiveImages[i] = new PFItemInteractiveImages (srcText,srcDetail,srcSound,folder);							
		}			
		return itemsInteractiveImages;
	}	
		
	//=====================================================
	// LOAD CUSTOM
	//=====================================================					
	PFXMLInteractiveImages.prototype.loadCustom = function(xmlDoc, folder){ }

	//=====================================================
	// HAS END GAME
	//=====================================================		
	PFXMLInteractiveImages.prototype.hasEndGame = function(){ return false; }