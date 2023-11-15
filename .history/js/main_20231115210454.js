import { TimerManager } from "./TimerManager.js";

const displayElement = document.querySelector(".display");
function viewRender(timerInfoList) {
  if (isRenderStop) return;

  let displayData = "";

  document.querySelector(".summary").innerHTML = `총: ${
    timerInfoList.length
  }건 평균 남은시간: ${timerManager.GetAverage()} 초`;

  if (timerInfoList.length > 0) {
    for (let timerInfo of timerInfoList) {
      displayData += `
      <li class="item" --data-uuid="${timerInfo.uuid}">
          <div class="name">${timerInfo.name}</div>
          <div class="left-time">${timerInfo.value / 1000}초</div>
          <div class="sub-control">
              <input type="button" value="+5초" />
              <input type="button" value="중지" />
              <input type="button" value="삭제" />
          </div>
      </li>
      `;
    }
  }

  displayElement.innerHTML = displayData;
  // console.log(timerInfoList);
}

let timerManager = new TimerManager(viewRender);

let isRenderStop = false;
function StopAll() {
  isRenderStop = true;
  timerManager.StopAll();
}
function StartAll() {
  isRenderStop = false;
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
  if (!e.target.value || isRenderStop) return;

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

document.querySelector(".display").addEventListener("click", (e) => {
  if (e.target.nodeName !== "INPUT") return;
  const command = e.target.value;
  const uuid = +e.target.parentNode.parentNode
    .getAttribute("--data-uuid")
    .replace(/[^0-9]/g, "");

  switch (command) {
    case "+5초":
      timerManager.Increase(uuid);
      console.log("+5");
      break;
    case "중지":
      timerManager.Stop(uuid);
      break;
    case "삭제":
      timerManager.Cancel(uuid);
      break;
  }
});
