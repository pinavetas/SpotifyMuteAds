var spotifyUrl = "open.spotify.com";
var addTitleText = "Spotify";

function checkTabs(tabId, changeInfo, tab) {
	if(tab.url.includes(spotifyUrl) && tab.audible){
		var actionExecuted = false;
		console.log("Inspect Spotify tab change.", tab.title);
		if(tab.title.includes(addTitleText)){
			if(!tab.mutedInfo.muted){
				chrome.tabs.update(tab.id, {muted: true});
				console.log("SOUND OFF");
			}
			actionExecuted = true;
		}
		if(!actionExecuted){			
			chrome.tabs.query({url: "https://open.spotify.com/*"}, function(tabs) {
			  chrome.tabs.sendMessage(tabs[0].id, {action: "getSource"}, function(response) {
				checkAnotherAds(response, tabs[0]);
			  });
			});	
		}
	}
};

function checkAnotherAds(source, checkedTab){
	if(source.includes("control-button--disabled")){
		if(!checkedTab.mutedInfo.muted){
			chrome.tabs.update(checkedTab.id, {muted: true});
			console.log("SOUND OFF");
		}
	}else if(source.includes("control-button")){
		if(checkedTab.mutedInfo.muted){
			chrome.tabs.update(checkedTab.id, {muted: false});
			console.log("SOUND ON");
		}
	}
}

async function start() {
	chrome.tabs.onUpdated.addListener(checkTabs);		
}
start();