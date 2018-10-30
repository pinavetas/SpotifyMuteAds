var spotifyUrl = "open.spotify.com";
var addTitleText = "Spotify";
var portSpotify;
var checkedTab;

function checkTabs(tabId, changeInfo, tab) {
	if(tab.url.includes(spotifyUrl) && tab.audible){
		var actionExecuted = false;
		console.log("Inspect Spotify tab change.", tab.title);
		if(portSpotify != undefined){
			if(tab.title.includes(addTitleText)){
				if(!tab.mutedInfo.muted){
					chrome.tabs.update(tab.id, {muted: true});
					console.log("SOUND OFF");
				}
				actionExecuted = true;
			}
			if(!actionExecuted){			
				portSpotify.postMessage({action: "getSource"});
				checkedTab = tab;
			}
		}
	}
};

function openConnection(port){
	port.onMessage.addListener(function(msg) {
		if (msg.action == "openConnection"){    
			portSpotify = port;
		}
		if (msg.action == "deliverSource"){    
			checkAnotherAds(msg.source);
		}
	});
}

function checkAnotherAds(source){
	if(source.includes("control-button--disabled spoticon-skip-forward-16")){
		if(!checkedTab.mutedInfo.muted){
			chrome.tabs.update(checkedTab.id, {muted: true});
			console.log("SOUND OFF");
		}
	}
	else if(source.includes("control-button spoticon-skip-forward-16")){
		if(checkedTab.mutedInfo.muted){
				chrome.tabs.update(checkedTab.id, {muted: false});
				console.log("SOUND ON");
		}
	}
}

async function start() {
	chrome.runtime.onConnect.addListener(openConnection);
	chrome.tabs.onUpdated.addListener(checkTabs);		
}
start();