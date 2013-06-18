//*************************************************************
//	File: PFFastDragListen.js 
//	PFFastDragListen: Listener of fastDrag game 
//*************************************************************
function PFFastDragListen(){
	
	//=====================================================
	// VARIABLES
	//=====================================================	
	var posX;
	var posY;
	var moure			= true;
	var correct 		= false;
	var itemMoviment 	= -1;
	var i;
	
	this.onMouseMove 	= onMouseMove;
	this.onMouseUp 		= onMouseUp;
	this.getPosition	= getPosition;
	this.loadAnimation 	= loadAnimation;
	this.getFinal 		= getFinal;
	this.getCorrect 	= getCorrect;
	this.getItem 		= getItem;
	
	//=====================================================
	// getFinal: Tell us if it's end game
	//=====================================================
	function getFinal(total){
		if(total == 1 && moure == false){
			var fi = true;
		}else{
			var fi = false;
		}
		return fi;
	}
	
	//=====================================================
	// GETS
	//=====================================================
	function getPosition(target){
		posX = target.x;
		posY = target.y;
	}
	function getItem(){
		return itemMoviment;
	}
	function getCorrect(){
		return correct;
	}
	//=====================================================
	// onMouseUp: validate if position is OK
	//=====================================================
	function onMouseUp(target,item,pare,llistaPares,items){
		for(i = 0; i < llistaPares.length; i++){
			if(llistaPares[i].getId()==pare){
				if( Math.abs(target.x - parseFloat(llistaPares[i].getX())) < 80 && Math.abs(target.y - parseFloat(llistaPares[i].getY())) < 200){
					correct 	= true;
					var posPare = i;
				}
			}
		}
		if( correct == false){
			Tween.get(target).to({x:parseFloat(posX)},100).play(Tween.get(target).to({y:parseFloat(posY)},100));
		}
		if( correct == true){
			moure			= false;
			itemMoviment	= item;
			var distancia 	= Math.round(Math.sqrt(Math.pow(llistaPares[posPare].getX()-target.x,2)+Math.pow(llistaPares[posPare].getY()-target.y,2)));
			Tween.get(target).to({x:parseFloat(llistaPares[posPare].getX())},100).play(Tween.get(target).to({y:parseFloat(llistaPares[posPare].getY())},100));
			Tween.get(target).wait(distancia).call(function(){loadAnimation(item,items)});
		}
	}
	//=====================================================
	// loadAnimation: start animation
	//=====================================================
	function loadAnimation(item,items){
		
		var decoratorAction = new PFItemDecoratorAction();
		var actions 		= new Array(27);
		for(i = 0;i < 27;i++){
			actions[i] 		= new Array(2);
			actions[i][0] 	= (i+1)*20;
			actions[i][1] 	= 10;
		}
		decoratorAction.calculateRotation(item,0,actions,items);
		var actions = new Array(10);
		for(i = 0;i < 10;i++){
			actions[9-i] 	= new Array(2);
			actions[9-i][0] = i/10;
			actions[9-i][1] = 35;
		}
		decoratorAction.calculateScale(item,0,actions,items);
		correct = false;
	}
	//=====================================================
	// onMouseMove: drag and drop
	//=====================================================
	function onMouseMove(ev,target,offset){
		target.x = ev.stageX+offset.x;
		target.y = ev.stageY+offset.y;
	}
}