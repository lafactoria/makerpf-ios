//*****************************************************
// File: PFXMLArrows.js 
// PFXMLArrows: Read Arows XML
//*****************************************************/

var PFXMLArrows = PFXMLParser.extend(function(){
   	this.superc.call(this);	
	this.itemsDiscard = 0;
});

	//=====================================================
	// LOAD ITEMS
	//=====================================================				
	PFXMLArrows.prototype.loadItems = function(xmlDoc,folder){			
		
		var relations;
	    var x2;
		numRelations = 0;       
		var x = xmlDoc.getElementsByTagName("parent");		
	    
		var itemsFletxes = new Array();
	    
		var num = 0;
		for  (i = 0; i < x.length; i++){
	        
			x2 = x[i].getElementsByTagName("item");

			var srcSound = "";
			relations = new Array(x[i].getElementsByTagName("item").length);
			for(n=0;n<relations.length;n++){
				relations[n]=x2[n].attributes.getNamedItem("id").nodeValue;                 
                
	            PFItemFletxes.prototype	= new PFItem(			x2[n].attributes.getNamedItem("src").nodeValue,
																x2[n].attributes.getNamedItem("x").nodeValue,
																x2[n].attributes.getNamedItem("y").nodeValue,
																x2[n].attributes.getNamedItem("scale").nodeValue,
																x2[n].attributes.getNamedItem("rotation").nodeValue,
																folder);
																
				var textItem = this.SelectTextXML(x2[n].getElementsByTagName("texts"));
				
	            itemsFletxes[num] 		= new PFItemFletxes(	"",
																"child",
																x[i].attributes.getNamedItem("id").nodeValue,
																srcSound,
																folder,
																x2[n].attributes.getNamedItem("id").nodeValue,
																"right",
																false,
																0,
																textItem,
																x2[n].attributes.getNamedItem("rgb").nodeValue);
	            
	            num++;
				if(x[i].attributes.getNamedItem("id").nodeValue != "123456789"){
					numRelations++;
				}
	           	
			}
			if(x[i].attributes.getNamedItem("id").nodeValue != "123456789"){
				PFItemFletxes.prototype	= new PFItem(			x[i].attributes.getNamedItem("src").nodeValue,
																x[i].attributes.getNamedItem("x").nodeValue,
																x[i].attributes.getNamedItem("y").nodeValue,
																x[i].attributes.getNamedItem("scale").nodeValue,
																x[i].attributes.getNamedItem("rotation").nodeValue,
																folder);
				
				var textItem = this.SelectTextXML(x[i].getElementsByTagName("texts"));
															
				itemsFletxes[num] 		= new PFItemFletxes(	relations,
																"parent",
																x[i].attributes.getNamedItem("id").nodeValue,
																srcSound,
																folder,
																x[i].attributes.getNamedItem("id").nodeValue,
																"left",
																false,
																0,
																textItem,
																x[i].attributes.getNamedItem("rgb").nodeValue);
				
				num++;
			}
		}
		
		for(i=0;i<num;i++){
			itemsFletxes[i].setNumRelations(numRelations);	
		}
		return itemsFletxes;
	}	
	
	//=====================================================
	// LOAD CUSTOM
	//=====================================================					
	PFXMLArrows.prototype.loadCustom = function(xmlDoc, folder){ }

	//=====================================================
	// HAS END GAME
	//=====================================================		
	PFXMLArrows.prototype.hasEndGame = function(){ return true; }