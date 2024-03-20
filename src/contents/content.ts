chrome.runtime.onMessage.addListener((request) => {
  console.log(`sendReq: ${request}`)
  let selectedDom;
  switch (request.action) {
    case 'summary':
      console.log('summary')
      console.log(request.message)
      selectedDom = window.getSelection()?.anchorNode?.parentNode;
      selectedDom!.textContent = request.message;

      break;
    case 'text':
      console.log('text')
      console.log(request.message)
      break;
  }
})


export { };