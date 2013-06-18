//*************************************************************
//	File: PFItemFastDragParent.js 
//	PFItemFastDragParent: create particular item properties
//*************************************************************

function PFItemInteractiveImages(text,img,sound,folder){

	//=====================================================
	// VARIABLES
	//=====================================================
	if(typeof(sound) != 'undefined'){
		if(sound==""){
			this.sound ="";
		}else{
			this.sound = "game/"+folder+"/sounds/"+sound;
		}
	}
	if(typeof(img) != 'undefined'){
		if(folder==""){	
			this.img = "images/"+img;
		}else{
			this.img = "game/"+folder+"/images/"+img;
		}
	}	
	this.text = text;

	this.getText = getText;
	this.getImage = getImage;
	this.getSound = getSound;
	
	//=====================================================
	// GETS
	//=====================================================
	function getText() {
		return this.text;
	}
	function getImage() {
		return this.img;
	}
	function getSound() {
		return this.sound;
	}
}
