//*************************************************************
//	File: PFBaseItem.js 
//	PFBaseItem: Create a generic bitmap with common properties
//*************************************************************
var PFBaseItem = function(pItem,pI){
	
	//=====================================================
	// VARIABLES
	//=====================================================	
	var xml 		= xml;
	var folder 		= folder;
	var game 		= game;
	var imageSrc 	= imageSrc;

	var i 			= pI;		
	var item		= pItem;
	var bitmap;	
	var kind;
	var text = "";
	var textContainer;
	
	create();
	
	//=====================================================
	// CREATE: Create a generic bitmap 
	//=====================================================
	function create(){	
		if(item.getSrc().charAt( item.getSrc().length-1 ) != "/" && item.getSrc().substr(item.getSrc().length - 4) != "null"){		
			kind = 1;
			bitmap = new Bitmap(item.getSrc());	
			bitmap.i = i;
			bitmap.image.onload = function(){			
				var scaleFactor = 1;		
				if(item.getScale() != 1000){
					scaleFactor 	= item.getScale()/1000;
					bitmap.scaleX	= scaleFactor;
					bitmap.scaleY	= scaleFactor;	
				}			
				bitmap.rotation = item.getRotation();
				
				bitmap.defaultScaleX = scaleFactor;
				bitmap.defaultScaleY = scaleFactor;			
				
				offsetx	= parseInt(bitmap.image.width)/2;
				offsety	= parseInt(bitmap.image.height)/2;
				newx	= parseInt(item.getX());
				newy	= parseInt(item.getY());
				
				bitmap.regX 	= offsetx;
				bitmap.regY 	= offsety;
				bitmap.x		= newx;
				bitmap.y		= newy;
				item.setOffsetX(offsetx);
				item.setOffsetY(offsety);	
			}
		}else{
			text = new Container();
			kind = 0;
			textTxt = new Text(item.getText(),"20px Arial","rgb(" + item.getRgb().replace(/-/g,",") + ")");
			
			text.rotation = item.getRotation();
			newx	= parseInt(item.getX());
			newy	= parseInt(item.getY());
			
			text.defaultScaleX = 1;
			text.defaultScaleY = 1;
			text.x 	= newx;
			text.y	= newy;
			
			text.i 	= i;
			text.addChild(textTxt);
			var g = new Graphics();
			g.beginFill(Graphics.getRGB(255,255,255));
			g.drawRect(0,0,textTxt.getMeasuredWidth()+2,24);
			var s = new Shape(g);
				s.x = -1;
				s.y =-22;
				s.alpha = 0.01;
			text.addChild(s);
		}
	}
	
	//=====================================================
	// GETS
	//===================================================== 
	this.getBitmap = function()	{ return bitmap;	}
	this.getKind = function() 	{ return kind; 		}
	this.getText = function()	{ return text; 		}
}