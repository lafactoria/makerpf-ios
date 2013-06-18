// ============================================================
// EXTEND (For creating inhertance)
// ============================================================
Function.prototype.extend = function(construct){
	construct.prototype = new this();
	construct.prototype.superc = construct.prototype.constructor;
	construct.prototype.constructor = construct;
	return construct;
};


// ============================================================
// GET IMAGE SCALE
// ============================================================
function getImageScale(width,height,size) 
{
	if (width > height)
	{
		if (width > size)		{
			return size/width;
		}
		else		{
			return 1;
		}
	}
	else
	{
		if (height > size)		{
			return size/height;
		}
		else		{
			return 1;
		}
	}
}

function getImageScale2(width,height,sizeX, sizeY){
	
	var scale1 = 1;
	if(width > sizeX){
		scale1 = sizeX/width;
	}	
	
	var scale2 = 1;
	if(height > sizeY){
		scale2 = sizeY/height;
	}
	
	if(scale1 > scale2){
		return scale2;
	}else{
		return scale1;
	}
}
