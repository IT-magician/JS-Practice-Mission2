import { TimerManager } from "./TimerManager.js";

function viewRender(timerInfoList) {
  if (isRenderStop) return;

  for (let timerInfo of timerInfoList) {
    const tr = `
    <li class="item" --data-uuid="${}">
        <div class="name">${}</div>
        <div class="left-time">${}</div>
        <div class="sub-control">
            <input type="button" value="+5초" />
            <input type="button" value="중지" />
            <input type="button" value="삭제" />
        </div>
    </li>
    `
  }
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
