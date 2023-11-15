class TimeManager {
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
    targetIdx = this.#pungs.findIndex((item) => item.uuid === uuid);

    if (targetIdx === -1) return;

    swapIdx = -1;

    for (let i = targetIdx + 1; i < this.#pungs.length; i++)
      if (cmp(this.#pungs[targetIdx], this.#pungs[i]) > 0) swapIdx = i;

    for (let i = targetIdx - 1; i >= 0; i--)
      if (cmp(this.#pungs[targetIdx], this.#pungs[i]) < 0) swapIdx = i;

    [this.#pungs[targetIdx], this.#pungs[swapIdx]] = [
      this.#pungs[swapIdx],
      this.#pungs[targetIdx],
    ];
  }

  /// ________________________________________________________________________
  //                            외부 호출 메소드 API
  /// ________________________________________________________________________
  Create(name, value) {
    let timerInfo = {
      name,
      uuid: this.#GenerateUUID(),
      value,
      timer: null,
      isStop: false,

      /**
       * Array.find(condition).? 연산자를 사용하고 싶어서 만든 메서드들
       */
      Multipler: (value) => (this.value *= value),
      Add: (value) => (this.value += value),
      Start: () => (this.isStop = false),
      Stop: () => (this.isStop = true),
      ClearCountDown: () => ClearInterval(this.timer),
    };

    new Promise(async (resolve, reject) => {
      // 시간 카운트 다운 설정
      timerInfo.timer = await setInterval(() => {
        if (this.#isAllStop || timerInfo.isStop) return;

        if (this.#baseLeftTime <= 0)
          timerInfo.value = Math.max(0, timerInfo.value - this.#checkInterval);

        Sort(uuid);

        if (this.#baseLeftTime + timerInfo.value === 0) {
          timerInfo.ClearCountDown();
          timerInfo.timer = null;
        }
      }, this.#checkInterval);

      resolve();
    }).then((resolve, reject) => {
      // 종료 작업
    });
  }

  Clear() {
    this.#pungs.forEach((item) => {
      this.Cancel(item.uuid);
    });

    this.#pungs = [];
  }

  multiplerIncreaseAll(value = 2) {
    this.#baseLeftTime *= value;
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
    this.pungs.find((item) => item.uuid === uuid)?.ClearCountDown();
  }
}

export { TimeManager };
