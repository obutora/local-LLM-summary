
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'summary',
    title: 'ローカルLLMで要約',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  let llmRes;
  if (tab !== undefined) {
    switch (info.menuItemId) {
      case 'summary':
        console.log(info.selectionText);

        if (!tab.id || !info.selectionText) {
          return;
        }

        llmRes = await fetchLLM(info.selectionText)
        if (llmRes) {
          console.log(tab.id ?? "tab.id is undefined");
          chrome.tabs.sendMessage(tab.id, {
            action: 'summary',
            message: llmRes,
          })
        }
        break;
    }
  }
});


async function fetchLLM(text: string) {
  const headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }

  const bodyContent = JSON.stringify({
    "target": text,
  });

  const response = await fetch("http://localhost:3000/summary", {
    method: "POST",
    body: bodyContent,
    headers: headersList
  });

  const res = await response.json();
  console.log(res["message"]);

  return res["message"];
}

export { }