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

inputGroup.addEventListener("click", (e) => {
  if (e.target.value === false) return;

  console.log(e.currentTarget, e.target);
});
