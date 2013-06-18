//*************************************************************
//	File: PFCore.js 
//	PFCore: Calculate and show FPS  
//*************************************************************
var PFCore = function (maxfps) {
    
    ///=====================================================
	// VARIABLES
	//=====================================================
	var canvas 			= document.getElementById('canvas');
    var maxfps 			= maxfps;
    var frameCount 		= 0;
    var currentFps 		= 0;
    var drawInterval 	= 1 / this.maxfps * 1000;
    var lastFps 		= new Date().getTime();
    var canvasCtx 		= null;
	var container;
	
	this.initCore 	= initCore;
	this.startApp 	= startApp;
	this.update 	= update;
	this.draw 	= draw;
	
	//=====================================================
	// initCore: create text ans start value
	//=====================================================
	function initCore() {
		canvasCtx =  canvas.getContext('2d'); //canvas FPS
        setInterval(function(){fps.startApp();}, drawInterval); // Init the interval of the FPS
        return this;
	}
	//=====================================================
	// startApp: call update
	//=====================================================
	function startApp() {
        this.update(); // Update FPS
        this.draw(); // Draw the FPS text
	}
	//=====================================================
	// update: refresh value
	//=====================================================
	function update() {
        // Calculate the time from the last frame
        var thisFrame = new Date().getTime();
        var diffTime = Math.ceil((thisFrame - lastFps));
 
        if (diffTime >= 1000) {
            currentFps = frameCount;
            frameCount = 0.0;
            lastFps = thisFrame;
        }
 
        frameCount++;
	}
	//=====================================================
	// draw: show on screen
	//=====================================================
	function draw() {
        // Clear de text of FPS for realize the refresh
        canvasCtx.clearRect(0, 0, 70, 20);
 
        // Paint de PFS
        canvasCtx.save();
        canvasCtx.font = 'bold 10px sans-serif';
        canvasCtx.fillText('FPS: ' + currentFps + '/' + maxfps, 10,15);
    }
}