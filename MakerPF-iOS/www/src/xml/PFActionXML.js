//*****************************************************
// File: PFActionXML.js 
// PFActionXML: Read Action XML
//*****************************************************/

function PFActionXML(){
	
	//=======================================================================				// LOAD ACTIONS: load the corresponding animation if there's any interaction	//=======================================================================
	this.load = load;	function load(folder, action){		if (action!=""){			actionState = true;			if  ( window.XMLHttpRequest )	{ xmlhttp = new XMLHttpRequest();					}
			else							{ xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");	}
						xmlhttp.open("GET","game/"+folder+"/actions/"+action+".xml",false);			xmlhttp.send();			xmlDoc = xmlhttp.responseXML; 			/********** MOVE **********/			var x = xmlDoc.getElementsByTagName("move");			this.actionMove = new Array(x.length);			for (i = 0;i<x.length;i++){				this.actionMove[i] = new Array(3);				this.actionMove[i][0] = x[i].attributes.getNamedItem('x').nodeValue;				this.actionMove[i][1] = x[i].attributes.getNamedItem('y').nodeValue;				this.actionMove[i][2] = x[i].attributes.getNamedItem('duration').nodeValue;			}			/********** SCALE **********/			var x = xmlDoc.getElementsByTagName("scale");			this.actionScale = new Array(x.length);			for (i = 0;i<x.length;i++){				this.actionScale[i] = new Array(2);				this.actionScale[i][0] = x[i].attributes.getNamedItem('scale').nodeValue;				this.actionScale[i][1] = x[i].attributes.getNamedItem('duration').nodeValue-15;				}			/********** ROTATE **********/			var x = xmlDoc.getElementsByTagName("rotate");			this.actionRotation = new Array(x.length);			if (x.length>0){				this.actionRotation = new Array(x.length+1);			}else{				this.actionRotation = new Array(x.length);			}			for (i = 0;i<x.length;i++){				this.actionRotation[i] = new Array(2);				this.actionRotation[i][0] = x[i].attributes.getNamedItem('angle').nodeValue;				this.actionRotation[i][1] = x[i].attributes.getNamedItem('duration').nodeValue;			}			if (this.actionRotation.length>0){				this.actionRotation[x.length] = new Array(2);				this.actionRotation[x.length][0] = 0;				this.actionRotation[x.length][1] = 0;			}			/********** JUMP **********/			var x = xmlDoc.getElementsByTagName("jump");			this.actionJump = new Array(x.length);			for (i = 0;i<x.length;i++){				this.actionJump[i] = new Array(3);				this.actionJump[i][0] = x[i].attributes.getNamedItem('height').nodeValue;				this.actionJump[i][1] = x[i].attributes.getNamedItem('jumps').nodeValue;				this.actionJump[i][2] = x[i].attributes.getNamedItem('duration').nodeValue;			}		}else{			actionState = false;		}	}
	
	//=======================================================================				// GET ACTION	//=======================================================================
	this.getAction = getAction;
	function getAction(){		if (actionState){			if(this.actionMove.length>0)		{ return this.actionMove;		}			if(this.actionScale.length>0)		{ return this.actionScale;		}			if(this.actionRotation.length>0)	{ return this.actionRotation;	}			if(this.actionJump.length>0)		{ return this.actionJump;		}			if(this.actionSound != "")			{	}		}	}	
	
	//=======================================================================				// GET ACTION XXX	//=======================================================================	
	this.getActionMove		= function()	{ return this.actionMove;		}	this.getActionScale		= function()	{ return this.actionScale;		}	this.getActionRotation	= function()	{ return this.actionRotation;	}	
	this.getActionJump		= function()	{ return this.actionJump;		}		
}