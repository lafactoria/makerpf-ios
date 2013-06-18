//*****************************************************
// File: PFTime.js 
// PFTime: Load portada stage
//*****************************************************/

 function PFTime(){
 
	//=====================================================
	// VARIABLES
	//=====================================================
	var currentTime;
	var PFTimeListeners = new PFTimeListener();

	//=====================================================
	// onUpdate
	//=====================================================
	this.onUpdate = onUpdate;
	function onUpdate(pSecondsElapsed){
	}
	//=====================================================
	// registerTimeListener
	//=====================================================
	this.registerTimeListener = registerTimeListener;
	function registerTimeListener(PFTimeListener){
	}
	//=====================================================
	// notifyTimeNearToFinish
	//=====================================================
	this.notifyTimeNearToFinish = notifyTimeNearToFinish;
	function notifyTimeNearToFinish(){
	}
	//=====================================================
	// notifyTimeFinished
	//=====================================================
	this.notifyTimeFinished = notifyTimeFinished;
	function notifyTimeFinished(){
	}
}