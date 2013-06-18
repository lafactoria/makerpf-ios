//*****************************************************
// File: PFXMLFindMe.js 
// PFXMLFindMe: Read FindeMe XML
//*****************************************************/

var PFXMLFindMe = PFXMLParser.extend(function(){
   	this.superc.call(this);	
	//=====================================================
	// VARIABLES
	//=====================================================	
	this.level 			= null;
	this.numLostItems 	= null;
});

	//=====================================================
	// LOAD ITEMS
	//=====================================================				
	PFXMLFindMe.prototype.loadItems = function(xmlDoc,folder){			
		x = xmlDoc.getElementsByTagName("item");
		itemFindMe = new Array();		
		
		for  (var i = 0; i < x.length; i++){
			var srcSound = this.SelectSoundXML(x[i].getElementsByTagName("sounds"));
			var textItem = this.SelectTextXML(x[i].getElementsByTagName("texts"));
			PFItemFindMe.prototype = new PFItem(x[i].attributes.getNamedItem("src").nodeValue,"","",450,"",folder);	//Constructor amb els atributs del XML (1 element)			itemFindMe. push(new PFItemFindMe("","","","",folder,x[i].attributes.getNamedItem("id").nodeValue,1,0,0,
													textItem,
													x[i].attributes.getNamedItem("rgb").nodeValue));		
		}				
		return itemFindMe;
	}	
	
	//=====================================================
	// LOAD CUSTOM
	//=====================================================		
	PFXMLFindMe.prototype.loadCustom = function(xmlIni,folder){  				
		var lev = xmlIni.getElementsByTagName("level");		this.level = lev[0].attributes.getNamedItem('id').nodeValue;
				var x2 = xmlIni.getElementsByTagName("counter");		this.numLostItems = x2[0].attributes.getNamedItem('n').nodeValue;
		
		if (this.numLostItems == "0")
			this.numLostItems = "1";		
	}
	
	//=====================================================
	// OTHER
	//=====================================================		
	PFXMLFindMe.prototype.hasEndGame = function()				{ return true; }