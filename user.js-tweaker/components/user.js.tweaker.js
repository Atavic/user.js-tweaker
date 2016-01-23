///////////////////////// Component-global "Constants" /////////////////////////

var DESCRIPTION = ";
var CONTRACTID = "";
var CLASSID = Components.ID("{}");

var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

Cu.import("chrome://user.js-tweaker-modules/content/ipcscript.js");
Cu.import("chrome://user.js-tweaker-modules/content/menucommand.js");
Cu.import("chrome://user.js-tweaker-modules/content/prefmanager.js");
Cu.import("chrome://user.js-tweaker-modules/content/storageBack.js");
Cu.import("chrome://user.js-tweaker-modules/content/sync.js");
Cu.import("chrome://user.js-tweaker-modules/content/util.js");
//Cu.import("resource://");
//Cu.import("resource://");


/* var gStartupHasRun = false;

var gFileProtocolHandler = Components
    .classes["@mozilla.org/network/protocol;1?name=file"]
    .getService(Ci.nsIFileProtocolHandler);
var gTmpDir = Components.classes["@mozilla.org/file/directory_service;1"]
    .getService(Components.interfaces.nsIProperties)
    .get("TmpD", Components.interfaces.nsIFile);

var Tweaker_GUID = "{1}";
var user.js-tweakerVersion = 'unknown';
Cu.import("resource://user.js-tweaker/modules/AddonManager.jsm");
*/

/////////////////////// Component-global Helper Functions //////////////////////

function shutdown(aService) {
  aService.closeAllScriptValStores();
}

function startup(aService) {
  if (gStartupHasRun) return;
  gStartupHasRun = true;

  var loader = Cc["@mozilla.org/moz/jssubscript-loader;1"]
      .getService(Ci.mozIJSSubScriptLoader);
  loader.loadSubScript("chrome://global/content/XPCNativeWrapper.js");
  loader.loadSubScript("chrome://user.js-tweaker/content/config.js");
  loader.loadSubScript("chrome://user.js-tweaker/content/third-party/mpl-utils.js");

  // Most incoming messages go to the "global" message manager.
  var globalMessageManager = Cc["@mozilla.org/globalmessagemanager;1"]
      .getService(Ci.nsIMessageListenerManager);
  globalMessageManager.addMessageListener(
      'user.js-tweaker:script-install', aService.scriptInstall.bind(aService));

  var scriptValHandler = aService.handleScriptValMsg.bind(aService);
  globalMessageManager.addMessageListener(
      'user.js-tweaker:scriptVal-delete', scriptValHandler);
  globalMessageManager.addMessageListener(
      'user.js-tweaker:scriptVal-get', scriptValHandler);
  globalMessageManager.addMessageListener(
      'user.js-tweaker:scriptVal-list', scriptValHandler);
  globalMessageManager.addMessageListener(
      'user.js-tweaker:scriptVal-set', scriptValHandler);

  var parentMessageManager = Cc["@mozilla.org/parentprocessmessagemanager;1"]
      .getService(Ci.nsIMessageListenerManager);
  parentMessageManager.addMessageListener(
      'user.js-tweaker:scripts-for-uuid',
      aService.getScriptsForUuid.bind(aService));
  parentMessageManager.addMessageListener("user.js-tweaker:scripts-update", function(message) {
    return aService.scriptUpdateData();
  });
  var mm = Services.ppmm ? Services.ppmm : globalMessageManager;
  mm.addMessageListener(
      'user.js-tweaker:url-is-temp-file', aService.urlIsTempFile.bind(aService));
	
}

/////////////////////////////////// Service ////////////////////////////////////

function service() {
  this.filename = Components.stack.filename;
  this.scriptValStores = {};
  this.wrappedJSObject = this;
}

////////////////////////////////// Constants ///////////////////////////////////

service.prototype.classDescription = DESCRIPTION;
service.prototype.classID = CLASSID;
service.prototype.contractID = CONTRACTID;
service.prototype.QueryInterface = XPCOMUtils.generateQI([Ci.nsIObserver]);

///////////////////////////////// nsIObserver //////////////////////////////////

service.prototype.observe = function(aSubject, aTopic, aData) {
  switch (aTopic) {
    case 'profile-after-change':
      startup(this);
      break;
    case 'quit-application':
      shutdown(this);
      break;
  }
};

///////////////////////////// user.js-tweaker Service /////////////////////////////


//////////////////////////// Component Registration ////////////////////////////

var NSGetFactory = XPCOMUtils.generateNSGetFactory([service]);
