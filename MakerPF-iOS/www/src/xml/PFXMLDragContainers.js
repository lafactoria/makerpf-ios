//*****************************************************
// File: PFXMLDragContainers.js 
// PFXMLDragContainers: Read Drag Containers XML
//*****************************************************/

var PFXMLDragContainers = PFXMLParser.extend(function(){
   	this.superc.call(this);	
	//=====================================================
	// VARIABLES
	//=====================================================	
	this.itemsPare = null;   	
	this.itemsDiscard = 0;
});

	//=====================================================
	// LOAD ITEMS
	//=====================================================				
	PFXMLDragContainers.prototype.loadItems = function(xmlDoc,folder){		
		x = xmlDoc.getElementsByTagName("item");	
		var itemsDrag = new Array();		for  (i = 0; i < x.length; i++){			var srcSound = this.SelectSoundXML(x[i].getElementsByTagName("sounds"));
				
			PFItemFastDrag.prototype = new PFItem(	x[i].attributes.getNamedItem("src").nodeValue,
													x[i].attributes.getNamedItem("x").nodeValue,
													x[i].attributes.getNamedItem("y").nodeValue,
													x[i].attributes.getNamedItem("scale").nodeValue,
													x[i].attributes.getNamedItem("rotation").nodeValue,folder);
			var textItem = this.SelectTextXML(x[i].getElementsByTagName("texts"));			itemsDrag.push( new PFItemFastDrag(x[i].attributes.getNamedItem("parent").nodeValue,"",folder,
												textItem,
												x[i].attributes.getNamedItem("rgb").nodeValue,
												x[i].attributes.getNamedItem("kind").nodeValue));			}			
				x = xmlDoc.getElementsByTagName("parent");		this.itemsPare = new Array();					for  (i = 0; i < x.length; i++){			PFItemFastDragParent.prototype = new PFItem(x[i].attributes.getNamedItem("src").nodeValue,
														x[i].attributes.getNamedItem("x").nodeValue,
														x[i].attributes.getNamedItem("y").nodeValue,
														x[i].attributes.getNamedItem("scale").nodeValue,
														x[i].attributes.getNamedItem("rotation").nodeValue,folder);
			
			var textItem = this.SelectTextXML(x[i].getElementsByTagName("texts"));
						this.itemsPare.push(new PFItemFastDragParent(x[i].attributes.getNamedItem("id").nodeValue,"",folder,
															textItem,
															x[i].attributes.getNamedItem("rgb").nodeValue,
															x[i].attributes.getNamedItem("kind").nodeValue));	
			if(x[i].attributes.getNamedItem("src").nodeValue == ""){
				var thisChildren = x[i].getElementsByTagName("item");
				this.itemsDiscard = thisChildren.length;
			}		}			
					
		return itemsDrag;
	}		
	//=====================================================
	// OTHERS
	//=====================================================					
	PFXMLDragContainers.prototype.loadCustom = function(xmlDoc, folder){ }
	PFXMLDragContainers.prototype.hasEnd	 = function(){ return true; }