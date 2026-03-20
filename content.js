let logs = [];

function addLog(event) {
  const now = Date.now();

  logs.push({ ...event, time: now });

  logs = logs.filter(l => now - l.time < 60000);
}

// clicks
document.addEventListener("click", (e) => {
  addLog({
    type: "click",
    text: e.target.innerText || e.target.tagName
  });
});

// console
const originalError = console.error;

console.error = function (...args) {
  addLog({
    type: "console",
    message: args.join(" ")
  });

  originalError.apply(console, args);
};

// network
const originalFetch = window.fetch;

window.fetch = async (...args) => {
  const start = Date.now();

  const res = await originalFetch(...args);

  addLog({
    type: "network",
    url: args[0],
    status: res.status,
    duration: Date.now() - start
  });

  return res;
};

// send logs
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_LOGS") {
    sendResponse({ logs });
  }
});