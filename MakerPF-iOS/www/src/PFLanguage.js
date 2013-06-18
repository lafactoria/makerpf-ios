//*************************************************************
//	File: PFLanguage.js 
//	PFLanguage: Define language information
//*************************************************************
var PFLanguage = function(pMainContainer, pLangList){	
	//=====================================================
	// VARIABLES
	//=====================================================
	var mainContainer 	= pMainContainer;
	var langList 		= pLangList;
	var container;
	var languageContainers;	
	var showPosition;
	var hidePosition;	
	var status 			= "hidden";	
	var TRANSITION_TIME = 300;
		
	create();
	
	//=======================================================================			
	// CREATE
	//=======================================================================	
	function create(){
		
		if(langList.length>1){
			container = new Container();
			mainContainer.addChild(container);
		
			languageContainers = new Array();
		
			showPosition	= 1024 - langList.length*48 + 5;		 	
			hidePosition	= 1024 - 48 + 5;
			container.x		= showPosition;
					
			var x = 0;		
			for(i = 0; i<langList.length; i++){
				writeLang(langList[i], "25px Helvetica", "#1F1E21", x, 30,255,255,255, false, i);
				x = x+48;
			}	
		
			hide();
			selectLanguage();			
		}
	}
	
	//=======================================================================			
	// WRITE LANGUAGE
	//=======================================================================	
	function writeLang(langItem , font, color, x, y, r, g, b, act, i){
		
		var s;
		if(i == 0)	{ s = new Bitmap("game/images/languagebg_left.png");	}
		else		{ s = new Bitmap("game/images/languagebg.png");			}
			
		//----------------------------------------
		// CENTER OBJECT
		//----------------------------------------	
		s.y = y - 10;
		s.x = x - 7;
				
		var txtLang 		 = new Text(getShortLangName(langItem.lang), font, color);
		s.langItem 			 = langItem;			
		s.onPress 			 = setLanguage;
		s.txt				 = txtLang;
			
		txtLang.textBaseline = "top"; 
		txtLang.textAlign	 = "center";		
		txtLang.x 			 = x + 20 ;
		txtLang.y 			 = y;
		
		container.addChild		(s);			
		container.addChild		(txtLang);
		languageContainers.push	(s);
	}
	
	//=======================================================================			
	// SHOW
	//=======================================================================	
	function show(){
		Tween.get(container).to({x:showPosition},TRANSITION_TIME);
		status = "visible";
	}
	
	//=======================================================================			
	// HIDE
	//=======================================================================	
	function hide(){
		Tween.get(container).to({x:hidePosition},TRANSITION_TIME);
		status = "hidden";
	}	
	
	//=======================================================================			
	// SELECT LANGUAGE
	//=======================================================================		
	function selectLanguage(){

		var t   = languageContainers[0].langItem.id;
		var t2  = lang;		
		lang 	= t;			
		swapLanguages(t2);
	}			
	
	//=======================================================================			
	// SET LANGUAGE
	//=======================================================================		
	function setLanguage(event){
		if(status == "hidden"){
			show();	
		}
		else{
			if(lang != event.target.langItem.id){
				var tempID = event.target.langItem.id;
				swapLanguages(event.target.langItem.id);				
				lang = tempID;				
			}
			hide();
		}
	}	

	//=======================================================================			
	// SWAP LANGUAGES
	//=======================================================================		
	function swapLanguages(langId){
				
		var currentLanguageItem;
		var newLanguageItem;
		
		for(i = 0; i<languageContainers.length; i++){
			if(languageContainers[i].langItem.id == lang)	{	currentLanguageItem = languageContainers[i];	}
			if(languageContainers[i].langItem.id == langId)	{	newLanguageItem 	= languageContainers[i];	}			
		}
					
		var temp   							= newLanguageItem.txt.text;
		var tempId 							= newLanguageItem.langItem.id;
		newLanguageItem		.txt.text 		= currentLanguageItem.txt.text;
		newLanguageItem		.langItem.id 	= currentLanguageItem.langItem.id;		
		currentLanguageItem .txt.text 		= temp;
		currentLanguageItem .langItem.id 	= tempId;
	}

	//=======================================================================			
	// GET SHORT LANG NAME
	//======================================================================			
	function getShortLangName(langName){
		if		(langName == "Inglés") 		return "En";
		else if (langName == "Alemán") 		return "De";
		else if (langName == "Portugués")	return "Pt";		
		else								return langName.substring(0, 2)
	}
	
}