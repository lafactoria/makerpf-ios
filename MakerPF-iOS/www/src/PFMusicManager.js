var PFMusicManager = function() {
	var isPlaying = false;
	
	var getInstance = function() {
		if (!PFMusicManager.singletonInstance) { 
			PFMusicManager.singletonInstance = createInstance();
		}
		return PFMusicManager.singletonInstance;
	}

	var createInstance = function() {
		
		//------------------------------------------------------
		// Here, you return all public methods and variables
		//------------------------------------------------------
		return {
			play: function(){
				var xmlCover = new PFAction();
				xmlCover.ReadOptions("game/options.xml");
				
				var sound = xmlCover.getMusicSrc();				
				if(sound != ""){
					if(!isPlaying){
						PFSound.load("generalMusic","game/sounds/" + sound);						
						PFSound.play("generalMusic");
						isPlaying = true;	
					}
				}
			},
			stop: function(){
				var xmlCover = new PFAction();
				xmlCover.ReadOptions("game/options.xml");
				
				var sound = xmlCover.getMusicSrc();				
				if(sound != ""){
					if(isPlaying){
						PFSound.stop(generalMusic);
						isPlaying = false;
					}
				}
			},		
			getIsPlaying: function(){
				return isPlaying;
			}
		}
	}

	return getInstance();
}
