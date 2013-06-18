function PFGameDifferencesListen(){
	
	var items1;
	var items2;
	var trobada;
	var trobats = new Array(0);
	var omplir;
	var i, j;
	
	//Declaration functions
	this.checkPos = checkPos;
	this.guardaPosicions = guardaPosicions;
	this.getDif = getDif;
	
	function checkPos(x,y){
		omplir=true;
		for(i=0;i<this.items1.length;i++){
			if((this.items1[i].x<=(x+30) && this.items1[i].x>=(x-30) && this.items1[i].y<=y+30 && this.items1[i].y>=y-30)
			|| (this.items2[i].x<=(x+30) && this.items2[i].x>=(x-30) && this.items2[i].y<=y+30 && this.items2[i].y>=y-30)){
				for(j=0;j<trobats.length;j++){
					if(trobats[j]==i){
						omplir=false;
					}
				}
				if(omplir){
					trobada = i;
					trobats.splice(0,0,i);
					return true;
				}
			}
		}
		return false;
	}
	
	function getDif(){
		return trobada;
	}
	
	function guardaPosicions(items1,items2){
		this.items1 = items1;
		this.items2 = items2;
	}
}