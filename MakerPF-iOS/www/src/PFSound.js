var PFSound = {
  
  	init: function(){
  		if(playDevice == "WEB"){
			soundManager.preferFlash = false;
			soundManager.flashVersion = (window.location.toString().match(/#flash8/i)?8:9);
			if (soundManager.flashVersion != 8) {
			  	soundManager.useHighPerformance = true;
			}
			soundManager.setup({
				url: 'swf/', // path to load SWF from (overriding default)
				wmode: 'transparent',
				debugMode: false,
				consoleOnly: false,
				useFlashBlock: true,
				defaultOptions: {
				    autoLoad: true
				}
			});
  		}
  	},
  
	load: function ( id, assetPath, success, fail) {
		if(playDevice == "IOS")
		    return cordova.exec(success, fail, "LowLatencyAudio", "preloadFX", [id, assetPath]);
		if(playDevice == "WEB")
			soundManager.createSound(id,assetPath);	
	},  

	unload: function (id, success, fail) {
		if(playDevice == "IOS")
	    		return cordova.exec(success, fail, "LowLatencyAudio", "unload", [id]);
		if(playDevice == "WEB"){
			soundManager.unload(id);
			soundManager.destroySound(id);
		}  
	}, 

	play: function (id, success, fail) {
		if(playDevice == "IOS")
			return cordova.exec(success, fail, "LowLatencyAudio", "play", [id]);
		if(playDevice == "WEB")
			soundManager.play(id);
	},
	
	stop: function (id, success, fail) {
		if(playDevice == "IOS")
		    return cordova.exec(success, fail, "LowLatencyAudio", "stop", [id]);
	    if(playDevice == "WEB")
	    	soundManager.stop(id);
	}
}
