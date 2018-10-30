var port = chrome.runtime.connect({name: "spotifySource"});
port.postMessage({action: "openConnection"});
port.onMessage.addListener(function(msg) {
	if (msg.action == "getSource"){
		var html = document.documentElement.outerHTML;		
		port.postMessage({action: "deliverSource", source: html});
	}
});

