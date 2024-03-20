// const body = document.querySelector("body");
// if (body) {
//   const button = document.createElement("button");
//   button.innerText = "アラートを表示";
//   button.addEventListener("click", () => {
//     alert("おめでとうございます！");
//   });
//   body.append(button);
// }

chrome.runtime.onMessage.addListener((request) => {
  console.log(`sendReq: ${request}`)
  let selectedDom;
  switch (request.action) {
    case 'summary':
      console.log('summary')
      console.log(request.message)
      selectedDom = window.getSelection()?.anchorNode?.parentNode;
      selectedDom!.textContent = request.message;

      // if (!selectedDom) { 
      //     selectedDom!.innerHTML = "<h1>Hello !</h1>";
      // }

      break;
    case 'text':
      console.log('text')
      console.log(request.message)
      break;
  }
})


export { };