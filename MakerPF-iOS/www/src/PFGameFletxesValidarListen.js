var PFGameFletxesValidarListen = function(){
	//Variables
	var pressed=-1;
	var into=-1;
	var posX;
	var posY;
	var selectedColor;
	var ok=true;
	var lineShape;
	var lineGraphics;
	var j;
	var relationsAux;
	var statistics;
	
	//Functions declaration
	this.onTouch=onTouch;
	this.onMouseMove=onMouseMove;
	this.onMouseUp=onMouseUp;
	this.getPressed=getPressed;
	this.setInto=setInto;
	this.validate=validate;
	this.setRelations=setRelations;
	this.getStatistics=getStatistics;

	function setRelations(relations){
		relationsAux=relations;
	}
	
	function validate(xml,game,containerBase){
		var i=0;
		statistics=new Array(0,0,0);
		while(xml.getItems(game)[i].getGroup()=="left"){
			statistics[0]+=xml.getItems(game)[i].getRelations().length;
			for(j=0;j<relationsAux[i].length;j++){
				for(var n=0;n<xml.getItems(game)[i].getRelations().length;n++){
					if(relationsAux[i][j]==xml.getItems(game)[i].getRelations()[n]){
						statistics[1]++;
					}
				}
				statistics[2]++;
			}
			i++;
		}
	}

	function getStatistics(){
		return statistics;
	}

	//Functions
	function onTouch(i,game,xml,containerPrincipal,evt){
		pressed=i;

		selectedColor = Graphics.getRGB(Math.random()*255 | 0 ,Math.random()*255 | 0, Math.random()*255 | 0);

		lineShape = new Shape();
		lineGraphics = new Graphics();
		lineShape.graphics = lineGraphics;
		containerPrincipal.addChild(lineShape);
		posX=evt.stageX;
		posY=evt.stageY;
		
		//PLAY THE SOUND ASSOCIED WIDTH THE SPRITE
		var itSound = xml.getItems(game)[i].getSound()
		if(itSound != ""){
			PFSound.play("sound"+i);
		}
	}
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
	function onMouseUp(i,game,xml,containerPrincipal){
		if(into!=-1 && xml.getItems(game)[i].getGroup()!=xml.getItems(game)[into].getGroup()){
			for(j=0;j<relationsAux[i].length;j++){
				if(relationsAux[i][j]==xml.getItems(game)[into].getId()){
					ok=false;
				}
			}
			for(j=0;j<relationsAux[into].length;j++){
				if(relationsAux[into][j]==xml.getItems(game)[i].getId()){
					ok=false;
					relationsAux[i].splice(0,0,xml.getItems(game)[into].getId());
				}
			}
			if(ok){
				relationsAux[i].splice(0,0,xml.getItems(game)[into].getId());
				relationsAux[into].splice(0,0,xml.getItems(game)[i].getId());
			}
		}
		if(!ok || into==-1 || xml.getItems(game)[i].getGroup()==xml.getItems(game)[into].getGroup()){
			containerPrincipal.removeChild(lineShape);
		}
		into=-1;
		pressed=-1;
		ok=true;
	}
	function getPressed(){
		return pressed;
	}
	function setInto(num){
		into = num;
	}
}


