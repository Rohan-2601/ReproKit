chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.tabs
      .sendMessage(tabId, {
        type: "START_LOGGING",
      })
      .catch(() => {
        // Content script not loaded yet, ignore
      });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "LOG") {
    // Handle logs from content script
    sendResponse({ success: true });
  }
});
