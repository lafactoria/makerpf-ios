//*****************************************************
// File: Singleton.js 
// Singleton: Don't use it
//*****************************************************/
var Singleton = function() {
	var names = [];
	//-------------------------------------------
	// Get the instance of the Singleton class
	// If there's none, instanciate one
	//-------------------------------------------
	var getInstance = function() {
		if (!Singleton.singletonInstance) { 
			Singleton.singletonInstance = createInstance();
		}
		return Singleton.singletonInstance;
	}
	//-------------------------------------------
	// Create an instance of the Singleton class
	//-------------------------------------------
	var createInstance = function() {
		//------------------------------------------------------
		// Here, you return all public methods and variables
		//------------------------------------------------------
		return {
			add : function(name) {
				names.push(name);
				return this.names();
			},
			names : function() {
				return names;
			}
		}
	}

	return getInstance();
}
