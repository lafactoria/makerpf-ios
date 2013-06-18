var PFGameFletxesListen = function(){
	
	//Variables
	var pressed=-1;
	var into=-1;
	var nRel=0;
	var posX;
	var posY;
	var selectedColor;
	var ok=false;
	var lineShape;
	var lineGraphics;
	var finish;
	var j;
	
	//Functions declaration
	this.onTouch	= onTouch;
	this.onMouseMove= onMouseMove;
	this.onMouseUp	= onMouseUp;
	this.getFinish	= getFinish;
	this.getPressed	= getPressed;
	this.setInto	= setInto;
	
	//======================================================================
	// ON TOUCH
	//======================================================================
	function onTouch(i,game,newXML,containerPrincipal,evt){
		pressed=i;

		selectedColor = Graphics.getRGB(Math.random()*255 | 0 ,Math.random()*255 | 0, Math.random()*255 | 0);

		lineShape 			= new Shape();
		lineGraphics 		= new Graphics();
		lineShape.graphics 	= lineGraphics;
		containerPrincipal.addChild(lineShape);
		posX				= evt.stageX;
		posY				= evt.stageY;
		
		//PLAY THE SOUND ASSOCIED WIDTH THE SPRITE
		var itSound = newXML.items[i].getSound()
		if(itSound != ""){
			PFSound.play("sound"+i);
		}
	}
	
	//======================================================================
	// ON MOUSE MOVE
	//======================================================================	
	function onMouseMove(ev){
		//clear previous line
		lineGraphics.clear();
		//stroke style
		lineGraphics.setStrokeStyle(8,1);
		//stroke color
		lineGraphics.beginStroke(selectedColor);
		//draw line from Mouse position to Drone position
		lineGraphics.moveTo(posX, posY);
		lineGraphics.lineTo(ev.stageX, ev.stageY);
	}
	
	//======================================================================
	// ON MOUSE UP
	//======================================================================	
	function onMouseUp(i,game,newXML,containerPrincipal){
		if(into!=-1){
			for(j=0;j<newXML.items[i].getRelations().length;j++){
				if(newXML.items[i].getType()=="parent"){
					if(newXML.items[i].getParent()==newXML.items[into].getParent()){						
						if(newXML.items[i].getRelations()[j]==newXML.items[into].getId()){
							if(!newXML.items[into].getState()){
								ok=true;
								PFSound.play('tick');
								nRel++;
								newXML.items[i].getRelations().splice(j,1);
								for(n=0;n<newXML.items[into].getRelations().length;n++){
									if(newXML.items[into].getRelations()[n]==newXML.items[i].getParent()){
										newXML.items[into].getRelations().splice(n,1);
									}
								}
								newXML.items[into].setState(true);
								//console.log("Cliquem a tipus: "+xml.getItems(game)[into].getType()+" amb estat: "+xml.getItems(game)[i].getState());
							}
						}
					}
				}
			}
			if(newXML.items[i].getType()=="child"){
				//console.log("Cliquem a tipus: "+xml.getItems(game)[i].getType()+" amb id: "+xml.getItems(game)[i].getId());
				if(newXML.items[into].getType()=="parent"){
					if(newXML.items[i].getParent()==newXML.items[into].getId()){
						if(!newXML.items[i].getState()){
							ok=true;
							PFSound.play('tick');							
							nRel++;
							newXML.items[into].getRelations().splice(j,1);
							for(n=0;n<newXML.items[i].getRelations().length;n++){
								if(newXML.items[i].getRelations()[n]==newXML.items[i].getParent()){
									newXML.items[i].getRelations().splice(n,1);
								}
							}
							newXML.items[i].setState(true);
							//console.log("Cliquem a tipus: "+xml.getItems(game)[i].getType()+" amb estat: "+xml.getItems(game)[i].getState());
						}
					}
				}
			}
			
			finish=true;
			
			if(nRel<newXML.items[i].getNumRelations()){
				finish=false;
			}
			/*console.log(xml.getNumRelations());
			finish=true;
			for(j=0;j<(xml.getItems(game).length/2);j++){
				if(xml.getItems(game)[j].getRelations().length!=0){
					finish=false;
				}
			}*/
		}
		if(!ok){
			containerPrincipal.removeChild(lineShape);
		}
		into=-1;
		pressed=-1;
		ok=false;
	}
	
	//======================================================================
	// 
	//======================================================================	
	function getFinish(){
		return finish;
	}
	function getPressed(){
		return pressed;
	}
	function setInto(num){
		into = num;
	}
}


