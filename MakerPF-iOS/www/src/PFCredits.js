//*************************************************************
//	File: PFCredits.js 
//	PFCredits: load and show credits 
//*************************************************************
function PFCredits(){

	//=====================================================
	// VARIABLES
	//=====================================================
	var button;
	var container;
	
	this.load = load;
	this.show = show;
	
	//=====================================================
	// LOAD
	//=====================================================
	function load(){
		/*xml = new PFAction();
		xml.ReadPortada("xxx.xml");
		*/
	}
	//=====================================================
	// HIDE
	//=====================================================
	function hide(){
		container.removeAllChildren();
		stage.removeChild(container);
		button.alpha = 1;
	}
	//=====================================================
	// SHOW
	//=====================================================
	function show(creditsButton){
		button		= creditsButton;
		container 	= new Container();
		stage.addChild(container);
		
		var credits = new Bitmap("game/images/creditos.png");
		container.addChild(credits);
		
		var exitB 		= new Bitmap("game/images/bt_creditos_exit.png");
		container.addChild(exitB);
		exitB.onPress 	= hide;
	}
}