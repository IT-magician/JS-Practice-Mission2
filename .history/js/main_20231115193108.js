import { TimerManager } from "./TimerManager.js";

function viewRender(timerInfoList) {
  //   console.log(timerInfoList);
}

let timerManager = new TimerManager(viewRender);

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
  const value = e.target.value.replace("/[^0-9]/g", "");

  console.log(timerName, value);
});
