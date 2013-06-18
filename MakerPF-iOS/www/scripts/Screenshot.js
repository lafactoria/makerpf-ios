/*
 *  This code is adapted from the work of Michael Nachbaur 
 *  by Simon Madine of The Angry Robot Zombie Factory
 *   - Converted to Cordova 1.6.1 by Josemando Sobral.
 *  2012-07-03
 *  MIT licensed
 */

/*
 * Temporary Scope to contain the plugin.
 *  - More information here:
 *     https://github.com/apache/incubator-cordova-ios/blob/master/guides/Cordova%20Plugin%20Upgrade%20Guide.md
 */

var Screenshot = function(){
	Screenshot.prototype.saveScreenshot = function() {
		//cordovaRef.exec(null, null, "Screenshot", "saveScreenshot", []);
        window.cordova.exec(null, null, "Screenshot", "saveScreenshot", []);
	};
}

navigator.Screenshot = new Screenshot();