(function (window) {
    'use strict';
    var soundManager = null;

/**
 * The SoundManager constructor.
 *
 * @constructor
 * @param {string} smURL Optional: Path to SWF files
 * @param {string} smID Optional: The ID to use for the SWF container element
 * @this {SoundManager}
 * @return {SoundManager} The new SoundManager instance
 */

    function SoundManager(smURL, smID) {
      /**
       * soundManager configuration options list
       * defines top-level configuration properties to be applied to the soundManager instance
       * 
       * @param smID the id is still in for maintaining compatibility in signature wit the original soundmanager2.js
       *
       *  to set these properties, use the setup() method - eg., soundManager.setup({url: '/swf/', flashVersion: 9})
       *  the default configuration for sound objects made with createSound() and related methods
       * eg., volume, auto-load behaviour and so forth
       */
        this.setupOptions = {
            'url': (smURL || null),             // path (directory) where SoundManager 2 SWFs exist, eg., /path/to/swfs/
            'flashVersion': 8,                  // flash build to use (8 or 9.) Some API features require 9.
            'useHighPerformance': false,        // position:fixed flash movie can help increase js/flash speed, minimize lag
            'wmode': null,                      // flash rendering mode - null, 'transparent', or 'opaque' (last two allow z-index to work)
            'debugMode': true,                  // enable debugging output (console.log() with HTML fallback)
            'consoleOnly': true,                // if console is being used, do not create/write to #soundmanager-debug
            'useFlashBlock': false,             // *requires flashblock.css, see demos* - allow recovery from flash blockers. Wait indefinitely and apply timeout CSS to SWF, if applicable.
            'preferFlash': true                // overrides useHTML5audio. if true and flash support present, will try to use flash for MP3/MP4 as needed since HTML5 audio support is still quirky in browsers.
        };
        
        this.defaultOptions = {
        /**
         * the default configuration for sound objects made with createSound() and related methods
         * eg., volume, auto-load behaviour and so forth
         */
            'autoLoad': false,        // enable automatic loading (otherwise .load() will be called on demand with .play(), the latter being nicer on bandwidth - if you want to .load yourself, you also can)
            'autoPlay': false,        // enable playing of file as soon as possible (much faster if "stream" is true)
            'multiShot': true,        // let sounds "restart" or layer on top of each other when played multiple times, rather than one-shot/one at a time
            'position': null,         // offset (milliseconds) to seek to within loaded sound data.
            'pan': 0                 // "pan" settings, left-to-right, -100 to 100
        };
        
        /**
         * private function
         * -----------------------
         */
        var assign, mixin, s = this, execute, base64 = window.btoa, encodeArgument;
        assign = function (o, oParent) {
        /**
         * recursive assignment of properties, soundManager.setup() helper
         * allows property assignment based on whitelist
         */
            var i, result = true, hasParent = (oParent !== 'undefined'), setupOptions = s.setupOptions, extraOptions = {'defaultOptions': 1};
            // if soundManager.setup() called, show accepted parameters.
            if (o === 'undefined') {
                result = [];
                
                for (i in setupOptions) {
                    if (setupOptions.hasOwnProperty(i)) {
                        result.push(i);
                    }
                }
                
                return false;
            }//end if
            
            for (i in o) {
                if (o.hasOwnProperty(i)) {
                    // if not an {object} we want to recurse through...
                    if (typeof o[i] !== 'object' || o[i] === null || o[i] instanceof Array) {
                        // check "allowed" options
                        if (hasParent && typeof extraOptions[oParent] !== 'undefined') {
                        // valid recursive / nested object option, eg., { defaultOptions: { volume: 50 } }
                            s[oParent][i] = o[i];
                        } else if (typeof setupOptions[i] !== 'undefined') {
                            // special case: assign to setupOptions object, which soundManager property references
                            s.setupOptions[i] = o[i];
                            // assign directly to soundManager, too
                            s[i] = o[i];
                        } else if (typeof extraOptions[i] === 'undefined') {
                            // invalid or disallowed parameter. complain.
                            result = false;
                        } else {
                            // good old-fashioned direct assignment
                            s[i] = o[i];
                        }
                    }
                } else {//o.hasOwnProperty
                    // recursion case, eg., { defaultOptions: { ... } }
                    if (typeof extraOptions[i] === 'undefined') {
                        // invalid or disallowed parameter. complain.
                        result = false;
                    } else {
                        // recurse through object
                        return assign(o[i], i);
                    }
                }
            } //for
            
            return result;
        };
        
        mixin = function (oMain, oAdd) {
            // non-destructive merge
            var o1 = (oMain || {}), o2, o;
            // if unspecified, o2 is the default options object
            o2 = (typeof oAdd === 'undefined' ? s.defaultOptions : oAdd);
            
            for (o in o2) {
                if (o2.hasOwnProperty(o) && typeof o1[o] === 'undefined') {
                    
                    if (typeof o2[o] !== 'object' || o2[o] === null) {
                        // assign directly
                        o1[o] = o2[o];
                    } else {
                        // recurse through o2
                        o1[o] = mixin(o1[o], o2[o]);
            
                    }
                }
            }
            
            return o1;
        };

        encodeArgument = function (payload) {
            return base64(JSON.stringify(payload));
        };

        execute = function (url) {
            /**
             * talks with the air webstageview
             * by changing the location href
             */
            window.calledFromJSHandlerFunction(url);
        };
        
        /**
         * Public SoundManager API
         * -----------------------
         */
        
        
        /**
         * Configures top-level soundManager properties.
         *
         * @param {object} options Option parameters,
         */
        this.setup = function (options) {
            assign(options);
            return this;
        };
        
        
        /**
        * Creates a SMSound sound object instance.
        *
        * @param {object} oOptions Sound options (at minimum, id and url parameters are required.)
        */
        this.createSound = function (oOptions, url) {
            if ((typeof oOptions === 'undefined') || typeof url === 'undefined') {
                return;
            } //get out 
            
            var sId, request;
            
            //do id
            if (typeof oOptions === 'string') {
                sId = oOptions;
            } else if (typeof oOptions === 'number') {
                sId = 'sound' + oOptions;
            } else {
                sId = oOptions.id;
            } //
            
            request = encodeArgument({
                'functionName': 'createSound',
                'id': sId,
                'url': url,
                'usePeakData': oOptions.usePeakData || false,
                'useWaveformData': oOptions.useWaveformData || false,
                'useEQData': oOptions.useEQData || false,
                'loops': oOptions.loops || 0,
                'autoPlay': oOptions.autoPlay || false,
                'autoLoad': oOptions.autoLoad || true
            });
            
            execute(request);
            
        };
        
        /**
         * Destroys a SMSound sound object instance.
         *
         * @param {string} sID The ID of the sound to destroy
         * @param fromSoud maintained compatibility
         *
         */
        this.destroySound = function (id, fromSound) {
            if (typeof id === 'undefined') {
                return;
            } //get out 
            
            var request = encodeArgument({
                'functionName': 'destroySound',
                'id': id
            });
            
            execute(request);
            return true;
        };
        
      /**
       * Calls the load() method of a SMSound object by ID.
       *
       * @param {string} sID The ID of the sound
       * @param {object} oOptions Optional: Sound options
       */
        this.load = function (sID, oOptions) {
            //decode options
            //makeEditorCall()
            return true;
        };

        /**
         * Calls the unload() method of a SMSound object by ID.
         *
         * @param {string} id The ID of the sound
         */
        this.unload = function (id) {
            if (typeof id === 'undefined') {
                return;
            } //get out 
            
            var request = encodeArgument({
                'functionName': 'unload',
                'id': id
            });
            
            execute(request);
            return true;
        };
        
        /**
         * Calls the play() method of a SMSound object by ID.
         *
         * @param {string} id The ID of the sound
         * @param {object} oOptions Optional: Sound options
         *
         */
        this.play = function (id, oOptions) {
            if (typeof id === 'undefined') {
                return;
            } //get out 
            
            var options = oOptions || {}, request;
            request = encodeArgument({
                'functionName': 'play',
                'id': id,
                'loops': options.loops || 0,
                'offset': options.offset || false,
                'allowMultiShot': options.allowMultiShot || true
            });
            
            execute(request);
            return true;
        };
        
        this.start = this.play; // just for convenience
        
      /**
       * Calls the stop() method of a SMSound object by ID.
       *
       * @param {string} sID The ID of the sound
       * @return {SMSound} The SMSound object
       */
        this.stop = function (sID) {
            //encode params
            // makeEditor call
            return true;
        };
        
        /**
         * Stops all currently-playing sounds.
         */
        this.stopAll = function () {
            return true;
        };

      /**
       * Calls the pause() method of a SMSound object by ID.
       *
       * @param {string} sID The ID of the sound
       * @return {SMSound} The SMSound object
       */
        this.pause = function (sID) {
            //alert("Implement Me: " + "setPosition");
            return true;
        };

        /**
         * Pauses all currently-playing sounds.
         */
        this.pauseAll = function () {
            //alert("Implement Me: " + "setPosition");
            return true;
        };

        /**
         * Calls the resume() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @return {SMSound} The SMSound object
         */
        this.resume = function (sID) {
            return true;
        };
        
        /**
         * Resumes all currently-paused sounds.
         */
        this.resumeAll = function () {
            return true;
        };
        
        /**
         * Calls the togglePause() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @return {SMSound} The SMSound object
         */
        this.togglePause = function (sID) {
            return true;
        };

      /**
       * Calls the mute() method of either a single SMSound object by ID, or all sound objects.
       *
       * @param {string} sID Optional: The ID of the sound (if omitted, all sounds will be used.)
       */
        this.mute = function (sID) {
            return true;
        };

      /**
       * Mutes all sounds.
       */
        this.muteAll = function () {
            return true;
        };

      /**
        * Calls the unmute() method of either a single SMSound object by ID, or all sound objects.
        *
        * @param {string} sID Optional: The ID of the sound (if omitted, all sounds will be used.)
        */
        this.unmute = function (sID) {
            return true;
        };

      /**
       * Unmutes all sounds.
       */
        this.unmuteAll = function () {
            return true;
        };

      /**
       * Calls the toggleMute() method of a SMSound object by ID.
       *
       * @param {string} sID The ID of the sound
       * @return {SMSound} The SMSound object
       */
        this.toggleMute = function (sID) {
            return true;
        };
        
        /**
         * Retrieves the memory used by the flash plugin.
         *
         * @return {number} The amount of memory in use
         */
        this.getMemoryUse = function () {
            // flash-only
            var ram = 0;
            return ram;
        };
        
    } //soundManager constructor  
    
    soundManager = new SoundManager();
    
    /**
     * SoundManager public interfaces
     * ------------------------------
     */
        
    window.SoundManager = SoundManager; // constructor
    window.soundManager = soundManager; // public API, flash callbacks etc.

}(window));