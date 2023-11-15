import { TimerManager } from "./TimerManager.js";

function viewRender(timerInfoList) {
  //   console.log(timerInfoList);
}

let timerManager = new TimerManager(viewRender);

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

  timerManager.Create(timerName, +value);
  console.log();
});

document.querySelector(".control").addEventListener("click", (e) => {
  const command = e.target.value;

  switch (command) {
    case "초기화":
      break;
    case "x2":
      break;
    case "전체+5":
      break;
    case "전체 중지":
      break;
    case "전체 시작":
      break;
  }
});

document.querySelector(".display").addEventListener("click", (e) => {
  if (e.target.nodeName !== "INPUT") return;
  const uuid = e.target.parentNode.parentNode;

  console.log(e.target.value, uuid, uuid.getAttribute("--data-uuid"));
});
