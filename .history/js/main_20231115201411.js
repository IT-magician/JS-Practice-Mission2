import { TimerManager } from "./TimerManager.js";

function viewRender(timerInfoList) {
  if (isRenderStop) return;

  console.log(timerInfoList);
}

let timerManager = new TimerManager(viewRender);

let isRenderStop = false;
function StopAll() {
  isRenderStop = false;
  timerManager.StopAll();
}
function StartAll() {
  isRenderStop = true;
  timerManager.StartAll();
}

// TC for API
// timerManager.multiplerIncreaseAll();
// timerManager.multiplerIncrease(1);
// timerManager.IncreaseAll();
// timerManager.Increase(1);
// timerManager.Clear();
// timerManager.Cancel(1);

const inputGroup = document.querySelector(".input");

document.querySelector(".btns").addEventListener("click", (e) => {
  if (!e.target.value) return;

  const timerName =
    e.target.parentNode.parentNode.querySelector(".name input").value;
  const value = e.target.value.replace(/[^0-9]/g, "");

  if (!timerName) return;

  console.log("초기 시간 : ", value);
  timerManager.Create(timerName, +value * 1000);
});

document.querySelector(".control").addEventListener("click", (e) => {
  const command = e.target.value;

  switch (command) {
    case "초기화":
      timerManager.Clear();
      break;
    case "x2":
      timerManager.multiplerIncreaseAll();
      break;
    case "전체+5":
      timerManager.IncreaseAll();
      break;
    case "전체 중지":
      //   timerManager.StopAll();
      StopAll();
      break;
    case "전체 시작":
      //   timerManager.StartAll();
      StartAll();
      break;
  }
});

// document.querySelector(".display").addEventListener("click", (e) => {
//   if (e.target.nodeName !== "INPUT") return;
//   const command = e.target.value;
//   const uuid = e.target.parentNode.parentNode.getAttribute("--data-uuid");

//   switch (command) {
//     case "+5":
//       break;
//     case "중지":
//       break;
//     case "삭제":
//       break;
//   }
// });
