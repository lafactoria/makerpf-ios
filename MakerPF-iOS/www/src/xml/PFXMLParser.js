//http://duncanpierce.org/node/185

var PFXMLParser = function(pListener){
	
	//=====================================================
	// VARIABLES
	//=====================================================	
	this.background 	= null;
	this.endGame		= null;
	this.items			= null;
	}	
	
	
	//=====================================================
	// ABSTRACT 
	//=====================================================			
	PFXMLParser.prototype.loadItems			= function(xmlDoc,folder){ }
	PFXMLParser.prototype.loadCustom 		= function(xmlIni,folder){ }
	PFXMLParser.prototype.hasEndGame 		= function(xmlDoc,folder){ }	
	
		
	//=====================================================
	// LOAD MEMORY
	//=====================================================		

	PFXMLParser.prototype.load = function(game, folder){		xmlIni 				= this.loadGameXML(folder);
		xmlDoc				= xmlIni.getElementsByTagName("page")[0];						this.background 	= this.getBackground	(xmlDoc,folder);
		this.backgroundRgb	= this.getBackgroundRgb	(xmlDoc,folder);
		this.items 			= this.loadItems		(xmlDoc,folder);		
							  this.loadCustom		(xmlIni,folder);
		this.endGame 		= this.getEndGameScreen	(folder);	
	}
	
	//=====================================================
	// LOAD GAME XML
	//=====================================================		
	PFXMLParser.prototype.loadGameXML = function(folder){
		if  ( window.XMLHttpRequest )	{ xmlhttp = new XMLHttpRequest();						}
		else							{ xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");		}
				xmlhttp.open("GET","game/"+folder+"/game.xml",false);		xmlhttp.send();		xmlIni = xmlhttp.responseXML;
		return xmlIni;
	}
	
	//=====================================================
	// GET BACKGROUND SRC
	//=====================================================		
	PFXMLParser.prototype.getBackground = function(xmlDoc,folder){
		var x  = xmlDoc.getElementsByTagName("background");
		var scale = "noscale";
		var src = "";
		if(typeof(x[0]) != "undefined"){
			if(x[0].attributes.getNamedItem('scale') != null){
				scale = x[0].attributes.getNamedItem('scale').nodeValue;
				src = x[0].attributes.getNamedItem('src').nodeValue;
			}
		}
				return new Background(src,0,0,folder,scale);
		
	}
	//=====================================================
	// GET BACKGROUND RGB
	//=====================================================	
	PFXMLParser.prototype.getBackgroundRgb = function(xmlDoc,folder){
		var x  = xmlDoc.getElementsByTagName("background");
		
		var rgb = "0-0-0";
		if(typeof(x[0]) != "undefined"){
			if(x[0].attributes.getNamedItem('rgb') != null){
				rgb = x[0].attributes.getNamedItem('rgb').nodeValue;
			}	
		}			
		return rgb.split("-");
	}

	//=====================================================
	// GET END GAME SCREEN
	//=====================================================			
	PFXMLParser.prototype.getEndGameScreen = function(folder){
		if(this.hasEndGame()){
			if  ( window.XMLHttpRequest )	{ xmlhttp = new XMLHttpRequest();						}
			else							{ xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");		}
				
			xmlhttp.open("GET","game/"+folder+"/end_game.xml",false);			xmlhttp.send();			xmlDoc 	= xmlhttp.responseXML; 			x 		= xmlDoc.getElementsByTagName("image");
			return new Background(x[0].attributes.getNamedItem('src').nodeValue,0,0,folder);		
		}
	}
	
	//=======================================================================			
	// SELECT SOUND XML : DEPENDING IN LANGUAGE
	//=======================================================================		
	PFXMLParser.prototype.SelectSoundXML = function(tagSnd){		
	
		var src = "";
		if( typeof(tagSnd[0]) != 'undefined' &&
			typeof(tagSnd[0].getElementsByTagName("sound")[0]) != 'undefined'){	
			
			for(var i = 0; i< tagSnd[0].getElementsByTagName("sound").length; i++){
				if(tagSnd[0].getElementsByTagName("sound")[i].attributes.getNamedItem("lang").nodeValue==lang){
					src = lang + "/" + tagSnd[0].getElementsByTagName("sound")[i].attributes.getNamedItem("src").nodeValue;					
				}	
			}
		}
		return src;
	}

	
	//=======================================================================			
	// SELECT TEXT : DEPENDING IN LANGUAGE
	//=======================================================================			PFXMLParser.prototype.SelectTextXML = function(tagText){		
		var txt = "";

		if( typeof(tagText[0]) != 'undefined' &&					
			typeof(tagText[0].getElementsByTagName("text")[0]) != 'undefined'){			
				
			for(var i = 0; i< tagText[0].getElementsByTagName("text").length; i++){
				if(tagText[0].getElementsByTagName("text")[i].attributes.getNamedItem("lang").nodeValue==lang){
					txt = tagText[0].getElementsByTagName("text")[i].attributes.getNamedItem("text").nodeValue;	
				}
			}
		}
		return txt;
	}
		
