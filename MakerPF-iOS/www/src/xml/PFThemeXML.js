//*****************************************************/
// PFAction: Load all xmls to variables
//*****************************************************/

function PFThemeXML(){
	
	//Variables
	
	this.cardPositions;
	this.colors;
	this.colorsBottom;
	this.colorsBottomX;
	this.colorsBottomY;
	this.brushSizes;
	this.brushBg;
	this.brushBgX;
	this.brushBgY;
	
	var xmlhttp;
	var xmlIni;
	var xmlDoc;
	
	
	//Function declarations
	this.getCardPositions = getCardPositions;
	this.getPaint 		  = getPaint;
	
	//=====================================================
	// GET CARDS POSITIONS FOR MEMORY 
	//=====================================================	
	function getCardPositions(nCards)	{ 
		if ( window.XMLHttpRequest ) { xmlhttp = new XMLHttpRequest(); }
		else { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
		
		xmlhttp.open("GET","theme/theme.xml",false);
		xmlhttp.send();
		xmlIni = xmlhttp.responseXML;
		xmlDoc 	= xmlIni.getElementsByTagName("theme")[0];
		
		var x 					= xmlDoc.getElementsByTagName("memory");
		
		var pieces = x[0].getElementsByTagName("pieces");
		var positions;
		if(nCards == 8){
			positions = pieces[0].getElementsByTagName("position");
		}else if(nCards == 12){
			positions = pieces[1].getElementsByTagName("position");
		}
	
		this.cardPositions 	= new Array(positions.length);
		for (i = 0; i < positions.length; i++){
			this.cardPositions[i]		= new Array(2);
			this.cardPositions[i][0]	= positions[i].attributes.getNamedItem("x").nodeValue-115;
			this.cardPositions[i][1]	= positions[i].attributes.getNamedItem("y").nodeValue-100;
		}			
	}
	
	//=====================================================
	// GET EVERYTHING FOR PAINT 
	//=====================================================	
	function getPaint(){
		if ( window.XMLHttpRequest ) { xmlhttp = new XMLHttpRequest(); }
		else { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
		
		xmlhttp.open("GET","theme/theme.xml",false);
		xmlhttp.send();
		xmlIni = xmlhttp.responseXML;
		xmlDoc 	= xmlIni.getElementsByTagName("theme")[0];
		
		var x 			= xmlDoc.getElementsByTagName("paint");
		this.colorsBottom 	= "theme/images/paint/" +  x[0].getElementsByTagName("colors")[0].attributes.getNamedItem("bg").nodeValue;
		this.colorsBottomX 	= parseInt(x[0].getElementsByTagName("colors")[0].attributes.getNamedItem("x").nodeValue);
		this.colorsBottomY 	= parseInt(x[0].getElementsByTagName("colors")[0].attributes.getNamedItem("y").nodeValue);
		
		var colorsTag	= x[0].getElementsByTagName("colors")[0].getElementsByTagName("color");
		
		this.colors		= new Array(colorsTag.length);
		for (i = 0; i < colorsTag.length; i++){
			this.colors[i]		= new PFItemPaint(	colorsTag[i].attributes.getNamedItem("src").nodeValue,
													colorsTag[i].attributes.getNamedItem("rgb").nodeValue,
													colorsTag[i].attributes.getNamedItem("x").nodeValue,
													colorsTag[i].attributes.getNamedItem("y").nodeValue,
													true,
													""
												);			
		}
		this.brushBg	= "theme/images/paint/" +  x[0].getElementsByTagName("sizes")[0].attributes.getNamedItem("bg").nodeValue; 
		this.brushBgX 	= parseInt(x[0].getElementsByTagName("sizes")[0].attributes.getNamedItem("x").nodeValue);
		this.brushBgY 	= parseInt(x[0].getElementsByTagName("sizes")[0].attributes.getNamedItem("y").nodeValue);
		var brushesTag = x[0].getElementsByTagName("sizes")[0].getElementsByTagName("size");
		
		this.brushSizes = new Array(brushesTag.length);
		
		for(i = 0; i < brushesTag.length; i++){
			this.brushSizes[i]		= new PFItemPaint(	brushesTag[i].attributes.getNamedItem("src").nodeValue,
													"",
													brushesTag[i].attributes.getNamedItem("x").nodeValue,
													brushesTag[i].attributes.getNamedItem("y").nodeValue,
													false,
													brushesTag[i].attributes.getNamedItem("value").nodeValue
												);	
		
		}
		
	}
}