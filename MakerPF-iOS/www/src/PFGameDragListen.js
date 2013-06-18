//*************************************************************
//	File: PFGameDragListen.js 
//	PFGameDragListen: listener drag's game
//*************************************************************

function PFGameDragListen(){

	this.onMouseMove 	= onMouseMove;
	this.onMouseUp 		= onMouseUp;
	this.onTouch 		= onTouch;
	
	//======================================================================			
	// onMouseUp: stop drag and drop; resize and position control
	//======================================================================
	function onMouseUp(target,xml,i,game,scaleFactor){
		if(target.y>600){
			var posx = parseFloat(xml.items[i].getX());
			var posy = parseFloat(xml.items[i].getY());
			
			Tween.get(target).to({x:posx},200).play(Tween.get(target).to({y:posy},200));
			Tween.get(target).to({scaleX:scaleFactor},300).play(Tween.get(target).to({scaleY:scaleFactor},300));
		}
	}
	//======================================================================			
	// onMouseMove: drag and drop; control resize 
	//======================================================================
	function onMouseMove(ev,target,xml,i,game,offset,kind){
		target.x = ev.stageX+offset.x;
		target.y = ev.stageY+offset.y;
		if(kind == 1){
			if(target.y<620){
				var newScale = getImageScale(target.image.width,target.image.height,300);
				Tween.get(target).to({scaleX:newScale},300).play(Tween.get(target).to({scaleY:newScale},300));
			}
		}
	}
    //======================================================================			
	// onTouch: play sound
	//======================================================================
	function onTouch(i,game,xml){
		var itSound = xml.items[i].getSound();
		if(itSound != ""){
            PFSound.play("sound"+i);
		}
	}
}