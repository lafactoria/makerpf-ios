//*************************************************************
//	File: PFGamePuzzleListen.js 
//	PFGamePuzzleListen: listener of puzzle game
//*************************************************************

function PFGamePuzzleListen(){
	
	//=====================================================
	// VARIABLES
	//=====================================================
	var decoratorAction = new PFItemDecoratorAction();
	this.onLoad			= onLoad;
	this.onMouseMove 	= onMouseMove;
	this.onMouseUp 		= onMouseUp;
	this.onTouch 		= onTouch;
	
	//=====================================================
	// onLoad: resize piece 
	//=====================================================
	function onLoad(i,game,xml,items,folder){
		
		var actionXML = new PFActionXML();
		actionXML.load(folder, xml.items[i].getAction());	
		actions = actionXML.getAction();

		if(actionXML.getAction() == "small_big"){
			decoratorAction.calculateScale(i,0,actions,items);
		}
	}
	
	//=====================================================
	// onMouseUp: validate piece position
	//=====================================================
	function onMouseUp(target,xml,i,game,items,container,highcontainer){
		if( Math.abs(target.x - parseFloat(xml.items[i].getFinalX()))<80 && 
			Math.abs(target.y - parseFloat(xml.items[i].getFinalY()))<80){
				Tween.get(target).to({x:parseFloat(xml.items[i].getFinalX())},100).play(Tween.get(target).to({y:parseFloat(xml.items[i].getFinalY())},100));
				xml.items[i].setMarked(true);
				highcontainer.removeChild(items[i]);
				container.addChild(items[i]);
		}
	}
	
	//=====================================================
	// onMouseMove: drag and drop
	//=====================================================
	function onMouseMove(ev,target,offset){
		target.x = ev.stageX+offset.x;
		target.y = ev.stageY+offset.y;
	}
	
	//=====================================================
	// onTouch: play sound
	//=====================================================
	function onTouch(i,game,xml){
		var itSound = xml.items[i].getSound()
		if(itSound != ""){
			PFSound.play("puzzle");
		}
	}
}