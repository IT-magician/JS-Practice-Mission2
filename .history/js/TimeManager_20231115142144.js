class TimeManager {
  #pungs = [];

  #checkInterval = 500; // 500ms

  #baseLeftTime = 0;
  #isAllStop = false;

  #uuid = 1;

  cmp;

  constructor() {}

  #GenerateUUID() {
    return this.#uuid++;
  }

  Sort(uuid) {
    targetIdx = this.#pungs.findIndex((item) => item.uuid === uuid);

    if (targetIdx === -1) return;

    swapIdx = -1;

    for (let i = targetIdx + 1; i < this.#pungs.length; i++)
      if (cmp(this.#pungs[targetIdx], this.#pungs[i])) swapIdx = i;

    for (let i = targetIdx - 1; i >= 0; i--)
      if (!cmp(this.#pungs[targetIdx], this.#pungs[i])) swapIdx = i;

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
    };

    new Promise(async (resolve, reject) => {
      // 시간 카운트 다운 설정
      timerInfo.timer = await setInterval(() => {
        if (this.#isAllStop || timerInfo.isStop) return;

        if (this.#baseLeftTime <= 0)
          timerInfo.value = Math.max(0, timerInfo.value - this.#checkInterval);

        Sort(uuid);

        if (this.#baseLeftTime + timerInfo.value === 0) {
          clearInterval(timerInfo.timer);
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

  static multiplerIncrease() {}

  multiplerIncrease() {}

  static Stop() {}
  Stop() {}

  static Start() {}
  Start() {}

  Increase(value = 5) {}

  Cancel(uuid) {
    let item = this.pungs.find((item) => item.uuid === uuid);

    if (item === false) return;

    clearInterval(item.timer);
  }
}

export { TimeManager };
