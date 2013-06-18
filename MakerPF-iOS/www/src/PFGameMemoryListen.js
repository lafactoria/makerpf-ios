//*************************************************************
//	File: PFGameMemoryListen.js 
//	PFGameMemoryListen: listener of memory game
//*************************************************************
function PFGameMemoryListen(){

	//=====================================================
	// VARIABLES
	//=====================================================
	var decoratorAction = new PFItemDecoratorAction();
	var actions;
	
	this.onTouch	= onTouch;
	this.onTouchHide= onTouchHide;

	//=====================================================
	// onTouch: animate card
	//=====================================================
	function onTouch(i,xml,items,folder){
		var actionXML = new PFActionXML();
		actionXML.load(folder, xml.items[i].getAction());	
		actions = actionXML.getAction();
					
		if(actionXML.getActionScale().length > 0)	{ decoratorAction.calculateScale	(i,0,actions,items); }
		if(actionXML.getActionRotation().length > 0){ decoratorAction.calculateRotation	(i,0,actions,items); }
	}
	//=====================================================
	// onTouchHide: animate card
	//=====================================================
	function onTouchHide(i,xml,items,folder){
		var actionXML = new PFActionXML();
		actionXML.load(folder, xml.items[i].getAction());	
		actions = actionXML.getAction();
		decoratorAction.calculateScale(i,0,actions,items);
	}
}
