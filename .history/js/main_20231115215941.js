import { TimerManager } from "./TimerManager.js";

const displayElement = document.querySelector(".display");
const summaryElement = document.querySelector(".summary");

let displayDomData = [];
let averageTime = 0;

function viewRender(timerInfoList) {
  let displayData = "";

  summaryElement.innerHTML = `총: ${
    timerInfoList.length
  }건 평균 남은시간: ${timerManager.GetAverage().toFixed(1)} 초`;
  // return;

  for (let i = 0; i < timerInfoList.length; i++) {
    const timerInfo = timerInfoList[i];

    if (timerInfoList.length > 0) {
      for (let timerInfo of timerInfoList) {
        displayData += `
      <li class="item" --data-uuid="${timerInfo.uuid}">
          <div class="name">${timerInfo.name}</div>
          <div class="left-time">${Math.round(timerInfo.value / 1000)}초</div>
          <div class="sub-control">
              <input type="button" value="+5초" />
              <input type="button" value="중지" />
              <input type="button" value="삭제" />
          </div>
      </li>
      `.trim();
      }
    }

    displayElement.innerHTML = displayData;
  }
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
  e.preventDefault();

  const timerName =
    e.target.parentNode.parentNode.querySelector(".name input").value;
  const value = e.target.value.replace(/[^0-9]/g, "");

  if (!timerName) return;

  timerManager.Create(timerName, +value * 1000);
});

document.querySelector(".control").addEventListener("click", (e) => {
  const command = e.target.value;
  e.preventDefault();

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
      timerManager.StopAll();
      // StopAll();
      break;
    case "전체 시작":
      timerManager.StartAll();
      // StartAll();
      break;
  }
});

displayElement.addEventListener("click", (e) => {
  if (e.target.nodeName !== "INPUT") return;
  e.preventDefault();

  const command = e.target.value;
  const uuid = +e.target.parentNode.parentNode
    .getAttribute("--data-uuid")
    .replace(/[^0-9]/g, "");

  switch (command) {
    case "+5초":
      timerManager.Increase(uuid);
      break;
    case "중지":
      timerManager.Stop(uuid);
      break;
    case "삭제":
      timerManager.Cancel(uuid);
      break;
  }
});
