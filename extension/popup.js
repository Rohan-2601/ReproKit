const btn = document.getElementById("btn");
const status = document.getElementById("status");

btn.onclick = async () => {
  status.innerText = "Capturing...";

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const res = await chrome.tabs.sendMessage(tab.id, {
    type: "GET_LOGS",
  });

  chrome.tabs.captureVisibleTab(null, { format: "png" }, async (img) => {
    const report = {
      logs: res.logs,
      screenshot: img,
      url: tab.url,
    };

    await fetch("http://localhost:3001/api/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("LINK:", data.url);
        status.innerText = "Link created!";
      });
  });
};
