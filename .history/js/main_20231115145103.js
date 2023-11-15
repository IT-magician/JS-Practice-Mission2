import { TimerManager } from "./TimerManager.js";

function viewRender(timerInfoList) {}

timerManager = new TimerManager(viewRender);

timerManager.Create("타이머1", 10 * 1000);
