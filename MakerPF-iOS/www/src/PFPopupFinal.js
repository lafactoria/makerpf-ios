//*****************************************************
// File: PFPopupFinal.js 
// PFPopupFinal: Load end game popup
//*****************************************************/

function PFPopupFinal(){

	//=====================================================
	// VARIABLES
	//=====================================================
	var soundFinalOK	= new PFSound();
	var soundFinalFail	= new PFsound();
	var showAction		= new PFAction();
	var textFinalOK		= new PFText();
	var textFinalFail	= new PFText();
	
	//=====================================================
	// onStartGame
	//=====================================================
	this.onStartGame = onStartGame;	
	function onStartGame(){
	}
	//=====================================================
	// onFinishGame
	//=====================================================
	this.onFinishGame = onFinishGame;
	function onFinishGame(isOK,score){
	}
	//=====================================================
	// onIterationCompleted
	//=====================================================
	this.onIterationCompleted = onIterationCompleted;
	function onIterationCompleted(isOK,score){
	}
	//=====================================================
	// onIterationStart
	//=====================================================
	this.onIterationStart = onIterationStart;
	function onIterationStart(){
	}
}