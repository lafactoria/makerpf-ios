//*****************************************************
// File: PFStorage.js 
// PFStorage: Save image into storage
//*****************************************************/

var PFStorage = function(){

	//=======================================================================			
	// SAVE
	//=======================================================================
	this.save = save;
	function save(platform){
		switch(platform){		
			case "ANDROID":
				navigator.Screenshot.show('Dibuix guardat!');
			break;
			
			case "IOS":
                navigator.Screenshot.saveScreenshot();
			break;
		}
	}	
}