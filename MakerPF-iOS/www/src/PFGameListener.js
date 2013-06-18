//*************************************************************
//	File: PFGameListener.js 
//	PFGameListener:
//*************************************************************

var PFGameListener = function(){

	this.addEventButton = addEventButton;
	
	function onStartGame() {
		
	}

	function onFinishGame(isOK,score) {
		
	}
	
	function onIterationCompleted(isOK,score){
	
	}
	
	function onIterationStart(){
	
	}
	
	//---------------------------------
	// Event button
	//---------------------------------
	function addEventButton(button){
		button.onPress = pressEventHandler;
		button.onMouseOver = overEventHandler;
		button.onMouseOut = outEventHandler;
	}
	
}