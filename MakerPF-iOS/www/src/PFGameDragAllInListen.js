//*************************************************************
//	File: PFGameDragListen.js 
//	PFGameDragListen: listener drag all in's game
//*************************************************************

function PFGameDragAllInListen(){
	
	//======================================================================			
	// VARIABLES
	//======================================================================
	var posX;
	var posY;
	var move			= true;
	var correct 		= false;
	var itemMovement 	= -1;
	var i;

	this.onMouseMove 	= onMouseMove;
	this.onMouseUp 		= onMouseUp;
	this.getPosition 	= getPosition;
	this.loadAnimation 	= loadAnimation;
	this.getEnd 		= getEnd;
	this.getCorrect 	= getCorrect;
	this.getItem 		= getItem;
	
	//======================================================================			
	// GETS
	//======================================================================
	function getEnd(total){
		if(total == 1 && move == false){
			var end = true;
		}else{
			var	end = false;
		}
		return end;
	}
	function getPosition(target){
		posX = target.x;
		posY = target.y;
	}
	function getItem(){
		return itemMovement;
	}
	function getCorrect(){
		return correct;
	}
	//======================================================================			
	// onMouseUp: stop drag and drop; check if position is OK
	//======================================================================
	function onMouseUp(target,item,pare,fathersList,items,itemsPare){
		for(i = 0; i < fathersList.length; i++){
			
			if(fathersList[i].getId() == pare)
			{
				var newParent = itemsPare[i];
	
				if(typeof(newParent) != "undefined"){	
					if(typeof(newParent.image) != "undefined"){
						var leftParent = parseInt(fathersList[i].getX()) - newParent.image.width/2;
						var rightParent = parseInt(fathersList[i].getX()) + newParent.image.width/2;
						var topParent = parseInt(fathersList[i].getY()) - newParent.image.height/2;
						var bottomParent = parseInt(fathersList[i].getY()) + newParent.image.height/2;
					}else{
						var leftParent = parseInt(fathersList[i].getX()) - 40;
						var rightParent = parseInt(fathersList[i].getX()) + 40;
						var topParent = parseInt(fathersList[i].getY()) - 40;
						var bottomParent = parseInt(fathersList[i].getY()) + 40;
					}
					
					if (target.x >= leftParent && target.x <= rightParent && target.y >= topParent && target.y <= bottomParent)
					{
						correct				= true;
						var fatherPosition	= i;
					}
				}
			}
		}
		if( correct == false){
			Tween.get(target).to({x:parseFloat(posX)},100).play(Tween.get(target).to({y:parseFloat(posY)},100));
		}
		if( correct == true){
			move = false;
			itemMovement 	= item;
			var distance 	= Math.round(Math.sqrt(Math.pow(fathersList[fatherPosition].getX()-target.x,2)+Math.pow(fathersList[fatherPosition].getY()-target.y,2)));
			Tween.get(target).to({x:parseFloat(fathersList[fatherPosition].getX())},100).play(Tween.get(target).to({y:parseFloat(fathersList[fatherPosition].getY())},100));
			Tween.get(target).wait(distance).call(function(){loadAnimation(item,items)});
		}
	}

	//======================================================================			
	// loadAnimation: start animation
	//======================================================================
	function loadAnimation(item,items){
		
		var decoratorAction = new PFItemDecoratorAction();
		var actions = new Array(27);
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
	//======================================================================			
	// onMouseMove: drag and drop
	//======================================================================
	function onMouseMove(ev,target,offset){
		target.x = ev.stageX+offset.x;
		target.y = ev.stageY+offset.y;
	}
}