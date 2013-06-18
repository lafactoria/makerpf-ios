//*****************************************************
// File: PFXMLMemory.js 
// PFXMLMemory: Read Memory XML
//*****************************************************/

var PFXMLMemory = PFXMLParser.extend(function(){
   	this.superc.call(this);	
	//=====================================================
	// VARIABLES
	//=====================================================	
	this.redCard 		= null;
	this.CardPositions 	= null;
	this.nItems			= null;
	this.discardItems 	= null;
});

	var discardItems 	= null;

	function getRandomNum(total){
		var num = Math.floor(Math.random()*(total+1));
		if(num == 0){
			num = 1;
		}
		if(!checkTakenNum(num)){
			return num;
		}else{
			getRandomNum(total);
		}
	}
	
	function checkTakenNum(n){
		var found = false;
		for(var i = 0; i < discardItems.length; i++){
			if(n == discardItems[i]){
				found = true;
			}
		}
		return found;
	}
	//=====================================================
	// LOAD ITEMS
	//=====================================================				
	PFXMLMemory.prototype.loadItems = function(xmlDoc,folder){		
		this.nItems = parseInt(xmlDoc.getElementsByTagName("cards")[0].attributes.getNamedItem("n").nodeValue);
		x = xmlDoc.getElementsByTagName("item");
		itemsMemory = new Array();		
		
		var nDiscardItems = (x.length - this.nItems)/2;
		if(nDiscardItems > 0){
			discardItems = new Array(nDiscardItems);	
			for(var i = 0; i < discardItems.length; i++){
				discardItems[i] = getRandomNum(x.length/2);
			}
		}else{	
			discardItems = new Array(1);
			discardItems[0] = -1;
		}
				
		for  (var i = 0; i < x.length; i++){
		
			if(!checkTakenNum(parseInt(x[i].attributes.getNamedItem("id").nodeValue))){
		
				var srcSound = this.SelectSoundXML(x[i].getElementsByTagName("sounds"));

				PFItemMemory.prototype = new PFItem(x[i].attributes.getNamedItem("src").nodeValue,
													x[i].attributes.getNamedItem("x").nodeValue,
													x[i].attributes.getNamedItem("y").nodeValue,
													x[i].attributes.getNamedItem("scale").nodeValue,
													x[i].attributes.getNamedItem("rotation").nodeValue,
													folder);			
				var textItem = this.SelectTextXML(x[i].getElementsByTagName("texts"));
				
				var rgb = "0-0-0";
				if(x[i].attributes.getNamedItem("rgb") != null){
					rgb = x[i].attributes.getNamedItem("rgb").nodeValue;
				}
				itemsMemory.push( new PFItemMemory(	x[i].attributes.getNamedItem("id").nodeValue,
														x[i].attributes.getNamedItem("action").nodeValue,
														x[i].attributes.getNamedItem("actionLoops").nodeValue,
														x[i].attributes.getNamedItem("run").nodeValue,
														srcSound,
														folder,
														textItem,
														rgb));			
			}													
		}				
		return itemsMemory;
	}	
	
	//=====================================================
	// LOAD CUSTOM
	//=====================================================					
	PFXMLMemory.prototype.loadCustom = function(xmlIni, folder){
		xmlDoc = xmlIni.getElementsByTagName("page")[0];
		
		x 					= xmlDoc.getElementsByTagName("card");		this.redCard 		= "game/"+folder+"/images/"+x[0].attributes.getNamedItem('src').nodeValue;		x 					= xmlDoc.getElementsByTagName("position");		this.cardPositions 	= new Array(x.length);		
		for (i = 0; i < x.length; i++){			this.cardPositions[i]		= new Array(2);			this.cardPositions[i][0]	= x[i].attributes.getNamedItem("x").nodeValue-115;			this.cardPositions[i][1]	= x[i].attributes.getNamedItem("y").nodeValue-100;		}			
	}

	
	//=====================================================
	// HAS END GAME
	//=====================================================		
	PFXMLMemory.prototype.hasEndGame = function(){ return true; }