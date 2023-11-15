import { TimerManager } from "./TimerManager.js";

function viewRender(timerInfoList) {
  console.log(timerInfoList);
}

let timerManager = new TimerManager(viewRender);

timerManager.Create("타이머1", 10 * 1000);

// timerManager.multiplerIncreaseAll();
// timerManager.multiplerIncrease(1);
// timerManager.IncreaseAll();
// timerManager.Increase(1);
timerManager.Clear();
// timerManager.Cancel(1);
