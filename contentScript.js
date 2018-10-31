

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//var html = document.documentElement.outerHTML;
		var forwardButton = document.getElementsByClassName("spoticon-skip-forward-16");		
		sendResponse(forwardButton[0].outerHTML);
	}
);
