//*************************************************************
//	File: PFGameListenDragListen.js 
//	PFGameListenDragListen: listener of game listen and drag
//*************************************************************

function PFGameListenDragListen(){

	//=====================================================
	// VARIABLES
	//=====================================================
	var count = 0;
	var moved = false;
	var actual;

	this.onMouseMove  	= onMouseMove;
	this.onMouseUp 		= onMouseUp;
	this.playSound		= playSound;
	this.getActual		= getActual;
	this.setActual		= setActual;
	this.repeatSound	= repeatSound;
	
	//=====================================================
	// ON MOUSE UP: stop drag and drop
	//=====================================================
	function onMouseUp(target,xml,i,game,scaleFactor){		
		if (xml.items[i].getState()==1 && count<(xml.items.length-1) && moved){
			moved=false;
			xml.items[i].setState(2);
			do{
				var itemRandom = Math.floor(Math.random()*xml.items.length);
			}while(xml.items[itemRandom].getState()>=1);
			xml.items[itemRandom].setState(1);
            PFSound.stop("sound"+actual);
            PFSound.play("sound"+itemRandom);
			count++;
			actual = itemRandom;
		}
	}
	//=====================================================
	// ON MOUSE MOVE: start drag and drop + control item
	//=====================================================	
	function onMouseMove(ev,target,xml,i,game,offset,kind){
		if (xml.items[i].getState() >= 1){
			moved=true;
			target.x = ev.stageX + offset.x;
			target.y = ev.stageY + offset.y;
			if(target.y<620){
				if(kind == 1){
					var newScale = getImageScale(target.image.width,target.image.height,300);
				}else{
					var newScale = 2;
				}
				Tween.get(target).to({scaleX:newScale},300).play(Tween.get(target).to({scaleY:newScale},300));
			}
		}
	}
	//=====================================================
	// PLAY SOUND
	//=====================================================	
	function playSound(i,game,xml){
		actual = i;
		var itSound = xml.items[i].getSound();
		if(itSound != ""){;
			PFSound.play("sound"+i);
		}
	}
	//=====================================================
	// REPEAT SOUND
	//=====================================================	
	function repeatSound(){
		PFSound.play("sound"+actual);
	}
	//=====================================================
	// SET
	//=====================================================	
	function setActual(act){
		actual = act;
	}
	//=====================================================
	// GET
	//=====================================================	
	function getActual(){
		return actual;	
	}
}