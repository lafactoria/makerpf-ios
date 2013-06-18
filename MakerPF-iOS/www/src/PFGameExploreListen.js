//*************************************************************
//	File: PFGameExploreListen.js 
//	PFGameExploreListen: listener explore's game
//*************************************************************

var PFGameExploreListen = function(){
	
	//======================================================================			
	// VARIABLES
	//======================================================================
	var decoratorAction = new PFItemDecoratorAction();
	var anima;
	var j;

	this.onTouch = onTouch;
	
	//======================================================================			
	// onTouch: start animation
	//======================================================================
	function onTouch(i,game,xml,items,folder){			
		anima = true;
		for(j=0;j<decoratorAction.getItem().length;j++){
			if(decoratorAction.getItem()[j] == i){
				anima = false;
			}
		}
		if(anima){			
			var actionXML = new PFActionXML();
			actionXML.load(folder, xml.items[i].getAction());	
			actions = actionXML.getAction();
					
			if(actionXML.getActionScale() != null && actionXML.getActionScale().length > 0 ){
				xml.items[i].setActionScale(actions);
				decoratorAction.calculateScale(i,0,actionXML.getActionScale(),items);
			}
			if(actionXML.getActionRotation() != null && actionXML.getActionRotation().length > 0){
				xml.items[i].setActionRotation(actions);
				decoratorAction.calculateRotation(i,0,actionXML.getActionRotation(),items);
			}
			if(actionXML.getActionMove() != null && actionXML.getActionMove().length > 0){
				xml.items[i].setActionMove(actions);
				decoratorAction.calculateMovementX(i,0,items,xml,game);
				decoratorAction.calculateMovementY(i,0,items,xml,game);
			}
			if(actionXML.getActionJump() != null && actionXML.getActionJump().length > 0){
				xml.items[i].setActionJump(actions);
				decoratorAction.calculateMovementJump(actionXML.getActionJump(),xml,xml.items[i].getY(),i,game);
				decoratorAction.calculateJump(i,0,items,xml,game);
			}
            
			//----------------------------------------------
			//start sound
			//----------------------------------------------
			var itSound = xml.items[i].getSound();
			if(itSound != ""){
				PFSound.play("sound"+i);
			}
		}
	}
}