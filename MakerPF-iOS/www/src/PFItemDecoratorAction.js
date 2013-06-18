//*************************************************************
//	File: PFItemDecoratorAction.js 
//	PFItemDecoratorAction: create item animation properties
//*************************************************************

function PFItemDecoratorAction(){
	
	//=====================================================
	// VARIABLES
	//=====================================================
	var item = new Array(0);
	var n, l;
	
	this.calculateScale			= calculateScale;
	this.calculateRotation		= calculateRotation;
	this.calculateMovementX 	= calculateMovementX;
	this.calculateMovementY 	= calculateMovementY;
	this.calculateJump 			= calculateJump;
	this.calculateMovementJump 	= calculateMovementJump;
	this.getItem 				= getItem;
	
	//=====================================================
	// GET
	//=====================================================
	function getItem(){
		return item;
	}
	
	//=====================================================
	// CALCULATE SCALE
	//=====================================================
	function calculateScale(i,j,actions,items){
		
		if(j == actions.length){
			for(n=0;n<item.length;n++){
				if(item[n] == i){
					item.splice(n,1);
					break;
				}
			}
		}
		if(j == 0){
			item.splice(0,0,i);

			scalex = items[i].defaultScaleX;
			scaley = items[i].defaultScaleY;	
			
			Tween.get(items[i])		.to({scaleX:parseFloat(actions[0][0]*scalex)},actions[0][1]*scalex)
									.play(Tween.get(items[i])
									.to({scaleY:parseFloat(actions[0][0]*scaley)},actions[0][1]*scaley))
									.call(function(){ calculateScale(i,1,actions,items)});

												
		}else{
			if (j < actions.length){
				scalex = items[i].defaultScaleX;
				scaley = items[i].defaultScaleY;
				Tween.get(items[i])	.to({scaleX:parseFloat(actions[j][0]*scalex)},actions[j][1]*scalex)
									.play(Tween.get(items[i])
									.to({scaleY:parseFloat(actions[j][0]*scaley)},actions[j][1]*scaley))
									.call(function(){calculateScale(i,j,actions,items)});
				j++;
			}
		}
	}
	
	//=====================================================
	// CALCULATE ROTATION
	//=====================================================
	function calculateRotation(i,j,actions,items){
		if(j==actions.length){
			for(n=0;n<item.length;n++){
				if(item[n]==i){
					item.splice(n,1);
					break;
				}
			}
		}	
		
		if(j==0){
			item.splice(0,0,i);						
			Tween.get(items[i]).to({rotation:parseInt(actions[0][0]) + parseInt(items[i].defaultRotation)},parseInt(actions[0][1])).wait(0).call(function(){calculateRotation(i,1,actions,items)});
		}else{
		
			if (j < actions.length){
				Tween.get(items[i]).to({rotation: parseInt(actions[j][0]) + parseInt(items[i].defaultRotation)},parseInt(actions[j][1])).wait(0).call(function(){calculateRotation(i,j,actions,items)});				
				j++;
			}
		}
	}
	
	//=====================================================
	// CALCULATE JUMP
	//=====================================================
	function calculateMovementJump(jumps,xml,offsety,i,game){
		var movimentsjump = new Array((jumps[0][1]*2)+2);
		for (l = 0;l < movimentsjump.length; l++){
				if (l == 0){
					movimentsjump[l] = parseInt(offsety)+parseInt(jumps[l][0])/2;
				}else{
					var resto;
					resto = l % 2;
					if  (resto == 0){ 
						 movimentsjump[l] = parseInt((jumps[0][0]))/2+parseInt(movimentsjump[l-1]);
					}else{
						  movimentsjump[l] = parseInt(-(jumps[0][0]))/2+parseInt(movimentsjump[l-1]);
					}
				}
		}
		xml.items[i].setActionJump(movimentsjump);
	}
	
	//=====================================================
	// CALCULATE MOVEMENT X
	//=====================================================
	function calculateMovementX(i,j,items,xml,game){
		if(j==xml.items[i].getActionMove().length){
			for(n=0;n<item.length;n++){
				if(item[n]==i){
					item.splice(n,1);
					break;
				}
			}
		}
		if(j==0){ 
			item.splice(0,0,i);
			var newX=parseInt(xml.items[i].getX())+parseInt(xml.items[i].getActionMove()[0][0]);
			xml.items[i].setX(newX);
			Tween.get(items[i]).to({x:newX},xml.items[i].getActionMove()[0][2]).wait(0).call(function(){calculateMovementX(i,1,items,xml,game)});
		}else{
			if (j < xml.items[i].getActionMove().length){
				var newX=parseInt(xml.items[i].getX())+parseInt(xml.items[i].getActionMove()[j][0]);
				xml.items[i].setX(newX);
				Tween.get(items[i]).to({x:newX},xml.items[i].getActionMove()[j][2]).call(function(){calculateMovementX(i,j,items,xml,game)});
				j++;
			}
		}
	}
	
	//=====================================================
	// CALCULATE MOVEMENT Y
	//=====================================================
	function calculateMovementY(i,j,items,xml,game){
		if(j==xml.items[i].getActionMove().length){
			for(n=0;n<item.length;n++){
				if(item[n]==i){
					item.splice(n,1);
					break;
				}
			}
		}
		if(j==0){ 
			item.splice(0,0,i);;
			var newY=parseInt(xml.items[i].getY())+parseInt(xml.items[i].getActionMove()[0][1]);
			xml.items[i].setY(newY);
			Tween.get(items[i]).to({y:newY},xml.items[i].getActionMove()[0][2]).wait(0).call(function(){calculateMovementY(i,1,items,xml,game)});
		}else{
			if (j < xml.items[i].getActionMove().length){
				var newY=parseInt(xml.items[i].getY())+parseInt(xml.items[i].getActionMove()[j][1]);
				xml.items[i].setY(newY);
				Tween.get(items[i]).to({y:newY},xml.items[i].getActionMove()[j][2]).call(function(){calculateMovementY(i,j,items,xml,game)});
				j++;
			}
		}
	}
	
	//=====================================================
	// CALCULATE JUMP
	//=====================================================	
	function calculateJump(i,j,items,xml,game){
		if(j==xml.items[i].getActionJump().length){
			for(n=0;n<item.length;n++){
				if(item[n]==i){
					item.splice(n,1);
					break;
				}
			}
		}
		if(j==0){ 
			item.splice(0,0,i);
			Tween.get(items[i]).to({y:xml.items[i].getActionJump()[0]},100).wait(0).call(function(){calculateJump(i,1,items,xml,game)});
		}else{
			if (j < xml.items[i].getActionJump().length){
				Tween.get(items[i]).to({y:xml.items[i].getActionJump()[j]},100).call(function(){calculateJump(i,j,items,xml,game)});
				j++;
			}
		}
	}
}
