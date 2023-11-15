import { TimerManager } from "./TimerManager.js";

function viewRender(timerInfoList) {
  console.log(timerInfoList);
}

let timerManager = new TimerManager(viewRender);

timerManager.Create("타이머1", 1 * 1000);
timerManager.Create("타이머2", 10 * 1000);

// timerManager.multiplerIncreaseAll();
// timerManager.multiplerIncreaseAll();
// timerManager.multiplerIncreaseAll();
// timerManager.multiplerIncreaseAll();
