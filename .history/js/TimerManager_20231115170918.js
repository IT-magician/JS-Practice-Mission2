class TimerManager {
  #pungs = [];

  #checkInterval = 500; // 500ms

  #baseLeftTime = 0;
  #isAllStop = false;

  #uuid = 1;

  #cmp;

  #ViewRenderChecker = setInterval(() => {
    this.#viewRender(this.#pungs);
  }, 1000);

  #viewRender;

  constructor(viewRender, cmp = (lhs, rhs) => lhs - rhs) {
    this.#viewRender = viewRender;
    this.#cmp = cmp;
  }

  #GenerateUUID() {
    return this.#uuid++;
  }

  // 버블 정렬(with stable sort) 응용
  Sort(uuid) {
    let targetIdx = this.#pungs.findIndex((item) => item.uuid === uuid);

    // console.log(`uuid : ${uuid}, targetIdx : ${targetIdx}`);
    if (targetIdx === -1) return;

    let swapIdx = -1;

    for (let i = targetIdx + 1; i < this.#pungs.length; i++)
      if (this.#cmp(this.#pungs[targetIdx], this.#pungs[i]) > 0) swapIdx = i;

    for (let i = targetIdx - 1; i >= 0; i--)
      if (this.#cmp(this.#pungs[targetIdx], this.#pungs[i]) < 0) swapIdx = i;

    if (swapIdx === -1) return;

    [this.#pungs[targetIdx], this.#pungs[swapIdx]] = [
      this.#pungs[swapIdx],
      this.#pungs[targetIdx],
    ];
  }

  TimerInfoClass = class {
    name;
    uuid;
    value;
    timer = null;
    isStop = false;

    /**
     *
     * @param {string|number} name
     * @param {number} value : 삭제되기까지 남은 시간
     * @param {string|number} uuid
     */
    constructor(name, value, uuid) {
      this.name = name;
      this.value = value;
      this.uuid = uuid;
    }

    /**
     * Array.find(condition)?.executeMethod() 연산자를 사용하고 싶어서 만든 메서드들
     */
    Multipler = (value = 2) => (this.value *= value);
    Add = (value = 5) => (this.value += value);
    Start = () => (this.isStop = false);
    Stop = () => (this.isStop = true);
    ClearCountDown = function () {
      if (this.timer === false) return;
      clearInterval(this.timer);
      this.timer = null;
      this.value = 0;

      return this;
    };

    /**
     * Array.find(condition)?.executeMethod() 연산자를 사용하고 싶어서 만든 메서드들 + 이후 작업 처리용
     *
     * 원본:
     * execute = (func) => {
     *   return (...args) => {
     *     func(...args);
     *   };
     * };
     *
     * 외부에서 사용 예시:
     * timeInfo = new TimerInfoClass(...)
     * timeInfo.execute((a,b) => console.log(a+b))(1,2)
     */
    execute = (func) => {
      return (...args) => func(...args);
    };
  };

  /// ________________________________________________________________________
  //                            외부 호출 메소드 API
  /// ________________________________________________________________________
  Create(name, value) {
    let uuid = this.#GenerateUUID();
    let timerInfo = new this.TimerInfoClass(name, value, uuid);

    this.#pungs.push(timerInfo);

    new Promise(async (resolve, reject) => {
      // 시간 카운트 다운 설정
      timerInfo.timer = await setInterval(() => {
        if (this.#isAllStop || timerInfo.isStop) return;
        timerInfo.value = Math.max(0, timerInfo.value - this.#checkInterval);

        this.Sort(uuid);

        if (timerInfo.value === 0) {
          timerInfo.ClearCountDown();

          resolve();
        }
      }, this.#checkInterval);
    }).then((resolve, reject) => {
      // 종료 작업
      this.Cancel(uuid);
    });
  }

  Clear() {
    this.#pungs.forEach((item) => {
      this.Cancel(item.uuid);
    });

    this.#pungs = [];
  }

  multiplerIncreaseAll(value = 2) {
    this.StopAll();
    this.#pungs.forEach((item) => item.Add());
    this.StartAll();
  }

  multiplerIncrease(uuid, value = 2) {
    target = this.pungs.find((item) => item.uuid === uuid).Multipler(value);
  }

  StopAll() {
    this.#isAllStop = true;
  }

  Stop(uuid) {
    this.pungs.find((item) => item.uuid === uuid)?.Stop();
  }

  StartAll() {
    this.#isAllStop = false;
  }
  Start(uuid) {
    this.pungs.find((item) => item.uuid === uuid)?.Start();
  }

  IncreaseAll(value = 5) {
    this.#baseLeftTime += value;
  }

  Increase(value = 5) {
    this.pungs.find((item) => item.uuid === uuid)?.Add(value);
  }

  Cancel(uuid) {
    this.#pungs
      .find((item) => item.uuid === uuid)
      ?.ClearCountDown()
      // .execute(() => console.log(this.#pungs));
      .execute((a, b) => console.log(a, b))(1, 2);
  }
}

export { TimerManager };
