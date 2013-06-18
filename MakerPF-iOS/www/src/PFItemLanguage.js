//*************************************************************
//	File: PFItemLanguage.js 
//	PFItemLanguage: create particular item properties
//*************************************************************

function PFItemLanguage(id,lang){
	
	//=====================================================
	// VARIABLES
	//=====================================================
	this.id = id;
	this.lang = lang;
	this.getId = getId;
	this.setId = setId;
	this.getLang = getLang;
	this.setLang = setLang;
	this.getLangAbrev = getLangAbrev;
	
	//=====================================================
	// GETS
	//=====================================================
	function getId() {
		return this.id;
	}
	function getLang() {
		return this.lang;
	}
	function getLangAbrev(){
		var langTxt = "";		
		switch(this.id){
			case 1:				
				langTxt = "En";
				break;
			case 2:
				langTxt = "Es";
				break;
			case 3:
				langTxt = "Ca";
				break;
			case 4:
				langTxt = "Fr";
				break;
			case 5:
				langTxt = "De";
				break;				
			case 6:
				langTxt = "It";
				break;
		}
		return langTxt;
	}
	//=====================================================
	// SETS
	//=====================================================
	function setId(id){
		this.id = id;
	}
	function setLang(lang){
		this.lang = lang;
	}
}