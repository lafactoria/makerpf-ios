//*****************************************************
// File: PFXMLPaint.js 
// PFXMLPaint: Read Paint XML
//*****************************************************/

var PFXMLPaint = PFXMLParser.extend(function(){
   	this.superc.call(this);	
	//=====================================================
	// VARIABLES
	//=====================================================	
	this.foreground = null;
	this.fScaleType = "noscale";
});

	//=====================================================
	// LOAD ITEMS
	//=====================================================				
	PFXMLPaint.prototype.loadItems = function(xmlDoc,folder){			
		return null;
	}	
	
	//=====================================================
	// LOAD CUSTOM
	//=====================================================					
	PFXMLPaint.prototype.loadCustom = function(xmlIni, folder){
		xmlDoc = xmlIni.getElementsByTagName("page")[0];
	
		x = xmlDoc.getElementsByTagName("foreground");
		if(typeof(x[0]) != 'undefined' && x[0] != null && x[0] != ''){			this.foreground = x[0].attributes.getNamedItem("src").nodeValue;		
			this.fScaleType = x[0].attributes.getNamedItem("scale").nodeValue;
		}else{
			this.foreground = "null";
			this.fScaleType = "noscale";
		}
	}
	
	//=====================================================
	// HAS END GAME
	//=====================================================		
	PFXMLPaint.prototype.hasEndGame = function(){ return false; }