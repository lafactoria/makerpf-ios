//*************************************************************
//	File: PFGameTouchListenListen.js 
//	PFGameTouchListenListen: listener of listen and touch game
//*************************************************************

var PFGameTouchListenListen = function(){
	
	//=====================================================
	// VARIABLES
	//=====================================================
	var decoratorAction = new PFItemDecoratorAction();
	var actual;

	this.onTouch=onTouch;
	this.playSound=playSound;
	this.getActual=getActual;
	this.setActual=setActual;
	this.repeatSound=repeatSound;
	
	//=====================================================
	// onTouch: animate
	//=====================================================
	function onTouch(i,game,xml,items,folder){
		
		var decoratorAction = new PFItemDecoratorAction();
		
		var actionXML = new PFActionXML();
		actionXML.load(folder, xml.items[i].getAction());	
		actions = actionXML.getAction();

		if(actionXML.getActionScale().length > 0){
			xml.items[i].setActionScale(actions);
			decoratorAction.calculateScale(i,0,xml.items[i].getActionScale(),items);
		}
		if(actionXML.getActionRotation().length > 0){
			xml.items[i].setActionRotation(actions);
			decoratorAction.calculateRotation(i,0,xml.items[i].getActionRotation(),items);
		}
		if(actionXML.getActionMove().length > 0){
			xml.items[i].setActionMove(actions);
			decoratorAction.calculateMovementX(i,0,items,xml,game);
			decoratorAction.calculateMovementY(i,0,items,xml,game);
		}
		if(actionXML.getActionJump().length > 0){
			xml.items[i].setActionJump(actions);
			decoratorAction.calculateMovementJump(xml.items[i].getActionJump(),xml,xml.items[i].getY(),i,game);
			decoratorAction.calculateJump(i,0,items,xml,game);
		}
	}
	
	//=====================================================
	// PLAY SOUND	
	//=====================================================
	function playSound(i,game,xml){
		actual 		= i;
		var itSound = xml.items[i].getSound();
		if(itSound != ""){
			PFSound.play("sound"+i);
		}
	}
	//=====================================================
	// PLAY SOUND ERROR
	//=====================================================
	function playSoundError(){
		//sound.play();
	}
	//=====================================================
	// REPEAT SOUND
	//=====================================================
	function repeatSound(){
		PFSound.play("sound"+actual);
	}
	//=====================================================
	// SETS
	//=====================================================
	function setActual(act){
		actual = act;
	}
	//=====================================================
	// GETS
	//=====================================================
	function getActual(){
		return actual;	
	}
}


